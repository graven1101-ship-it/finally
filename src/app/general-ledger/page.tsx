"use client"

import * as React from "react"
import { ArrowDownRight, ArrowUpRight, BadgeDollarSign, BookOpen, Building2, Landmark, Users, Briefcase, FileText, ShieldCheck, TrendingUp, Layers } from "lucide-react"

import { BaseLayout } from "@/components/layouts/base-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type RangeState = { from?: string | null; to?: string | null } | null

type LedgerEntry = {
  date: string
  reference: string
  module: string
  description: string
  account: string
  debit: number
  credit: number
}

const primePowerAccounts = [
  { category: "Assets", total: 4_820_000, accounts: ["Cash in Bank", "Accounts Receivable", "Input VAT", "PPE"] },
  { category: "Liabilities", total: 1_935_000, accounts: ["Accounts Payable", "Accrued Salaries", "SSS/PH/PAGIBIG Payable", "EWT Payable"] },
  { category: "Equity", total: 2_885_000, accounts: ["Capital Stock", "Retained Earnings"] },
  { category: "Revenue", total: 3_750_000, accounts: ["Service Income", "Mobilization Fees", "Other Income"] },
  { category: "Expenses", total: 2_640_000, accounts: ["Direct Labor", "Gov't Contributions", "Admin Salaries", "Rent", "Utilities"] },
]

const statutoryPayables = [
  { label: "SSS Payable", amount: 148_500, note: "Employer + Employee Share" },
  { label: "PhilHealth Payable", amount: 62_400, note: "Employer + Employee Share" },
  { label: "Pag-IBIG Payable", amount: 24_000, note: "Employer + Employee Share" },
  { label: "EWT Payable (2%)", amount: 75_000, note: "BIR Form 2307 basis" },
  { label: "Output VAT Payable", amount: 450_000, note: "12% on Service Income" },
]

const ledgerEntries: LedgerEntry[] = [
  {
    date: "2026-06-01",
    reference: "JNL-1001",
    module: "Client Acquisition",
    description: "Client onboarding deposit received",
    account: "Cash in Bank",
    debit: 150000,
    credit: 0,
  },
  {
    date: "2026-06-03",
    reference: "JNL-1002",
    module: "HRIS",
    description: "Payroll for deployed team members",
    account: "Payroll Expense",
    debit: 420000,
    credit: 0,
  },
  {
    date: "2026-06-05",
    reference: "JNL-1003",
    module: "Facilities",
    description: "Office utilities and workstation support",
    account: "Operating Expense",
    debit: 65000,
    credit: 0,
  },
  {
    date: "2026-06-08",
    reference: "JNL-1004",
    module: "Fleet",
    description: "Fuel reimbursement for dispatch operations",
    account: "Transportation Expense",
    debit: 24000,
    credit: 0,
  },
  {
    date: "2026-06-10",
    reference: "JNL-1005",
    module: "CRM",
    description: "Service retainer collected from enterprise client",
    account: "Accounts Receivable",
    debit: 0,
    credit: 180000,
  },
  {
    date: "2026-06-12",
    reference: "JNL-1006",
    module: "Inventory",
    description: "Procurement of IT supplies for deployment kits",
    account: "Inventory Asset",
    debit: 112000,
    credit: 0,
  },
  { date: "2026-06-14", reference: "JNL-1007", module: "Manpower Billing", description: "Service income – client manpower fees collected", account: "Service Income", debit: 0, credit: 375000 },
  { date: "2026-06-15", reference: "JNL-1008", module: "Payroll", description: "Deployed staff salaries – direct labor cost", account: "Direct Labor Cost", debit: 290000, credit: 0 },
  { date: "2026-06-16", reference: "JNL-1009", module: "Gov't Compliance", description: "SSS, PhilHealth, Pag-IBIG – employer share remittance", account: "Gov't Contributions", debit: 48500, credit: 0 },
  { date: "2026-06-18", reference: "JNL-1010", module: "Tax Compliance", description: "EWT withheld by client – BIR Form 2307 recorded", account: "EWT Payable", debit: 0, credit: 7500 },
  { date: "2026-06-20", reference: "JNL-1011", module: "Facilities", description: "Makati office rent – Kalayaan Ave. branch", account: "Rent Expense", debit: 85000, credit: 0 },
  { date: "2026-06-22", reference: "JNL-1012", module: "Professional Fees", description: "CPA retainer for BIR compliance and audit prep", account: "Professional Fees", debit: 35000, credit: 0 },
]

const summaryCards = [
  {
    title: "Cash & Bank",
    amount: 2675000,
    change: "+12.4%",
    trend: "up",
    icon: Landmark,
  },
  {
    title: "Accounts Receivable",
    amount: 945000,
    change: "+3.1%",
    trend: "up",
    icon: BadgeDollarSign,
  },
  {
    title: "Payroll & Benefits Payable",
    amount: 682500,
    change: "-1.8%",
    trend: "down",
    icon: Building2,
  },
  {
    title: "Net Position",
    amount: 2450000,
    change: "+8.7%",
    trend: "up",
    icon: BookOpen,
  },
]



const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value)

