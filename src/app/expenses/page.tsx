"use client"

import * as React from "react"
import {
  TrendingDown,
  Users,
  Fuel,
  Wrench,
  Truck,
  HardHat,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Plus,
  ArrowDownRight,
  Receipt,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Filter,
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

const money = (v = 0) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(v)
const pct = (v: number) => `${v.toFixed(1)}%`

export type ExpenseCategory =
  | "direct-manpower"
  | "fuel-oil"
  | "generator-parts"
  | "fleet-logistics"
  | "safety-compliance"
  | "admin-overhead"

export type PaymentStatus = "paid" | "pending" | "approved" | "overdue"

const categoryMeta: Record<
  ExpenseCategory,
  { label: string; icon: React.ElementType; color: string; bg: string; barColor: string; costType: "COGS / Direct Cost" | "OPEX / Overhead" }
> = {
  "direct-manpower": {
    label: "Direct Labor & Field Crews",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    barColor: "bg-blue-500",
    costType: "COGS / Direct Cost",
  },
  "fuel-oil": {
    label: "Diesel, Fuel & Lubricants",
    icon: Fuel,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    barColor: "bg-amber-500",
    costType: "COGS / Direct Cost",
  },
  "generator-parts": {
    label: "Generator Spares & Consumables",
    icon: Wrench,
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    barColor: "bg-rose-500",
    costType: "COGS / Direct Cost",
  },
  "fleet-logistics": {
    label: "Boom Truck & Fleet Logistics",
    icon: Truck,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    barColor: "bg-purple-500",
    costType: "COGS / Direct Cost",
  },
  "safety-compliance": {
    label: "PPE & Site Safety Compliance",
    icon: HardHat,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    barColor: "bg-emerald-500",
    costType: "COGS / Direct Cost",
  },
  "admin-overhead": {
    label: "Administrative & Facility Overhead",
    icon: Building2,
    color: "text-slate-600",
    bg: "bg-slate-50 dark:bg-slate-950/40",
    barColor: "bg-slate-500",
    costType: "OPEX / Overhead",
  },
}

const statusMeta: Record<
  PaymentStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  paid: { label: "Disbursed / Paid", variant: "default" },
  approved: { label: "Approved for Pay", variant: "secondary" },
  pending: { label: "Pending Voucher", variant: "outline" },
  overdue: { label: "Overdue", variant: "destructive" },
}

interface ExpenseRecord {
  id: string
  date: string
  voucherNo: string
  payeeVendor: string
  projectOrClient: string
  description: string
  category: ExpenseCategory
  amount: number
  paymentMethod: "Bank Transfer" | "Check (PDC)" | "Cash Voucher" | "Petty Cash"
  status: PaymentStatus
  dueDate: string
}

