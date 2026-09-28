"use client"

import * as React from "react"
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Landmark,
  ShieldCheck,
  Receipt,
  CreditCard,
  Building,
  FileWarning,
  Plus,
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

// ─── Types ────────────────────────────────────────────────────────────────────
type LiabilityStatus = "current" | "overdue" | "paid" | "upcoming"
type LiabilityClass = "current" | "non-current"

interface LiabilityEntry {
  id: string
  name: string
  category: string
  class: LiabilityClass
  creditor: string
  amount: number
  amountPaid: number
  dueDate: string
  status: LiabilityStatus
  branch: string
  notes: string
}

// ─── Liability Categories ─────────────────────────────────────────────────────
const liabilityCategories = [
  {
    label: "Accounts Payable",
    icon: Receipt,
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    total: 485_000,
    items: ["Vendor Billings — Supplies & Materials", "Subcontractor Payables", "Utilities Payables", "Rental Payables"],
  },
  {
    label: "Statutory Obligations",
    icon: ShieldCheck,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    total: 325_900,
    items: ["SSS Payable", "PhilHealth Payable", "Pag-IBIG Payable", "EWT Payable (BIR)", "Output VAT Payable"],
  },
  {
    label: "Accrued Liabilities",
    icon: Clock,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    total: 610_000,
    items: ["Accrued Salaries & Wages", "Accrued 13th Month Pay", "Accrued Bonuses", "Accrued Service Leave"],
  },
  {
    label: "Long-Term Loans",
    icon: Landmark,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    total: 1_250_000,
    items: ["Vehicle Financing (BDO)", "Equipment Loan (Metrobank)", "Working Capital Line (BPI)", "MSME Loan"],
  },
]

// ─── Statutory Payables (BIR / DOLE compliance) ───────────────────────────────
const statutoryPayables = [
  { label: "SSS Payable", employer: 85_500, employee: 45_000, total: 130_500, due: "10th of the month", form: "R-3", status: "current" as LiabilityStatus },
  { label: "PhilHealth Payable", employer: 31_200, employee: 31_200, total: 62_400, due: "10th of the month", form: "RF-1", status: "current" as LiabilityStatus },
  { label: "Pag-IBIG Payable", employer: 12_000, employee: 12_000, total: 24_000, due: "10th of the month", form: "MCRF", status: "current" as LiabilityStatus },
  { label: "EWT Payable (2%)", employer: 75_000, employee: 0, total: 75_000, due: "10th of the month", form: "BIR 1601-E", status: "overdue" as LiabilityStatus },
  { label: "Output VAT Payable", employer: 450_000, employee: 0, total: 450_000, due: "20th of the month", form: "BIR 2550M", status: "current" as LiabilityStatus },
]

