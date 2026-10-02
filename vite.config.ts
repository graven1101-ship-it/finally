import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"
import pg from "pg"
import bcrypt from "bcrypt"

import crypto from "crypto"

function base32Decode(base32: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleaned = base32.replace(/=+$/, "").toUpperCase().replace(/[\s-]/g, "");
  let bits = "";
  for (let i = 0; i < cleaned.length; i++) {
    const val = alphabet.indexOf(cleaned[i]);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function generateTOTP(secret: string, windowOffset = 0): string {
  const key = base32Decode(secret);
  const epoch = Math.floor(Date.now() / 1000);
  const counter = Math.floor(epoch / 30) + windowOffset;
  const buffer = Buffer.alloc(8);
  buffer.writeBigInt64BE(BigInt(counter));
  const hmac = crypto.createHmac("sha1", key);
  hmac.update(buffer);
  const digest = hmac.digest();
  const offset = digest[digest.length - 1] & 0xf;
  const codeInt =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);
  return (codeInt % 1_000_000).toString().padStart(6, "0");
}

function verifyTOTP(token: string, secret: string): boolean {
  if (!token || !secret) return false;
  // Allow ±1 time window (±30s clock drift)
  for (let window = -1; window <= 1; window++) {
    if (generateTOTP(secret, window) === token.trim()) {
      return true;
    }
  }
  return false;
}

function postgresAuthPlugin(): Plugin {
  let pool: pg.Pool | null = null;

  const getPool = (server: any) => {
    if (!pool) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      pool = new pg.Pool(
        env.DATABASE_URL
          ? { connectionString: env.DATABASE_URL }
          : {
              host: env.DB_HOST || 'localhost',
              port: parseInt(env.DB_PORT || '5432'),
              database: env.DB_DATABASE,
              user: env.DB_USERNAME,
              password: env.DB_PASSWORD,
            }
      );
    }
    return pool;
  };

  const ensureSchema = async (dbPool: pg.Pool) => {
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        totp_secret VARCHAR(255),
        is_totp_enabled BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await dbPool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='totp_secret') THEN
          ALTER TABLE users ADD COLUMN totp_secret VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_totp_enabled') THEN
          ALTER TABLE users ADD COLUMN is_totp_enabled BOOLEAN DEFAULT FALSE;
        END IF;
      END $$;
    `);
  };

  return {
    name: 'postgres-auth-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 1. Password login route
        if (req.method === 'POST' && req.url === '/api/auth/login') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const { email, password } = JSON.parse(body);
              const dbPool = getPool(server);
              await ensureSchema(dbPool);

              const result = await dbPool.query('SELECT * FROM users WHERE email = $1', [email]);
              const user = result.rows[0];

              if (!user) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid email or password' }));
                return;
              }

              // Simple plain text comparison or bcrypt
              let isValid = false;
              if (user.password.startsWith('$2')) { // bcrypt hash
                isValid = await bcrypt.compare(password, user.password);
              } else {
                isValid = password === user.password;
              }

              if (!isValid) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid email or password' }));
                return;
              }

              // If user has TOTP enabled, stop here and ask for TOTP code
              if (user.is_totp_enabled && user.totp_secret) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  requireTotp: true,
                  userId: user.id,
                  email: user.email,
                  message: 'Two-factor authentication code required'
                }));
                return;
              }

              // Return user data without password or secrets
              const { password: _, totp_secret: __, ...userData } = user;
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                user: {
                  id: userData.id,
                  email: userData.email,
                  firstName: userData.first_name,
                  lastName: userData.last_name
                },
                token: 'mock-jwt-token-' + userData.id
              }));

            } catch (error: any) {
              console.error('Auth Plugin Error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: error?.message || 'Internal server error' }));
            }
          });
          return;
        }

        // 2. Verify TOTP 6-digit code
        if (req.method === 'POST' && req.url === '/api/auth/verify-totp') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const { userId, code } = JSON.parse(body);
              if (!userId || !code) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'User ID and 6-digit TOTP code are required' }));
                return;
              }

              const dbPool = getPool(server);
              await ensureSchema(dbPool);

              const result = await dbPool.query('SELECT * FROM users WHERE id = $1', [userId]);
              const user = result.rows[0];

              if (!user || !user.totp_secret) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'User not found or TOTP not configured' }));
                return;
              }

              const isValid = verifyTOTP(code, user.totp_secret);
              if (!isValid) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid or expired 6-digit code' }));
                return;
              }

              const { password: _, totp_secret: __, ...userData } = user;
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                user: {
                  id: userData.id,
                  email: userData.email,
                  firstName: userData.first_name,
                  lastName: userData.last_name
                },
                token: 'mock-jwt-token-' + userData.id
              }));
            } catch (error: any) {
              console.error('Verify TOTP Error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          });
          return;
        }

        // 3. Skip TOTP route
        if (req.method === 'POST' && req.url === '/api/auth/skip-totp') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const { userId } = JSON.parse(body);
              if (!userId) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'User ID is required' }));
                return;
              }

              const dbPool = getPool(server);
              await ensureSchema(dbPool);

              const result = await dbPool.query('SELECT * FROM users WHERE id = $1', [userId]);
              const user = result.rows[0];

              if (!user) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'User not found' }));
                return;
              }

              const { password: _, totp_secret: __, ...userData } = user;
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                user: {
                  id: userData.id,
                  email: userData.email,
                  firstName: userData.first_name,
                  lastName: userData.last_name
                },
                token: 'mock-jwt-token-' + userData.id
              }));
            } catch (error: any) {
              console.error('Skip TOTP Error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          });
          return;
        }

        // 4. Setup / Toggle TOTP for testing or user profile
        if (req.method === 'POST' && req.url === '/api/auth/setup-totp') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const { email, enable, secret } = JSON.parse(body);
              const dbPool = getPool(server);
              await ensureSchema(dbPool);

              // Generate standard base32 secret if not provided
              const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
              let base32Secret = secret;
              if (!base32Secret) {
                const bytes = crypto.randomBytes(20);
                base32Secret = Array.from(bytes)
                  .map(b => alphabet[b % alphabet.length])
                  .join("");
              }

              const isEnabled = enable !== undefined ? enable : true;
              await dbPool.query(
                'UPDATE users SET totp_secret = $1, is_totp_enabled = $2 WHERE email = $3',
                [base32Secret, isEnabled, email]
              );

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                email,
                totp_secret: base32Secret,
                is_totp_enabled: isEnabled,
                otpauthUrl: `otpauth://totp/PMS%20Finance:${encodeURIComponent(email)}?secret=${base32Secret}&issuer=PMS%20Finance`
              }));
            } catch (error: any) {
              console.error('Setup TOTP Error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), postgresAuthPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_BASENAME': JSON.stringify(process.env.VITE_BASENAME || ''),
  }
})