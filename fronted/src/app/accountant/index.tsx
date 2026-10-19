"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { AccountantLayout } from "@/components/layouts/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  Building2,
  Scale,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Receipt,
  FileText,
  FileSpreadsheet,
  Users,
  BadgeDollarSign,
  HandCoins,
  ArrowRightLeft,
  Banknote,
  Wallet,
  Landmark,
  BarChart3,
  CirclePercent,
  FileCheck,
  CalendarCheck,
  UserCircle,
  ShieldAlert,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Download,
  Printer,
  ExternalLink,
  Info,
  Check,
  X,
  RefreshCw,
  Search,
} from "lucide-react"

// ─── Currency Formatter ──────────────────────────────────────────────────────
const formatPHP = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value)

// ─── Monthly Chart Data ─────────────────────────────────────────────────────
const monthlyLedgerData = [
  { month: "May", collections: 14_850_000, disbursements: 11_620_000, netMargin: 3_230_000 },
  { month: "Jun", collections: 16_120_000, disbursements: 12_480_000, netMargin: 3_640_000 },
  { month: "Jul", collections: 15_960_000, disbursements: 11_920_000, netMargin: 4_040_000 },
  { month: "Aug", collections: 17_430_000, disbursements: 13_150_000, netMargin: 4_280_000 },
  { month: "Sep", collections: 18_200_000, disbursements: 13_890_000, netMargin: 4_310_000 },
  { month: "Oct (Proj)", collections: 19_100_000, disbursements: 14_250_000, netMargin: 4_850_000 },
]

