"use client"

import * as React from "react"
import {
  Building2,
  Car,
  Wrench,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  PackageSearch,
  BarChart3,
  FileText,
  Monitor,
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

// ─── Formatters ───────────────────────────────────────────────────────────────
const money = (v = 0) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(v)

const pct = (v: number) => `${v.toFixed(1)}%`

// ─── Asset Categories for PMS Prime Power ─────────────────────────────────────
const assetCategories = [
  {
    label: "Property & Equipment",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    totalCost: 3_800_000,
    bookValue: 2_650_000,
    items: [
      "Office Building (Leasehold Improvements)",
      "Generator Sets & Power Equipment",
      "HQ Facility — Makati",
      "Cebu Regional Office",
      "Davao Site Office",
    ],
  },
  {
    label: "Vehicles & Field Fleet",
    icon: Car,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    totalCost: 1_250_000,
    bookValue: 820_000,
    items: [
      "Service Van — Metro Manila",
      "Pickup Truck — Cebu",
      "Service Van — Davao",
      "Motorcycle (Field Staff x4)",
    ],
  },
  {
    label: "IT & Office Equipment",
    icon: Monitor,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    totalCost: 480_000,
    bookValue: 290_000,
    items: [
      "Laptops & Workstations (x22)",
      "CCTV & Security Systems",
      "Networking & Servers",
      "Printers & Peripherals",
    ],
  },
  {
    label: "Tools & Machinery",
    icon: Wrench,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    totalCost: 620_000,
    bookValue: 410_000,
    items: [
      "Heavy Tools & Equipment",
      "Safety & PPE Stock",
      "Specialized Power Tools",
      "Test & Measurement Instruments",
    ],
  },
]

// ─── Asset Register ───────────────────────────────────────────────────────────
type AssetStatus = "active" | "under-maintenance" | "disposed" | "fully-depreciated"

interface AssetEntry {
  id: string
  name: string
  category: string
  acquisitionDate: string
  cost: number
  usefulLife: number
  accumulatedDepreciation: number
  bookValue: number
  status: AssetStatus
  location: string
}

const assetRegister: AssetEntry[] = [
  { id: "AST-001", name: "Generator Set — 500KVA", category: "Property & Equipment", acquisitionDate: "2022-03-15", cost: 1_200_000, usefulLife: 10, accumulatedDepreciation: 360_000, bookValue: 840_000, status: "active", location: "Makati HQ" },
  { id: "AST-002", name: "Leasehold Improvement — Makati", category: "Property & Equipment", acquisitionDate: "2021-01-10", cost: 850_000, usefulLife: 5, accumulatedDepreciation: 680_000, bookValue: 170_000, status: "active", location: "Makati HQ" },
  { id: "AST-003", name: "Service Van (Toyota HiAce)", category: "Vehicles & Field Fleet", acquisitionDate: "2023-07-20", cost: 380_000, usefulLife: 5, accumulatedDepreciation: 114_000, bookValue: 266_000, status: "active", location: "Metro Manila" },
  { id: "AST-004", name: "Pickup Truck (Mitsubishi Strada)", category: "Vehicles & Field Fleet", acquisitionDate: "2022-11-01", cost: 620_000, usefulLife: 5, accumulatedDepreciation: 248_000, bookValue: 372_000, status: "under-maintenance", location: "Cebu Regional" },
  { id: "AST-005", name: "Laptops — Batch 2024 (x10)", category: "IT & Office Equipment", acquisitionDate: "2024-01-15", cost: 180_000, usefulLife: 3, accumulatedDepreciation: 60_000, bookValue: 120_000, status: "active", location: "All Branches" },
  { id: "AST-006", name: "CCTV & Surveillance System", category: "IT & Office Equipment", acquisitionDate: "2022-06-01", cost: 95_000, usefulLife: 3, accumulatedDepreciation: 95_000, bookValue: 0, status: "fully-depreciated", location: "Makati HQ" },
  { id: "AST-007", name: "Power Tools — Field Set", category: "Tools & Machinery", acquisitionDate: "2023-03-10", cost: 240_000, usefulLife: 5, accumulatedDepreciation: 72_000, bookValue: 168_000, status: "active", location: "Field Operations" },
  { id: "AST-008", name: "Test & Measurement Instruments", category: "Tools & Machinery", acquisitionDate: "2021-08-05", cost: 185_000, usefulLife: 5, accumulatedDepreciation: 148_000, bookValue: 37_000, status: "active", location: "Field Operations" },
  { id: "AST-009", name: "Generator Set — 100KVA (Cebu)", category: "Property & Equipment", acquisitionDate: "2023-09-01", cost: 580_000, usefulLife: 10, accumulatedDepreciation: 87_000, bookValue: 493_000, status: "active", location: "Cebu Regional" },
  { id: "AST-010", name: "Service Van — Davao (Disposed)", category: "Vehicles & Field Fleet", acquisitionDate: "2018-04-22", cost: 250_000, usefulLife: 5, accumulatedDepreciation: 250_000, bookValue: 0, status: "disposed", location: "Davao Site" },
]

// ─── Depreciation Schedule CY2026 ────────────────────────────────────────────
const monthlyDepreciation = 38_250
const depSchedule = [
  { month: "Jan 2026", amount: 38_250, cumulative: 38_250 },
  { month: "Feb 2026", amount: 38_250, cumulative: 76_500 },
  { month: "Mar 2026", amount: 38_250, cumulative: 114_750 },
  { month: "Apr 2026", amount: 38_250, cumulative: 153_000 },
  { month: "May 2026", amount: 38_250, cumulative: 191_250 },
  { month: "Jun 2026", amount: 38_250, cumulative: 229_500 },
  { month: "Jul 2026", amount: 38_250, cumulative: 267_750 },
  { month: "Aug 2026", amount: 38_250, cumulative: 306_000 },
  { month: "Sep 2026", amount: 38_250, cumulative: 344_250 },
  { month: "Oct 2026", amount: 38_250, cumulative: 382_500 },
  { month: "Nov 2026", amount: 38_250, cumulative: 420_750 },
  { month: "Dec 2026", amount: 38_250, cumulative: 459_000 },
]

const statusMeta: Record<AssetStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  "under-maintenance": { label: "Under Maintenance", variant: "secondary" },
  disposed: { label: "Disposed", variant: "destructive" },
  "fully-depreciated": { label: "Fully Depreciated", variant: "outline" },
}

