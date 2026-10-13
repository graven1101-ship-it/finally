import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { CeoLayout } from "@/components/layouts/ceo-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Wallet,
  Banknote,
  HandCoins,
  CirclePercent,
  ShieldCheck,
  FileSearch,
  AlertTriangle,
  CalendarCheck,
  UserCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Building2,
  Receipt,
  CreditCard,
  AlertCircle,
  Activity,
} from "lucide-react"

// ─── Helpers ────────────────────────────────────────────────────────────────
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount)

const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-PH").format(num)

// ─── Executive KPI Cards ────────────────────────────────────────────────────
function ExecutiveKPICards() {
  const kpis = [
    {
      title: "Total Revenue (YTD)",
      value: formatCurrency(187_450_000),
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100/80 dark:bg-emerald-900/30",
    },
    {
      title: "Net Income (YTD)",
      value: formatCurrency(28_340_000),
      change: "+8.2%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100/80 dark:bg-blue-900/30",
    },
    {
      title: "Operating Expenses",
      value: formatCurrency(142_800_000),
      change: "+3.1%",
      trend: "up" as const,
      icon: Receipt,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100/80 dark:bg-amber-900/30",
    },
    {
      title: "Cash Position",
      value: formatCurrency(45_600_000),
      change: "-2.4%",
      trend: "down" as const,
      icon: Wallet,
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-100/80 dark:bg-violet-900/30",
    },
    {
      title: "Accounts Receivable",
      value: formatCurrency(32_150_000),
      change: "+5.8%",
      trend: "up" as const,
      icon: HandCoins,
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100/80 dark:bg-teal-900/30",
    },
    {
      title: "Budget Utilization",
      value: "76.4%",
      change: "+4.1%",
      trend: "up" as const,
      icon: PieChart,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100/80 dark:bg-indigo-900/30",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                {kpi.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </div>
            </div>
            <div data-sensitive className="text-xl font-bold tracking-tight">{kpi.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{kpi.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ─── Executive Financial Overview ───────────────────────────────────────────
function ExecutiveFinancialOverview() {
  const financialMetrics = [
    { label: "Gross Profit Margin", value: "34.2%", status: "healthy", target: "30%" },
    { label: "Operating Margin", value: "18.7%", status: "healthy", target: "15%" },
    { label: "Net Profit Margin", value: "15.1%", status: "healthy", target: "12%" },
    { label: "Current Ratio", value: "2.4", status: "healthy", target: ">1.5" },
    { label: "Debt-to-Equity", value: "0.45", status: "healthy", target: "<1.0" },
    { label: "ROE", value: "22.3%", status: "healthy", target: "18%" },
  ]

  const revenueBySegment = [
    { segment: "Security Services", revenue: 89_200_000, percentage: 47.6, color: "bg-blue-500" },
    { segment: "Janitorial Services", revenue: 42_350_000, percentage: 22.6, color: "bg-emerald-500" },
    { segment: "Manpower Outsourcing", revenue: 33_800_000, percentage: 18.0, color: "bg-violet-500" },
    { segment: "Facility Management", revenue: 22_100_000, percentage: 11.8, color: "bg-amber-500" },
  ]

  return (
    <div id="executive-overview" className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-900/30">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">Key Financial Ratios</CardTitle>
              <CardDescription className="text-xs">Current period vs target</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                  <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 font-semibold">
                    {metric.value}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30">
              <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-base">Revenue by Segment</CardTitle>
              <CardDescription className="text-xs">Year-to-date breakdown</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueBySegment.map((segment) => (
              <div key={segment.segment} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{segment.segment}</span>
                  <div className="flex items-center gap-2">
                    <span data-sensitive className="text-sm font-semibold">{formatCurrency(segment.revenue)}</span>
                    <span className="text-xs text-muted-foreground">({segment.percentage}%)</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${segment.color} transition-all duration-700`}
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Financial Reporting & Analytics ────────────────────────────────────────
function FinancialReporting() {
  const reports = [
    { name: "Balance Sheet", status: "Generated", date: "Oct 10, 2026", icon: FileSearch, statusColor: "text-emerald-600" },
    { name: "Income Statement", status: "Generated", date: "Oct 10, 2026", icon: BarChart3, statusColor: "text-emerald-600" },
    { name: "Cash Flow Statement", status: "Pending Review", date: "Oct 08, 2026", icon: Activity, statusColor: "text-amber-600" },
    { name: "Trial Balance", status: "Generated", date: "Oct 10, 2026", icon: Receipt, statusColor: "text-emerald-600" },
    { name: "Aging Report", status: "Generated", date: "Oct 09, 2026", icon: Clock, statusColor: "text-emerald-600" },
    { name: "Variance Analysis", status: "In Progress", date: "Oct 11, 2026", icon: TrendingUp, statusColor: "text-blue-600" },
  ]

  return (
    <Card id="financial-reporting" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/30">
            <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-base">Financial Reporting & Analytics</CardTitle>
            <CardDescription className="text-xs">Latest financial report statuses</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div key={report.name} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-default">
              <div className="p-2 rounded-md bg-muted">
                <report.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{report.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-medium ${report.statusColor}`}>{report.status}</span>
                  <span className="text-xs text-muted-foreground">· {report.date}</span>
                </div>
              </div>
              <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Budget Management ──────────────────────────────────────────────────────
function BudgetManagement() {
  const budgetItems = [
    { department: "Operations", allocated: 65_000_000, spent: 48_200_000, color: "bg-blue-500" },
    { department: "Human Resources", allocated: 28_000_000, spent: 22_400_000, color: "bg-emerald-500" },
    { department: "Marketing", allocated: 12_000_000, spent: 8_750_000, color: "bg-violet-500" },
    { department: "IT & Infrastructure", allocated: 18_500_000, spent: 15_100_000, color: "bg-amber-500" },
    { department: "Admin & General", allocated: 8_000_000, spent: 5_200_000, color: "bg-rose-500" },
  ]

  return (
    <Card id="budget-management" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100/80 dark:bg-amber-900/30">
              <PieChart className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-base">Budget Management</CardTitle>
              <CardDescription className="text-xs">Department budget allocation vs spend</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">Q4 2026</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {budgetItems.map((item) => {
            const utilization = Math.round((item.spent / item.allocated) * 100)
            const isOverBudget = utilization > 90

            return (
              <div key={item.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.department}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span data-sensitive className="text-xs text-muted-foreground">{formatCurrency(item.spent)} / {formatCurrency(item.allocated)}</span>
                    <Badge variant={isOverBudget ? "destructive" : "secondary"} className="text-xs font-semibold min-w-[3rem] justify-center">
                      {utilization}%
                    </Badge>
                  </div>
                </div>
                <Progress value={utilization} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Cash Management ────────────────────────────────────────────────────────
function CashManagementSection() {
  const accounts = [
    { name: "BDO Operating Account", balance: 18_200_000, type: "Operating", bank: "BDO" },
    { name: "BPI Payroll Account", balance: 12_400_000, type: "Payroll", bank: "BPI" },
    { name: "Metrobank Reserve", balance: 8_500_000, type: "Reserve", bank: "Metrobank" },
    { name: "PNB Trust Fund", balance: 6_500_000, type: "Trust", bank: "PNB" },
  ]

  const cashflow = [
    { label: "Total Inflows (MTD)", value: formatCurrency(24_800_000), trend: "up" },
    { label: "Total Outflows (MTD)", value: formatCurrency(19_200_000), trend: "down" },
    { label: "Net Cash Flow", value: formatCurrency(5_600_000), trend: "up" },
    { label: "Projected Month-End", value: formatCurrency(51_200_000), trend: "up" },
  ]

  return (
    <div id="cash-management" className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-100/80 dark:bg-teal-900/30">
              <Wallet className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-base">Bank Accounts Overview</CardTitle>
              <CardDescription className="text-xs">Current balances across all accounts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.type} · {account.bank}</p>
                  </div>
                </div>
                <span data-sensitive className="text-sm font-semibold">{formatCurrency(account.balance)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold">Total Cash Position</span>
              <span data-sensitive className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(45_600_000)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-100/80 dark:bg-teal-900/30">
              <Activity className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-base">Cash Flow Summary</CardTitle>
              <CardDescription className="text-xs">Month-to-date cash movements</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cashflow.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  {item.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span data-sensitive className={`text-sm font-semibold ${item.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Disbursement Approvals ─────────────────────────────────────────────────
function DisbursementApprovals() {
  const pendingApprovals = [
    { id: "DIS-2026-1045", vendor: "ABC Uniforms Corp.", amount: 1_250_000, date: "Oct 11, 2026", urgency: "high", type: "Vendor Payment" },
    { id: "DIS-2026-1044", vendor: "Metro Manila Electric Co.", amount: 890_000, date: "Oct 10, 2026", urgency: "medium", type: "Utility" },
    { id: "DIS-2026-1043", vendor: "PhilHealth Contribution", amount: 485_200, date: "Oct 09, 2026", urgency: "high", type: "Statutory" },
    { id: "DIS-2026-1042", vendor: "Office Supplies Inc.", amount: 156_000, date: "Oct 08, 2026", urgency: "low", type: "Operating" },
    { id: "DIS-2026-1041", vendor: "Fleet Management Services", amount: 2_100_000, date: "Oct 07, 2026", urgency: "medium", type: "Contract" },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
      case "medium": return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      default: return "bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
    }
  }

  return (
    <Card id="disbursement-approvals" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-100/80 dark:bg-red-900/30">
              <Banknote className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-base">Disbursement Approvals</CardTitle>
              <CardDescription className="text-xs">Pending CEO approval for disbursements</CardDescription>
            </div>
          </div>
          <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800">
            {pendingApprovals.length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-muted">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{item.vendor}</p>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getUrgencyColor(item.urgency)}`}>
                      {item.urgency}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.id} · {item.type} · {item.date}</p>
                </div>
              </div>
              <span data-sensitive className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Collections & AR Summary ───────────────────────────────────────────────
function CollectionsARSummary() {
  const agingBuckets = [
    { range: "Current (0-30)", amount: 12_400_000, percentage: 38.6, color: "bg-emerald-500" },
    { range: "31-60 Days", amount: 8_200_000, percentage: 25.5, color: "bg-blue-500" },
    { range: "61-90 Days", amount: 6_100_000, percentage: 19.0, color: "bg-amber-500" },
    { range: "Over 90 Days", amount: 5_450_000, percentage: 16.9, color: "bg-red-500" },
  ]

  const collectionStats = [
    { label: "Collection Rate (MTD)", value: "87.3%", icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Outstanding Invoices", value: formatNumber(248), icon: Receipt, color: "text-blue-600" },
    { label: "Average Days to Collect", value: "42 days", icon: Clock, color: "text-amber-600" },
    { label: "Past Due Accounts", value: formatNumber(31), icon: AlertCircle, color: "text-red-600" },
  ]

  return (
    <div id="collections-ar" className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-100/80 dark:bg-violet-900/30">
              <HandCoins className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-base">AR Aging Summary</CardTitle>
              <CardDescription className="text-xs">Outstanding receivables by age</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agingBuckets.map((bucket) => (
              <div key={bucket.range} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{bucket.range}</span>
                  <div className="flex items-center gap-2">
                    <span data-sensitive className="text-sm font-semibold">{formatCurrency(bucket.amount)}</span>
                    <span className="text-xs text-muted-foreground">({bucket.percentage}%)</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${bucket.color} transition-all duration-700`}
                    style={{ width: `${bucket.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold">Total AR Outstanding</span>
              <span data-sensitive className="text-lg font-bold">{formatCurrency(32_150_000)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-100/80 dark:bg-violet-900/30">
              <Activity className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-base">Collection Performance</CardTitle>
              <CardDescription className="text-xs">Key collection metrics</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {collectionStats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p data-sensitive className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Tax Compliance Summary ─────────────────────────────────────────────────
function TaxComplianceSummary() {
  const taxItems = [
    { tax: "Withholding Tax (Expanded)", status: "Filed", dueDate: "Oct 10, 2026", amount: 2_140_000, filed: true },
    { tax: "Withholding Tax (Compensation)", status: "Filed", dueDate: "Oct 10, 2026", amount: 1_850_000, filed: true },
    { tax: "VAT (Monthly)", status: "Pending", dueDate: "Oct 20, 2026", amount: 3_420_000, filed: false },
    { tax: "SSS Contribution", status: "Filed", dueDate: "Oct 15, 2026", amount: 1_254_000, filed: true },
    { tax: "PhilHealth Contribution", status: "Pending", dueDate: "Oct 15, 2026", amount: 482_000, filed: false },
    { tax: "Pag-IBIG Contribution", status: "Filed", dueDate: "Oct 10, 2026", amount: 326_000, filed: true },
    { tax: "Income Tax (Quarterly)", status: "Due Soon", dueDate: "Nov 29, 2026", amount: 7_100_000, filed: false },
  ]

  return (
    <Card id="tax-compliance" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-100/80 dark:bg-cyan-900/30">
              <CirclePercent className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <CardTitle className="text-base">Tax Compliance Summary</CardTitle>
              <CardDescription className="text-xs">Tax filing statuses and upcoming obligations</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 text-xs">
              4 Filed
            </Badge>
            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700 text-xs">
              3 Pending
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Tax Type</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Due Date</th>
                <th className="text-right py-2 font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {taxItems.map((item) => (
                <tr key={item.tax} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3 font-medium">{item.tax}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      {item.filed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      ) : item.status === "Due Soon" ? (
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                      )}
                      <span className={`text-xs font-medium ${item.filed ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{item.dueDate}</td>
                  <td data-sensitive className="py-3 text-right font-semibold">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Governance & Risk ──────────────────────────────────────────────────────
function GovernanceRisk() {
  const auditTrail = [
    { action: "Disbursement Approved", user: "CFO - Maria Santos", timestamp: "Oct 12, 2026 14:32", reference: "DIS-2026-1040", amount: 3_200_000 },
    { action: "Budget Reallocation", user: "Controller - Juan Reyes", timestamp: "Oct 11, 2026 09:15", reference: "BUD-2026-0089", amount: 1_500_000 },
    { action: "Payroll Processing", user: "Treasurer - Ana Cruz", timestamp: "Oct 10, 2026 16:48", reference: "PAY-2026-1023", amount: 12_400_000 },
    { action: "Vendor Payment Released", user: "AP Manager - Pedro Lim", timestamp: "Oct 10, 2026 11:22", reference: "VND-2026-0456", amount: 890_000 },
    { action: "Tax Filing Submitted", user: "Tax Accountant - Lisa Tan", timestamp: "Oct 09, 2026 15:07", reference: "TAX-2026-0112", amount: 2_140_000 },
  ]

  const exceptions = [
    { type: "Over-budget", department: "Marketing", description: "Exceeded Q3 advertising budget by 12%", severity: "medium", date: "Oct 08, 2026" },
    { type: "Late Payment", vendor: "Globe Telecom", description: "Payment past due date by 5 days", severity: "low", date: "Oct 07, 2026" },
    { type: "Approval Bypass", user: "Operations Team", description: "Emergency purchase without pre-approval", severity: "high", date: "Oct 06, 2026" },
  ]

  const periodClose = [
    { period: "September 2026", status: "Closed", closedDate: "Oct 05, 2026", reconciled: true },
    { period: "August 2026", status: "Closed", closedDate: "Sep 05, 2026", reconciled: true },
    { period: "July 2026", status: "Closed", closedDate: "Aug 05, 2026", reconciled: true },
    { period: "October 2026", status: "Open", closedDate: "—", reconciled: false },
  ]

  return (
    <div id="governance-risk" className="space-y-6">
      {/* Audit Trail */}
      <Card id="audit-trail" className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-100/80 dark:bg-orange-900/30">
                <FileSearch className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-base">Audit Trail</CardTitle>
                <CardDescription className="text-xs">Read-only view of recent financial actions</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              <Eye className="h-3 w-3 mr-1" /> Read-Only
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditTrail.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                <div className="p-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 mt-0.5">
                  <ShieldCheck className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{entry.action}</p>
                    <span data-sensitive className="text-sm font-semibold shrink-0">{formatCurrency(entry.amount)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {entry.user} · {entry.reference} · {entry.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exception Reports */}
      <Card id="exception-reports" className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-red-100/80 dark:bg-red-900/30">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-base">Exception Reports</CardTitle>
                <CardDescription className="text-xs">Flagged items requiring attention</CardDescription>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">{exceptions.length} Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exceptions.map((exc, i) => {
              const severityColors: Record<string, string> = {
                high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
                medium: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
                low: "bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
              }

              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 mt-0.5">
                    {exc.severity === "high" ? (
                      <XCircle className="h-3 w-3 text-red-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{exc.type}</p>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${severityColors[exc.severity]}`}>
                        {exc.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{exc.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{exc.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Period Close Summary */}
      <Card id="period-close" className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/30">
              <CalendarCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-base">Period Close Summary</CardTitle>
              <CardDescription className="text-xs">Monthly close status and reconciliation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {periodClose.map((period) => (
              <div key={period.period} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {period.reconciled ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{period.period}</p>
                    <p className="text-xs text-muted-foreground">
                      {period.reconciled ? `Closed: ${period.closedDate}` : "Currently open"}
                    </p>
                  </div>
                </div>
                <Badge variant={period.reconciled ? "secondary" : "outline"} className={`text-xs ${period.reconciled ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300" : "text-amber-600 dark:text-amber-400"}`}>
                  {period.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── My Profile ─────────────────────────────────────────────────────────────
function MyProfile() {
  return (
    <Card id="my-profile" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
            <UserCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <CardTitle className="text-base">My Profile</CardTitle>
            <CardDescription className="text-xs">Account details and preferences</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                CEO
              </div>
              <div>
                <p className="text-lg font-semibold">Chief Executive Officer</p>
                <p className="text-sm text-muted-foreground">ceo@primepower.com</p>
                <Badge variant="outline" className="mt-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                  Executive Access
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Role</span>
                <span className="text-sm font-medium">CEO / President</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Department</span>
                <span className="text-sm font-medium">Executive Office</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Access Level</span>
                <span className="text-sm font-medium">Read-Only (Broad Visibility)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: "Viewed Disbursement Report", time: "2 hours ago" },
                { action: "Reviewed Exception Report", time: "5 hours ago" },
                { action: "Accessed Financial Overview", time: "1 day ago" },
                { action: "Viewed Cash Flow Statement", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="flex-1">{activity.action}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main CEO Dashboard Page ────────────────────────────────────────────────
export default function CeoDashboard() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [location.hash])

  return (
    <CeoLayout>
      <div className="flex-1 space-y-6 px-4 lg:px-6 pt-0">
        {/* Header */}
        <div className="flex md:flex-row flex-col md:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">CEO Executive Dashboard</h1>
            <p className="text-muted-foreground">
              High-level financial visibility across the organization · Read-only access
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
              <Eye className="h-3 w-3 mr-1" /> Executive View
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" /> Last updated: Oct 13, 2026
            </Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <ExecutiveKPICards />

        {/* Executive Financial Overview */}
        <ExecutiveFinancialOverview />

        {/* Financial Reporting */}
        <FinancialReporting />

        {/* Budget Management */}
        <BudgetManagement />

        {/* Cash Management */}
        <CashManagementSection />

        {/* Disbursement Approvals */}
        <DisbursementApprovals />

        {/* Collections & AR Summary */}
        <CollectionsARSummary />

        {/* Tax Compliance Summary */}
        <TaxComplianceSummary />

        {/* Governance & Risk */}
        <GovernanceRisk />

        {/* My Profile */}
        <MyProfile />
      </div>
    </CeoLayout>
  )
}
