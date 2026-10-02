"use client"

import * as React from "react"
import {
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Users,
  Banknote,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Layers,
  BadgeDollarSign,
  FileText,
} from "lucide-react"

import { BaseLayout } from "@/components/layouts/base-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Formatters ───────────────────────────────────────────────────────────────
const money = (v = 0) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(v)
const pct = (v: number) => `${v.toFixed(1)}%`

// ─── Capital Stock ────────────────────────────────────────────────────────────
const capitalStock = {
  authorized: { shares: 10_000_000, parValue: 1, total: 10_000_000 },
  subscribed:  { shares: 5_000_000,  parValue: 1, total: 5_000_000 },
  paidUp:      { shares: 5_000_000,  parValue: 1, total: 5_000_000 },
  treasury:    { shares: 0,          parValue: 1, total: 0 },
  outstanding: { shares: 5_000_000,  parValue: 1, total: 5_000_000 },
}

// ─── Stockholders ─────────────────────────────────────────────────────────────
const stockholders = [
  { name: "Renato M. Santos", role: "President & CEO", shares: 2_500_000, pctOwned: 50.0, type: "Common" },
  { name: "Maria Luz A. Santos", role: "Corporate Treasurer", shares: 1_250_000, pctOwned: 25.0, type: "Common" },
  { name: "Jose P. Reyes", role: "Corporate Secretary / Director", shares: 750_000, pctOwned: 15.0, type: "Common" },
  { name: "PMS Employees ESOP Trust", role: "Employee Stock Ownership Plan", shares: 500_000, pctOwned: 10.0, type: "Common" },
]

// ─── Retained Earnings Movement ──────────────────────────────────────────────
type REType = "net-income" | "dividend" | "prior-adjustment" | "other"

interface REEntry {
  id: string
  date: string
  description: string
  type: REType
  amount: number
  runningBalance: number
}

const initialRELedger: REEntry[] = [
  { id: "RE-001", date: "2024-01-01", description: "Beginning Balance — CY2024",                          type: "prior-adjustment", amount: 820_000,   runningBalance: 820_000  },
  { id: "RE-002", date: "2024-12-31", description: "Net Income — CY2024",                                 type: "net-income",       amount: 1_240_000, runningBalance: 2_060_000 },
  { id: "RE-003", date: "2024-12-31", description: "Cash Dividends Declared — CY2024",                    type: "dividend",         amount: -415_000,  runningBalance: 1_645_000 },
  { id: "RE-004", date: "2025-06-30", description: "Net Income — H1 CY2025",                              type: "net-income",       amount: 780_000,   runningBalance: 2_425_000 },
  { id: "RE-005", date: "2025-09-15", description: "Prior Period Adjustment — BIR Tax Settlement CY2023", type: "prior-adjustment", amount: -55_000,   runningBalance: 2_370_000 },
  { id: "RE-006", date: "2025-12-31", description: "Net Income — H2 CY2025",                              type: "net-income",       amount: 830_000,   runningBalance: 3_200_000 },
  { id: "RE-007", date: "2025-12-31", description: "Cash Dividends Declared — CY2025",                    type: "dividend",         amount: -500_000,  runningBalance: 2_700_000 },
  { id: "RE-008", date: "2026-01-01", description: "Beginning Balance — CY2026 (carried forward)",        type: "prior-adjustment", amount: 0,         runningBalance: 2_700_000 },
  { id: "RE-009", date: "2026-06-30", description: "Net Income — H1 CY2026",                              type: "net-income",       amount: 960_000,   runningBalance: 3_660_000 },
  { id: "RE-010", date: "2026-09-26", description: "Net Income YTD — Q3 CY2026 (partial)",                type: "net-income",       amount: 450_000,   runningBalance: 4_110_000 },
]

// ─── Statement of Changes in Equity (CY2026) ─────────────────────────────────
const changeStatement = [
  { label: "Opening Balance — Jan 1, 2026",         capitalStock: 5_000_000, additionalPaidIn: 200_000, retainedEarnings: 2_700_000, total: 7_900_000,  direction: null },
  { label: "Net Income — H1 CY2026",                capitalStock: 0,         additionalPaidIn: 0,         retainedEarnings: 960_000,   total: 960_000,    direction: "up" },
  { label: "Net Income — Q3 CY2026 (YTD partial)",  capitalStock: 0,         additionalPaidIn: 0,         retainedEarnings: 450_000,   total: 450_000,    direction: "up" },
  { label: "Dividends Declared — Interim CY2026",   capitalStock: 0,         additionalPaidIn: 0,         retainedEarnings: -250_000,  total: -250_000,   direction: "down" },
  { label: "Closing Balance — Sep 26, 2026",        capitalStock: 5_000_000, additionalPaidIn: 200_000,   retainedEarnings: 3_860_000, total: 9_060_000,  direction: null },
]

