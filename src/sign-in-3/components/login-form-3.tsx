"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react"
import darkModeImage from "./darkMODE.jpg"

export function LoginForm3({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()

  // Form states
  const [step, setStep] = useState<"credentials" | "totp">("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Step 1: Submit credentials
  const handleCredentialsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

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
        throw new Error(data.error || "Invalid verification code")
      }

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

                {error && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/10 p-2 rounded-md">
                    {error}
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
                    disabled={isSubmitting}
                  />
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
                    disabled={isSubmitting}
                  />
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
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

                {error && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/10 p-2 rounded-md">
                    {error}
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Verifying..." : "Verify Code"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
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