const initialExpenses: ExpenseRecord[] = [
  {
    id: "EXP-2026-001",
    date: "2026-09-02",
    voucherNo: "CV-26-0891",
    payeeVendor: "Power Technicians & Linesmen Payroll",
    projectOrClient: "Meralco / MIESCOR Substation project",
    description: "Bi-monthly field technicians & high-voltage crew payroll (50 pax)",
    category: "direct-manpower",
    amount: 680000,
    paymentMethod: "Bank Transfer",
    status: "paid",
    dueDate: "2026-09-05",
  },
  {
    id: "EXP-2026-002",
    date: "2026-09-04",
    voucherNo: "CV-26-0892",
    payeeVendor: "Petron Bulk Fleet Depot",
    projectOrClient: "SM Prime & Robinsons GenSets (500kVA fleet)",
    description: "Industrial diesel fuel supply (8,500 Liters) for continuous power rental units",
    category: "fuel-oil",
    amount: 510000,
    paymentMethod: "Bank Transfer",
    status: "paid",
    dueDate: "2026-09-08",
  },
  {
    id: "EXP-2026-003",
    date: "2026-09-06",
    voucherNo: "CV-26-0893",
    payeeVendor: "Cummins / Perkins Diesel Spares PH",
    projectOrClient: "Preventive Maintenance Contracts (PGH & NGCP)",
    description: "OEM heavy-duty oil filters, air filters, AVR modules & coolant flushes",
    category: "generator-parts",
    amount: 320000,
    paymentMethod: "Check (PDC)",
    status: "paid",
    dueDate: "2026-09-15",
  },
  {
    id: "EXP-2026-004",
    date: "2026-09-09",
    voucherNo: "CV-26-0894",
    payeeVendor: "Delta Heavy Transport & Hauling",
    projectOrClient: "Megaworld Corp. Forbes Town Center",
    description: "Low-bed trailer & boom truck mobilization for 750kVA generator delivery & rigging",
    category: "fleet-logistics",
    amount: 145000,
    paymentMethod: "Bank Transfer",
    status: "paid",
    dueDate: "2026-09-12",
  },
  {
    id: "EXP-2026-005",
    date: "2026-09-12",
    voucherNo: "CV-26-0895",
    payeeVendor: "Industrial Safety Gears Corp.",
    projectOrClient: "Ayala Land Inc. BGC Tower Phase 2",
    description: "Arc-rated fire-resistant suits, insulated gloves (Class 2), and fall arrest harnesses",
    category: "safety-compliance",
    amount: 98500,
    paymentMethod: "Check (PDC)",
    status: "approved",
    dueDate: "2026-09-24",
  },
  {
    id: "EXP-2026-006",
    date: "2026-09-15",
    voucherNo: "CV-26-0896",
    payeeVendor: "PMS Operations Office & Yard Lease",
    projectOrClient: "Headquarters & Equipment Staging Yard",
    description: "Warehouse staging depot rental, yard utilities, and facility security services",
    category: "admin-overhead",
    amount: 185000,
    paymentMethod: "Bank Transfer",
    status: "paid",
    dueDate: "2026-09-15",
  },
  {
    id: "EXP-2026-007",
    date: "2026-09-18",
    voucherNo: "CV-26-0897",
    payeeVendor: "Power Technicians & Linesmen Payroll",
    projectOrClient: "Meralco / MIESCOR & BGC Grid Projects",
    description: "2nd half manpower payroll & hazard overtime allowances for substation crew",
    category: "direct-manpower",
    amount: 720000,
    paymentMethod: "Bank Transfer",
    status: "approved",
    dueDate: "2026-09-22",
  },
  {
    id: "EXP-2026-008",
    date: "2026-09-19",
    voucherNo: "CV-26-0898",
    payeeVendor: "Shell Fleet Commercial",
    projectOrClient: "Standby Prime Power Genset Units",
    description: "Diesel fuel replenishment (6,200 Liters) for backup power deployments",
    category: "fuel-oil",
    amount: 372000,
    paymentMethod: "Bank Transfer",
    status: "pending",
    dueDate: "2026-09-28",
  },
  {
    id: "EXP-2026-009",
    date: "2026-09-21",
    voucherNo: "CV-26-0899",
    payeeVendor: "Stamford Alternator Systems & Parts",
    projectOrClient: "Filinvest Land Inc. Alabang Hub",
    description: "Automatic Voltage Regulator (AVR) SX460 units and rotating rectifier assemblies",
    category: "generator-parts",
    amount: 188000,
    paymentMethod: "Check (PDC)",
    status: "pending",
    dueDate: "2026-10-02",
  },
  {
    id: "EXP-2026-010",
    date: "2026-09-22",
    voucherNo: "CV-26-0900",
    payeeVendor: "Caltex Lubricants & Engine Fluids",
    projectOrClient: "Fleet Heavy Equipment & Service Trucks",
    description: "15W-40 Heavy Duty Diesel Engine Oil (Delo 400) 10 drums & radiator coolants",
    category: "generator-parts",
    amount: 142000,
    paymentMethod: "Check (PDC)",
    status: "approved",
    dueDate: "2026-09-30",
  },
  {
    id: "EXP-2026-011",
    date: "2026-09-23",
    voucherNo: "CV-26-0901",
    payeeVendor: "Prime Heavy Equipment Hydraulics",
    projectOrClient: "Crane Truck & Aerial Man-Lift Units",
    description: "Hydraulic hose replacements, cylinder seal kits, and annual crane load test certs",
    category: "fleet-logistics",
    amount: 86000,
    paymentMethod: "Check (PDC)",
    status: "pending",
    dueDate: "2026-10-05",
  },
  {
    id: "EXP-2026-012",
    date: "2026-08-28",
    voucherNo: "CV-26-0870",
    payeeVendor: "DOLE & OSH Certification Board",
    projectOrClient: "Company Compliance & Site Clearance",
    description: "Safety officer mandatory DOLE-BOSH/COSH refresher training & field badges",
    category: "safety-compliance",
    amount: 45000,
    paymentMethod: "Cash Voucher",
    status: "overdue",
    dueDate: "2026-09-10",
  },
]

