"use client"

import * as React from "react"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const MASKED_NUMBER = /\d[\d,]*(?:\.\d+)?%?/g
const originalValues = new WeakMap<Text, string>()
const SensitiveValuesContext = React.createContext<{
  hidden: boolean
  reveal: () => void
  hide: () => void
} | null>(null)

function isMaskableTextNode(node: Text) {
  const parent = node.parentElement
  if (!parent || parent.closest("[data-sensitive-reveal], input, textarea, select, option, script, style")) {
    return false
  }

  MASKED_NUMBER.lastIndex = 0
  return MASKED_NUMBER.test(node.nodeValue ?? "")
}

function maskNumbers(node: Text) {
  const value = node.nodeValue ?? ""
  if (!originalValues.has(node)) originalValues.set(node, value)
  node.nodeValue = value.replace(MASKED_NUMBER, (number) => number.replace(/\d/g, "•"))
}

function restoreNumbers(node: Text) {
  const original = originalValues.get(node)
  if (original !== undefined) node.nodeValue = original
}

function updateVisibleNumbers(root: HTMLElement, hidden: boolean) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) nodes.push(node as Text)

  nodes.forEach((text) => {
    if (hidden) {
      if (isMaskableTextNode(text)) maskNumbers(text)
    } else {
      restoreNumbers(text)
    }
  })
}

export function SensitiveValuesProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = React.useState(true)
  const [pinDialogOpen, setPinDialogOpen] = React.useState(false)
  const [pin, setPin] = React.useState("")
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    const root = document.querySelector("main") as HTMLElement | null
    if (!root) return

    updateVisibleNumbers(root, hidden)
    const observer = new MutationObserver(() => updateVisibleNumbers(root, hidden))
    observer.observe(root, { childList: true, characterData: true, subtree: true })
    return () => observer.disconnect()
  }, [hidden])

  const revealValues = (event: React.FormEvent) => {
    event.preventDefault()
    const configuredPin = import.meta.env.VITE_VIEW_ALL_PIN || "1234"
    if (pin !== configuredPin) {
      setError("Incorrect PIN. Please try again.")
      return
    }

    setHidden(false)
    setPin("")
    setError("")
    setPinDialogOpen(false)
  }

  const hideValues = () => setHidden(true)

  return (
    <SensitiveValuesContext.Provider value={{ hidden, reveal: () => setPinDialogOpen(true), hide: hideValues }}>
      {children}
      <Dialog open={pinDialogOpen} onOpenChange={(open) => {
        setPinDialogOpen(open)
        if (!open) {
          setPin("")
          setError("")
        }
      }}>
        <DialogContent data-sensitive-reveal className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LockKeyhole className="size-5 text-primary" />
              Reveal page values
            </DialogTitle>
            <DialogDescription>
              Enter your four-digit PIN to show numbers across this page.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={revealValues} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="view-all-pin">Four-digit PIN</Label>
              <Input
                id="view-all-pin"
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={4}
                value={pin}
                onChange={(event) => {
                  setPin(event.target.value.replace(/\D/g, ""))
                  setError("")
                }}
                placeholder="••••"
                aria-invalid={Boolean(error)}
                autoFocus
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPinDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pin.length !== 4}>Reveal values</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SensitiveValuesContext.Provider>
  )
}

export function ViewAllButton() {
  const context = React.useContext(SensitiveValuesContext)
  if (!context) throw new Error("ViewAllButton must be used within SensitiveValuesProvider")
  const { hidden, reveal, hide } = context

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={hidden ? reveal : hide}
    >
      {hidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      <span className="hidden sm:inline">{hidden ? "View all" : "Hide all"}</span>
    </Button>
  )
}
