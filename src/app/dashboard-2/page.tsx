import { BaseLayout } from "@/components/layouts/base-layout"
import { MetricsOverview } from "./components/metrics-overview"
import { SalesChart } from "./components/sales-chart"
import { RecentTransactions } from "./components/recent-transactions"
import { TopProducts } from "./components/top-products"
import { CustomerInsights } from "./components/customer-insights"
import { QuickActions } from "./components/quick-actions"
import { RevenueBreakdown } from "./components/revenue-breakdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount)

const statutoryPayables = [
  { label: "SSS", amount: 125400, note: "Due: Oct 15" },
  { label: "PhilHealth", amount: 48200, note: "Due: Oct 15" },
  { label: "Pag-IBIG", amount: 32600, note: "Due: Oct 10" },
  { label: "Withholding Tax", amount: 214800, note: "Due: Oct 10" },
  { label: "13th Month", amount: 890000, note: "Dec accrual" },
]

export default function Dashboard2() {
  return (
    <BaseLayout>
      <div className="flex-1 space-y-6 px-6 pt-0">
        {/* Enhanced Header */}

        <div className="flex md:flex-row flex-col md:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">PMS Operations & Manpower Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time workforce deployment, client billing, and recruitment pipeline across client sites
            </p>
          </div>
          <QuickActions />
        </div>

        {/* Main Dashboard Grid */}
        <div className="@container/main space-y-6">
          {/* Top Row - Key Metrics */}
          {/* Statutory Compliance Tracker */}
          <Link to="/tax-management">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
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
                        {formatCurrency(pay.amount)}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{pay.note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <MetricsOverview />

          {/* Second Row - Charts in 6-6 columns */}
          <div className="grid gap-6 grid-cols-1 @5xl:grid-cols-2">
            <SalesChart />
            <RevenueBreakdown />
          </div>

          {/* Third Row - Two Column Layout */}
          <div className="grid gap-6 grid-cols-1 @5xl:grid-cols-2">
            <RecentTransactions />
            <TopProducts />
          </div>

          {/* Fourth Row - Customer Insights and Team Performance */}
          <CustomerInsights />
        </div>
      </div>
    </BaseLayout>
  )
}