const monthlyCostBreakdown = [
  { month: "Jan", manpower: 980000, fuel: 340000, parts: 210000, fleet: 110000, safety: 45000, admin: 180000, total: 1865000 },
  { month: "Feb", manpower: 1020000, fuel: 380000, parts: 290000, fleet: 95000, safety: 30000, admin: 185000, total: 2000000 },
  { month: "Mar", manpower: 1150000, fuel: 420000, parts: 260000, fleet: 130000, safety: 50000, admin: 185000, total: 2195000 },
  { month: "Apr", manpower: 1180000, fuel: 460000, parts: 310000, fleet: 155000, safety: 65000, admin: 190000, total: 2360000 },
  { month: "May", manpower: 1190000, fuel: 430000, parts: 280000, fleet: 120000, safety: 40000, admin: 185000, total: 2245000 },
  { month: "Jun", manpower: 1240000, fuel: 490000, parts: 340000, fleet: 140000, safety: 55000, admin: 190000, total: 2455000 },
  { month: "Jul", manpower: 1260000, fuel: 510000, parts: 295000, fleet: 135000, safety: 60000, admin: 185000, total: 2445000 },
  { month: "Aug", manpower: 1340000, fuel: 530000, parts: 360000, fleet: 160000, safety: 70000, admin: 195000, total: 2655000 },
  { month: "Sep", manpower: 1400000, fuel: 882000, parts: 650000, fleet: 231000, safety: 143500, admin: 185000, total: 3491500 },
]

const majorVendors = [
  { name: "Power Technicians & Field Crew Direct", total: 1400000, category: "Direct Labor / Payroll", count: 2 },
  { name: "Petron Bulk Fleet Depot", total: 510000, category: "Industrial Fuel & Diesel", count: 1 },
  { name: "Shell Fleet Commercial", total: 372000, category: "Fuel & Lubricants", count: 1 },
  { name: "Cummins / Perkins Diesel Spares PH", total: 320000, category: "OEM Engine Components", count: 1 },
  { name: "Stamford Alternator Systems & Parts", total: 188000, category: "Electrical Power Hardware", count: 1 },
  { name: "PMS Operations Office & Yard Lease", total: 185000, category: "Depot & Facility Lease", count: 1 },
  { name: "Delta Heavy Transport & Hauling", total: 145000, category: "Equipment Logistics", count: 1 },
  { name: "Caltex Lubricants & Engine Fluids", total: 142000, category: "Lubricants & Coolants", count: 1 },
  { name: "Industrial Safety Gears Corp.", total: 98500, category: "PPE & Site Safety", count: 1 },
]