// ─── Liability Register ───────────────────────────────────────────────────────
const initialRegister: LiabilityEntry[] = [
  { id: "LBL-001", name: "Vendor Payable — ABC Electrical Supplies", category: "Accounts Payable", class: "current", creditor: "ABC Electrical Supplies Corp.", amount: 180_000, amountPaid: 0, dueDate: "2026-10-05", status: "current", branch: "Makati HQ", notes: "Net 30 terms; PO #2026-089" },
  { id: "LBL-002", name: "Rental Payable — Makati Office", category: "Accounts Payable", class: "current", creditor: "Ayala Land Premier", amount: 85_000, amountPaid: 85_000, dueDate: "2026-09-30", status: "paid", branch: "Makati HQ", notes: "Monthly lease; auto-debit" },
  { id: "LBL-003", name: "Subcontractor Payable — XYZ Manpower", category: "Accounts Payable", class: "current", creditor: "XYZ Manpower Services", amount: 220_000, amountPaid: 110_000, dueDate: "2026-09-28", status: "overdue", branch: "Cebu Regional", notes: "50% partial payment released" },
  { id: "LBL-004", name: "SSS Employer Contribution — Sep 2026", category: "Statutory Obligations", class: "current", creditor: "Social Security System", amount: 130_500, amountPaid: 0, dueDate: "2026-10-10", status: "upcoming", branch: "All Branches", notes: "Employer + Employee share; R-3 form" },
  { id: "LBL-005", name: "PhilHealth Contribution — Sep 2026", category: "Statutory Obligations", class: "current", creditor: "PhilHealth", amount: 62_400, amountPaid: 0, dueDate: "2026-10-10", status: "upcoming", branch: "All Branches", notes: "RF-1 filing" },
  { id: "LBL-006", name: "Pag-IBIG Fund — Sep 2026", category: "Statutory Obligations", class: "current", creditor: "Pag-IBIG Fund (HDMF)", amount: 24_000, amountPaid: 0, dueDate: "2026-10-10", status: "upcoming", branch: "All Branches", notes: "MCRF form submission" },
  { id: "LBL-007", name: "EWT Payable — Aug 2026 (BIR)", category: "Statutory Obligations", class: "current", creditor: "Bureau of Internal Revenue", amount: 75_000, amountPaid: 0, dueDate: "2026-09-10", status: "overdue", branch: "Makati HQ", notes: "BIR 1601-E; OVERDUE — prioritize!" },
  { id: "LBL-008", name: "Output VAT — Aug 2026", category: "Statutory Obligations", class: "current", creditor: "Bureau of Internal Revenue", amount: 450_000, amountPaid: 450_000, dueDate: "2026-09-20", status: "paid", branch: "All Branches", notes: "BIR 2550M filed and paid" },
  { id: "LBL-009", name: "Accrued Salaries — Sep 2026", category: "Accrued Liabilities", class: "current", creditor: "PMS Employees (All)", amount: 480_000, amountPaid: 480_000, dueDate: "2026-09-15", status: "paid", branch: "All Branches", notes: "Semi-monthly payroll released" },
  { id: "LBL-010", name: "Accrued 13th Month Pay — CY2026", category: "Accrued Liabilities", class: "current", creditor: "PMS Employees (All)", amount: 130_000, amountPaid: 0, dueDate: "2026-12-24", status: "upcoming", branch: "All Branches", notes: "Accruing monthly; due Dec 24" },
  { id: "LBL-011", name: "Vehicle Loan — Toyota HiAce (BDO)", category: "Long-Term Loans", class: "non-current", creditor: "BDO Unibank Inc.", amount: 380_000, amountPaid: 114_000, dueDate: "2028-07-20", status: "current", branch: "Metro Manila", notes: "36-month term; monthly amortization ₱12,667" },
  { id: "LBL-012", name: "Equipment Loan — Generator 500KVA (Metrobank)", category: "Long-Term Loans", class: "non-current", creditor: "Metropolitan Bank & Trust Co.", amount: 870_000, amountPaid: 260_000, dueDate: "2030-03-15", status: "current", branch: "Makati HQ", notes: "84-month term; monthly amortization ₱14,286" },
]

// ─── Status meta ──────────────────────────────────────────────────────────────
const statusMeta: Record<LiabilityStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
  current:    { label: "Current",   variant: "default",     color: "text-emerald-600" },
  overdue:    { label: "Overdue",   variant: "destructive", color: "text-rose-600" },
  paid:       { label: "Paid",      variant: "outline",     color: "text-muted-foreground" },
  upcoming:   { label: "Upcoming",  variant: "secondary",   color: "text-amber-600" },
}

// ─── Aging buckets ────────────────────────────────────────────────────────────
const agingBuckets = [
  { label: "0–30 days", amount: 485_000, color: "bg-emerald-500" },
  { label: "31–60 days", amount: 220_000, color: "bg-amber-500" },
  { label: "61–90 days", amount: 75_000, color: "bg-orange-500" },
  { label: "90+ days", amount: 0, color: "bg-rose-600" },
]

const EMPTY_FORM = {
  name: "", category: "Accounts Payable", class: "current" as LiabilityClass,
  creditor: "", amount: "", dueDate: "", status: "current" as LiabilityStatus, branch: "Makati HQ", notes: "",
}

