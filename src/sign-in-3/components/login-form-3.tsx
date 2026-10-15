"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Logo } from "@/components/logo"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, KeyRound, ShieldCheck, Timer } from "lucide-react"
import darkModeImage from "./darkMODE.jpg"

// ─── Lockout constants ───────────────────────────────────────────────
const LOCKOUT_THRESHOLD = 3        // Failed attempts before first lockout
const LOCKOUT_BASE_SECONDS = 30    // Initial lockout duration
const LOCKOUT_INCREMENT = 30       // Added per subsequent lockout
const LOCKOUT_MAX_SECONDS = 300    // 5 minute cap

// ─── localStorage helpers ────────────────────────────────────────────
interface LockoutData {
  failCount: number
  lockoutCount: number       // How many times the user has been locked out
  lockedUntil: number | null // Unix ms timestamp
}

const LOCKOUT_KEYS = {
  credentials: "pms_lockout_credentials",
  totp: "pms_lockout_totp",
} as const

function readLockout(key: string): LockoutData {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore corrupt data */ }
  return { failCount: 0, lockoutCount: 0, lockedUntil: null }
}

function writeLockout(key: string, data: LockoutData) {
  localStorage.setItem(key, JSON.stringify(data))
}

function clearLockout(key: string) {
  localStorage.removeItem(key)
}

// ─── useLockout hook ─────────────────────────────────────────────────
function useLockout(step: "credentials" | "totp") {
  const key = LOCKOUT_KEYS[step]
  const [remaining, setRemaining] = useState(0)
  const [lockoutData, setLockoutData] = useState<LockoutData>(() => readLockout(key))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isLockedOut = remaining > 0

  // Tick-down function
  const startCountdown = useCallback((lockedUntil: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    const tick = () => {
      const diff = Math.ceil((lockedUntil - Date.now()) / 1000)
      if (diff <= 0) {
        setRemaining(0)
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        setRemaining(diff)
      }
    }

    tick()
    intervalRef.current = setInterval(tick, 1000)
  }, [])

  // On mount / step change, restore any active lockout
  useEffect(() => {
    const data = readLockout(key)
    setLockoutData(data)
    if (data.lockedUntil && data.lockedUntil > Date.now()) {
      startCountdown(data.lockedUntil)
    } else if (data.lockedUntil) {
      // Lockout expired while page was closed — keep fail counts, clear timer
      const updated = { ...data, lockedUntil: null }
      writeLockout(key, updated)
      setLockoutData(updated)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [key, startCountdown])

  // Called on every failed attempt
  const recordFailure = useCallback(() => {
    const current = readLockout(key)
    const newFailCount = current.failCount + 1

    if (newFailCount >= LOCKOUT_THRESHOLD) {
      // Trigger lockout
      const newLockoutCount = current.lockoutCount + 1
      const duration = Math.min(
        LOCKOUT_BASE_SECONDS + (newLockoutCount - 1) * LOCKOUT_INCREMENT,
        LOCKOUT_MAX_SECONDS
      )
      const lockedUntil = Date.now() + duration * 1000

      const updated: LockoutData = {
        failCount: 0,           // Reset fail count after triggering lockout
        lockoutCount: newLockoutCount,
        lockedUntil,
      }
      writeLockout(key, updated)
      setLockoutData(updated)
      startCountdown(lockedUntil)
    } else {
      // Just increment
      const updated: LockoutData = { ...current, failCount: newFailCount }
      writeLockout(key, updated)
      setLockoutData(updated)
    }
  }, [key, startCountdown])

  // Called on successful login — clears everything
  const resetLockout = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    clearLockout(key)
    setLockoutData({ failCount: 0, lockoutCount: 0, lockedUntil: null })
    setRemaining(0)
  }, [key])

  const attemptsBeforeLockout = Math.max(0, LOCKOUT_THRESHOLD - lockoutData.failCount)

  return { isLockedOut, remaining, recordFailure, resetLockout, lockoutData, attemptsBeforeLockout }
}

