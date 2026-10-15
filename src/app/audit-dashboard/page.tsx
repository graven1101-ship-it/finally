import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { AuditLayout } from "@/components/layouts/audit-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ShieldCheck,
  ShieldAlert,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  Clock,
  History,
  FolderCheck,
  UserCircle,
  Eye,
  BarChart3,
  BookOpen,
  Receipt,
  Wallet,
  CirclePercent,
  Building2,
  FileCheck,
  FileText,
  AlertCircle,
  TrendingUp,
  Scale,
  Search,
  Lock,
} from "lucide-react"

// ─── Formatting Helpers ─────────────────────────────────────────────────────
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount)

const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-PH").format(num)

// ─── 1. Top Audit KPIs ──────────────────────────────────────────────────────
function AuditDashboardKPIs() {
  const kpis = [
    {
      title: "Control Effectiveness",
      value: "98.4%",
      subtext: "48/48 key controls tested",
      status: "Compliant",
      statusColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100/80 dark:bg-emerald-900/30",
      icon: ShieldCheck,
    },
    {
      title: "Active Audit Findings",
      value: "2",
      subtext: "1 Medium, 1 Low severity",
      status: "Under Review",
      statusColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100/80 dark:bg-amber-900/30",
      icon: AlertTriangle,
    },
    {
      title: "Trial Balance Status",
      value: "Balanced",
      subtext: "₱452.18M debits = credits",
      status: "Verified",
      statusColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100/80 dark:bg-blue-900/30",
      icon: Scale,
    },
    {
      title: "Bank Reconciliations",
      value: "100%",
      subtext: "4 of 4 accounts reconciled",
      status: "Clean",
      statusColor: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100/80 dark:bg-teal-900/30",
      icon: Wallet,
    },
    {
      title: "3-Way Matching Rate",
      value: "99.4%",
      subtext: "PO, Receipt & Invoice align",
      status: "Passing",
      statusColor: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-100/80 dark:bg-violet-900/30",
      icon: FileCheck,
    },
    {
      title: "Period Close Evidence",
      value: "100%",
      subtext: "All schedules signed-off",
      status: "Complete",
      statusColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100/80 dark:bg-indigo-900/30",
      icon: FolderCheck,
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.statusColor}`} />
              </div>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium ${kpi.statusColor}`}>
                {kpi.status}
              </Badge>
            </div>
            <div data-sensitive className="text-xl font-bold tracking-tight">{kpi.value}</div>
            <p className="text-xs font-medium text-foreground mt-0.5">{kpi.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{kpi.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ─── 2. Financial Reporting & Analytics (Audit Review) ──────────────────────
function FinancialReportingReview() {
  const financialStatements = [
    { statement: "Balance Sheet (Statement of Financial Position)", period: "Q3 2026", auditorSignoff: "Approved", signoffDate: "Oct 10, 2026", status: "Verified", note: "Assets = Liabilities + Equity confirmed" },
    { statement: "Income Statement (Profit & Loss)", period: "Q3 2026", auditorSignoff: "Approved", signoffDate: "Oct 10, 2026", status: "Verified", note: "Revenue recognition IAS 18 compliant" },
    { statement: "Statement of Cash Flows", period: "Q3 2026", auditorSignoff: "Under Review", signoffDate: "Oct 12, 2026", status: "Sampled", note: "Financing cashflow re-verification" },
    { statement: "Statement of Changes in Equity", period: "Q3 2026", auditorSignoff: "Approved", signoffDate: "Oct 09, 2026", status: "Verified", note: "Retained earnings reconciliation verified" },
  ]

  const analyticalReview = [
    { metric: "Gross Margin Fluctuations", priorPeriod: "33.8%", currentPeriod: "34.2%", variance: "+0.4%", risk: "Low", comment: "Within normal expected boundary" },
    { metric: "SG&A / Revenue Ratio", priorPeriod: "16.1%", currentPeriod: "15.8%", variance: "-0.3%", risk: "Low", comment: "Efficiency improvements verified" },
    { metric: "Inventory / Supplies Turnover", priorPeriod: "8.4x", currentPeriod: "8.1x", variance: "-0.3x", risk: "Low", comment: "Uniform and supplies buffer check complete" },
    { metric: "Effective Tax Rate Variance", priorPeriod: "25.0%", currentPeriod: "24.8%", variance: "-0.2%", risk: "Low", comment: "Tax credits documentation valid" },
  ]

  return (
    <div id="financial-reporting" className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Statement Audit Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/30">
                <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-base">Financial Reporting Compliance</CardTitle>
                <CardDescription className="text-xs">Formal audit verification of core statements</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300">
              <Lock className="h-3 w-3 mr-1" /> Read-Only
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {financialStatements.map((fs) => (
              <div key={fs.statement} className="p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold truncate">{fs.statement}</span>
                  <Badge variant={fs.status === "Verified" ? "secondary" : "outline"} className={fs.status === "Verified" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs" : "text-amber-600 text-xs"}>
                    {fs.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{fs.note}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
                  <span>Period: {fs.period}</span>
                  <span>Sign-off: {fs.signoffDate}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytical Procedures */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30">
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Analytical Review Procedures</CardTitle>
                <CardDescription className="text-xs">Substantive analytical variance analysis</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">ISA 520 Compliant</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyticalReview.map((item) => (
              <div key={item.metric} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300">
                    Risk: {item.risk}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs mt-1.5 text-muted-foreground">
                  <span>Prior: <strong className="text-foreground">{item.priorPeriod}</strong></span>
                  <span>Current: <strong className="text-foreground">{item.currentPeriod}</strong></span>
                  <span>Variance: <strong className="text-emerald-600">{item.variance}</strong></span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── 3. General Ledger (Read-Only) ──────────────────────────────────────────
function GeneralLedgerReview() {
  const ledgerChecks = [
    { accountCode: "1010-00", accountName: "Cash & Cash Equivalents", debits: 45_600_000, credits: 0, status: "Reconciled", samplingCount: "125 sampled" },
    { accountCode: "1200-00", accountName: "Accounts Receivable - Trade", debits: 32_150_000, credits: 0, status: "Reconciled", samplingCount: "84 sampled" },
    { accountCode: "2010-00", accountName: "Accounts Payable - Trade", debits: 0, credits: 18_420_000, status: "Reconciled", samplingCount: "92 sampled" },
    { accountCode: "2100-00", accountName: "Accrued Statutory Liabilities", debits: 0, credits: 4_210_000, status: "Reconciled", samplingCount: "35 sampled" },
    { accountCode: "4000-00", accountName: "Service Revenue", debits: 0, credits: 187_450_000, status: "Sampled", samplingCount: "210 sampled" },
    { accountCode: "5000-00", accountName: "Direct Labor & Payroll", debits: 118_200_000, credits: 0, status: "Reconciled", samplingCount: "160 sampled" },
  ]

  const manualJournalAlerts = [
    { id: "JE-2026-0941", postedBy: "Chief Accountant", date: "Sep 30, 2026", amount: 4_500_000, reason: "Period-end bonus accrual adjustment", reviewStatus: "Cleared" },
    { id: "JE-2026-0945", postedBy: "Controller", date: "Oct 02, 2026", amount: 1_200_000, reason: "Depreciation recalculation per schedule", reviewStatus: "Cleared" },
    { id: "JE-2026-0952", postedBy: "Sr. Accountant", date: "Oct 05, 2026", amount: 850_000, reason: "Prepaid insurance amortization correction", reviewStatus: "Under Review" },
  ]

  return (
    <Card id="general-ledger" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-900/30">
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">General Ledger Sampling & Trial Balance</CardTitle>
              <CardDescription className="text-xs">Read-only verification of trial balance accounts and manual journal entries</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Debits/Credits Balanced
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left py-2">Code</th>
                <th className="text-left py-2">Account Name</th>
                <th className="text-right py-2">Debit Balance</th>
                <th className="text-right py-2">Credit Balance</th>
                <th className="text-center py-2">Audit Status</th>
                <th className="text-right py-2">Sample Size</th>
              </tr>
            </thead>
            <tbody>
              {ledgerChecks.map((row) => (
                <tr key={row.accountCode} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{row.accountCode}</td>
                  <td className="py-2.5 font-medium">{row.accountName}</td>
                  <td data-sensitive className="py-2.5 text-right font-mono text-xs">
                    {row.debits > 0 ? formatCurrency(row.debits) : "—"}
                  </td>
                  <td data-sensitive className="py-2.5 text-right font-mono text-xs">
                    {row.credits > 0 ? formatCurrency(row.credits) : "—"}
                  </td>
                  <td className="py-2.5 text-center">
                    <Badge variant="outline" className={`text-[10px] ${row.status === "Reconciled" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-right text-xs text-muted-foreground">{row.samplingCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
            Manual Journal Entry Sampling (High Value & Cut-Off Review)
          </h4>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {manualJournalAlerts.map((je) => (
              <div key={je.id} className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-semibold">{je.id}</span>
                  <Badge variant={je.reviewStatus === "Cleared" ? "secondary" : "outline"} className={`text-[10px] ${je.reviewStatus === "Cleared" ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`}>
                    {je.reviewStatus}
                  </Badge>
                </div>
                <div data-sensitive className="text-sm font-bold text-foreground mb-1">{formatCurrency(je.amount)}</div>
                <p className="text-xs text-muted-foreground line-clamp-1">{je.reason}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2 pt-2 border-t">
                  <span>{je.postedBy}</span>
                  <span>{je.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 4. AP / AR Review (Read-Only) ──────────────────────────────────────────
function APARReview() {
  const apAuditPoints = [
    { title: "Three-Way Matching Compliance", metric: "99.4%", description: "Purchase Order, Receiving Report, and Vendor Invoice matched prior to payment release", status: "Healthy" },
    { title: "Duplicate Invoice Scan", metric: "0 Flagged", description: "System automated hash and invoice number duplication filter verified", status: "Zero Risk" },
    { title: "Approved Vendor Master Compliance", metric: "100%", description: "142 active vendors verified with complete BIR Form 2303 & SEC registrations", status: "Healthy" },
  ]

  const arAuditPoints = [
    { title: "DSO (Days Sales Outstanding)", metric: "38.2 Days", description: "Target benchmark is <45 days. Average collection duration within policy tolerance", status: "Compliant" },
    { title: "Allowance for Doubtful Accounts", metric: "₱2,140,000", description: "Provision tested against expected credit loss (ECL) model under PFRS 9", status: "Adequate" },
    { title: "Unauthorized Credit Overrides", metric: "0 Detected", description: "All customer credit limit extensions verified with proper Credit Committee approvals", status: "Zero Risk" },
  ]

  return (
    <div id="ap-ar-review" className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* AP Review */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-100/80 dark:bg-violet-900/30">
                <Receipt className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <CardTitle className="text-base">Accounts Payable Audit Review</CardTitle>
                <CardDescription className="text-xs">Disbursement controls, duplicate detection & vendor integrity</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">Read-Only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apAuditPoints.map((item) => (
              <div key={item.title} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{item.title}</span>
                  <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[10px]">
                    {item.status}
                  </Badge>
                </div>
                <div data-sensitive className="text-lg font-bold text-violet-600 dark:text-violet-400 my-1">
                  {item.metric}
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AR Review */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-100/80 dark:bg-teal-900/30">
                <FileSearch className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <CardTitle className="text-base">Accounts Receivable Audit Review</CardTitle>
                <CardDescription className="text-xs">Allowance adequacy, aging validation & credit enforcement</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">Read-Only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {arAuditPoints.map((item) => (
              <div key={item.title} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{item.title}</span>
                  <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[10px]">
                    {item.status}
                  </Badge>
                </div>
                <div data-sensitive className="text-lg font-bold text-teal-600 dark:text-teal-400 my-1">
                  {item.metric}
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── 5. Cash Management Review (Read-Only) ──────────────────────────────────
function CashManagementReview() {
  const bankReconciliations = [
    { bank: "Banco de Oro (BDO)", accountNo: "****3821", glBalance: 18_200_000, bankBalance: 18_200_000, reconcilingDiff: 0, status: "Reconciled", verifiedDate: "Oct 10, 2026" },
    { bank: "Bank of the Philippine Islands (BPI)", accountNo: "****9104", glBalance: 12_400_000, bankBalance: 12_400_000, reconcilingDiff: 0, status: "Reconciled", verifiedDate: "Oct 10, 2026" },
    { bank: "Metrobank Reserve Account", accountNo: "****5542", glBalance: 8_500_000, bankBalance: 8_500_000, reconcilingDiff: 0, status: "Reconciled", verifiedDate: "Oct 10, 2026" },
    { bank: "Philippine National Bank (PNB)", accountNo: "****1198", glBalance: 6_500_000, bankBalance: 6_500_000, reconcilingDiff: 0, status: "Reconciled", verifiedDate: "Oct 10, 2026" },
  ]

  return (
    <Card id="cash-management" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-100/80 dark:bg-teal-900/30">
              <Wallet className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-base">Cash Management & Bank Reconciliation Audit</CardTitle>
              <CardDescription className="text-xs">Third-party bank statement reconciliation and dual-signatory verification</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Reconciling Differences: ₱0.00
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left py-2">Bank & Depository</th>
                <th className="text-left py-2">Account</th>
                <th className="text-right py-2">GL Balance</th>
                <th className="text-right py-2">Bank Confirmed</th>
                <th className="text-right py-2">Difference</th>
                <th className="text-center py-2">Audit Status</th>
                <th className="text-right py-2">Verified Date</th>
              </tr>
            </thead>
            <tbody>
              {bankReconciliations.map((rec) => (
                <tr key={rec.accountNo} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 font-medium flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    {rec.bank}
                  </td>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{rec.accountNo}</td>
                  <td data-sensitive className="py-2.5 text-right font-mono text-xs">{formatCurrency(rec.glBalance)}</td>
                  <td data-sensitive className="py-2.5 text-right font-mono text-xs font-semibold">{formatCurrency(rec.bankBalance)}</td>
                  <td data-sensitive className="py-2.5 text-right font-mono text-xs text-emerald-600">
                    {formatCurrency(rec.reconcilingDiff)}
                  </td>
                  <td className="py-2.5 text-center">
                    <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[10px]">
                      {rec.status}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-right text-xs text-muted-foreground">{rec.verifiedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 6. Tax Compliance Review (Read-Only) ────────────────────────────────────
function TaxComplianceReview() {
  const taxAudits = [
    { agency: "Bureau of Internal Revenue", returnType: "BIR Form 1601-EQ (Expanded Withholding)", filingDate: "Oct 10, 2026", paymentRef: "BDO-eFPS-89210", amount: 2_140_000, complianceStatus: "Verified" },
    { agency: "Bureau of Internal Revenue", returnType: "BIR Form 1601-C (Compensation Withholding)", filingDate: "Oct 10, 2026", paymentRef: "BDO-eFPS-89211", amount: 1_850_000, complianceStatus: "Verified" },
    { agency: "Bureau of Internal Revenue", returnType: "BIR Form 2550M (Monthly Value-Added Tax)", filingDate: "Pending (Due Oct 20)", paymentRef: "Scheduled in eFPS", amount: 3_420_000, complianceStatus: "On Schedule" },
    { agency: "Social Security System", returnType: "SSS R-3 Monthly Remittance Return", filingDate: "Oct 10, 2026", paymentRef: "SSS-MCR-202610", amount: 1_254_000, complianceStatus: "Verified" },
    { agency: "PhilHealth", returnType: "PhilHealth Electronic Remittance (EPRS)", filingDate: "Pending (Due Oct 15)", paymentRef: "Scheduled via EPRS", amount: 482_000, complianceStatus: "On Schedule" },
    { agency: "Pag-IBIG Fund", returnType: "HDMF Monthly Remittance Schedule", filingDate: "Oct 09, 2026", paymentRef: "HDMF-EP-10492", amount: 326_000, complianceStatus: "Verified" },
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
              <CardTitle className="text-base">Tax Compliance & Statutory Remittance Review</CardTitle>
              <CardDescription className="text-xs">eFPS confirmation numbers, statutory returns, and exposure assessment</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200">
            Tax Exposure: ₱0.00 (Zero Deficiencies)
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left py-2">Regulatory Authority</th>
                <th className="text-left py-2">Tax / Statutory Return</th>
                <th className="text-left py-2">Filing Status / Date</th>
                <th className="text-left py-2">Confirmation / eFPS Ref</th>
                <th className="text-right py-2">Remitted Amount</th>
                <th className="text-center py-2">Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {taxAudits.map((item, idx) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 font-medium">{item.agency}</td>
                  <td className="py-2.5 text-xs text-foreground">{item.returnType}</td>
                  <td className="py-2.5 text-xs text-muted-foreground">{item.filingDate}</td>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{item.paymentRef}</td>
                  <td data-sensitive className="py-2.5 text-right font-mono text-xs font-semibold">{formatCurrency(item.amount)}</td>
                  <td className="py-2.5 text-center">
                    <Badge variant="outline" className={`text-[10px] ${item.complianceStatus === "Verified" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                      {item.complianceStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 7. Governance & Risk Section ───────────────────────────────────────────
function GovernanceAndRiskAudit() {
  const auditTrailLogs = [
    { logId: "AUD-2026-8812", user: "Maria Santos (CFO)", role: "Approver", action: "Disbursement Approval released for Uniforms Corp", ref: "DIS-2026-1045", ip: "192.168.10.45", timestamp: "Oct 12, 2026 14:32:11", severity: "Normal" },
    { logId: "AUD-2026-8811", user: "Juan Reyes (Controller)", role: "Approver", action: "Budget reallocation from Ops Reserve to IT Maintenance", ref: "BUD-2026-0089", ip: "192.168.10.22", timestamp: "Oct 11, 2026 09:15:02", severity: "Normal" },
    { logId: "AUD-2026-8810", user: "Ana Cruz (Treasurer)", role: "Disburser", action: "Payroll wire batch released to BPI Payroll portal", ref: "PAY-2026-1023", ip: "192.168.10.18", timestamp: "Oct 10, 2026 16:48:33", severity: "Normal" },
    { logId: "AUD-2026-8809", user: "SysAdmin - Dave O.", role: "Admin", action: "Role permission audit log export initiated", ref: "SEC-LOG-0044", ip: "192.168.10.05", timestamp: "Oct 10, 2026 13:02:45", severity: "Low" },
    { logId: "AUD-2026-8808", user: "Lisa Tan (Tax Accountant)", role: "Filer", action: "eFPS Return submission confirmed with BIR portal", ref: "TAX-2026-0112", ip: "192.168.10.31", timestamp: "Oct 09, 2026 15:07:29", severity: "Normal" },
  ]

  const exceptionReports = [
    { id: "EXC-2026-04", category: "Budget Control", title: "Marketing Q3 Budget Exceeded (+12%)", details: "Ad-hoc campaign approved without supplementary budget token. Retroactive board notification required.", severity: "Medium", status: "Mitigation Plan Submitted", assignee: "Marketing Head & CFO" },
    { id: "EXC-2026-03", category: "AP Policy", title: "Vendor Payment Past Due (5 Days)", details: "Globe Telecom utility invoice delayed due to invoice mismatch at branch office. Resolved Oct 09.", severity: "Low", status: "Closed", assignee: "AP Lead" },
    { id: "EXC-2026-02", category: "Segregation of Duties", title: "Dual Signature Warning on Emergency Check", details: "Check voucher voucher #CK-402 signed by Controller and verified by Treasurer within emergency limit.", severity: "Low", status: "Verified & Approved", assignee: "Internal Auditor" },
  ]

  const approvalHistory = [
    { seq: "1", stage: "Accounting Review", approver: "Sr. Accountant - R. Garcia", status: "Passed", timestamp: "Oct 11, 2026 10:15", hash: "SHA256: 8f4c...391a" },
    { seq: "2", stage: "Controller Verification", approver: "Controller - Juan Reyes", status: "Passed", timestamp: "Oct 11, 2026 11:42", hash: "SHA256: 4b2e...91bc" },
    { seq: "3", stage: "CFO Authorization", approver: "CFO - Maria Santos", status: "Passed", timestamp: "Oct 11, 2026 14:20", hash: "SHA256: 1d9a...74ff" },
    { seq: "4", stage: "Executive Oversight / Board", approver: "Audit Committee Chair", status: "Review Completed", timestamp: "Oct 12, 2026 09:00", hash: "SHA256: 77a1...88de" },
  ]

  const periodCloseEvidence = [
    { item: "Subledger to General Ledger Reconciliation Schedules", binderRef: "SCHEDULE-GL-0926", verifiedBy: "External Audit Staff", date: "Oct 05, 2026", status: "Archived (Signed)" },
    { item: "Bank Confirmation Certificates & Direct Statements", binderRef: "BANK-CONF-0926", verifiedBy: "Audit Committee", date: "Oct 06, 2026", status: "Archived (Signed)" },
    { item: "Physical Asset & Inventory Count Sheets", binderRef: "PHYS-INV-0926", verifiedBy: "Internal Audit Team", date: "Oct 04, 2026", status: "Archived (Signed)" },
    { item: "Legal Representation Letter (Litigation Contingencies)", binderRef: "LEGAL-REP-0926", verifiedBy: "General Counsel", date: "Oct 07, 2026", status: "Archived (Signed)" },
    { item: "Management Representation Letter (MRL)", binderRef: "MRL-Q3-2026", verifiedBy: "CEO & CFO", date: "Oct 08, 2026", status: "Archived (Signed)" },
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
                <CardTitle className="text-base">Audit Trail (Immutable System Log)</CardTitle>
                <CardDescription className="text-xs">Continuous read-only ledger of financial mutations and executive authorizations</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              <ShieldCheck className="h-3 w-3 mr-1 text-emerald-500" /> Tamper-Proof
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {auditTrailLogs.map((log) => (
              <div key={log.logId} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors gap-2">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-orange-50 dark:bg-orange-900/30 mt-0.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-foreground">{log.logId}</span>
                      <span className="text-xs font-medium text-foreground">{log.action}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>User: <strong className="text-foreground">{log.user}</strong></span>
                      <span>·</span>
                      <span>Ref: <strong className="font-mono">{log.ref}</strong></span>
                      <span>·</span>
                      <span>IP: <strong className="font-mono">{log.ip}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground sm:text-right shrink-0">
                  <span>{log.timestamp}</span>
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
                <CardDescription className="text-xs">Flagged internal control variations and threshold violations</CardDescription>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">
              {exceptionReports.filter((e) => e.status !== "Closed").length} Open Items
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exceptionReports.map((exc) => (
              <div key={exc.id} className="p-3.5 rounded-lg border hover:bg-muted/40 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[10px]">{exc.id}</Badge>
                    <span className="text-sm font-semibold text-foreground">{exc.title}</span>
                  </div>
                  <Badge variant={exc.severity === "Medium" ? "outline" : "secondary"} className={`text-[10px] ${exc.severity === "Medium" ? "border-amber-300 text-amber-700 bg-amber-50" : "text-slate-600"}`}>
                    {exc.severity} Severity
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{exc.details}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
                  <span>Status: <strong className="text-foreground">{exc.status}</strong></span>
                  <span>Assignee: {exc.assignee}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approval History */}
      <Card id="approval-history" className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-900/30">
                <History className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Approval History & Segregation of Duties</CardTitle>
                <CardDescription className="text-xs">Verification of multi-tier authorization hierarchy</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              Delegation of Authority Valid
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {approvalHistory.map((step) => (
              <div key={step.seq} className="p-3.5 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Stage {step.seq}</span>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-[10px]">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> {step.status}
                  </Badge>
                </div>
                <p className="text-sm font-semibold">{step.stage}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.approver}</p>
                <div className="text-[11px] text-muted-foreground mt-2 pt-2 border-t">
                  <div>{step.timestamp}</div>
                  <div className="font-mono text-[10px] text-muted-foreground truncate mt-0.5">{step.hash}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Period Close Evidence */}
      <Card id="period-close-evidence" className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/30">
                <FolderCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-base">Period Close Evidence Binder</CardTitle>
                <CardDescription className="text-xs">Statutory and internal audit supporting working papers</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
              5/5 Schedules Signed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {periodCloseEvidence.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.item}</p>
                    <p className="text-xs text-muted-foreground font-mono">{doc.binderRef} · Signed by {doc.verifiedBy} ({doc.date})</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">
                    {doc.status}
                  </Badge>
                  <Eye className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── 8. My Profile ──────────────────────────────────────────────────────────
function MyProfileAudit() {
  return (
    <Card id="my-profile" className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
            <UserCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <CardTitle className="text-base">Audit Committee Profile & Credentials</CardTitle>
            <CardDescription className="text-xs">Committee membership, credentials, and independent governance access</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                AC
              </div>
              <div>
                <p className="text-lg font-semibold">Audit Committee / Internal Audit</p>
                <p className="text-sm text-muted-foreground">audit.committee@primepower.com</p>
                <Badge variant="outline" className="mt-1 text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200">
                  Independent Supervisory Access
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Governance Role</span>
                <span className="text-sm font-medium">Audit Committee Member / Chair</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Supervisory Scope</span>
                <span className="text-sm font-medium">Internal Controls, Financial Integrity & Risk</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">System Permissions</span>
                <span className="text-sm font-medium">Broad Read-Only / Zero Transactional Authority</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Engagement Status</span>
                <span className="text-sm font-medium text-emerald-600">Active (FY 2026-2027)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Recent Supervisory Actions</h3>
            <div className="space-y-3">
              {[
                { action: "Inspected Period Close Binder for Q3 2026", time: "1 hour ago" },
                { action: "Sampled General Ledger Post-Cutoff Journal Entries", time: "3 hours ago" },
                { action: "Reviewed 3-Way Matching Compliance Metrics", time: "Yesterday" },
                { action: "Verified BIR Form 1601-EQ eFPS Remittance confirmation", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
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

// ─── Main Audit Dashboard Page ──────────────────────────────────────────────
export default function AuditDashboard() {
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
    <AuditLayout>
      <div className="flex-1 space-y-6 px-4 lg:px-6 pt-0">
        {/* Header */}
        <div className="flex md:flex-row flex-col md:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Audit Committee & Supervisory Dashboard</h1>
            <p className="text-muted-foreground">
              Independent oversight of financial reports, internal controls, statutory compliance, and governance trails
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200">
              <Eye className="h-3 w-3 mr-1" /> Supervisory View (Read-Only)
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" /> Period: Q3-Q4 2026
            </Badge>
          </div>
        </div>

        {/* Audit Dashboard Overview KPIs */}
        <AuditDashboardKPIs />

        {/* Financial Reporting & Analytics */}
        <FinancialReportingReview />

        {/* General Ledger (read-only) */}
        <GeneralLedgerReview />

        {/* AP / AR Review (read-only) */}
        <APARReview />

        {/* Cash Management Review (read-only) */}
        <CashManagementReview />

        {/* Tax Compliance Review (read-only) */}
        <TaxComplianceReview />

        {/* Governance & Risk (Audit Trail, Exceptions, Approvals, Close Evidence) */}
        <GovernanceAndRiskAudit />

        {/* My Profile */}
        <MyProfileAudit />
      </div>
    </AuditLayout>
  )
}