const totalCost = assetRegister.reduce((s, a) => s + a.cost, 0)
const totalBookValue = assetRegister.reduce((s, a) => s + a.bookValue, 0)
const totalAccumDep = assetRegister.reduce((s, a) => s + a.accumulatedDepreciation, 0)
const activeCount = assetRegister.filter((a) => a.status === "active").length
const maintenanceCount = assetRegister.filter((a) => a.status === "under-maintenance").length
const depreciationRate = (totalAccumDep / totalCost) * 100

export default function AssetsPage() {
  return (
    <BaseLayout
      title="Assets"
      description="Asset register, depreciation schedule, and category breakdown for PMS Prime Power."
    >
      {/* KPI Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Asset Cost</CardTitle>
            <PackageSearch className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold">{money(totalCost)}</div>
            <p className="text-xs text-muted-foreground">{assetRegister.length} registered assets</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Book Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold">{money(totalBookValue)}</div>
            <p className="text-xs text-muted-foreground">
              {pct((totalBookValue / totalCost) * 100)} of original cost
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accumulated Depreciation</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold text-rose-600 dark:text-rose-400">{money(totalAccumDep)}</div>
            <Progress value={depreciationRate} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">{pct(depreciationRate)} depreciated</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Depreciation</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div data-sensitive className="text-2xl font-bold">{money(monthlyDepreciation)}</div>
            <p className="text-xs text-muted-foreground">
              {activeCount} active · {maintenanceCount} in maintenance
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-3 px-4 lg:px-6">
        <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="font-medium">{activeCount}</span>
          <span className="text-muted-foreground">Active</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
          <Clock className="h-4 w-4 text-amber-500" />
          <span className="font-medium">{maintenanceCount}</span>
          <span className="text-muted-foreground">Under Maintenance</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {assetRegister.filter((a) => a.status === "fully-depreciated" || a.status === "disposed").length}
          </span>
          <span className="text-muted-foreground">Deprecated / Disposed</span>
        </div>
      </div>

      {/* Category Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
        {assetCategories.map((cat) => {
          const dep = cat.totalCost - cat.bookValue
          const depPct = (dep / cat.totalCost) * 100
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
                  <span className="text-muted-foreground">Cost</span>
                  <span data-sensitive className="font-medium">{money(cat.totalCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Book Value</span>
                  <span data-sensitive className={`font-semibold ${cat.color}`}>{money(cat.bookValue)}</span>
                </div>
                <Progress value={depPct} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{pct(depPct)} depreciated</p>
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

      {/* Tabs */}
      <div className="px-4 lg:px-6 pb-6">
        <Tabs defaultValue="register" className="space-y-4">
          <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="register">Asset Register</TabsTrigger>
            <TabsTrigger value="depreciation">Depreciation Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Asset Register — PMS Prime Power</CardTitle>
                <CardDescription>
                  Complete list of company assets across all branches (Makati HQ, Cebu, Davao).
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[90px]">Asset ID</TableHead>
                        <TableHead>Asset Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                        <TableHead className="text-right">Accum. Dep.</TableHead>
                        <TableHead className="text-right">Book Value</TableHead>
                        <TableHead>Life</TableHead>
                        <TableHead>Acquired</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assetRegister.map((asset) => (
                        <TableRow key={asset.id} className="text-sm">
                          <TableCell className="font-mono text-xs text-muted-foreground">{asset.id}</TableCell>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell className="text-muted-foreground">{asset.category}</TableCell>
                          <TableCell className="text-muted-foreground">{asset.location}</TableCell>
                          <TableCell data-sensitive className="text-right">{money(asset.cost)}</TableCell>
                          <TableCell className="text-right text-rose-600 dark:text-rose-400">
                            {asset.accumulatedDepreciation > 0 ? <span data-sensitive>{`(${money(asset.accumulatedDepreciation)})`}</span> : "—"}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {asset.bookValue > 0 ? <span data-sensitive>{money(asset.bookValue)}</span> : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                          <TableCell>{asset.usefulLife} yrs</TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">{asset.acquisitionDate}</TableCell>
                          <TableCell>
                            <Badge variant={statusMeta[asset.status].variant}>{statusMeta[asset.status].label}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="depreciation">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Depreciation Schedule — CY2026</CardTitle>
                <CardDescription>
                  Straight-line method across all active depreciable assets. Annual charge: {money(monthlyDepreciation * 12)}.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Monthly Charge</TableHead>
                      <TableHead className="text-right">Cumulative YTD</TableHead>
                      <TableHead className="w-[40%]">Progress (YTD)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {depSchedule.map((row, i) => {
                      const annual = monthlyDepreciation * 12
                      const progress = (row.cumulative / annual) * 100
                      const isCurrentMonth = i === 8
                      return (
                        <TableRow key={row.month} className={isCurrentMonth ? "bg-blue-50 dark:bg-blue-950/30 font-medium" : ""}>
                          <TableCell className="whitespace-nowrap">
                            {row.month}
                            {isCurrentMonth && <Badge variant="secondary" className="ml-2 text-xs">Current</Badge>}
                          </TableCell>
                          <TableCell data-sensitive className="text-right">{money(row.amount)}</TableCell>
                          <TableCell data-sensitive className="text-right">{money(row.cumulative)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={progress} className="h-2 flex-1" />
                              <span className="text-xs text-muted-foreground w-10 text-right">{pct(progress)}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