// ─── Countdown display component ────────────────────────────────────
function CooldownBanner({ remaining }: { remaining: number }) {
  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const timeStr = minutes > 0
    ? `${minutes}:${seconds.toString().padStart(2, "0")}`
    : `${seconds}s`

  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-lg animate-pulse">
      <Timer className="size-4 shrink-0" />
      <span>
        Too many failed attempts. Try again in <span className="font-bold tabular-nums">{timeStr}</span>
      </span>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────
export function LoginForm3({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()

  // Form states
  const [step, setStep] = useState<"credentials" | "totp">("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Lockout hooks — one per step
  const credentialsLockout = useLockout("credentials")
  const totpLockout = useLockout("totp")

  // Step 1: Submit credentials
  const handleCredentialsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (credentialsLockout.isLockedOut) return

    setError(null)

    if (role === "ceo") {
      navigate("/ceo-dashboard")
      return
    }

    if (role === "auditor" || role === "audit_committee") {
      navigate("/audit-dashboard")
      return
    }

    if (role === "system_admin" || role === "system_administrator") {
      navigate("/system-admin-dashboard")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        credentialsLockout.recordFailure()
        throw new Error(data.error || "Login failed")
      }

      // Success — reset lockout
      credentialsLockout.resetLockout()

      // If TOTP is required, move to step 2
      if (data.requireTotp) {
        setPendingUserId(data.userId)
        setStep("totp")
        return
      }

      // Standard login success without TOTP
      if (data.token) {
        localStorage.setItem("token", data.token)
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step 2: Verify TOTP 6-digit code
  const handleTotpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!pendingUserId) return

    if (totpLockout.isLockedOut) return

    if (!totpCode || totpCode.trim().length !== 6) {
      setError("Please enter a valid 6-digit TOTP code.")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/verify-totp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: pendingUserId, code: totpCode.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        totpLockout.recordFailure()
        throw new Error(data.error || "Invalid verification code")
      }

      // Success — reset lockout
      totpLockout.resetLockout()

      if (data.token) {
        localStorage.setItem("token", data.token)
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to verify code")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Skip TOTP handler
  const handleSkipTotp = async () => {
    if (!pendingUserId) return
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/skip-totp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: pendingUserId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to skip TOTP")
      }

      // Success — reset lockout
      totpLockout.resetLockout()

      if (data.token) {
        localStorage.setItem("token", data.token)
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      navigate("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to skip TOTP")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToLogin = () => {
    setStep("credentials")
    setTotpCode("")
    setError(null)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {step === "credentials" ? (
            /* STEP 1: Credentials Form */
            <form className="p-6 md:p-8" onSubmit={handleCredentialsSubmit} noValidate>
              <div className="flex flex-col gap-6">
                <div className="flex justify-center mb-2">
                  <a href="/" className="flex items-center gap-2 font-medium">
                    <div className="flex size-8 items-center justify-center rounded-md">
                      <Logo size={24} />
                    </div>
                    <span className="text-xl"> PMS FINANCE</span>
                  </a>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">Login to your PMS FINANCE account</p>
                </div>

                {/* Cooldown banner */}
                {credentialsLockout.isLockedOut && (
                  <CooldownBanner remaining={credentialsLockout.remaining} />
                )}

                {error && !credentialsLockout.isLockedOut && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/10 p-2 rounded-md">
                    {error}
                    {credentialsLockout.attemptsBeforeLockout > 0 && credentialsLockout.attemptsBeforeLockout < LOCKOUT_THRESHOLD && (
                      <p className="text-xs mt-1 text-red-400">
                        {credentialsLockout.attemptsBeforeLockout} attempt{credentialsLockout.attemptsBeforeLockout !== 1 ? "s" : ""} remaining before cooldown
                      </p>
                    )}
                  </div>
                )}

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={isSubmitting || credentialsLockout.isLockedOut}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={role}
                    onValueChange={(val) => {
                      setRole(val)
                      if (val === "ceo") {
                        navigate("/ceo-dashboard")
                      } else if (val === "auditor") {
                        navigate("/audit-dashboard")
                      } else if (val === "system_admin" || val === "system_administrator") {
                        navigate("/system-admin-dashboard")
                      }
                    }}
                    disabled={isSubmitting || credentialsLockout.isLockedOut}
                  >
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="ceo"
                        onClick={() => navigate("/ceo-dashboard")}
                      >
                        CEO
                      </SelectItem>
                      <SelectItem
                        value="auditor"
                        onClick={() => navigate("/audit-dashboard")}
                      >
                        Audit Committee / Auditor
                      </SelectItem>
                      <SelectItem
                        value="system_admin"
                        onClick={() => navigate("/system-admin-dashboard")}
                      >
                        System Administrator
                      </SelectItem>
                      <SelectItem value="chief_financial_officer">Chief Financial Officer</SelectItem>
                      <SelectItem value="treasurer">Treasurer</SelectItem>
                      <SelectItem value="managerial_accountant">Managerial Accountant</SelectItem>
                      <SelectItem value="finance_controller_approver">Finance Controller / Approver</SelectItem>
                      <SelectItem value="tax_accountant">Tax Accountant</SelectItem>
                      <SelectItem value="accountant">Accountant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/templates/dashboard/shadcn-dashboard-landing-template/auth/forgot-password-3"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    disabled={isSubmitting || credentialsLockout.isLockedOut}
                  />
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting || credentialsLockout.isLockedOut}>
                  {credentialsLockout.isLockedOut
                    ? "Account Temporarily Locked"
                    : isSubmitting
                      ? "Logging in..."
                      : "Login"}
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/sign-up-3" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          ) : (
            /* STEP 2: TOTP Verification Form */
            <form className="p-6 md:p-8" onSubmit={handleTotpSubmit} noValidate>
              <div className="flex flex-col gap-6">
                <div className="flex justify-center mb-2">
                  <a href="/" className="flex items-center gap-2 font-medium">
                    <div className="flex size-8 items-center justify-center rounded-md">
                      <Logo size={24} />
                    </div>
                    <span className="text-xl"> PMS FINANCE</span>
                  </a>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
                  <p className="text-muted-foreground text-balance text-sm mt-1">
                    Enter the 6-digit code from your authenticator app (Google Authenticator, Authy, etc.) for <span className="font-semibold text-foreground">{email}</span>
                  </p>
                </div>

                {/* Cooldown banner */}
                {totpLockout.isLockedOut && (
                  <CooldownBanner remaining={totpLockout.remaining} />
                )}

                {error && !totpLockout.isLockedOut && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/10 p-2 rounded-md">
                    {error}
                    {totpLockout.attemptsBeforeLockout > 0 && totpLockout.attemptsBeforeLockout < LOCKOUT_THRESHOLD && (
                      <p className="text-xs mt-1 text-red-400">
                        {totpLockout.attemptsBeforeLockout} attempt{totpLockout.attemptsBeforeLockout !== 1 ? "s" : ""} remaining before cooldown
                      </p>
                    )}
                  </div>
                )}

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="totpCode">Authentication Code</Label>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <KeyRound className="size-3" /> 6 digits
                    </span>
                  </div>
                  <Input
                    id="totpCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{6}"
                    maxLength={6}
                    placeholder="000000"
                    className="text-center font-mono text-2xl tracking-[0.35em] font-semibold h-12"
                    value={totpCode}
                    onChange={(event) =>
                      setTotpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    autoFocus
                    required
                    disabled={isSubmitting || totpLockout.isLockedOut}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting || totpLockout.isLockedOut}>
                    {totpLockout.isLockedOut
                      ? "Temporarily Locked"
                      : isSubmitting
                        ? "Verifying..."
                        : "Verify Code"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting || totpLockout.isLockedOut}
                    onClick={handleSkipTotp}
                  >
                    Skip TOTP
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="size-3.5" /> Back to Login
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="bg-muted relative hidden md:flex items-center justify-center bg-white dark:bg-neutral-900 p-8">
            <img
              src={darkModeImage}
              alt="PMS Dark Mode"
              className="max-w-full max-h-full object-contain filter dark:brightness-95"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