// ─── Dividend History ─────────────────────────────────────────────────────────
const dividendHistory = [
  { year: "CY2022", declared: 280_000, perShare: 0.056, date: "Dec 28, 2022", status: "paid" },
  { year: "CY2023", declared: 350_000, perShare: 0.070, date: "Dec 30, 2023", status: "paid" },
  { year: "CY2024", declared: 415_000, perShare: 0.083, date: "Dec 31, 2024", status: "paid" },
  { year: "CY2025", declared: 500_000, perShare: 0.100, date: "Dec 31, 2025", status: "paid" },
  { year: "CY2026 (Interim)", declared: 250_000, perShare: 0.050, date: "Sep 15, 2026", status: "paid" },
  { year: "CY2026 (Final)", declared: null, perShare: null, date: "Dec 31, 2026", status: "projected" },
]

// ─── Type meta ────────────────────────────────────────────────────────────────
const reMeta: Record<REType, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "net-income":      { label: "Net Income",        variant: "default"     },
  "dividend":        { label: "Dividend",          variant: "destructive" },
  "prior-adjustment":{ label: "Adjustment",        variant: "secondary"   },
  "other":           { label: "Other",             variant: "outline"     },
}

const EMPTY_FORM = {
  date: "", description: "", type: "net-income" as REType, amount: "",
}

// ─── Derived totals ───────────────────────────────────────────────────────────
const totalRetainedEarnings = initialRELedger[initialRELedger.length - 1].runningBalance
const additionalPaidIn = 200_000
const totalEquity = capitalStock.paidUp.total + additionalPaidIn + totalRetainedEarnings
const bookValuePerShare = totalEquity / capitalStock.outstanding.shares

