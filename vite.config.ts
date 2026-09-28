import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, Plugin } from "vite"
import pg from "pg"
import bcrypt from "bcrypt"

function postgresAuthPlugin(): Plugin {
  return {
    name: 'postgres-auth-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/auth/login') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const { email, password } = JSON.parse(body);
              const env = loadEnv(server.config.mode, process.cwd(), '');
              
              const pool = new pg.Pool({
                connectionString: env.DATABASE_URL,
                host: env.DB_HOST,
                port: parseInt(env.DB_PORT || '5432'),
                database: env.DB_DATABASE,
                user: env.DB_USERNAME,
                password: env.DB_PASSWORD,
              });

              // Ensure users table exists
              await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(255) UNIQUE NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  first_name VARCHAR(255),
                  last_name VARCHAR(255),
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
              `);

              const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
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

              // Return user data without password
              const { password: _, ...userData } = user;
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                user: {
                  id: userData.id,
                  email: userData.email,
                  firstName: userData.first_name,
                  lastName: userData.last_name
                },
                token: 'mock-jwt-token-' + userData.id // Mock token for client
              }));

            } catch (error: any) {
              console.error('Auth Plugin Error:', error);
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