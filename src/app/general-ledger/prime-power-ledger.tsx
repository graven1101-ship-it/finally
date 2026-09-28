"use client"

import * as React from "react"
import {
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Landmark,
  BadgeDollarSign,
  Zap,
  HardHat,
  Truck,
  Fuel,
  Wrench,
  FileSpreadsheet,
  Download,
  Filter,
  Plus,
  Scale,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  FileCheck,
  Users,
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
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(v)

const pct = (v: number) => `${v.toFixed(1)}%`

// ─── PMS Prime Power Chart of Accounts Categories ──────────────────────────────
export interface ChartCategory {
  codeRange: string
  name: "Assets" | "Liabilities" | "Equity" | "Revenue" | "Expenses"
  total: number
  description: string
  accounts: { code: string; title: string; balance: number; normalSide: "Debit" | "Credit" }[]
}

const pmsChartOfAccounts: ChartCategory[] = [
  {
    codeRange: "1000 - 1999",
    name: "Assets",
    total: 28450000,
    description: "Generator fleets, transport vehicles, trade receivables & operating cash",
    accounts: [
      { code: "101210", title: "Cash in Bank — Operating (BDO/BPI)", balance: 4850000, normalSide: "Debit" },
      { code: "1020", title: "Petty Cash & Field Mobilization Fund", balance: 250000, normalSide: "Debit" },
      { code: "1100", title: "Trade Accounts Receivable (Clients)", balance: 8420000, normalSide: "Debit" },
      { code: "1200", title: "Generator Sets & Power Equipment (PPE)", balance: 11500000, normalSide: "Debit" },
      { code: "1250", title: "Service Trucks, Boom Cranes & Fleet", balance: 2430000, normalSide: "Debit" },
      { code: "1300", title: "Prepaid Insurances & Yard Security Deposits", balance: 1000000, normalSide: "Debit" },
    ],
  },
  {
    codeRange: "2000 - 2999",
    name: "Liabilities",
    total: 10640000,
    description: "Trade vendor billings, heavy equipment loans & mandatory Philippine taxes",
    accounts: [
      { code: "2010", title: "Accounts Payable — Fuel & Parts Suppliers", balance: 3450000, normalSide: "Credit" },
      { code: "2050", title: "Accrued Crew Payroll & 13th Month", balance: 1420000, normalSide: "Credit" },
      { code: "2100", title: "Statutory Contributions (SSS, PhilHealth, Pag-IBIG)", balance: 410000, normalSide: "Credit" },
      { code: "2150", title: "BIR Withholding Tax & Output VAT Payable", balance: 860000, normalSide: "Credit" },
      { code: "2500", title: "Equipment Chattel Mortgage & Term Notes", balance: 4500000, normalSide: "Credit" },
    ],
  },
  {
    codeRange: "3000 - 3999",
    name: "Equity",
    total: 17810000,
    description: "Paid-in capital stock and cumulative retained earnings reinvested into fleet",
    accounts: [
      { code: "3010", title: "Authorized Capital Stock", balance: 12000000, normalSide: "Credit" },
      { code: "3050", title: "Retained Earnings — Beginning", balance: 3810000, normalSide: "Credit" },
      { code: "3090", title: "Current Period Net Operating Income", balance: 2000000, normalSide: "Credit" },
    ],
  },
  {
    codeRange: "4000 - 4999",
    name: "Revenue",
    total: 24650000,
    description: "Power rental contracts, manpower deployments & electrical EPC works",
    accounts: [
      { code: "4010", title: "Manpower Deployment & Field Technicians Billing", balance: 12660000, normalSide: "Credit" },
      { code: "4020", title: "Commercial Generator Rental Revenue", balance: 4200000, normalSide: "Credit" },
      { code: "4030", title: "Electrical Installation & EPC Turnkey Projects", balance: 5050000, normalSide: "Credit" },
      { code: "4040", title: "Substation & Transformer PM Contracts", balance: 2740000, normalSide: "Credit" },
    ],
  },
  {
    codeRange: "5000 - 6999",
    name: "Expenses",
    total: 18120000,
    description: "Cost of services (crew payroll, bulk diesel, OEM parts) and yard overhead",
    accounts: [
      { code: "5010", title: "Direct Field Crew Wages & Hazard Allowances", balance: 8940000, normalSide: "Debit" },
      { code: "5020", title: "Diesel Fuel & Lubricants for Genset Fleet", balance: 3870000, normalSide: "Debit" },
      { code: "5030", title: "Generator Spares, AVRs & Engine Overhauls", balance: 2450000, normalSide: "Debit" },
      { code: "5040", title: "Low-bed Heavy Hauling & Boom Crane Mobilization", balance: 1080000, normalSide: "Debit" },
      { code: "6010", title: "Operations Yard Lease & Facility Utilities", balance: 1280000, normalSide: "Debit" },
      { code: "6020", title: "DOLE Safety Badges, Arc-Flash PPE & Certifications", balance: 500000, normalSide: "Debit" },
    ],
  },
]

// ─── Journal / General Ledger Transaction Rows ────────────────────────────────
export interface LedgerTransaction {
  id: string
  date: string
  refNumber: string
  accountCode: string
  accountName: string
  businessSegment: "Manpower Deployment" | "GenSet Power Rental" | "Electrical Works" | "PMS Corporate Yard"
  particulars: string
  debit: number
  credit: number
  postedBy: string
}

const initialLedgerRows: LedgerTransaction[] = [
  {
    id: "GL-2026-001",
    date: "2026-09-01",
    refNumber: "JV-2026-0901",
    accountCode: "1010",
    accountName: "Cash in Bank — Operating",
    businessSegment: "Manpower Deployment",
    particulars: "Client collections received from Meralco / MIESCOR monthly deployment",
    debit: 1500000,
    credit: 0,
    postedBy: "Chief Accountant",
  },
  {
    id: "GL-2026-002",
    date: "2026-09-01",
    refNumber: "JV-2026-0901",
    accountCode: "1100",
    accountName: "Trade Accounts Receivable",
    businessSegment: "Manpower Deployment",
    particulars: "Settlement of Meralco billing invoice INV-2026-021",
    debit: 0,
    credit: 1500000,
    postedBy: "Chief Accountant",
  },
  {
    id: "GL-2026-003",
    date: "2026-09-03",
    refNumber: "CDV-2026-0412",
    accountCode: "5010",
    accountName: "Direct Field Crew Wages",
    businessSegment: "Manpower Deployment",
    particulars: "Payroll release for 50 substation linesmen & field technicians (1st Half)",
    debit: 720000,
    credit: 0,
    postedBy: "Payroll Officer",
  },
  {
    id: "GL-2026-004",
    date: "2026-09-03",
    refNumber: "CDV-2026-0412",
    accountCode: "1010",
    accountName: "Cash in Bank — Operating",
    businessSegment: "Manpower Deployment",
    particulars: "BDO electronic payroll disbursement to field personnel ATM accounts",
    debit: 0,
    credit: 720000,
    postedBy: "Payroll Officer",
  },
  {
    id: "GL-2026-005",
    date: "2026-09-06",
    refNumber: "APV-2026-0819",
    accountCode: "5020",
    accountName: "Diesel Fuel & Lubricants",
    businessSegment: "GenSet Power Rental",
    particulars: "Petron bulk industrial diesel delivery (8,500L) for SM Prime standby gensets",
    debit: 510000,
    credit: 0,
    postedBy: "Cost Accountant",
  },
  {
    id: "GL-2026-006",
    date: "2026-09-06",
    refNumber: "APV-2026-0819",
    accountCode: "2010",
    accountName: "Accounts Payable — Fuel & Parts",
    businessSegment: "GenSet Power Rental",
    particulars: "30-day term supplier voucher for Petron Fleet Corporation",
    debit: 0,
    credit: 510000,
    postedBy: "Cost Accountant",
  },
  {
    id: "GL-2026-007",
    date: "2026-09-10",
    refNumber: "JV-2026-0914",
    accountCode: "1100",
    accountName: "Trade Accounts Receivable",
    businessSegment: "Electrical Works",
    particulars: "Billing progress milestone #2 for Ayala Land BGC Tower 2 electrical setup",
    debit: 1800000,
    credit: 0,
    postedBy: "Billing Specialist",
  },
  {
    id: "GL-2026-008",
    date: "2026-09-10",
    refNumber: "JV-2026-0914",
    accountCode: "4030",
    accountName: "Electrical Installation & Turnkey Revenue",
    businessSegment: "Electrical Works",
    particulars: "Revenue recognition on 60% completion certificate signed by project engineer",
    debit: 0,
    credit: 1800000,
    postedBy: "Billing Specialist",
  },
  {
    id: "GL-2026-009",
    date: "2026-09-12",
    refNumber: "CDV-2026-0428",
    accountCode: "5030",
    accountName: "Generator Spares & Consumables",
    businessSegment: "GenSet Power Rental",
    particulars: "Cummins PH replacement turbochargers & filters for 750kVA standby unit",
    debit: 320000,
    credit: 0,
    postedBy: "Fleet Manager",
  },
  {
    id: "GL-2026-010",
    date: "2026-09-12",
    refNumber: "CDV-2026-0428",
    accountCode: "1010",
    accountName: "Cash in Bank — Operating",
    businessSegment: "GenSet Power Rental",
    particulars: "PDC check clearance for engine maintenance parts",
    debit: 0,
    credit: 320000,
    postedBy: "Fleet Manager",
  },
  {
    id: "GL-2026-011",
    date: "2026-09-15",
    refNumber: "CDV-2026-0435",
    accountCode: "6010",
    accountName: "Operations Yard Lease & Utilities",
    businessSegment: "PMS Corporate Yard",
    particulars: "Depot staging yard monthly lease payment and equipment security",
    debit: 185000,
    credit: 0,
    postedBy: "Admin Lead",
  },
  {
    id: "GL-2026-012",
    date: "2026-09-15",
    refNumber: "CDV-2026-0435",
    accountCode: "1010",
    accountName: "Cash in Bank — Operating",
    businessSegment: "PMS Corporate Yard",
    particulars: "Direct wire transfer for facility leaseholder",
    debit: 0,
    credit: 185000,
    postedBy: "Admin Lead",
  },
  {
    id: "GL-2026-013",
    date: "2026-09-18",
    refNumber: "CDV-2026-0442",
    accountCode: "5040",
    accountName: "Heavy Hauling & Crane Logistics",
    businessSegment: "GenSet Power Rental",
    particulars: "Delta Transport low-bed mobilizations for generator set transfer to Megaworld",
    debit: 145000,
    credit: 0,
    postedBy: "Logistics Dispatcher",
  },
  {
    id: "GL-2026-014",
    date: "2026-09-18",
    refNumber: "CDV-2026-0442",
    accountCode: "1010",
    accountName: "Cash in Bank — Operating",
    businessSegment: "GenSet Power Rental",
    particulars: "Check payment for equipment heavy rigging",
    debit: 0,
    credit: 145000,
    postedBy: "Logistics Dispatcher",
  },
  {
    id: "GL-2026-015",
    date: "2026-09-20",
    refNumber: "JV-2026-0925",
    accountCode: "2100",
    accountName: "Statutory Contributions Payable",
    businessSegment: "PMS Corporate Yard",
    particulars: "Monthly remittance of SSS, PhilHealth, and Pag-IBIG employer & employee share",
    debit: 234900,
    credit: 0,
    postedBy: "Compliance Officer",
  },
  {
    id: "GL-2026-016",
    date: "2026-09-20",
    refNumber: "JV-2026-0925",
    accountCode: "1010",
    accountName: "Cash in Bank — Operating",
    businessSegment: "PMS Corporate Yard",
    particulars: "BPI online government statutory debit payment",
    debit: 0,
    credit: 234900,
    postedBy: "Compliance Officer",
  },
]

const statutoryComplianceList = [
  { item: "SSS Employer & Employee Remittance", amount: 148500, status: "Remitted", period: "August 2026", form: "R-5 Contribution" },
  { item: "PhilHealth Health Insurance Fund", amount: 62400, status: "Remitted", period: "August 2026", form: "EPRS Monthly" },
  { item: "Pag-IBIG HDMF Savings Contribution", amount: 24000, status: "Remitted", period: "August 2026", form: "MCRF Electronic" },
  { item: "BIR Form 1601-C (Withholding on Compensation)", amount: 215000, status: "Pending Due", period: "September 10, 2026", form: "eFPS Filing" },
  { item: "BIR Form 1601-EQ (Expanded Withholding Tax 2%)", amount: 75000, status: "Pending Due", period: "Q3 2026", form: "BIR Form 2307 match" },
  { item: "BIR Form 2550Q (Quarterly Value-Added Tax 12%)", amount: 450000, status: "Pending Due", period: "Q3 2026", form: "Output minus Input VAT" },
]

export default function PrimePowerGeneralLedgerPage() {
  const [transactions, setTransactions] = React.useState<LedgerTransaction[]>(initialLedgerRows)
  const [selectedSegment, setSelectedSegment] = React.useState<string>("all")
  const [selectedAccount, setSelectedAccount] = React.useState<string>("all")
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  // New Journal Entry form state
  const [form, setForm] = React.useState({
    date: new Date().toISOString().split("T")[0],
    refNumber: "",
    accountCode: "1010",
    businessSegment: "GenSet Power Rental" as LedgerTransaction["businessSegment"],
    particulars: "",
    debit: "",
    credit: "",
    postedBy: "Finance Staff",
  })

  // Calculations
  const totalDebits = transactions.reduce((s, r) => s + r.debit, 0)
  const totalCredits = transactions.reduce((s, r) => s + r.credit, 0)
  const isBalanced = totalDebits === totalCredits

  const filteredTransactions = transactions.filter((tx) => {
    const matchSeg = selectedSegment === "all" || tx.businessSegment === selectedSegment
    const matchAcc = selectedAccount === "all" || tx.accountCode === selectedAccount
    return matchSeg && matchAcc
  })

  const handlePostEntry = (e: React.FormEvent) => {
    e.preventDefault()
    const dVal = parseFloat(form.debit) || 0
    const cVal = parseFloat(form.credit) || 0
    if (dVal === 0 && cVal === 0) return

    // Find account name
    let foundName = "General Account"
    for (const cat of pmsChartOfAccounts) {
      const match = cat.accounts.find((a) => a.code === form.accountCode)
      if (match) {
        foundName = match.title
        break
      }
    }

    const newTx: LedgerTransaction = {
      id: `GL-2026-${String(transactions.length + 1).padStart(3, "0")}`,
      date: form.date,
      refNumber: form.refNumber || `JV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      accountCode: form.accountCode,
      accountName: foundName,
      businessSegment: form.businessSegment,
      particulars: form.particulars || "Standard journal posting",
      debit: dVal,
      credit: cVal,
      postedBy: form.postedBy || "Finance Team",
    }

    setTransactions([newTx, ...transactions])
    setModalOpen(false)
    setForm({
      date: new Date().toISOString().split("T")[0],
      refNumber: "",
      accountCode: "1010",
      businessSegment: "GenSet Power Rental",
      particulars: "",
      debit: "",
      credit: "",
      postedBy: "Finance Staff",
    })
  }

  return (
    <BaseLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <BookOpen className="h-3.5 w-3.5" />
                Double-Entry General Ledger
              </span>
              <span className="text-xs text-muted-foreground">• PMS Prime Power Business Model</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">
              General Ledger & Trial Balance
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Audited books of accounts for generator rentals, power manpower supply, fleet mobilization, and BIR compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm">
                  <Plus className="h-4 w-4" />
                  Post Journal Voucher
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Post Journal Entry to General Ledger</DialogTitle>
                  <DialogDescription>
                    Record audited debit or credit adjustments across PMS Prime Power cost centers.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handlePostEntry} className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="date">Transaction Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ref">Voucher / Ref No.</Label>
                      <Input
                        id="ref"
                        placeholder="e.g. JV-2026-0988"
                        value={form.refNumber}
                        onChange={(e) => setForm({ ...form, refNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="acc">Target Account Code & Name</Label>
                    <Select
                      value={form.accountCode}
                      onValueChange={(val) => setForm({ ...form, accountCode: val })}
                    >
                      <SelectTrigger id="acc">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pmsChartOfAccounts.flatMap((cat) =>
                          cat.accounts.map((acc) => (
                            <SelectItem key={acc.code} value={acc.code}>
                              {acc.code} — {acc.title} ({cat.name})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="segment">Business Division / Cost Center</Label>
                    <Select
                      value={form.businessSegment}
                      onValueChange={(val: any) => setForm({ ...form, businessSegment: val })}
                    >
                      <SelectTrigger id="segment">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GenSet Power Rental">GenSet Power Rental</SelectItem>
                        <SelectItem value="Manpower Deployment">Manpower Deployment</SelectItem>
                        <SelectItem value="Electrical Works">Electrical Works</SelectItem>
                        <SelectItem value="PMS Corporate Yard">PMS Corporate Yard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="particulars">Particulars & Journal Narrative</Label>
                    <Input
                      id="particulars"
                      placeholder="e.g. Settlement of client billing / Mobilization diesel charge"
                      value={form.particulars}
                      onChange={(e) => setForm({ ...form, particulars: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="debit">Debit (PHP)</Label>
                      <Input
                        id="debit"
                        type="number"
                        placeholder="0.00"
                        value={form.debit}
                        onChange={(e) => setForm({ ...form, debit: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="credit">Credit (PHP)</Label>
                      <Input
                        id="credit"
                        type="number"
                        placeholder="0.00"
                        value={form.credit}
                        onChange={(e) => setForm({ ...form, credit: e.target.value })}
                      />
                    </div>
                  </div>

                  <DialogFooter className="pt-2">
                    <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Post to Ledger</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 5-Category Core Accounting Elements Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {pmsChartOfAccounts.map((cat) => (
            <Card key={cat.name} className="shadow-sm border-t-4 border-t-primary/70">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {cat.name}
                  </CardTitle>
                  <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">
                    {cat.codeRange}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <div className="text-xl font-bold tracking-tight">{money(cat.total)}</div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-1">
                  {cat.accounts.length} sub-ledger accounts
                </p>
                <div className="mt-3 space-y-1 pt-2 border-t text-[11px]">
                  {cat.accounts.slice(0, 2).map((acc) => (
                    <div key={acc.code} className="flex justify-between text-muted-foreground">
                      <span className="truncate pr-1">{acc.title}</span>
                      <span className="font-mono text-foreground">{money(acc.balance).replace(".00", "")}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ledger Balance Verification Banner */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2 shadow-sm bg-gradient-to-r from-background to-muted/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Scale className="h-4 w-4 text-primary" />
                    Double-Entry Balance Verification
                  </CardTitle>
                  <CardDescription>
                    Real-time verification of posted debits versus credits across all sub-journals
                  </CardDescription>
                </div>
                <Badge
                  variant={isBalanced ? "default" : "destructive"}
                  className="gap-1.5 text-xs py-1"
                >
                  {isBalanced ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Books in Balance
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3.5 w-3.5" />
                      Difference: {money(Math.abs(totalDebits - totalCredits))}
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/40 text-center">
                <div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Total Debits
                  </span>
                  <div className="text-lg md:text-xl font-bold text-foreground mt-1">
                    {money(totalDebits)}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Assets & Expenses</span>
                </div>
                <div className="border-x border-border/80">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Total Credits
                  </span>
                  <div className="text-lg md:text-xl font-bold text-foreground mt-1">
                    {money(totalCredits)}
                  </div>
                  <span className="text-[11px] text-blue-600 font-medium">Liabilities, Equity & Rev</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Ledger Net Variance
                  </span>
                  <div className="text-lg md:text-xl font-bold text-foreground mt-1">
                    {money(totalDebits - totalCredits)}
                  </div>
                  <span className="text-[11px] text-muted-foreground">Standard Zero Difference</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Divisions Breakdown */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">PMS Division Segments</CardTitle>
              <CardDescription>Operational activity breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="flex items-center gap-1.5 font-medium">
                  <Users className="h-3.5 w-3.5 text-blue-600" />
                  Manpower Deployment
                </span>
                <span className="font-semibold">{money(12660000)}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="h-3.5 w-3.5 text-amber-600" />
                  GenSet Power Rental
                </span>
                <span className="font-semibold">{money(4200000)}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="flex items-center gap-1.5 font-medium">
                  <HardHat className="h-3.5 w-3.5 text-rose-600" />
                  Electrical Works & Turnkey
                </span>
                <span className="font-semibold">{money(5050000)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="h-3.5 w-3.5 text-slate-600" />
                  PMS Corporate Yard
                </span>
                <span className="font-semibold">{money(2740000)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed General Ledger / Journal Voucher Table */}
        <Card className="shadow-sm">
          <Tabs defaultValue="ledger" className="w-full">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <TabsList className="grid grid-cols-2 w-[280px]">
                    <TabsTrigger value="ledger">General Journal</TabsTrigger>
                    <TabsTrigger value="statutory">BIR & Statutory</TabsTrigger>
                  </TabsList>
                  <CardDescription className="mt-1">
                    Audited posting records showing exact account codes, vouchers, and cost allocation.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger className="w-[180px] h-8 text-xs">
                      <SelectValue placeholder="Segment Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Segments</SelectItem>
                      <SelectItem value="GenSet Power Rental">GenSet Power Rental</SelectItem>
                      <SelectItem value="Manpower Deployment">Manpower Deployment</SelectItem>
                      <SelectItem value="Electrical Works">Electrical Works</SelectItem>
                      <SelectItem value="PMS Corporate Yard">PMS Corporate Yard</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger className="w-[180px] h-8 text-xs">
                      <SelectValue placeholder="Filter Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      {pmsChartOfAccounts.flatMap((cat) =>
                        cat.accounts.map((acc) => (
                          <SelectItem key={acc.code} value={acc.code}>
                            {acc.code} — {acc.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <TabsContent value="ledger" className="m-0 space-y-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="w-[110px]">Voucher Ref</TableHead>
                        <TableHead className="w-[95px]">Date</TableHead>
                        <TableHead className="w-[80px]">Account</TableHead>
                        <TableHead className="min-w-[180px]">Account Title</TableHead>
                        <TableHead>Business Segment</TableHead>
                        <TableHead className="min-w-[260px]">Particulars / Narrative</TableHead>
                        <TableHead className="text-right w-[110px]">Debit (PHP)</TableHead>
                        <TableHead className="text-right w-[110px]">Credit (PHP)</TableHead>
                        <TableHead className="w-[110px] text-center">Posted By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                            No ledger transactions found matching the selected filter.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTransactions.map((tx) => (
                          <TableRow key={tx.id} className="hover:bg-muted/30">
                            <TableCell className="font-mono text-xs font-semibold text-primary">
                              {tx.refNumber}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                              {tx.date}
                            </TableCell>
                            <TableCell className="font-mono text-xs font-bold">
                              {tx.accountCode}
                            </TableCell>
                            <TableCell className="text-xs font-semibold">
                              {tx.accountName}
                            </TableCell>
                            <TableCell className="text-xs whitespace-nowrap">
                              <Badge variant="outline" className="font-normal text-[11px]">
                                {tx.businessSegment}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-[280px] truncate">
                              {tx.particulars}
                            </TableCell>
                            <TableCell className="text-xs font-bold text-right font-mono whitespace-nowrap">
                              {tx.debit > 0 ? money(tx.debit) : "—"}
                            </TableCell>
                            <TableCell className="text-xs font-bold text-right font-mono text-blue-600 whitespace-nowrap">
                              {tx.credit > 0 ? money(tx.credit) : "—"}
                            </TableCell>
                            <TableCell className="text-center text-[11px] text-muted-foreground whitespace-nowrap">
                              {tx.postedBy}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Statutory Compliance Tab */}
              <TabsContent value="statutory" className="m-0 space-y-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead>Statutory / Government Obligation</TableHead>
                        <TableHead>BIR / Agency Form</TableHead>
                        <TableHead>Tax / Applicable Period</TableHead>
                        <TableHead className="text-right">Payable Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statutoryComplianceList.map((st, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-semibold text-xs">
                            {st.item}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            {st.form}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {st.period}
                          </TableCell>
                          <TableCell className="text-xs font-bold text-right font-mono text-rose-600">
                            {money(st.amount)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={st.status === "Remitted" ? "default" : "secondary"}
                              className="text-[11px]"
                            >
                              {st.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </BaseLayout>
  )
}