const EMPTY_FORM = {
  date: new Date().toISOString().split("T")[0],
  voucherNo: "",
  payeeVendor: "",
  projectOrClient: "",
  description: "",
  category: "fuel-oil" as ExpenseCategory,
  amount: "",
  paymentMethod: "Bank Transfer" as const,
  dueDate: "",
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = React.useState<ExpenseRecord[]>(initialExpenses)
  const [filterCategory, setFilterCategory] = React.useState<string>("all")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState(EMPTY_FORM)

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)
  const paidExpense = expenses
    .filter((e) => e.status === "paid")
    .reduce((s, e) => s + e.amount, 0)
  const pendingExpense = expenses
    .filter((e) => e.status === "pending" || e.status === "approved")
    .reduce((s, e) => s + e.amount, 0)
  const overdueExpense = expenses
    .filter((e) => e.status === "overdue")
    .reduce((s, e) => s + e.amount, 0)

  // Direct Cost (COGS) vs Operating Overhead (OPEX)
  const directCOGS = expenses
    .filter((e) => e.category !== "admin-overhead")
    .reduce((s, e) => s + e.amount, 0)
  const adminOPEX = expenses
    .filter((e) => e.category === "admin-overhead")
    .reduce((s, e) => s + e.amount, 0)

  const cogsPercent = totalExpense > 0 ? (directCOGS / totalExpense) * 100 : 0

  const filteredExpenses = expenses.filter((e) => {
    const matchCat = filterCategory === "all" || e.category === filterCategory
    const matchStat = filterStatus === "all" || e.status === filterStatus
    return matchCat && matchStat
  })

  const byCategory = (Object.keys(categoryMeta) as ExpenseCategory[]).map((cat) => {
    const catTotal = expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0)
    const share = totalExpense > 0 ? (catTotal / totalExpense) * 100 : 0
    return {
      cat,
      total: catTotal,
      count: expenses.filter((e) => e.category === cat).length,
      share,
    }
  })

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.payeeVendor || !form.amount) return

    const newRec: ExpenseRecord = {
      id: `EXP-2026-${String(expenses.length + 1).padStart(3, "0")}`,
      date: form.date || new Date().toISOString().split("T")[0],
      voucherNo: form.voucherNo || `CV-26-${Math.floor(1000 + Math.random() * 9000)}`,
      payeeVendor: form.payeeVendor,
      projectOrClient: form.projectOrClient || "PMS Fleet Operations",
      description: form.description || "Operational and site expenditure",
      category: form.category,
      amount: parseFloat(form.amount) || 0,
      paymentMethod: form.paymentMethod,
      status: "pending",
      dueDate: form.dueDate || form.date,
    }

    setExpenses([newRec, ...expenses])
    setForm(EMPTY_FORM)
    setOpen(false)
  }

  return (
    <BaseLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                <TrendingDown className="h-3.5 w-3.5" />
                Cost of Goods Sold (COGS) & Operational Expenses
              </span>
              <span className="text-xs text-muted-foreground">• PMS Prime Power Business Model</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">
              Expenses & Cost Accounting
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Comprehensive tracking of generator rentals, field manpower, fuel, OEM parts, and logistics costs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm">
                  <Plus className="h-4 w-4" />
                  Record Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Record New Business Expense</DialogTitle>
                  <DialogDescription>
                    Add a direct project cost, fuel voucher, spare parts bill, or operational overhead.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddExpense} className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="date">Expense Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="voucherNo">Check / Voucher No.</Label>
                      <Input
                        id="voucherNo"
                        placeholder="e.g. CV-26-0902"
                        value={form.voucherNo}
                        onChange={(e) => setForm({ ...form, voucherNo: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="category">Cost Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(val) =>
                        setForm({ ...form, category: val as ExpenseCategory })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryMeta).map(([k, v]) => (
                          <SelectItem key={k} value={k}>
                            {v.label} ({v.costType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="payeeVendor">Payee / Supplier Vendor</Label>
                      <Input
                        id="payeeVendor"
                        placeholder="e.g. Petron Bulk / Cummins PH"
                        value={form.payeeVendor}
                        onChange={(e) => setForm({ ...form, payeeVendor: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="projectOrClient">Allocated Project / Client</Label>
                      <Input
                        id="projectOrClient"
                        placeholder="e.g. Meralco Substation / PMS Fleet"
                        value={form.projectOrClient}
                        onChange={(e) => setForm({ ...form, projectOrClient: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description">Particulars & Purpose</Label>
                    <Input
                      id="description"
                      placeholder="e.g. 5,000L diesel fuel for generator backup contract"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="amount">Amount (PHP)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dueDate">Disbursement Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={form.paymentMethod}
                      onValueChange={(val: any) => setForm({ ...form, paymentMethod: val })}
                    >
                      <SelectTrigger id="paymentMethod">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer (Online)</SelectItem>
                        <SelectItem value="Check (PDC)">Post-Dated Check (PDC)</SelectItem>
                        <SelectItem value="Cash Voucher">Cash Disbursement Voucher</SelectItem>
                        <SelectItem value="Petty Cash">Petty Cash Fund</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter className="pt-2">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Expense Record</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-rose-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recorded Expenses</CardTitle>
              <div className="p-2 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <TrendingDown className="h-4 w-4 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div data-sensitive className="text-2xl font-bold">{money(totalExpense)}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className="font-semibold text-rose-600">{pct(cogsPercent)}</span> direct project & fleet COGS
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disbursed / Paid</CardTitle>
              <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div data-sensitive className="text-2xl font-bold text-emerald-600">{money(paidExpense)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {pct(totalExpense > 0 ? (paidExpense / totalExpense) * 100 : 0)} settled via check & wire
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Committed / Pending Pay</CardTitle>
              <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/40">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div data-sensitive className="text-2xl font-bold text-amber-600">{money(pendingExpense)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting voucher clearance or due date
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue / Action Needed</CardTitle>
              <div className="p-2 rounded-full bg-red-50 dark:bg-red-950/40">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div data-sensitive className="text-2xl font-bold text-red-600">{money(overdueExpense)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {expenses.filter((e) => e.status === "overdue").length} voucher requiring immediate release
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cost Structure: COGS vs OPEX breakdown */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">
                    PMS Cost Categorization & Breakdown
                  </CardTitle>
                  <CardDescription>
                    Direct Costs (Field Crew Labor, Fuel & Parts) vs Operational Support
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {expenses.length} Records
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/40 text-xs">
                <div>
                  <span className="text-muted-foreground">Direct Service COGS:</span>{" "}
                  <strong data-sensitive className="text-foreground font-semibold">{money(directCOGS)}</strong>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Field crews, Fuel, OEM parts, Transport
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Admin & Yard OPEX:</span>{" "}
                  <strong data-sensitive className="text-foreground font-semibold">{money(adminOPEX)}</strong>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Staging depot, utilities, management
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {byCategory.map(({ cat, total, count, share }) => {
                  const meta = categoryMeta[cat]
                  const Icon = meta.icon
                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-medium">
                          <div className={`p-1 rounded ${meta.bg}`}>
                            <Icon className={`h-3.5 w-3.5 ${meta.color}`} />
                          </div>
                          <span>{meta.label}</span>
                          <span className="text-[10px] text-muted-foreground">({count} items)</span>
                        </div>
                        <div className="text-right">
                          <span data-sensitive className="font-semibold">{money(total)}</span>
                          <span className="text-muted-foreground ml-1.5 font-normal">({pct(share)})</span>
                        </div>
                      </div>
                      <Progress value={share} className="h-1.5" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Major Suppliers / Payees */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Major Suppliers & Payees</CardTitle>
              <CardDescription>Top suppliers & cost centers this cycle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {majorVendors.slice(0, 6).map((vendor, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs pb-2 border-b last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground line-clamp-1">{vendor.name}</p>
                    <p className="text-[11px] text-muted-foreground">{vendor.category}</p>
                  </div>
                  <div className="text-right">
                    <div data-sensitive className="font-semibold">{money(vendor.total)}</div>
                    <div className="text-[10px] text-muted-foreground">{vendor.count} trx</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs & Interactive Table */}
        <Card className="shadow-sm">
          <Tabs defaultValue="all" className="w-full">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-bold">Expense Ledger & Vouchers</CardTitle>
                  <CardDescription>
                    All project disbursements, fuel receipts, payroll releases, and supplier accounts.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px] h-8 text-xs">
                      <SelectValue placeholder="Filter Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.entries(categoryMeta).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Disbursed / Paid</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="w-[110px]">Voucher No.</TableHead>
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead>Payee / Vendor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="min-w-[200px]">Project / Description</TableHead>
                      <TableHead>Payment Mode</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[110px] text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No expense records found matching criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredExpenses.map((expense) => {
                        const meta = categoryMeta[expense.category]
                        const Icon = meta.icon
                        const statusObj = statusMeta[expense.status]
                        return (
                          <TableRow key={expense.id} className="hover:bg-muted/30">
                            <TableCell className="font-mono text-xs font-medium">
                              {expense.voucherNo}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                              {expense.date}
                            </TableCell>
                            <TableCell className="text-xs font-semibold">
                              <div>{expense.payeeVendor}</div>
                              <div className="text-[11px] text-muted-foreground font-normal">
                                {expense.projectOrClient}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                                <span className={`p-1 rounded ${meta.bg}`}>
                                  <Icon className={`h-3 w-3 ${meta.color}`} />
                                </span>
                                <span>{meta.label}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-[260px] truncate">
                              {expense.description}
                            </TableCell>
                            <TableCell className="text-xs whitespace-nowrap">
                              <Badge variant="outline" className="font-normal text-[11px]">
                                {expense.paymentMethod}
                              </Badge>
                            </TableCell>
                            <TableCell data-sensitive className="text-xs font-bold text-right whitespace-nowrap">
                              {money(expense.amount)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={statusObj.variant} className="text-[11px] whitespace-nowrap">
                                {statusObj.label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Monthly Trend Snapshot */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Monthly Expense Run Rate (YTD 2026)
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Current Monthly Average: {money(totalExpense / 9)}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                  {monthlyCostBreakdown.map((m) => (
                    <div
                      key={m.month}
                      className="p-2.5 rounded-lg border bg-card/60 text-center hover:border-primary/40 transition-colors"
                    >
                      <div className="text-xs font-semibold text-muted-foreground">{m.month}</div>
                      <div className="text-xs font-bold text-foreground mt-0.5">
                        {money(m.total).replace(".00", "")}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">
                        Labor: {money(m.manpower).replace(".00", "")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </BaseLayout>
  )
}
