"use client"

import * as React from "react"
import {
  TrendingUp,
  Zap,
  HardHat,
  Wrench,
  Truck,
  FileText,
  Plus,
  Users,
  ClipboardList,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
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

type RevenueType = "manpower" | "electrical" | "maintenance" | "equipment-rental" | "project-contract"
type InvoiceStatus = "collected" | "outstanding" | "overdue" | "partial"

const streamMeta: Record<RevenueType, { label: string; icon: React.ElementType; color: string; bg: string; barColor: string }> = {
  manpower:           { label: "Manpower Services",     icon: Users,    color: "text-blue-600",   bg: "bg-blue-50 dark:bg-blue-950/40",     barColor: "bg-blue-500"   },
  electrical:         { label: "Electrical & Power",    icon: Zap,      color: "text-amber-600",  bg: "bg-amber-50 dark:bg-amber-950/40",   barColor: "bg-amber-500"  },
  maintenance:        { label: "Maintenance Contracts", icon: Wrench,   color: "text-green-600",  bg: "bg-green-50 dark:bg-green-950/40",   barColor: "bg-green-500"  },
  "equipment-rental": { label: "Equipment Rental",      icon: Truck,    color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/40", barColor: "bg-violet-500" },
  "project-contract": { label: "Project Contracts",     icon: HardHat,  color: "text-rose-600",   bg: "bg-rose-50 dark:bg-rose-950/40",     barColor: "bg-rose-500"   },
}

const statusMeta: Record<InvoiceStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  collected:   { label: "Collected",   variant: "default"     },
  outstanding: { label: "Outstanding", variant: "secondary"   },
  overdue:     { label: "Overdue",     variant: "destructive" },
  partial:     { label: "Partial",     variant: "outline"     },
}

interface Invoice {
  id: string; date: string; client: string; description: string
  type: RevenueType; amount: number; collected: number; balance: number
  dueDate: string; status: InvoiceStatus
}

const initialInvoices: Invoice[] = [
  { id:"INV-2026-001", date:"2026-01-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Jan 2026 (42 workers)",        type:"manpower",          amount:1260000, collected:1260000, balance:0,       dueDate:"2026-01-20", status:"collected"   },
  { id:"INV-2026-002", date:"2026-01-10", client:"NGCP Luzon Grid",               description:"Electrical Preventive Maintenance Jan 2026",    type:"maintenance",       amount:385000,  collected:385000,  balance:0,       dueDate:"2026-01-25", status:"collected"   },
  { id:"INV-2026-003", date:"2026-01-15", client:"San Miguel Corp. Pampanga",     description:"Generator Set Rental 500kVA 30 days",           type:"equipment-rental",  amount:210000,  collected:210000,  balance:0,       dueDate:"2026-01-30", status:"collected"   },
  { id:"INV-2026-004", date:"2026-02-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Feb 2026 (42 workers)",         type:"manpower",          amount:1260000, collected:1260000, balance:0,       dueDate:"2026-02-20", status:"collected"   },
  { id:"INV-2026-005", date:"2026-02-12", client:"DOST Metro Manila Office",      description:"Electrical Panel Upgrade and Rewiring",         type:"electrical",        amount:560000,  collected:560000,  balance:0,       dueDate:"2026-02-27", status:"collected"   },
  { id:"INV-2026-006", date:"2026-02-18", client:"Robinsons Land Corp.",          description:"Standby Generator Rental Feb 2026",             type:"equipment-rental",  amount:195000,  collected:195000,  balance:0,       dueDate:"2026-03-05", status:"collected"   },
  { id:"INV-2026-007", date:"2026-03-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Mar 2026 (45 workers)",         type:"manpower",          amount:1350000, collected:1350000, balance:0,       dueDate:"2026-03-20", status:"collected"   },
  { id:"INV-2026-008", date:"2026-03-10", client:"NGCP Luzon Grid",               description:"Transmission Line Inspection and Repair",       type:"electrical",        amount:820000,  collected:820000,  balance:0,       dueDate:"2026-03-25", status:"collected"   },
  { id:"INV-2026-009", date:"2026-03-20", client:"Philippine General Hospital",   description:"Annual Preventive Maintenance Q1",              type:"maintenance",       amount:175000,  collected:175000,  balance:0,       dueDate:"2026-04-05", status:"collected"   },
  { id:"INV-2026-010", date:"2026-04-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Apr 2026 (45 workers)",         type:"manpower",          amount:1350000, collected:1350000, balance:0,       dueDate:"2026-04-20", status:"collected"   },
  { id:"INV-2026-011", date:"2026-04-14", client:"SM Prime Holdings",             description:"SM Mall Generator Rental Apr",                  type:"equipment-rental",  amount:320000,  collected:320000,  balance:0,       dueDate:"2026-04-29", status:"collected"   },
  { id:"INV-2026-012", date:"2026-04-22", client:"Ayala Land Inc.",               description:"BGC Office Tower Electrical Install Phase 1",   type:"project-contract",  amount:2400000, collected:1200000, balance:1200000, dueDate:"2026-05-22", status:"partial"     },
  { id:"INV-2026-013", date:"2026-05-05", client:"Meralco / MIESCOR",             description:"Manpower Supply May 2026 (45 workers)",         type:"manpower",          amount:1350000, collected:1350000, balance:0,       dueDate:"2026-05-20", status:"collected"   },
  { id:"INV-2026-014", date:"2026-05-15", client:"NGCP Luzon Grid",               description:"Electrical Preventive Maintenance May 2026",    type:"maintenance",       amount:395000,  collected:395000,  balance:0,       dueDate:"2026-05-30", status:"collected"   },
  { id:"INV-2026-015", date:"2026-06-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Jun 2026 (48 workers)",         type:"manpower",          amount:1440000, collected:1440000, balance:0,       dueDate:"2026-06-20", status:"collected"   },
  { id:"INV-2026-016", date:"2026-06-18", client:"Filinvest Land Inc.",           description:"Electrical Install Alabang Commercial Hub",     type:"project-contract",  amount:1850000, collected:1850000, balance:0,       dueDate:"2026-07-03", status:"collected"   },
  { id:"INV-2026-017", date:"2026-06-25", client:"Philippine General Hospital",   description:"Annual Preventive Maintenance Q2",              type:"maintenance",       amount:175000,  collected:175000,  balance:0,       dueDate:"2026-07-10", status:"collected"   },
  { id:"INV-2026-018", date:"2026-07-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Jul 2026 (48 workers)",         type:"manpower",          amount:1440000, collected:1440000, balance:0,       dueDate:"2026-07-20", status:"collected"   },
  { id:"INV-2026-019", date:"2026-07-12", client:"Robinsons Land Corp.",          description:"Generator Rental Ortigas Complex Jul 2026",     type:"equipment-rental",  amount:240000,  collected:240000,  balance:0,       dueDate:"2026-07-27", status:"collected"   },
  { id:"INV-2026-020", date:"2026-07-20", client:"DOST Metro Manila Office",      description:"UPS and Power Conditioning System Install",     type:"electrical",        amount:475000,  collected:475000,  balance:0,       dueDate:"2026-08-04", status:"collected"   },
  { id:"INV-2026-021", date:"2026-08-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Aug 2026 (50 workers)",         type:"manpower",          amount:1500000, collected:1500000, balance:0,       dueDate:"2026-08-20", status:"collected"   },
  { id:"INV-2026-022", date:"2026-08-15", client:"Ayala Land Inc.",               description:"BGC Office Tower Electrical Install Phase 2",   type:"project-contract",  amount:1800000, collected:900000,  balance:900000,  dueDate:"2026-09-15", status:"partial"     },
  { id:"INV-2026-023", date:"2026-08-22", client:"NGCP Luzon Grid",               description:"Electrical Preventive Maintenance Aug 2026",    type:"maintenance",       amount:395000,  collected:395000,  balance:0,       dueDate:"2026-09-06", status:"collected"   },
  { id:"INV-2026-024", date:"2026-09-05", client:"Meralco / MIESCOR",             description:"Manpower Supply Sep 2026 (50 workers)",         type:"manpower",          amount:1500000, collected:0,       balance:1500000, dueDate:"2026-09-20", status:"outstanding" },
  { id:"INV-2026-025", date:"2026-09-10", client:"SM Prime Holdings",             description:"SM Mall Generator Rental Sep",                  type:"equipment-rental",  amount:320000,  collected:0,       balance:320000,  dueDate:"2026-09-25", status:"outstanding" },
  { id:"INV-2026-026", date:"2026-09-15", client:"Philippine General Hospital",   description:"Annual Preventive Maintenance Q3",              type:"maintenance",       amount:175000,  collected:0,       balance:175000,  dueDate:"2026-09-30", status:"outstanding" },
  { id:"INV-2026-027", date:"2026-09-18", client:"Megaworld Corp.",               description:"Electrical Works Forbes Town Center Phase 1",   type:"project-contract",  amount:3200000, collected:0,       balance:3200000, dueDate:"2026-10-18", status:"outstanding" },
  { id:"INV-2026-028", date:"2026-08-01", client:"Bonifacio Global City Corp.",   description:"Street Lighting System Overhaul Jul Billing",   type:"electrical",        amount:680000,  collected:0,       balance:680000,  dueDate:"2026-08-30", status:"overdue"     },
]

const monthlySummary = [
  { month:"Jan", manpower:1260000, electrical:0,      maintenance:385000, equipment:210000, project:0,       total:1855000 },
  { month:"Feb", manpower:1260000, electrical:560000, maintenance:0,      equipment:195000, project:0,       total:2015000 },
  { month:"Mar", manpower:1350000, electrical:820000, maintenance:175000, equipment:0,      project:0,       total:2345000 },
  { month:"Apr", manpower:1350000, electrical:0,      maintenance:0,      equipment:320000, project:2400000, total:4070000 },
  { month:"May", manpower:1350000, electrical:0,      maintenance:395000, equipment:0,      project:0,       total:1745000 },
  { month:"Jun", manpower:1440000, electrical:0,      maintenance:175000, equipment:0,      project:1850000, total:3465000 },
  { month:"Jul", manpower:1440000, electrical:475000, maintenance:0,      equipment:240000, project:0,       total:2155000 },
  { month:"Aug", manpower:1500000, electrical:0,      maintenance:395000, equipment:0,      project:1800000, total:3695000 },
  { month:"Sep", manpower:1500000, electrical:680000, maintenance:175000, equipment:320000, project:3200000, total:5875000 },
]

const topClients = [
  { name:"Meralco / MIESCOR",          total:12660000, invoices:9, type:"Manpower"         },
  { name:"Ayala Land Inc.",             total:4200000,  invoices:2, type:"Project Contract" },
  { name:"Megaworld Corp.",             total:3200000,  invoices:1, type:"Project Contract" },
  { name:"NGCP Luzon Grid",             total:1995000,  invoices:4, type:"Mixed"            },
  { name:"Filinvest Land Inc.",         total:1850000,  invoices:1, type:"Project Contract" },
  { name:"DOST Metro Manila Office",    total:1035000,  invoices:2, type:"Electrical"       },
  { name:"Bonifacio Global City Corp.", total:680000,   invoices:1, type:"Electrical"       },
  { name:"SM Prime Holdings",           total:640000,   invoices:2, type:"Equipment Rental" },
  { name:"Philippine General Hospital", total:525000,   invoices:3, type:"Maintenance"      },
  { name:"Robinsons Land Corp.",        total:435000,   invoices:2, type:"Equipment Rental" },
]

const EMPTY_FORM = { date:"", client:"", description:"", type:"manpower" as RevenueType, amount:"", dueDate:"" }

export default function RevenuePage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>(initialInvoices)
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState(EMPTY_FORM)

  const totalRevenue     = invoices.reduce((s,i) => s + i.amount,    0)
  const totalCollected   = invoices.reduce((s,i) => s + i.collected, 0)
  const totalOutstanding = invoices.reduce((s,i) => s + i.balance,   0)
  const collectionRate   = totalRevenue > 0 ? (totalCollected / totalRevenue) * 100 : 0
  const overdue          = invoices.filter(i => i.status === "overdue")
  const outstanding      = invoices.filter(i => i.status === "outstanding")

  const byStream = (Object.keys(streamMeta) as RevenueType[]).map(type => ({
    type,
    total: invoices.filter(i => i.type === type).reduce((s,i) => s + i.amount, 0),
    count: invoices.filter(i => i.type === type).length,
  })).sort((a,b) => b.total - a.total)

  const maxMonthly = Math.max(...monthlySummary.map(m => m.total))

  const handleAdd = () => {
    if (!form.date || !form.client || !form.description || !form.amount || !form.dueDate) return
    const amt = parseFloat(form.amount)
    const newId = `INV-2026-${String(invoices.length + 1).padStart(3, "0")}`
    setInvoices(prev => [...prev, {
      id: newId, date: form.date, client: form.client, description: form.description,
      type: form.type, amount: amt, collected: 0, balance: amt,
      dueDate: form.dueDate, status: "outstanding",
    }])
    setForm(EMPTY_FORM)
    setOpen(false)
  }

  return (
    <BaseLayout
      title="Revenue"
      description="Billing, collections, and revenue streams for PMS Prime Power."
    >
      <div className="flex justify-end px-4 lg:px-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2"><Plus className="h-4 w-4" />Add Invoice</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>New Revenue Invoice</DialogTitle>
              <DialogDescription>Create a new billing invoice for a client.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rev-client">Client Name</Label>
                <Input id="rev-client" placeholder="e.g. Meralco / MIESCOR" value={form.client} onChange={e => setForm(f => ({...f, client: e.target.value}))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rev-desc">Description</Label>
                <Input id="rev-desc" placeholder="e.g. Manpower Supply Oct 2026" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rev-type">Revenue Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({...f, type: v as RevenueType}))}>
                    <SelectTrigger id="rev-type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.entries(streamMeta) as [RevenueType, typeof streamMeta[RevenueType]][]).map(([k,v]) => (
                        <SelectItem key={k} value={k}>{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rev-amount">Amount (PHP)</Label>
                  <Input id="rev-amount" type="number" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rev-date">Invoice Date</Label>
                  <Input id="rev-date" type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rev-due">Due Date</Label>
                  <Input id="rev-due" type="date" value={form.dueDate} onChange={e => setForm(f => ({...f, dueDate: e.target.value}))} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setForm(EMPTY_FORM); setOpen(false) }}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!form.date || !form.client || !form.description || !form.amount || !form.dueDate}>Add Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue YTD</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{money(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Jan to Sep 2026 · {invoices.length} invoices</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{money(totalCollected)}</div>
            <div className="mt-1 flex items-center gap-2">
              <Progress value={collectionRate} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground">{pct(collectionRate)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Receivables</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{money(totalOutstanding)}</div>
            <p className="text-xs text-muted-foreground">{outstanding.length} outstanding · {overdue.length} overdue</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Receivables</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{money(overdue.reduce((s,i)=>s+i.balance,0))}</div>
            <p className="text-xs text-muted-foreground">{overdue.length} invoice{overdue.length!==1?"s":""} past due</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5 px-4 lg:px-6">
        {byStream.map(({type, total, count}) => {
          const m = streamMeta[type]
          const Icon = m.icon
          const share = totalRevenue > 0 ? (total / totalRevenue) * 100 : 0
          return (
            <Card key={type} className={`${m.bg} border-0`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${m.color}`} />
                  <CardTitle className="text-xs font-semibold">{m.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className={`text-lg font-bold ${m.color}`}>{money(total)}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/50 dark:bg-black/20 overflow-hidden">
                    <div className={`h-1.5 rounded-full ${m.barColor}`} style={{width:`${share}%`}} />
                  </div>
                  <span className="text-xs text-muted-foreground">{pct(share)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{count} invoices</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <div className="px-4 lg:px-6 pb-6">
        <Tabs defaultValue="register" className="space-y-4">
          <TabsList>
            <TabsTrigger value="register">Invoice Register</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
            <TabsTrigger value="clients">Top Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  Invoice Register — CY2026 YTD
                </CardTitle>
                <CardDescription>All revenue invoices from January to September 2026.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Collected</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => {
                      const sM = statusMeta[inv.status]
                      const stM = streamMeta[inv.type]
                      return (
                        <TableRow key={inv.id} className={`text-sm ${inv.status==="overdue"?"bg-rose-50/40 dark:bg-rose-950/20":""}`}>
                          <TableCell className="font-mono text-xs text-muted-foreground">{inv.id}</TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">{inv.date}</TableCell>
                          <TableCell className="font-medium max-w-[140px] truncate">{inv.client}</TableCell>
                          <TableCell className="text-muted-foreground max-w-[180px] truncate">{inv.description}</TableCell>
                          <TableCell><span className={`text-xs font-medium ${stM.color}`}>{stM.label}</span></TableCell>
                          <TableCell className="text-right tabular-nums">{money(inv.amount)}</TableCell>
                          <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">{inv.collected>0?money(inv.collected):"—"}</TableCell>
                          <TableCell className={`text-right tabular-nums font-medium ${inv.balance>0?inv.status==="overdue"?"text-rose-600 dark:text-rose-400":"text-amber-600 dark:text-amber-400":"text-muted-foreground"}`}>
                            {inv.balance>0?money(inv.balance):"—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">{inv.dueDate}</TableCell>
                          <TableCell><Badge variant={sM.variant}>{sM.label}</Badge></TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Monthly Revenue Summary — CY2026
                </CardTitle>
                <CardDescription>Revenue breakdown by stream per month.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {monthlySummary.map((m) => (
                    <div key={m.month} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium w-8">{m.month}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{money(m.total)}</span>
                      </div>
                      <div className="flex h-5 rounded-full overflow-hidden bg-muted gap-px">
                        {[
                          {val:m.manpower,   color:"bg-blue-500"},
                          {val:m.electrical, color:"bg-amber-500"},
                          {val:m.maintenance,color:"bg-green-500"},
                          {val:m.equipment,  color:"bg-violet-500"},
                          {val:m.project,    color:"bg-rose-500"},
                        ].map((seg,si) => seg.val>0 ? (
                          <div key={si} className={`${seg.color} transition-all`} style={{width:`${(seg.val/maxMonthly)*100}%`}} />
                        ) : null)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2 border-t text-xs">
                  {[
                    {label:"Manpower",          color:"bg-blue-500"},
                    {label:"Electrical",        color:"bg-amber-500"},
                    {label:"Maintenance",       color:"bg-green-500"},
                    {label:"Equipment Rental",  color:"bg-violet-500"},
                    {label:"Project Contracts", color:"bg-rose-500"},
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                      <span className="text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Manpower</TableHead>
                      <TableHead className="text-right">Electrical</TableHead>
                      <TableHead className="text-right">Maintenance</TableHead>
                      <TableHead className="text-right">Equip. Rental</TableHead>
                      <TableHead className="text-right">Project</TableHead>
                      <TableHead className="text-right font-bold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlySummary.map((m) => (
                      <TableRow key={m.month} className="text-sm">
                        <TableCell className="font-medium">{m.month} 2026</TableCell>
                        <TableCell className="text-right tabular-nums text-blue-600">{m.manpower>0?money(m.manpower):"—"}</TableCell>
                        <TableCell className="text-right tabular-nums text-amber-600">{m.electrical>0?money(m.electrical):"—"}</TableCell>
                        <TableCell className="text-right tabular-nums text-green-600">{m.maintenance>0?money(m.maintenance):"—"}</TableCell>
                        <TableCell className="text-right tabular-nums text-violet-600">{m.equipment>0?money(m.equipment):"—"}</TableCell>
                        <TableCell className="text-right tabular-nums text-rose-600">{m.project>0?money(m.project):"—"}</TableCell>
                        <TableCell className="text-right font-bold text-emerald-600 dark:text-emerald-400">{money(m.total)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell>YTD Total</TableCell>
                      <TableCell className="text-right">{money(monthlySummary.reduce((s,m)=>s+m.manpower,0))}</TableCell>
                      <TableCell className="text-right">{money(monthlySummary.reduce((s,m)=>s+m.electrical,0))}</TableCell>
                      <TableCell className="text-right">{money(monthlySummary.reduce((s,m)=>s+m.maintenance,0))}</TableCell>
                      <TableCell className="text-right">{money(monthlySummary.reduce((s,m)=>s+m.equipment,0))}</TableCell>
                      <TableCell className="text-right">{money(monthlySummary.reduce((s,m)=>s+m.project,0))}</TableCell>
                      <TableCell className="text-right text-emerald-600">{money(monthlySummary.reduce((s,m)=>s+m.total,0))}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-violet-600" />
                  Top Clients by Revenue — CY2026 YTD
                </CardTitle>
                <CardDescription>Clients ranked by total billed amount, January to September 2026.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Primary Service</TableHead>
                      <TableHead className="text-right">Invoices</TableHead>
                      <TableHead className="text-right">Total Billed</TableHead>
                      <TableHead className="text-right">% Revenue</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...topClients].sort((a,b)=>b.total-a.total).map((c,i) => {
                      const share = totalRevenue > 0 ? (c.total/totalRevenue)*100 : 0
                      return (
                        <TableRow key={c.name} className="text-sm">
                          <TableCell className="text-muted-foreground">{i+1}</TableCell>
                          <TableCell className="font-medium">{c.name}</TableCell>
                          <TableCell><Badge variant="outline">{c.type}</Badge></TableCell>
                          <TableCell className="text-right">{c.invoices}</TableCell>
                          <TableCell className="text-right font-semibold text-emerald-600 dark:text-emerald-400">{money(c.total)}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{pct(share)}</TableCell>
                          <TableCell className="w-24">
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-1.5 rounded-full bg-emerald-500" style={{width:`${share}%`}} />
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">{topClients.reduce((s,c)=>s+c.invoices,0)}</TableCell>
                      <TableCell className="text-right text-emerald-600">{money(topClients.reduce((s,c)=>s+c.total,0))}</TableCell>
                      <TableCell colSpan={2} />
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