export default function AccountantPage() {
  const location = useLocation()

  // Handle smooth scroll on hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [location.hash])

  // Modals & form state
  const [sodDialogOpen, setSodDialogOpen] = useState(false)
  const [newJournalOpen, setNewJournalOpen] = useState(false)
  const [newVoucherOpen, setNewVoucherOpen] = useState(false)
  const [newInvoiceOpen, setNewInvoiceOpen] = useState(false)
  const [reconModalOpen, setReconModalOpen] = useState(false)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  // Journal Entry form state
  const [journalRef, setJournalRef] = useState("JE-2026-1048")
  const [journalAccount, setJournalAccount] = useState("5100 - Plant Maintenance OpEx")
  const [journalDebit, setJournalDebit] = useState("185000")
  const [journalCredit, setJournalCredit] = useState("185000")
  const [journalDesc, setJournalDesc] = useState("Turbine overhaul periodic accrual")

  // Voucher form state
  const [voucherPayee, setVoucherPayee] = useState("Shell Philippines Corp")
  const [voucherAmount, setVoucherAmount] = useState("485000")
  const [voucherDesc, setVoucherDesc] = useState("Oct 2026 industrial diesel delivery batch #3")

  // Period Close checklist items state
  const [closeChecklist, setCloseChecklist] = useState([
    { id: 1, task: "Accounts Payable sub-ledger cut-off & vendor statements verified", done: true, area: "AP" },
    { id: 2, task: "Accounts Receivable sub-ledger cut-off & revenue accruals finalized", done: true, area: "AR" },
    { id: 3, task: "Bank reconciliations completed across all 3 depository accounts", done: true, area: "Cash" },
    { id: 4, task: "Fixed assets depreciation & amortization schedules run & posted", done: true, area: "Assets" },
    { id: 5, task: "Prepaid expenses and deferred revenue amortization entries recorded", done: true, area: "Ledgers" },
    { id: 6, task: "Clearing accounts (Payroll clearing & cash in transit) reconciled to zero", done: true, area: "Recon" },
    { id: 7, task: "Trial Balance total debits equal credits verification (Zero variance)", done: false, area: "GL" },
    { id: 8, task: "Preliminary financial statements exported for Controller formal approval", done: false, area: "Close" },
  ])

  const toggleChecklist = (id: number) => {
    setCloseChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  const completedCount = closeChecklist.filter((c) => c.done).length
  const progressPercent = Math.round((completedCount / closeChecklist.length) * 100)

  const showNotification = (msg: string) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(null), 4000)
  }

  const handlePostJournal = (e: React.FormEvent) => {
    e.preventDefault()
    if (Number(journalDebit) !== Number(journalCredit)) {
      alert("Debits must equal Credits for a valid double-entry posting.")
      return
    }
    setNewJournalOpen(false)
    showNotification(`Journal ${journalRef} prepared! Sent to Controller for review (Maker-Checker enforced).`)
  }

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault()
    setNewVoucherOpen(false)
    showNotification(`Payment Voucher for ${voucherPayee} (${formatPHP(Number(voucherAmount))}) prepared and submitted to Controller/CFO for approval.`)
  }

  return (
    <AccountantLayout>
      <div className="flex-1 space-y-8 px-4 lg:px-8 pt-2 pb-12">
        {/* Floating Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            <CheckCircle2 className="size-5 shrink-0" />
            <span className="text-sm font-medium">{successToast}</span>
          </div>
        )}

        {/* ─── Hero Header ──────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-background to-blue-500/10 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-semibold px-2.5 py-0.5">
                  <ShieldCheck className="size-3.5 mr-1 inline text-indigo-600 dark:text-indigo-400" />
                  Accountant Access Plan Active
                </Badge>
                <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 font-medium">
                  Operational Ledger Authority
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Period: October 2026 (Open)
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Accountant Command & Ledger Center
              </h1>
              <p className="max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
                Full working access to core accounting records, journal entries, AP/AR operations, reconciliations, and financial reporting—strictly governed under Segregation of Duties (SOD) safeguards.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                variant="outline"
                onClick={() => setSodDialogOpen(true)}
                className="gap-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer"
              >
                <Lock className="size-4 text-indigo-600 dark:text-indigo-400" />
                Separation Rules & Permissions
              </Button>

              <Dialog open={newJournalOpen} onOpenChange={setNewJournalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm">
                    <Plus className="size-4" />
                    Post Journal Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <form onSubmit={handlePostJournal}>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <BookMarked className="size-5 text-indigo-600" />
                        Create & Post Journal Entry
                      </DialogTitle>
                      <DialogDescription>
                        Record a balanced double-entry transaction. Maker-checker rule applies: You can prepare and post the journal, but you cannot approve your own entry.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="je-num">Journal Ref #</Label>
                          <Input id="je-num" value={journalRef} onChange={(e) => setJournalRef(e.target.value)} required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="je-date">Posting Date</Label>
                          <Input id="je-date" type="date" defaultValue="2026-10-15" required />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="je-acct">Account Classification</Label>
                        <Select value={journalAccount} onValueChange={setJournalAccount}>
                          <SelectTrigger id="je-acct">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5100 - Plant Maintenance OpEx">5100 - Plant Maintenance OpEx</SelectItem>
                            <SelectItem value="1010 - BDO Operating Account">1010 - BDO Operating Account</SelectItem>
                            <SelectItem value="2010 - Accounts Payable Trade">2010 - Accounts Payable Trade</SelectItem>
                            <SelectItem value="1200 - Customer Accounts Receivable">1200 - Customer Accounts Receivable</SelectItem>
                            <SelectItem value="4000 - Power Generation Revenue">4000 - Power Generation Revenue</SelectItem>
                            <SelectItem value="1500 - PPE Fixed Assets">1500 - PPE Fixed Assets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="je-debit">Debit Amount (PHP)</Label>
                          <Input id="je-debit" type="number" value={journalDebit} onChange={(e) => setJournalDebit(e.target.value)} required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="je-credit">Credit Amount (PHP)</Label>
                          <Input id="je-credit" type="number" value={journalCredit} onChange={(e) => setJournalCredit(e.target.value)} required />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="je-desc">Description & Business Justification</Label>
                        <Input id="je-desc" value={journalDesc} onChange={(e) => setJournalDesc(e.target.value)} required />
                      </div>

                      <div className="rounded-lg border bg-amber-50/70 dark:bg-amber-950/20 p-3 text-xs text-amber-800 dark:text-amber-300">
                        <div className="flex items-start gap-2">
                          <Info className="size-4 shrink-0 text-amber-600 mt-0.5" />
                          <span>
                            <strong>Separation Rule #1 Enforced:</strong> As Accountant, you prepare and submit this entry. The Financial Controller must sign off before final general ledger lock.
                          </span>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={() => setNewJournalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Submit & Post Journal
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* ─── Separation of Duties Alert Banner ─────────────────────────────────── */}
        <div className="rounded-xl border border-indigo-200/80 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/20 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                <Lock className="size-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-indigo-950 dark:text-indigo-200">
                  Separation of Duties (SOD) Compliance Policy Active
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accountant cannot self-approve entries, release bank funds, approve payments, alter roles, or perform cashier shifts.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-background text-[11px] font-normal border-amber-300 text-amber-700 dark:text-amber-300">
                🚫 Self-Approval Prohibited
              </Badge>
              <Badge variant="outline" className="bg-background text-[11px] font-normal border-rose-300 text-rose-700 dark:text-rose-300">
                🔒 Bank Release: Treasurer Only
              </Badge>
              <Badge variant="outline" className="bg-background text-[11px] font-normal border-blue-300 text-blue-700 dark:text-blue-300">
                ✅ Full Ledger Posting Rights
              </Badge>
            </div>
          </div>
        </div>

        {/* ─── SECTION 1: DASHBOARD OVERVIEW ──────────────────────────────────────── */}
        <section id="dashboard" className="scroll-mt-20 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <LayoutDashboard className="size-5 text-indigo-600" />
                Accounting Dashboard & Key Metrics
              </h2>
              <p className="text-xs text-muted-foreground">
                High-level operational view across general ledger, working capital, and pending tasks
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Live Feed
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Gross Receivables (AR)
                </CardTitle>
                <BadgeDollarSign className="size-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{formatPHP(22_890_000)}</div>
                <p className="mt-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="size-3" /> +6.2% vs last month · 95.8% collection efficiency
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-500 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Trade Payables (AP)
                </CardTitle>
                <Receipt className="size-4 text-rose-600 dark:text-rose-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{formatPHP(14_250_000)}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  8 vouchers prepared · Pending Controller review
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Net Operating Cash Buffer
                </CardTitle>
                <Wallet className="size-4 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{formatPHP(38_420_000)}</div>
                <p className="mt-1 text-xs text-emerald-600 font-medium">
                  Bank recon: 99.4% matched · Zero unallocated drafts
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Period Close Readiness
                </CardTitle>
                <CalendarCheck className="size-4 text-amber-600 dark:text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{progressPercent}%</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {completedCount} of {closeChecklist.length} checklist controls verified
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="size-4 text-indigo-600" />
                    Ledger Activity & Cash Inflow vs Outflow
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Monthly journal posting volume and cash receipts vs voucher disbursements (PHP)
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  Trailing 6 Months
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyLedgerData}>
                      <defs>
                        <linearGradient id="collectionsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="disbursementsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e11d48" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
                      <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${v / 1_000_000}M`}
                      />
                      <RechartsTooltip formatter={(v) => formatPHP(Number(v))} />
                      <Area
                        type="monotone"
                        dataKey="collections"
                        name="Collections Applied"
                        stroke="#4f46e5"
                        strokeWidth={2.5}
                        fill="url(#collectionsGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="disbursements"
                        name="Vouchers Prepared"
                        stroke="#e11d48"
                        strokeWidth={2}
                        fill="url(#disbursementsGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick Accounting Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="size-4 text-indigo-600" />
                  Accountant's Action Queue
                </CardTitle>
                <CardDescription className="text-xs">
                  Prioritized ledger preparations and reconciliations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold">Post Oct Depreciation Amortization</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Heavy machinery PPE ledger</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">
                      Pending Post
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold">Match BDO Bank Recon Variance</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">2 uncleared check deposits</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-300">
                      In Progress
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold">Prepare BIR 2307 Withholding Certificates</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Q3 vendor tax credits</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-300">
                      Ready
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-dashed p-2.5 text-center text-xs text-muted-foreground">
                  <p>All prepared items automatically route to Controller for review.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ─── SECTION 2: LEDGERS ─────────────────────────────────────────────────── */}
        <section id="ledgers" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <BookOpen className="size-5 text-indigo-600" />
                Ledgers Management
              </h2>
              <p className="text-xs text-muted-foreground">
                General Ledger, Assets, Liabilities, Equity, Revenue, and Expenses (Full operational creation & posting)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/general-ledger">
                <Button variant="outline" size="sm" className="text-xs gap-1 cursor-pointer">
                  Open Standalone GL View <ExternalLink className="size-3" />
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="general-ledger" className="space-y-4">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full">
              <TabsTrigger value="general-ledger" className="text-xs">General Ledger</TabsTrigger>
              <TabsTrigger value="assets" className="text-xs">Assets</TabsTrigger>
              <TabsTrigger value="liabilities" className="text-xs">Liabilities</TabsTrigger>
              <TabsTrigger value="equity" className="text-xs">Equity</TabsTrigger>
              <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
              <TabsTrigger value="expenses" className="text-xs">Expenses</TabsTrigger>
            </TabsList>

            {/* General Ledger Sub-tab */}
            <TabsContent value="general-ledger" className="space-y-4">
              <Card id="general-ledger">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <BookMarked className="size-4 text-indigo-600" />
                      General Ledger Journal Entries
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Posted by Accountant · Pending Controller Maker-Checker Approval
                    </CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setNewJournalOpen(true)} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs text-white">
                    <Plus className="size-3.5" /> Post Journal
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-xs">Ref ID</TableHead>
                          <TableHead className="text-xs">Date</TableHead>
                          <TableHead className="text-xs">Account Description</TableHead>
                          <TableHead className="text-xs text-right">Debit</TableHead>
                          <TableHead className="text-xs text-right">Credit</TableHead>
                          <TableHead className="text-xs">Prepared By</TableHead>
                          <TableHead className="text-xs text-center">Approval Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-xs font-semibold">JE-2026-1044</TableCell>
                          <TableCell className="text-xs">Oct 14, 2026</TableCell>
                          <TableCell className="text-xs">
                            <span className="font-medium">5100 Maintenance OpEx / 2010 AP Trade</span>
                            <p className="text-[10px] text-muted-foreground">Power turbine spare bearings delivery</p>
                          </TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(450_000)}</TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(450_000)}</TableCell>
                          <TableCell className="text-xs">Elena Cruz (Accountant)</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-700 border-amber-300">
                              Awaiting Controller
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs font-semibold">JE-2026-1042</TableCell>
                          <TableCell className="text-xs">Oct 12, 2026</TableCell>
                          <TableCell className="text-xs">
                            <span className="font-medium">1010 BDO Operating / 1200 Customer AR</span>
                            <p className="text-[10px] text-muted-foreground">Wire receipt from Luzon Industrial Power</p>
                          </TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(2_450_000)}</TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(2_450_000)}</TableCell>
                          <TableCell className="text-xs">Elena Cruz (Accountant)</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300">
                              Approved & Posted
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs font-semibold">JE-2026-1039</TableCell>
                          <TableCell className="text-xs">Oct 09, 2026</TableCell>
                          <TableCell className="text-xs">
                            <span className="font-medium">1700 Accumulated Depr / 6200 Depr Expense</span>
                            <p className="text-[10px] text-muted-foreground">Fleet transport amortization for Q3</p>
                          </TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(180_000)}</TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(180_000)}</TableCell>
                          <TableCell className="text-xs">Elena Cruz (Accountant)</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300">
                              Approved & Posted
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assets Sub-tab */}
            <TabsContent value="assets" className="space-y-4">
              <Card id="assets">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Building2 className="size-4 text-indigo-600" />
                      Assets Register & PPE Valuation
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Fixed assets, current assets, accumulated depreciation schedules
                    </CardDescription>
                  </div>
                  <Link to="/assets">
                    <Button variant="outline" size="sm" className="text-xs gap-1">
                      Full Assets Page <ExternalLink className="size-3" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Total Plant & Machinery (PPE)</p>
                      <p className="text-lg font-bold text-foreground">{formatPHP(142_800_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">12 major generation turbines</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Accumulated Depreciation</p>
                      <p className="text-lg font-bold text-rose-600">({formatPHP(28_450_000)})</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Straight-line method applied</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Net Book Value (NBV)</p>
                      <p className="text-lg font-bold text-emerald-600">{formatPHP(114_350_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Audit verified Oct 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Liabilities Sub-tab */}
            <TabsContent value="liabilities" className="space-y-4">
              <Card id="liabilities">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Scale className="size-4 text-indigo-600" />
                      Liabilities Schedule
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Trade accounts payable, accrued expenses, statutory liabilities, and bank term loans
                    </CardDescription>
                  </div>
                  <Link to="/liabilities">
                    <Button variant="outline" size="sm" className="text-xs gap-1">
                      Full Liabilities Page <ExternalLink className="size-3" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-xs">Category</TableHead>
                          <TableHead className="text-xs">Account</TableHead>
                          <TableHead className="text-xs text-right">Current Balance</TableHead>
                          <TableHead className="text-xs">Reconciliation Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-xs font-medium">Current Liability</TableCell>
                          <TableCell className="text-xs">2010 - Accounts Payable (Trade Vendors)</TableCell>
                          <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(14_250_000)}</TableCell>
                          <TableCell className="text-xs text-emerald-600">Reconciled to Sub-ledger</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs font-medium">Current Liability</TableCell>
                          <TableCell className="text-xs">2040 - Accrued Payroll & Statutory Liabilities</TableCell>
                          <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(3_120_000)}</TableCell>
                          <TableCell className="text-xs text-emerald-600">Reconciled to Payroll Clearing</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs font-medium">Long-Term Debt</TableCell>
                          <TableCell className="text-xs">2500 - BDO Capex Syndicated Loan (Due 2031)</TableCell>
                          <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(45_000_000)}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">Amortization Table Aligned</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Equity Sub-tab */}
            <TabsContent value="equity" className="space-y-4">
              <Card id="equity">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <ShieldCheck className="size-4 text-indigo-600" />
                      Stockholders' Equity & Retained Earnings
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Paid-in capital, reserves, and period comprehensive net income roll-forward
                    </CardDescription>
                  </div>
                  <Link to="/equity">
                    <Button variant="outline" size="sm" className="text-xs gap-1">
                      Full Equity Page <ExternalLink className="size-3" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Authorized Capital Stock</p>
                      <p className="text-lg font-bold">{formatPHP(80_000_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Par value PHP 10.00 / share</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Beginning Retained Earnings</p>
                      <p className="text-lg font-bold">{formatPHP(24_150_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Audited opening balance</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">YTD Net Income (Accrued)</p>
                      <p className="text-lg font-bold text-emerald-600">{formatPHP(28_340_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Rolls into period close</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Revenue Sub-tab */}
            <TabsContent value="revenue" className="space-y-4">
              <Card id="revenue">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="size-4 text-indigo-600" />
                      Revenue Accounts & Recognition
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Power generation contracts, industrial supply billings, deferred revenue amortization
                    </CardDescription>
                  </div>
                  <Link to="/revenue">
                    <Button variant="outline" size="sm" className="text-xs gap-1">
                      Full Revenue Page <ExternalLink className="size-3" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-xs">Revenue Stream</TableHead>
                          <TableHead className="text-xs">Contract Type</TableHead>
                          <TableHead className="text-xs text-right">October Accrual</TableHead>
                          <TableHead className="text-xs text-right">YTD Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-xs font-medium">4010 - Industrial Baseload Power</TableCell>
                          <TableCell className="text-xs">Long-term PPA (Take-or-Pay)</TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(12_400_000)}</TableCell>
                          <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(124_000_000)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs font-medium">4020 - Grid Ancillary Services</TableCell>
                          <TableCell className="text-xs">Frequency regulation dispatch</TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(4_850_000)}</TableCell>
                          <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(48_500_000)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs font-medium">4050 - Facility Maintenance Services</TableCell>
                          <TableCell className="text-xs">Time & Materials</TableCell>
                          <TableCell className="text-xs text-right font-mono">{formatPHP(1_850_000)}</TableCell>
                          <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(14_950_000)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expenses Sub-tab */}
            <TabsContent value="expenses" className="space-y-4">
              <Card id="expenses">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingDown className="size-4 text-indigo-600" />
                      Expenses & Cost Center Allocation
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Cost of Goods Sold (COGS), Plant OpEx, Administrative overhead
                    </CardDescription>
                  </div>
                  <Link to="/expenses">
                    <Button variant="outline" size="sm" className="text-xs gap-1">
                      Full Expenses Page <ExternalLink className="size-3" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Fuel & Generation Feedstock</p>
                      <p className="text-lg font-bold text-foreground">{formatPHP(8_450_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Matched with inventory issuances</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Plant OpEx & Spare Overhauls</p>
                      <p className="text-lg font-bold text-foreground">{formatPHP(3_250_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Vouchers verified against POs</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Admin, Salaries & Taxes</p>
                      <p className="text-lg font-bold text-foreground">{formatPHP(2_550_000)}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Payroll clearing aligned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* ─── SECTION 3: ACCOUNTS PAYABLE ────────────────────────────────────────── */}
        <section id="accounts-payable" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Receipt className="size-5 text-rose-600" />
                Accounts Payable (AP)
              </h2>
              <p className="text-xs text-muted-foreground">
                Overview, vendor invoice creation, and payroll data preparation under separation rules
              </p>
            </div>
            <Link to="/accounts-payable">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                Open Standalone AP View <ExternalLink className="size-3" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* AP Overview Card */}
            <Card id="ap-overview" className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="size-4 text-rose-600" />
                  AP Aging Overview
                </CardTitle>
                <CardDescription className="text-xs">
                  Payable maturity breakdown
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Current (0-30 Days):</span>
                    <span className="font-semibold">{formatPHP(9_850_000)}</span>
                  </div>
                  <Progress value={70} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">31-60 Days:</span>
                    <span className="font-semibold">{formatPHP(3_200_000)}</span>
                  </div>
                  <Progress value={25} className="h-1.5 bg-amber-100 dark:bg-amber-950" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Over 60 Days:</span>
                    <span className="font-semibold text-rose-600">{formatPHP(1_200_000)}</span>
                  </div>
                  <Progress value={10} className="h-1.5 bg-rose-100 dark:bg-rose-950" />
                </div>
                <Separator />
                <div className="flex justify-between text-xs font-semibold">
                  <span>Total Open Payables:</span>
                  <span>{formatPHP(14_250_000)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Invoices Card */}
            <Card id="ap-vendor-invoices" className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileSpreadsheet className="size-4 text-rose-600" />
                    Vendor Invoices & Bills
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Create & match vendor bills · Vouchers prepared for Controller approval
                  </CardDescription>
                </div>
                <Dialog open={newVoucherOpen} onOpenChange={setNewVoucherOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1.5 bg-rose-600 hover:bg-rose-700 text-xs text-white">
                      <Plus className="size-3.5" /> Prepare Voucher
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <form onSubmit={handleCreateVoucher}>
                      <DialogHeader>
                        <DialogTitle>Prepare Payment Voucher</DialogTitle>
                        <DialogDescription>
                          Accountant prepares vouchers. Final approval is executed by Controller/CFO; bank release is executed by Treasurer.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-3 py-3">
                        <div className="space-y-1">
                          <Label htmlFor="payee">Vendor / Payee</Label>
                          <Input id="payee" value={voucherPayee} onChange={(e) => setVoucherPayee(e.target.value)} required />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="amt">Amount (PHP)</Label>
                          <Input id="amt" type="number" value={voucherAmount} onChange={(e) => setVoucherAmount(e.target.value)} required />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="desc">Purpose / Invoice Reference</Label>
                          <Input id="desc" value={voucherDesc} onChange={(e) => setVoucherDesc(e.target.value)} required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setNewVoucherOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white">
                          Submit Voucher for Approval
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-xs">Vendor</TableHead>
                        <TableHead className="text-xs">Invoice #</TableHead>
                        <TableHead className="text-xs text-right">Amount</TableHead>
                        <TableHead className="text-xs">Preparation Status</TableHead>
                        <TableHead className="text-xs text-center">Approval Guardrail</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs font-medium">Shell Petroleum Corp</TableCell>
                        <TableCell className="text-xs font-mono">SH-2026-9921</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(4_850_000)}</TableCell>
                        <TableCell className="text-xs text-emerald-600">3-Way PO Matched</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-700 border-amber-300">
                            Awaiting Controller Sign-off
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-medium">Siemens Energy Services</TableCell>
                        <TableCell className="text-xs font-mono">SIE-8812-PH</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(2_140_000)}</TableCell>
                        <TableCell className="text-xs text-emerald-600">Service Completion Verified</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-700 border-amber-300">
                            Awaiting CFO Approval
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-medium">Meralco Grid Operations</TableCell>
                        <TableCell className="text-xs font-mono">MER-OCT-441</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(980_000)}</TableCell>
                        <TableCell className="text-xs text-emerald-600">Metering Logs Reconciled</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300">
                            Approved by Controller
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payroll Data (prepare/review only) */}
          <Card id="ap-payroll" className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="size-4 text-amber-600" />
                  Payroll Data (Prepare & Review Only)
                </CardTitle>
                <CardDescription className="text-xs">
                  Separation Rule: Accountant prepares clearing entries; Treasurer executes bank release upon CFO approval.
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 text-xs">
                Restricted Fund Release
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Gross Payroll Accrual</p>
                  <p className="text-base font-bold font-mono">{formatPHP(3_650_000)}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">142 plant & office personnel</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Withholding Tax (1601-C)</p>
                  <p className="text-base font-bold font-mono text-rose-600">({formatPHP(420_000)})</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Scheduled for tax filing</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">SSS / PhilHealth / Pag-IBIG</p>
                  <p className="text-base font-bold font-mono text-rose-600">({formatPHP(280_000)})</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Statutory clearing account</p>
                </div>
                <div className="rounded-lg border p-3 bg-muted/30">
                  <p className="text-xs text-muted-foreground">Net Pay for Bank Release</p>
                  <p className="text-base font-bold font-mono text-indigo-600">{formatPHP(2_950_000)}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Assigned to: Treasurer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* ─── SECTION 4: ACCOUNTS RECEIVABLE ────────────────────────────────────── */}
        <section id="accounts-receivable" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <BadgeDollarSign className="size-5 text-emerald-600" />
                Accounts Receivable (AR)
              </h2>
              <p className="text-xs text-muted-foreground">
                Overview, customer billing invoices, collections review, and payments reconciliation
              </p>
            </div>
            <Link to="/accounts-receivable">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                Open Standalone AR View <ExternalLink className="size-3" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* AR Overview */}
            <Card id="ar-overview" className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="size-4 text-emerald-600" />
                  AR Aging Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Open AR:</span>
                  <span className="font-bold">{formatPHP(22_890_000)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Current (0-30d):</span>
                  <span className="font-semibold text-emerald-600">{formatPHP(18_450_000)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">31-60d (Watch):</span>
                  <span className="font-semibold text-amber-600">{formatPHP(3_640_000)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Over 60d:</span>
                  <span className="font-semibold text-rose-600">{formatPHP(800_000)}</span>
                </div>
                <div className="rounded-md bg-emerald-50 dark:bg-emerald-950/30 p-2 text-[11px] text-emerald-800 dark:text-emerald-300">
                  DSO: 32 Days (Target: &lt;40 Days)
                </div>
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card id="ar-invoices" className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Receipt className="size-4 text-emerald-600" />
                  Customer Invoicing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Create official customer invoices and issue credit notes for billing adjustments.
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs flex justify-between border-b pb-1">
                    <span>Generated this month:</span>
                    <span className="font-semibold">34 Invoices</span>
                  </div>
                  <div className="text-xs flex justify-between border-b pb-1">
                    <span>Total Billed:</span>
                    <span className="font-semibold font-mono">{formatPHP(19_100_000)}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  onClick={() => showNotification("Customer invoice generation wizard opened.")}
                >
                  <Plus className="size-3 mr-1" /> New Customer Invoice
                </Button>
              </CardContent>
            </Card>

            {/* Collections Review */}
            <Card id="ar-collections-review" className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <HandCoins className="size-4 text-emerald-600" />
                  Collections Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Monitor receipts applied, unearned deposits, and client payment follow-ups.
                </p>
                <div className="rounded-lg border p-2 text-xs space-y-1 bg-muted/20">
                  <div className="flex justify-between font-medium">
                    <span>Luzon Grid Corp</span>
                    <span className="text-emerald-600 font-mono">{formatPHP(5_200_000)}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">PDC Deposited & Cleared Oct 14</p>
                </div>
                <div className="rounded-lg border p-2 text-xs space-y-1 bg-muted/20">
                  <div className="flex justify-between font-medium">
                    <span>Cebu Industrial Co.</span>
                    <span className="text-amber-600 font-mono">{formatPHP(1_800_000)}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Follow-up sent · Net 30 due Oct 20</p>
                </div>
              </CardContent>
            </Card>

            {/* Payments Reconciliation */}
            <Card id="ar-payments-reconciliation" className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ArrowRightLeft className="size-4 text-emerald-600" />
                  Payments Recon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Match incoming bank wires and cashier shifts against open billing invoices.
                </p>
                <div className="rounded-md border p-2 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unapplied Wires:</span>
                    <span className="font-bold text-amber-600 font-mono">{formatPHP(650_000)}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">1 wire pending client credit note reference</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 text-xs border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 cursor-pointer"
                  onClick={() => showNotification("Payment matching engine triggered. 1 item reconciled successfully.")}
                >
                  Auto-Match Remittances
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ─── SECTION 5 & 6: DISBURSEMENTS & COLLECTIONS MANAGEMENT ────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Section 5: Disbursement Management */}
          <Card id="disbursement-management" className="scroll-mt-20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Banknote className="size-5 text-amber-600" />
                  Disbursement Management
                </CardTitle>
                <CardDescription className="text-xs">
                  Prepare payment requests and vouchers · No final approval or bank release
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">
                Preparation Only
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border bg-amber-50/50 dark:bg-amber-950/10 p-3 text-xs text-amber-900 dark:text-amber-200">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="size-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>
                    <strong>Separation Rules #2 & #3:</strong> The Accountant prepares payment vouchers. Controller or CFO approves requests. Only the Treasurer releases bank funds.
                  </span>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-xs">Voucher Ref</TableHead>
                      <TableHead className="text-xs">Payee</TableHead>
                      <TableHead className="text-xs text-right">Amount</TableHead>
                      <TableHead className="text-xs">Prepared By</TableHead>
                      <TableHead className="text-xs text-center">Treasurer Release</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">DV-2026-0814</TableCell>
                      <TableCell className="text-xs">Metro Generator Parts</TableCell>
                      <TableCell className="text-xs text-right font-mono">{formatPHP(840_000)}</TableCell>
                      <TableCell className="text-xs">Elena Cruz (Accountant)</TableCell>
                      <TableCell className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="ghost" disabled className="h-6 text-[10px] text-muted-foreground">
                                <Lock className="size-3 mr-1" /> Release Locked
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Treasurer executes bank fund release.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">DV-2026-0811</TableCell>
                      <TableCell className="text-xs">Caltex Lubricants Inc.</TableCell>
                      <TableCell className="text-xs text-right font-mono">{formatPHP(420_000)}</TableCell>
                      <TableCell className="text-xs">Elena Cruz (Accountant)</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                          Released by Treasurer
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Link to="/disbursement-management">
                  <Button variant="outline" size="sm" className="text-xs gap-1">
                    Open Disbursement Management <ExternalLink className="size-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Collection Management */}
          <Card id="collection-management" className="scroll-mt-20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <HandCoins className="size-5 text-teal-600" />
                  Collection Management
                </CardTitle>
                <CardDescription className="text-xs">
                  Apply payments, reconcile collections, prepare bank deposits
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-teal-300 text-teal-700 text-xs">
                Reconciliation & Deposits
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border bg-teal-50/50 dark:bg-teal-950/10 p-3 text-xs text-teal-900 dark:text-teal-200">
                <div className="flex items-start gap-2">
                  <Info className="size-4 shrink-0 text-teal-600 mt-0.5" />
                  <span>
                    <strong>Cashier Terminal Separation:</strong> Cashier collects payments and closes shifts. Accounting holds read-only operational receipt access strictly for daily bank deposit reconciliation.
                  </span>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-xs">Shift / Terminal</TableHead>
                      <TableHead className="text-xs">Cashier</TableHead>
                      <TableHead className="text-xs text-right">Receipts</TableHead>
                      <TableHead className="text-xs">Deposit Slip Prep</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">Terminal #01 · Shift A</TableCell>
                      <TableCell className="text-xs">Maria Santos</TableCell>
                      <TableCell className="text-xs text-right font-mono">{formatPHP(1_240_000)}</TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                          Deposit Slip Prepared
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">Terminal #02 · Shift B</TableCell>
                      <TableCell className="text-xs">Carlos Ramos</TableCell>
                      <TableCell className="text-xs text-right font-mono">{formatPHP(980_000)}</TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                          Deposit Slip Prepared
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center pt-1">
                <p className="text-[11px] text-muted-foreground">
                  Cashier operations: Read-only for reconciliation
                </p>
                <Link to="/collection-management">
                  <Button variant="outline" size="sm" className="text-xs gap-1">
                    Open Collection Management <ExternalLink className="size-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* ─── SECTION 7: CASH MANAGEMENT ────────────────────────────────────────── */}
        <section id="cash-management" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Wallet className="size-5 text-cyan-600" />
                Cash Management (Bank Reconciliation & Cash Position)
              </h2>
              <p className="text-xs text-muted-foreground">
                View balances & prepare monthly reconciliations only · No fund transfer or bank instruction release authority
              </p>
            </div>
            <Link to="/cash-management">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                Open Standalone Cash View <ExternalLink className="size-3" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Depository Bank Accounts */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Landmark className="size-4 text-cyan-600" />
                    Operating Depository Balances (Read-Only View)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Live balance view from banking API feeds
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  Reconciliation Match: 99.4%
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-xs">Bank & Account</TableHead>
                        <TableHead className="text-xs">Account Purpose</TableHead>
                        <TableHead className="text-xs text-right">Bank Statement Balance</TableHead>
                        <TableHead className="text-xs text-right">GL Book Balance</TableHead>
                        <TableHead className="text-xs text-center">Variance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">BDO Unibank #...8814</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Main Operating Account</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(24_850_000)}</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(24_850_000)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                            PHP 0.00 (Balanced)
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">BPI Corporate #...4290</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Payroll & Clearing Account</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(8_420_000)}</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(8_420_000)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                            PHP 0.00 (Balanced)
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">Metrobank Escrow #...1102</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Tax & Loan Reserve Escrow</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(5_150_000)}</TableCell>
                        <TableCell className="text-xs text-right font-mono">{formatPHP(5_150_000)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700">
                            PHP 0.00 (Balanced)
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Reconciliation Action Box */}
            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <RefreshCw className="size-4 text-cyan-600" />
                  Bank Reconciliation Tool
                </CardTitle>
                <CardDescription className="text-xs">
                  Prepare monthly bank statements reconciliation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border p-2.5 text-xs space-y-1 bg-muted/20">
                  <div className="flex justify-between font-medium">
                    <span>Deposits in Transit:</span>
                    <span className="font-mono">PHP 0.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Outstanding Checks:</span>
                    <span className="font-mono">PHP 0.00</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Recon Status:</span>
                    <span className="text-emerald-600 font-semibold">100% Cleared</span>
                  </div>
                </div>

                <Button
                  className="w-full text-xs bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer"
                  onClick={() => showNotification("Monthly Bank Reconciliation schedule generated and logged to audit trail.")}
                >
                  Generate Reconciliation Schedule
                </Button>

                <p className="text-[11px] text-muted-foreground text-center">
                  Funds transfer & wire release authority reserved for Treasurer.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ─── SECTION 8: FINANCIAL REPORTING & ANALYTICS ─────────────────────────── */}
        <section id="financial-reporting" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <BarChart3 className="size-5 text-violet-600" />
                Financial Reporting & Analytics
              </h2>
              <p className="text-xs text-muted-foreground">
                Generate and export standard financial reports (Balance Sheet, P&L, Cash Flow, Working Trial Balance)
              </p>
            </div>
            <Link to="/financial-reporting-analytics">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                Full Reporting Center <ExternalLink className="size-3" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:border-violet-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  Balance Sheet
                  <Download className="size-3.5 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="text-xs">
                  Statement of Financial Position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">Assets = Liabilities + Equity verified.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-violet-200 hover:bg-violet-50 text-violet-700 dark:border-violet-800 dark:hover:bg-violet-950/40 dark:text-violet-300 cursor-pointer"
                  onClick={() => showNotification("Balance Sheet exported to Excel (.xlsx).")}
                >
                  <Download className="size-3 mr-1" /> Export Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-violet-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  Income Statement
                  <Download className="size-3.5 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="text-xs">
                  Statement of Comprehensive Income
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">Revenues, COGS, OpEx & Net Margin.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-violet-200 hover:bg-violet-50 text-violet-700 dark:border-violet-800 dark:hover:bg-violet-950/40 dark:text-violet-300 cursor-pointer"
                  onClick={() => showNotification("Income Statement exported to Excel (.xlsx).")}
                >
                  <Download className="size-3 mr-1" /> Export Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-violet-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  Cash Flow Statement
                  <Download className="size-3.5 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="text-xs">
                  Operating, Investing, & Financing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">Indirect method cash flows reconciliation.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-violet-200 hover:bg-violet-50 text-violet-700 dark:border-violet-800 dark:hover:bg-violet-950/40 dark:text-violet-300 cursor-pointer"
                  onClick={() => showNotification("Cash Flow Statement exported to Excel (.xlsx).")}
                >
                  <Download className="size-3 mr-1" /> Export Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-violet-300 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  Working Trial Balance
                  <Download className="size-3.5 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="text-xs">
                  All ledger accounts debits/credits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">Zero variance trial balance for period close.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-violet-200 hover:bg-violet-50 text-violet-700 dark:border-violet-800 dark:hover:bg-violet-950/40 dark:text-violet-300 cursor-pointer"
                  onClick={() => showNotification("Working Trial Balance exported to Excel (.xlsx).")}
                >
                  <Download className="size-3 mr-1" /> Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ─── SECTION 9: TAX MANAGEMENT ─────────────────────────────────────────── */}
        <section id="tax-management" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <CirclePercent className="size-5 text-orange-600" />
                Tax Management (Supporting Data & Schedules Only)
              </h2>
              <p className="text-xs text-muted-foreground">
                Prepare schedules and supporting tax records · Tax Accountant files and officially submits to the BIR
              </p>
            </div>
            <Link to="/tax-management">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                Open Full Tax Management <ExternalLink className="size-3" />
              </Button>
            </Link>
          </div>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileCheck className="size-4 text-orange-600" />
                  Tax Schedules & Statutory Supporting Records
                </CardTitle>
                <CardDescription className="text-xs">
                  Accountant prepares supporting schedules; Tax Accountant performs eFPS filing
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50 dark:bg-orange-950/30 text-xs">
                Schedules Prepared
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-xs">BIR Schedule / Form</TableHead>
                      <TableHead className="text-xs">Description</TableHead>
                      <TableHead className="text-xs text-right">Tax Base / Volume</TableHead>
                      <TableHead className="text-xs text-right">Tax Withheld / Output</TableHead>
                      <TableHead className="text-xs">Accountant Status</TableHead>
                      <TableHead className="text-xs text-center">Filing Authority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Form 2550M / 2550Q (VAT)</TableCell>
                      <TableCell className="text-xs">Output VAT vs Input VAT Ledger Matching</TableCell>
                      <TableCell className="text-xs text-right font-mono">{formatPHP(19_100_000)}</TableCell>
                      <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(2_292_000)}</TableCell>
                      <TableCell className="text-xs text-emerald-600">Schedule Complete</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="text-[10px]">Tax Accountant (eFPS)</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Form 1601-EQ (EWT)</TableCell>
                      <TableCell className="text-xs">Expanded Withholding Tax on Vendor Payments</TableCell>
                      <TableCell className="text-xs text-right font-mono">{formatPHP(14_250_000)}</TableCell>
                      <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(285_000)}</TableCell>
                      <TableCell className="text-xs text-emerald-600">Schedule Complete</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="text-[10px]">Tax Accountant (eFPS)</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-semibold">Form 2307 Ledger</TableCell>
                      <TableCell className="text-xs">Certificate of Creditable Tax Withheld at Source</TableCell>
                      <TableCell className="text-xs text-right font-mono">24 Certificates</TableCell>
                      <TableCell className="text-xs text-right font-mono font-semibold">{formatPHP(382_000)}</TableCell>
                      <TableCell className="text-xs text-emerald-600">Ready for Issuance</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="text-[10px]">Tax Accountant (eFPS)</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Info className="size-3.5 text-orange-600" />
                  <span>Accountant prepares schedules; official filing is handled by Lisa Tan (Tax Accountant).</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-orange-200 hover:bg-orange-50 text-orange-700 dark:border-orange-800 dark:hover:bg-orange-950/40 dark:text-orange-300 cursor-pointer"
                  onClick={() => showNotification("Supporting tax schedules exported (.xlsx) for Tax Accountant review.")}
                >
                  <Download className="size-3.5 mr-1" /> Export Tax Schedules
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* ─── SECTION 10: PERIOD CLOSE & RECONCILIATION ──────────────────────────── */}
        <section id="period-close" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <CalendarCheck className="size-5 text-emerald-600" />
                Period Close & Reconciliation
              </h2>
              <p className="text-xs text-muted-foreground">
                Prepare close checklist and adjustment entries · Financial Controller approves and locks the period
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Checklist: {progressPercent}% Prepared
            </Badge>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Monthly Close Checklist (October 2026)
                </CardTitle>
                <CardDescription className="text-xs">
                  Click items to mark verified by Accountant · Controller executes final sign-off
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => showNotification("Period close adjustment voucher prepared.")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-xs text-white cursor-pointer"
                >
                  <Plus className="size-3.5 mr-1" /> Record Close Adjustment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span>Verification Progress:</span>
                  <span>{completedCount} / {closeChecklist.length} Steps Completed ({progressPercent}%)</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              <div className="rounded-md border divide-y">
                {closeChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className="flex items-center justify-between p-3 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-5 items-center justify-center rounded border transition-colors ${
                          item.done
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {item.done && <Check className="size-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-xs ${item.done ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                        {item.task}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">
                      {item.area}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border bg-muted/30 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="size-4 text-muted-foreground" />
                  <span>
                    <strong>Final Sign-Off:</strong> Once 100% prepared, the period close package is forwarded to the Financial Controller for final period lock.
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={progressPercent < 100}
                  className="shrink-0 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  onClick={() => showNotification("Close package submitted to Financial Controller for official sign-off.")}
                >
                  Submit Close Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* ─── SECTION 11: MY PROFILE ─────────────────────────────────────────────── */}
        <section id="my-profile" className="scroll-mt-20 space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <UserCircle className="size-5 text-indigo-600" />
              My Profile & Certified Operational Authorization
            </h2>
            <p className="text-xs text-muted-foreground">
              Accountant credentials, separation of duties certification, and role attributes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-2xl font-bold border-2 border-indigo-200">
                  EC
                </div>
                <CardTitle className="mt-3 text-lg">Elena Cruz, CPA</CardTitle>
                <CardDescription className="text-xs">
                  Senior General Ledger Accountant
                </CardDescription>
                <div className="mt-2 flex justify-center">
                  <Badge variant="outline" className="text-[11px] bg-indigo-50 text-indigo-700 border-indigo-300">
                    PRC License # 0148922
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">Finance & Accounting</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-muted-foreground">Reports To:</span>
                  <span className="font-medium">Financial Controller</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-muted-foreground">MFA / 2FA Status:</span>
                  <span className="font-semibold text-emerald-600">Hardware TOTP Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SOD Compliance:</span>
                  <span className="font-semibold text-indigo-600">Verified & Certified</span>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  Accountant Permission Matrix Summary
                </CardTitle>
                <CardDescription className="text-xs">
                  Exact separation rules as certified in the ISMERS / Prime Power Governance Framework
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-xs">Operational Area</TableHead>
                        <TableHead className="text-xs">Accountant Permission</TableHead>
                        <TableHead className="text-xs text-center">Separation Restriction</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">Ledgers</TableCell>
                        <TableCell className="text-xs">Create, edit, post journals; prepare adjustments; reconcile accounts</TableCell>
                        <TableCell className="text-center text-[11px] text-muted-foreground">Cannot approve own journal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">AP / AR</TableCell>
                        <TableCell className="text-xs">Create and maintain invoices, bills, credit notes, and payment records</TableCell>
                        <TableCell className="text-center text-[11px] text-muted-foreground">Cannot approve write-offs</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">Disbursements</TableCell>
                        <TableCell className="text-xs">Prepare payment requests and vouchers</TableCell>
                        <TableCell className="text-center text-[11px] text-rose-600 font-medium">No approval or bank release</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">Cash Management</TableCell>
                        <TableCell className="text-xs">View balances, prepare reconciliations</TableCell>
                        <TableCell className="text-center text-[11px] text-rose-600 font-medium">No fund transfer release</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">Users & Roles</TableCell>
                        <TableCell className="text-xs font-medium text-rose-600">No Access (Isolated)</TableCell>
                        <TableCell className="text-center text-[11px] text-muted-foreground">System Admin only</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs font-semibold">Cashier Terminal</TableCell>
                        <TableCell className="text-xs">Read-only shift/receipt data for reconciliation</TableCell>
                        <TableCell className="text-center text-[11px] text-rose-600 font-medium">No cashier operations</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── SOD DIALOG MODAL ──────────────────────────────────────────────────── */}
        <Dialog open={sodDialogOpen} onOpenChange={setSodDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                <Lock className="size-5" />
                Accountant Access Plan & Separation of Duties (SOD)
              </DialogTitle>
              <DialogDescription>
                Governance controls ensuring full working access without risk of self-approval or fund misappropriation.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="rounded-lg border bg-muted/40 p-3.5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">The 5 Core Separation Rules</h4>
                <ul className="text-xs space-y-1.5 list-disc pl-4 text-foreground/90">
                  <li><strong>Cannot approve own work:</strong> No self-approval of journal entries, invoices, vouchers, credit notes, or write-offs.</li>
                  <li><strong>Cannot release bank funds:</strong> Payment releases, bank wires, and transfer instructions are executed exclusively by the Treasurer.</li>
                  <li><strong>Cannot approve payment requests:</strong> Final voucher approval is reserved for the Financial Controller or CFO.</li>
                  <li><strong>Zero administrative authority:</strong> Cannot alter user roles, access permissions, or security audit logs (Admin only).</li>
                  <li><strong>Cashier Terminal isolation:</strong> Cannot perform cashier collection or shift-close actions; holds read-only receipt data only when reconciling.</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 text-xs space-y-1.5">
                <h4 className="font-semibold text-foreground">Maker-Checker Workflow Enforcement</h4>
                <p className="text-muted-foreground">
                  Every journal and voucher prepared by the Accountant enters an immutable staging audit log awaiting digital sign-off from the Controller before General Ledger lock.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setSodDialogOpen(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Understood & Acknowledged
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AccountantLayout>
  )
}