export default function LiabilitiesPage() {
  const [register, setRegister] = React.useState<LiabilityEntry[]>(initialRegister)
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState(EMPTY_FORM)

  // ─── Derived KPIs ─────────────────────────────────────────────────────────
  const totalLiabilities = register.reduce((s, l) => s + l.amount, 0)
  const currentLiabilities = register.filter(l => l.class === "current").reduce((s, l) => s + l.amount, 0)
  const nonCurrentLiabilities = register.filter(l => l.class === "non-current").reduce((s, l) => s + l.amount, 0)
  const overdueTotal = register.filter(l => l.status === "overdue").reduce((s, l) => s + (l.amount - l.amountPaid), 0)
  const overdueCount = register.filter(l => l.status === "overdue").length
  const paidCount = register.filter(l => l.status === "paid").length
  const upcomingCount = register.filter(l => l.status === "upcoming").length
  const totalStatutory = statutoryPayables.reduce((s, p) => s + p.total, 0)

  // ─── Add Liability ────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.name || !form.creditor || !form.amount || !form.dueDate) return
    const newId = `LBL-${String(register.length + 1).padStart(3, "0")}`
    const amt = parseFloat(form.amount)
    setRegister(prev => [
      ...prev,
      {
        id: newId,
        name: form.name,
        category: form.category,
        class: form.class,
        creditor: form.creditor,
        amount: amt,
        amountPaid: 0,
        dueDate: form.dueDate,
        status: form.status,
        branch: form.branch,
        notes: form.notes,
      },
    ])
    setForm(EMPTY_FORM)
    setOpen(false)
  }

  return (
    <BaseLayout
      title="Liabilities"
      description="Payables, statutory obligations, accrued liabilities, and long-term loans for PMS Prime Power."
    >
      {/* ─── Header Actions ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            <span className="font-medium text-rose-600">{overdueCount}</span>
            <span className="text-muted-foreground">Overdue</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="font-medium">{upcomingCount}</span>
            <span className="text-muted-foreground">Upcoming</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="font-medium">{paidCount}</span>
            <span className="text-muted-foreground">Paid</span>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Liability
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>Add New Liability</DialogTitle>
              <DialogDescription>
                Record a new payable, obligation, or loan for PMS Prime Power.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="liab-name">Liability Name</Label>
                <Input id="liab-name" placeholder="e.g. Vendor Payable — XYZ Supplies" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="liab-category">Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger id="liab-category"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accounts Payable">Accounts Payable</SelectItem>
                      <SelectItem value="Statutory Obligations">Statutory Obligations</SelectItem>
                      <SelectItem value="Accrued Liabilities">Accrued Liabilities</SelectItem>
                      <SelectItem value="Long-Term Loans">Long-Term Loans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="liab-class">Classification</Label>
                  <Select value={form.class} onValueChange={v => setForm(f => ({ ...f, class: v as LiabilityClass }))}>
                    <SelectTrigger id="liab-class"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="non-current">Non-Current</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="liab-creditor">Creditor / Payee</Label>
                <Input id="liab-creditor" placeholder="e.g. BDO Unibank Inc." value={form.creditor} onChange={e => setForm(f => ({ ...f, creditor: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="liab-amount">Amount (PHP)</Label>
                  <Input id="liab-amount" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="liab-due">Due Date</Label>
                  <Input id="liab-due" type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="liab-status">Status</Label>
                  <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as LiabilityStatus }))}>
                    <SelectTrigger id="liab-status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="liab-branch">Branch</Label>
                  <Select value={form.branch} onValueChange={v => setForm(f => ({ ...f, branch: v }))}>
                    <SelectTrigger id="liab-branch"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Makati HQ">Makati HQ</SelectItem>
                      <SelectItem value="Cebu Regional">Cebu Regional</SelectItem>
                      <SelectItem value="Davao Site">Davao Site</SelectItem>
                      <SelectItem value="All Branches">All Branches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="liab-notes">Notes</Label>
                <Input id="liab-notes" placeholder="Optional notes or reference number" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setForm(EMPTY_FORM); setOpen(false) }}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!form.name || !form.creditor || !form.amount || !form.dueDate}>
                Add Liability
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── KPI Cards ──────────────────────────────────────────────────────── */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
        <Card className="border-l-4 border-l-rose-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <Scale className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{money(totalLiabilities)}</div>
            <p className="text-xs text-muted-foreground">{register.length} recorded obligations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Liabilities</CardTitle>
            <CreditCard className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{money(currentLiabilities)}</div>
            <p className="text-xs text-muted-foreground">Due within 12 months</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Current Liabilities</CardTitle>
            <Landmark className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{money(nonCurrentLiabilities)}</div>
            <p className="text-xs text-muted-foreground">Long-term obligations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Balance</CardTitle>
            <FileWarning className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{money(overdueTotal)}</div>
            <p className="text-xs text-muted-foreground">{overdueCount} overdue item{overdueCount !== 1 ? "s" : ""} — requires action</p>
          </CardContent>
        </Card>
      </section>

      {/* ─── Category Cards ──────────────────────────────────────────────────── */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
        {liabilityCategories.map((cat) => {
          const grandTotal = liabilityCategories.reduce((s, c) => s + c.total, 0)
          const catPct = (cat.total / grandTotal) * 100
          return (
            <Card key={cat.label} className={`${cat.bg} border-0`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  <CardTitle className="text-sm font-semibold">{cat.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className={`font-bold ${cat.color}`}>{money(cat.total)}</span>
                </div>
                <Progress value={catPct} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{pct(catPct)} of total liabilities</p>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* ─── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="px-4 lg:px-6 pb-6">
        <Tabs defaultValue="register" className="space-y-4">
          <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="register">Liability Register</TabsTrigger>
            <TabsTrigger value="statutory">Statutory Compliance</TabsTrigger>
            <TabsTrigger value="aging">AP Aging</TabsTrigger>
          </TabsList>

          {/* ── Liability Register ─────────────────────────────────────────── */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Liability Register — PMS Prime Power</CardTitle>
                <CardDescription>
                  All payables, obligations, and loans across Makati HQ, Cebu, and Davao.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[90px]">ID</TableHead>
                        <TableHead>Liability</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Creditor</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Paid</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {register.map((liab) => {
                        const balance = liab.amount - liab.amountPaid
                        return (
                          <TableRow key={liab.id} className={`text-sm ${liab.status === "overdue" ? "bg-rose-50/50 dark:bg-rose-950/10" : ""}`}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{liab.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{liab.name}</div>
                              {liab.notes && <div className="text-xs text-muted-foreground mt-0.5 max-w-[220px] truncate">{liab.notes}</div>}
                            </TableCell>
                            <TableCell className="text-muted-foreground whitespace-nowrap">{liab.category}</TableCell>
                            <TableCell className="text-muted-foreground">{liab.creditor}</TableCell>
                            <TableCell className="text-muted-foreground whitespace-nowrap">{liab.branch}</TableCell>
                            <TableCell className="text-right">{money(liab.amount)}</TableCell>
                            <TableCell className="text-right text-emerald-600 dark:text-emerald-400">
                              {liab.amountPaid > 0 ? money(liab.amountPaid) : "—"}
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${balance > 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                              {balance > 0 ? money(balance) : "—"}
                            </TableCell>
                            <TableCell className="text-muted-foreground whitespace-nowrap">{liab.dueDate}</TableCell>
                            <TableCell>
                              <Badge variant={statusMeta[liab.status].variant}>{statusMeta[liab.status].label}</Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Statutory Compliance ───────────────────────────────────────── */}
          <TabsContent value="statutory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  Statutory Compliance Tracker
                </CardTitle>
                <CardDescription>
                  Monthly government-mandated contributions and tax remittances. Total: {money(totalStatutory)}.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Obligation</TableHead>
                      <TableHead>BIR / Gov't Form</TableHead>
                      <TableHead className="text-right">Employer Share</TableHead>
                      <TableHead className="text-right">Employee Share</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statutoryPayables.map((pay) => (
                      <TableRow key={pay.label} className={pay.status === "overdue" ? "bg-rose-50/50 dark:bg-rose-950/10" : ""}>
                        <TableCell className="font-medium">{pay.label}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">{pay.form}</TableCell>
                        <TableCell className="text-right">{pay.employer > 0 ? money(pay.employer) : "—"}</TableCell>
                        <TableCell className="text-right">{pay.employee > 0 ? money(pay.employee) : "—"}</TableCell>
                        <TableCell className="text-right font-semibold">{money(pay.total)}</TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">{pay.due}</TableCell>
                        <TableCell>
                          <Badge variant={statusMeta[pay.status].variant}>{statusMeta[pay.status].label}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell colSpan={4} className="text-right">Total Statutory Obligations</TableCell>
                      <TableCell className="text-right">{money(totalStatutory)}</TableCell>
                      <TableCell colSpan={2} />
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── AP Aging ───────────────────────────────────────────────────── */}
          <TabsContent value="aging">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-violet-600" />
                  Accounts Payable Aging Summary
                </CardTitle>
                <CardDescription>
                  Aging of outstanding payables by days past due — PMS Prime Power (Sep 2026).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {agingBuckets.map((bucket) => {
                  const totalAging = agingBuckets.reduce((s, b) => s + b.amount, 0)
                  const bucketPct = totalAging > 0 ? (bucket.amount / totalAging) * 100 : 0
                  return (
                    <div key={bucket.label} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{bucket.label}</span>
                        <span className="tabular-nums">{money(bucket.amount)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 overflow-hidden rounded-full bg-muted h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${bucket.color}`}
                            style={{ width: `${bucketPct}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-xs text-muted-foreground tabular-nums">
                          {pct(bucketPct)}
                        </span>
                      </div>
                    </div>
                  )
                })}

                <div className="mt-6 rounded-lg border p-4 bg-muted/30">
                  <p className="text-sm font-semibold mb-3">Branch Payable Summary</p>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    {[
                      { branch: "Makati HQ", amount: 315_000 },
                      { branch: "Cebu Regional", amount: 220_000 },
                      { branch: "Davao Site", amount: 0 },
                    ].map(b => (
                      <div key={b.branch} className="rounded-lg border bg-card p-3">
                        <div className="text-xs text-muted-foreground">{b.branch}</div>
                        <div className={`text-lg font-bold mt-1 ${b.amount > 0 ? "" : "text-muted-foreground"}`}>
                          {b.amount > 0 ? money(b.amount) : "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseLayout>
  )
}
