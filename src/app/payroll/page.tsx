"use client"

import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Landmark,
  Users,
  WalletCards,
} from "lucide-react"

import { BaseLayout } from "@/components/layouts/base-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// PMS Primepower Makati payroll data is intentionally kept local to this page.
const payrollSummary = [
  { label: "Active employees", value: "186", note: "Makati HQ and deployed teams", icon: Users, tone: "text-sky-600" },
  { label: "Current payroll", value: "₱1,284,600", note: "30 June 2026 payroll run", icon: WalletCards, tone: "text-emerald-600" },
  { label: "Employer contributions", value: "₱126,540", note: "SSS, PhilHealth and Pag-IBIG", icon: Landmark, tone: "text-violet-600" },
  { label: "Next cut-off", value: "15 Jul", note: "Timesheets due 12 July", icon: CalendarDays, tone: "text-amber-600" },
]

const payrollRegister = [
  { team: "Security Operations", employees: 62, gross: 468000, deductions: 62400, net: 405600, status: "Ready for release" },
  { team: "Housekeeping & Facilities", employees: 48, gross: 318000, deductions: 40400, net: 277600, status: "Ready for release" },
  { team: "Technical & Power Services", employees: 31, gross: 287500, deductions: 38100, net: 249400, status: "Timesheets verified" },
  { team: "Makati HQ & Shared Services", employees: 45, gross: 211100, deductions: 27000, net: 184100, status: "For approval" },
]

const complianceItems = [
  { name: "SSS contribution file", due: "10 Jul 2026", amount: "₱54,620", state: "Prepared" },
  { name: "PhilHealth remittance", due: "10 Jul 2026", amount: "₱28,940", state: "Prepared" },
  { name: "Pag-IBIG contribution file", due: "10 Jul 2026", amount: "₱14,180", state: "Prepared" },
  { name: "Expanded withholding tax", due: "10 Jul 2026", amount: "₱28,800", state: "In review" },
]

const money = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount)

export default function PayrollPage() {
  return (
    <BaseLayout
      title="Payroll"
      description="Payroll control for PMS Primepower's Makati workforce and client-site service teams."
    >
      <div className="space-y-6 px-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {payrollSummary.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-2.5">
                      <Icon className={`size-5 ${item.tone}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Current payroll register</CardTitle>
              <CardDescription>30 June 2026 run across Primepower Makati's service-delivery teams.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-right">Employees</TableHead>
                      <TableHead className="text-right">Gross pay</TableHead>
                      <TableHead className="text-right">Deductions</TableHead>
                      <TableHead className="text-right">Net pay</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollRegister.map((entry) => (
                      <TableRow key={entry.team}>
                        <TableCell className="font-medium">{entry.team}</TableCell>
                        <TableCell className="text-right">{entry.employees}</TableCell>
                        <TableCell className="text-right">{money(entry.gross)}</TableCell>
                        <TableCell className="text-right">{money(entry.deductions)}</TableCell>
                        <TableCell className="text-right font-medium">{money(entry.net)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
                            <CircleCheck className="size-3.5" />
                            {entry.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statutory remittances</CardTitle>
              <CardDescription>Amounts accrued from the current Makati payroll cycle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceItems.map((item) => (
                <div key={item.name} className="rounded-lg border bg-muted/20 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="size-3.5" /> Due {item.due}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.amount}</p>
                      <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">{item.state}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Makati payroll operating model</CardTitle>
            <CardDescription>How payroll supports PMS Primepower's manpower and facilities service business.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="font-medium">Service teams</p>
              <p className="mt-2 text-sm text-muted-foreground">Payroll is allocated to security, housekeeping, technical-power, and shared-services teams that support contracted client sites.</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-medium">Bi-monthly controls</p>
              <p className="mt-2 text-sm text-muted-foreground">Attendance, overtime, leave, and deployment changes are validated before each 15th and 30th payroll release.</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-medium">Client profitability</p>
              <p className="mt-2 text-sm text-muted-foreground">Direct labor is tracked by team so operating costs and margins remain visible for Makati client contracts.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  )
}