export default function EquityPage() {
  const [reLedger, setRELedger] = React.useState<REEntry[]>(initialRELedger)
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState(EMPTY_FORM)

  const currentRE = reLedger[reLedger.length - 1].runningBalance
  const currentEquity = capitalStock.paidUp.total + additionalPaidIn + currentRE

  const handleAdd = () => {
    if (!form.date || !form.description || !form.amount) return
    const amt = parseFloat(form.amount)
    const adjusted = form.type === "dividend" ? -Math.abs(amt) : amt
    const prev = reLedger[reLedger.length - 1].runningBalance
    const newId = `RE-${String(reLedger.length + 1).padStart(3, "0")}`
    setRELedger(prev_ => [
      ...prev_,
      {
        id: newId,
        date: form.date,
        description: form.description,
        type: form.type,
        amount: adjusted,
        runningBalance: prev + adjusted,
      },
    ])
    setForm(EMPTY_FORM)
    setOpen(false)
  }

  return (
    <BaseLayout
      title="Equity"
      description="Stockholders equity, retained earnings, capital structure, and dividend history for PMS Prime Power."
    >
      {/* ─── Header Action ────────────────────────────────────────────────── */}
      <div className="flex justify-end px-4 lg:px-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Record Equity Movement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record Equity Movement</DialogTitle>
              <DialogDescription>
                Add a retained earnings entry — net income, dividend, or prior-period adjustment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="eq-desc">Description</Label>
                <Input id="eq-desc" placeholder="e.g. Net Income — Q4 CY2026" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="eq-type">Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as REType }))}>
                    <SelectTrigger id="eq-type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net-income">Net Income</SelectItem>
                      <SelectItem value="dividend">Dividend</SelectItem>
                      <SelectItem value="prior-adjustment">Prior-Period Adjustment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eq-date">Date</Label>
                  <Input id="eq-date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eq-amount">Amount (PHP)</Label>
                <Input id="eq-amount" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
                {form.type === "dividend" && (
                  <p className="text-xs text-muted-foreground">Dividends will be recorded as a deduction automatically.</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setForm(EMPTY_FORM); setOpen(false) }}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!form.date || !form.description || !form.amount}>Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── KPI Cards ──────────────────────────────────────────────────────── */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stockholders Equity</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{money(currentEquity)}</div>
            <p className="text-xs text-muted-foreground">As of Sep 26, 2026</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid-Up Capital</CardTitle>
            <Banknote className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold">{money(capitalStock.paidUp.total + additionalPaidIn)}</div>
            <p className="text-xs text-muted-foreground">{capitalStock.paidUp.shares.toLocaleString()} shares @ ₱{capitalStock.paidUp.parValue} par</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retained Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold">{money(currentRE)}</div>
            <p className="text-xs text-muted-foreground">{pct((currentRE / currentEquity) * 100)} of total equity</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Book Value Per Share</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold">₱{bookValuePerShare.toFixed(4)}</div>
            <p className="text-xs text-muted-foreground">{capitalStock.outstanding.shares.toLocaleString()} shares outstanding</p>
          </CardContent>
        </Card>
      </section>

      {/* ─── Capital Structure Cards ─────────────────────────────────────────── */}
      <section className="grid gap-4 md:grid-cols-3 px-4 lg:px-6">
        {/* Capital Stock Breakdown */}
        <Card className="bg-blue-50 dark:bg-blue-950/40 border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-sm font-semibold">Capital Stock</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { label: "Authorized",   shares: capitalStock.authorized.shares,   total: capitalStock.authorized.total },
              { label: "Subscribed",   shares: capitalStock.subscribed.shares,   total: capitalStock.subscribed.total },
              { label: "Paid-Up",      shares: capitalStock.paidUp.shares,       total: capitalStock.paidUp.total },
              { label: "Treasury",     shares: capitalStock.treasury.shares,     total: capitalStock.treasury.total },
              { label: "Outstanding",  shares: capitalStock.outstanding.shares,  total: capitalStock.outstanding.total },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <div className="text-right">
                  <div data-sensitive className="font-medium">{money(row.total)}</div>
                  <div className="text-xs text-muted-foreground">{row.shares.toLocaleString()} shares</div>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t text-xs text-muted-foreground">Par Value: ₱1.00 per share</div>
          </CardContent>
        </Card>

        {/* Equity Composition */}
        <Card className="bg-emerald-50 dark:bg-emerald-950/40 border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-sm font-semibold">Equity Composition</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Capital Stock",           amount: capitalStock.paidUp.total, color: "bg-blue-500" },
              { label: "Additional Paid-In Capital", amount: additionalPaidIn,       color: "bg-indigo-500" },
              { label: "Retained Earnings",        amount: currentRE,                color: "bg-violet-500" },
            ].map(item => {
              const share = (item.amount / currentEquity) * 100
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span data-sensitive className="font-medium">{money(item.amount)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${share}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">{pct(share)}</span>
                  </div>
                </div>
              )
            })}
            <div className="pt-2 border-t flex justify-between text-sm font-semibold">
              <span>Total Equity</span>
              <span data-sensitive className="text-emerald-600">{money(currentEquity)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Stockholder Summary */}
        <Card className="bg-violet-50 dark:bg-violet-950/40 border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-violet-600" />
              <CardTitle className="text-sm font-semibold">Stockholders</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {stockholders.map(s => (
              <div key={s.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="font-medium leading-tight">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.role}</div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <div className="font-semibold text-violet-600">{pct(s.pctOwned)}</div>
                    <div className="text-xs text-muted-foreground">{s.shares.toLocaleString()} shs</div>
                  </div>
                </div>
                <Progress value={s.pctOwned} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ─── Tabs ─────────────────────────────────────────────────────────────── */}
      <div className="px-4 lg:px-6 pb-6">
        <Tabs defaultValue="changes" className="space-y-4">
          <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="changes">Statement of Changes in Equity</TabsTrigger>
            <TabsTrigger value="retained">Retained Earnings Ledger</TabsTrigger>
            <TabsTrigger value="stockholders">Stockholders Register</TabsTrigger>
            <TabsTrigger value="dividends">Dividend History</TabsTrigger>
          </TabsList>

          {/* ── Statement of Changes in Equity ────────────────────────────── */}
          <TabsContent value="changes">
            <Card>
              <CardHeader>
                <CardTitle>Statement of Changes in Equity — CY2026</CardTitle>
                <CardDescription>
                  Movement in Capital Stock, Additional Paid-In Capital, and Retained Earnings for PMS Prime Power.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[35%]">Description</TableHead>
                      <TableHead className="text-right">Capital Stock</TableHead>
                      <TableHead className="text-right">Add. Paid-In Capital</TableHead>
                      <TableHead className="text-right">Retained Earnings</TableHead>
                      <TableHead className="text-right">Total Equity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {changeStatement.map((row, i) => {
                      const isOpening = i === 0
                      const isClosing = i === changeStatement.length - 1
                      const isBold = isOpening || isClosing
                      return (
                        <TableRow key={i} className={isBold ? "bg-muted/40 font-semibold" : ""}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {row.direction === "up" && <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                              {row.direction === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-rose-500 shrink-0" />}
                              {!row.direction && <span className="w-3.5 shrink-0" />}
                              {row.label}
                            </div>
                          </TableCell>
                          <TableCell data-sensitive className="text-right">{row.capitalStock !== 0 ? money(row.capitalStock) : "—"}</TableCell>
                          <TableCell data-sensitive className="text-right">{row.additionalPaidIn !== 0 ? money(row.additionalPaidIn) : "—"}</TableCell>
                          <TableCell className={`text-right ${row.retainedEarnings < 0 ? "text-rose-600 dark:text-rose-400" : row.retainedEarnings > 0 && !isBold ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            <span data-sensitive>{row.retainedEarnings !== 0 ? money(Math.abs(row.retainedEarnings)) : "—"}</span>
                            {row.retainedEarnings < 0 && " (D)"}
                          </TableCell>
                          <TableCell className={`text-right font-bold ${row.total < 0 ? "text-rose-600" : isClosing ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            <span data-sensitive>{row.total < 0 ? `(${money(Math.abs(row.total))})` : money(row.total)}</span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Retained Earnings Ledger ───────────────────────────────────── */}
          <TabsContent value="retained">
            <Card>
              <CardHeader>
                <CardTitle>Retained Earnings Ledger — CY2024 to CY2026</CardTitle>
                <CardDescription>
                  Running ledger of net income, dividend declarations, and prior-period adjustments.
                  Current balance: <span className="font-semibold text-violet-600">{money(currentRE)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ref</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Running Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reLedger.map((entry) => (
                      <TableRow key={entry.id} className="text-sm">
                        <TableCell className="font-mono text-xs text-muted-foreground">{entry.id}</TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">{entry.date}</TableCell>
                        <TableCell className="font-medium">{entry.description}</TableCell>
                        <TableCell>
                          <Badge variant={reMeta[entry.type].variant}>{reMeta[entry.type].label}</Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${entry.amount < 0 ? "text-rose-600 dark:text-rose-400" : entry.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                          {entry.amount === 0 ? "—" : <span data-sensitive>{entry.amount > 0 ? money(entry.amount) : `(${money(Math.abs(entry.amount))})`}</span>}
                        </TableCell>
                        <TableCell data-sensitive className="text-right font-semibold">{money(entry.runningBalance)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Stockholders Register ─────────────────────────────────────── */}
          <TabsContent value="stockholders">
            <Card>
              <CardHeader>
                <CardTitle>Stockholders Register — PMS Prime Power Corp.</CardTitle>
                <CardDescription>
                  Registered stockholders as of September 26, 2026. Total outstanding shares: {capitalStock.outstanding.shares.toLocaleString()}.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role / Designation</TableHead>
                      <TableHead>Stock Type</TableHead>
                      <TableHead className="text-right">Shares Held</TableHead>
                      <TableHead className="text-right">% Ownership</TableHead>
                      <TableHead className="text-right">Equity Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockholders.map((s, i) => (
                      <TableRow key={s.name} className="text-sm">
                        <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="text-muted-foreground">{s.role}</TableCell>
                        <TableCell><Badge variant="outline">{s.type}</Badge></TableCell>
                        <TableCell className="text-right tabular-nums">{s.shares.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold text-violet-600">{pct(s.pctOwned)}</TableCell>
                        <TableCell data-sensitive className="text-right">{money((s.pctOwned / 100) * currentEquity)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell colSpan={4} className="text-right">Total</TableCell>
                      <TableCell className="text-right tabular-nums">{capitalStock.outstanding.shares.toLocaleString()}</TableCell>
                      <TableCell className="text-right">100.0%</TableCell>
                      <TableCell data-sensitive className="text-right text-emerald-600">{money(currentEquity)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Dividend History ───────────────────────────────────────────── */}
          <TabsContent value="dividends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-600" />
                  Dividend History — PMS Prime Power
                </CardTitle>
                <CardDescription>
                  Cash dividends declared to stockholders. All amounts in Philippine Peso.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Total Declared</TableHead>
                      <TableHead className="text-right">Per Share (₱)</TableHead>
                      <TableHead>Declaration Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dividendHistory.map((d) => (
                      <TableRow key={d.year} className="text-sm">
                        <TableCell className="font-medium">{d.year}</TableCell>
                        <TableCell className="text-right">
                          {d.declared != null ? <span data-sensitive>{money(d.declared)}</span> : <span className="text-muted-foreground italic">TBD</span>}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {d.perShare != null ? `₱${d.perShare.toFixed(3)}` : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{d.date}</TableCell>
                        <TableCell>
                          <Badge variant={d.status === "paid" ? "default" : "secondary"}>
                            {d.status === "paid" ? "Paid" : "Projected"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell>Total Dividends Paid (CY2022–2026)</TableCell>
                      <TableCell className="text-right">
                        <span data-sensitive>{money(dividendHistory.filter(d => d.status === "paid" && d.declared).reduce((s, d) => s + (d.declared ?? 0), 0))}</span>
                      </TableCell>
                      <TableCell colSpan={3} />
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseLayout>
  )
}