export default function GeneralLedgerPage() {
  const [range, setRange] = React.useState<RangeState>(null)

  React.useEffect(() => {
    const handler = (e: Event & { detail?: { from?: string | null; to?: string | null } }) => {
      const { from, to } = e?.detail || {}
      setRange({ from: from ? new Date(from).toLocaleDateString() : null, to: to ? new Date(to).toLocaleDateString() : null })
    }

    window.addEventListener("periodToggleChange", handler as EventListener)
    return () => window.removeEventListener("periodToggleChange", handler as EventListener)
  }, [])

  const ledgerRows = React.useMemo(() => {
    let balance = 1250000

    return ledgerEntries.map((entry) => {
      balance += entry.debit - entry.credit
      return { ...entry, balance }
    })
  }, [])

  const totalDebits = ledgerRows.reduce((sum, row) => sum + row.debit, 0)
  const totalCredits = ledgerRows.reduce((sum, row) => sum + row.credit, 0)
  const endingBalance = ledgerRows[ledgerRows.length - 1]?.balance ?? 1250000

  return (
    <BaseLayout title="General Ledger" description="Accounting view for ISMERS operations across HR, payroll, facilities, fleet, and CRM modules.">
      <div className="space-y-6 px-4 lg:px-6">
        {/* Business Context Banner */}
        <div className="flex items-center gap-4 rounded-xl border bg-blue-50/50 p-4 dark:bg-blue-950/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Building2 className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Prime Power Manpower Services</h2>
            <p className="text-sm text-blue-700 dark:text-blue-300">Makati, Staffing & Manpower Outsourcing • BIR-Compliant General Ledger</p>
          </div>
        </div>

        {/* 5-Category Cards Grid */}
        <div className="grid gap-4 md:grid-cols-5">
          {primePowerAccounts.map((cat, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{cat.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold"><span data-sensitive>{formatCurrency(cat.total)}</span></div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {cat.accounts.length} Accounts
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {cat.accounts.map((acc, j) => (
                    <span key={j} className="rounded bg-muted px-1.5 py-0.5 text-[10px]">
                      {acc}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statutory Compliance Tracker */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Statutory Compliance Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {statutoryPayables.map((pay, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="text-sm font-medium">{pay.label}</div>
                  <div className="mt-1 text-lg font-semibold text-rose-600">
                    <span data-sensitive>{formatCurrency(pay.amount)}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{pay.note}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl border bg-background/80 p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">




            <div className="rounded-lg border bg-muted/40 px-3 py-2 text-sm">
              <div>
                <strong>Reporting period:</strong> {range?.from ?? "—"} to {range?.to ?? "—"}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Core Transactions 1</CardTitle>
              <CardDescription>Key balances that support the ISMERS financial control structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">{formatCurrency(1250000)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">{formatCurrency(totalDebits)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">{formatCurrency(totalCredits)}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">{formatCurrency(endingBalance)}</span>
                </div>
              </div>
            </CardContent>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle>Core Transactions 2</CardTitle>
              <CardDescription>Client Acquisition, Recruitment & Deployment financial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">₱1,250,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">₱771,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">₱180,000</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">₱1,841,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Core Transactions 3</CardTitle>
              <CardDescription>Key balances that support the ISMERS financial control structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">{formatCurrency(1250000)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">{formatCurrency(totalDebits)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">{formatCurrency(totalCredits)}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">{formatCurrency(endingBalance)}</span>
                </div>
              </div>
            </CardContent>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle>Core Transactions 4</CardTitle>
              <CardDescription>Client Acquisition, Recruitment & Deployment financial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">₱1,250,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">₱771,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">₱180,000</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">₱1,841,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Financial</CardTitle>
              <CardDescription>Key balances that support the ISMERS financial control structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">{formatCurrency(1250000)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">{formatCurrency(totalDebits)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">{formatCurrency(totalCredits)}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">{formatCurrency(endingBalance)}</span>
                </div>
              </div>
            </CardContent>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle>Supply Chain</CardTitle>
              <CardDescription>Client Acquisition, Recruitment & Deployment financial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">₱1,250,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">₱771,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">₱180,000</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">₱1,841,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{formatCurrency(item.amount)}</span>
                        <span className={`flex items-center gap-0.5 text-sm ${item.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                          {item.trend === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                          {item.change}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <Icon className="size-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Ledger Snapshot</CardTitle>
              <CardDescription>Key balances that support the ISMERS financial control structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">{formatCurrency(1250000)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">{formatCurrency(totalDebits)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">{formatCurrency(totalCredits)}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">{formatCurrency(endingBalance)}</span>
                </div>
              </div>
            </CardContent>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle>Core Transactions 1</CardTitle>
              <CardDescription>Client Acquisition, Recruitment & Deployment financial summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">₱1,250,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">₱771,000</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">₱180,000</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">₱1,841,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Ledger Snapshot</CardTitle>
              <CardDescription>Key balances that support the ISMERS financial control structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opening Balance</span>
                  <span className="font-semibold">{formatCurrency(1250000)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Debits</span>
                  <span className="font-semibold">{formatCurrency(totalDebits)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">{formatCurrency(totalCredits)}</span>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ending Balance</span>
                  <span className="font-semibold">{formatCurrency(endingBalance)}</span>
                </div>
              </div>
            </CardContent>
          </Card>



        </div>
      </div>
    </BaseLayout>
  )
}
