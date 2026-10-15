"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { SystemAdminLayout } from "@/components/layouts/system-admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  RotateCcw,
  Users,
  Smartphone,
  Monitor,
  Sliders,
  Webhook,
  FileTerminal,
  UserCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  RefreshCw,
  Server,
  Activity,
  Cpu,
  Database,
  Radio,
  Clock,
  ExternalLink,
  Download,
  Filter,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  AlertOctagon,
  Layers,
  Sparkles,
  Info,
  Terminal,
  Zap,
} from "lucide-react"

// ─── 1. Health & Security KPIs ──────────────────────────────────────────────
function SystemHealthKPIs() {
  const kpis = [
    {
      title: "System Availability",
      value: "99.98%",
      subtext: "Past 30 days · No downtime",
      icon: Server,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100/80 dark:bg-emerald-950/40",
      badge: "Optimal",
      badgeColor: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
    },
    {
      title: "Active User Sessions",
      value: "142",
      subtext: "12 concurrent roles active",
      icon: Monitor,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100/80 dark:bg-blue-950/40",
      badge: "Normal Load",
      badgeColor: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    },
    {
      title: "Failed Logins (24h)",
      value: "14",
      subtext: "0.3% rate · 2 lockouts handled",
      icon: ShieldAlert,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100/80 dark:bg-amber-950/40",
      badge: "Protected",
      badgeColor: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
    },
    {
      title: "MFA Enrolment",
      value: "98.4%",
      subtext: "100% of financial staff enforced",
      icon: Smartphone,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100/80 dark:bg-indigo-950/40",
      badge: "Compliant",
      badgeColor: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700",
    },
    {
      title: "Technical Audit Events",
      value: "4,812",
      subtext: "24h immutable event stream",
      icon: FileTerminal,
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-100/80 dark:bg-violet-950/40",
      badge: "Streaming",
      badgeColor: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700",
    },
    {
      title: "Financial Module Isolation",
      value: "Enforced",
      subtext: "10/10 finance modules locked",
      icon: Lock,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100/80 dark:bg-rose-950/40",
      badge: "SoD Active",
      badgeColor: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <Badge variant="outline" className={`text-[11px] font-medium ${kpi.badgeColor}`}>
                {kpi.badge}
              </Badge>
            </div>
            <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
            <p className="text-xs font-medium text-foreground mt-1">{kpi.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ─── 2. Segregation of Duties Boundary Architecture ────────────────────────
function SegregationOfDutiesCallout() {
  const restrictedModules = [
    { name: "General Ledger", reason: "Journal entry creation & posting restricted to Accountants" },
    { name: "AP / AR", reason: "Vendor invoice matching & client billing restricted to AP/AR staff" },
    { name: "Disbursement Management", reason: "Check & voucher releases restricted to Controllers & Approvers" },
    { name: "Collection Management", reason: "Cash receipts & collections isolated to Finance Operations" },
    { name: "Budget Management", reason: "Appropriations & line items controlled by CFO and CEO" },
    { name: "Cash Management", reason: "Bank reconciliation & treasury vault managed by Treasurer" },
    { name: "Cashier Terminal", reason: "POS registers & cash drawers operated exclusively by Cashiers" },
    { name: "Financial Reports", reason: "P&L, Balance Sheet, and Trial Balance generation restricted" },
    { name: "Tax Management", reason: "BIR filing, withholding calculations reserved for Tax Accountants" },
    { name: "Payroll", reason: "Compensation calculations & disbursement files restricted to Payroll" },
  ]

  const permittedScopes = [
    { name: "Identity & Access Management (IAM)", desc: "Provisioning users, roles, password policies, and MFA configurations" },
    { name: "System Security & Session Control", desc: "Enforcing session timeouts, IP whitelisting, and terminating rogue sessions" },
    { name: "Infrastructure & Platform Flags", desc: "Managing connection pools, Redis cache, SMTP mail, and maintenance mode" },
    { name: "Technical Audit Trail", desc: "Auditing login attempts, account lockouts, role modifications, and API token rotations" },
    { name: "API & Webhook Integrations", desc: "Configuring bank endpoints, BIR gateway connections, and monitoring webhook health" },
  ]

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold">Segregation of Duties (SoD) & Access Boundary</CardTitle>
                <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px] uppercase tracking-wider">
                  Active Enforcement
                </Badge>
              </div>
              <CardDescription className="text-xs">
                System Administrator has broad system visibility & security controls, but zero operational access to financial transactions.
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-md border">
            <Lock className="h-3.5 w-3.5 text-rose-500" />
            <span>Anti-Fraud Compliance Standard (SOC 2 / ISO 27001)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Permitted System Scope */}
          <div className="space-y-3 p-4 rounded-xl bg-background/60 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  Permitted System Administrative Scope
                </h4>
              </div>
              <Badge variant="outline" className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-300 dark:border-emerald-800">
                Authorized
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Broad visibility into platform reliability, identity governance, and security controls:
            </p>
            <div className="space-y-2 mt-2">
              {permittedScopes.map((scope) => (
                <div key={scope.name} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">{scope.name}: </span>
                    <span className="text-muted-foreground">{scope.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Isolated Financial Modules */}
          <div className="space-y-3 p-4 rounded-xl bg-background/60 border border-rose-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-rose-500" />
                <h4 className="text-sm font-semibold text-rose-700 dark:text-rose-400">
                  Restricted Financial Operations (Locked by Design)
                </h4>
              </div>
              <Badge variant="outline" className="text-[10px] bg-rose-50 dark:bg-rose-950/40 text-rose-600 border-rose-300 dark:border-rose-800">
                10 Isolated Modules
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Prevents an account with IAM privileges from altering, approving, or generating financial records:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {restrictedModules.map((item) => (
                <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-rose-500/5 border border-rose-500/10 text-xs">
                  <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span className="font-medium text-foreground truncate">{item.name}</span>
                  <Badge variant="secondary" className="ml-auto text-[9px] px-1 py-0 h-4 text-muted-foreground">
                    Locked
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground bg-muted/40 p-2 rounded border flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                <strong>Audit Exception:</strong> SysAdmin can view <em>technical logs</em> (logins, lockouts, configs), but transaction amounts & vouchers are strictly isolated to the Audit Committee.
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 3. Users & Roles Management ─────────────────────────────────────────────
interface UserAccount {
  id: string
  name: string
  email: string
  role: string
  department: string
  mfaStatus: "Enforced (Active)" | "Enforced (Pending)" | "Optional"
  status: "Active" | "Temporarily Locked" | "Suspended"
  lastLogin: string
  failedAttempts: number
}

function UsersAndRolesSection() {
  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: "USR-001",
      name: "Alex Mercer",
      email: "sysadmin@primepower.com",
      role: "System Administrator",
      department: "IT & Infrastructure",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "Just now",
      failedAttempts: 0,
    },
    {
      id: "USR-002",
      name: "John Carter",
      email: "ceo@primepower.com",
      role: "CEO",
      department: "Executive Office",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "18 mins ago",
      failedAttempts: 0,
    },
    {
      id: "USR-003",
      name: "Maria Elena Ramos",
      email: "cfo@primepower.com",
      role: "Chief Financial Officer",
      department: "Finance & Treasury",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "42 mins ago",
      failedAttempts: 0,
    },
    {
      id: "USR-004",
      name: "Regina Reyes",
      email: "controller@primepower.com",
      role: "Finance Controller / Approver",
      department: "Accounting Operations",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "1 hour ago",
      failedAttempts: 0,
    },
    {
      id: "USR-005",
      name: "Victor Cruz",
      email: "audit.committee@primepower.com",
      role: "Audit Committee / Auditor",
      department: "Internal Governance",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "2 hours ago",
      failedAttempts: 0,
    },
    {
      id: "USR-006",
      name: "Carlos Mendoza",
      email: "treasurer@primepower.com",
      role: "Treasurer",
      department: "Treasury Management",
      mfaStatus: "Enforced (Active)",
      status: "Temporarily Locked",
      lastLogin: "5 failed attempts",
      failedAttempts: 5,
    },
    {
      id: "USR-007",
      name: "David Lim",
      email: "tax.accountant@primepower.com",
      role: "Tax Accountant",
      department: "Tax Compliance",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "3 hours ago",
      failedAttempts: 1,
    },
    {
      id: "USR-008",
      name: "Ana Santos",
      email: "accountant@primepower.com",
      role: "Accountant",
      department: "General Ledger",
      mfaStatus: "Enforced (Active)",
      status: "Active",
      lastLogin: "Yesterday",
      failedAttempts: 0,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("accountant")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [actionNotice, setActionNotice] = useState<string | null>(null)

  const handleUnlock = (id: string, name: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active", failedAttempts: 0, lastLogin: "Unlocked by SysAdmin" } : u))
    )
    setActionNotice(`Account ${name} unlocked successfully. Failed attempt counter cleared.`)
    setTimeout(() => setActionNotice(null), 4000)
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName || !newUserEmail) return

    const newUser: UserAccount = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      department: newUserRole.includes("admin") ? "IT" : "Finance Operations",
      mfaStatus: "Enforced (Pending)",
      status: "Active",
      lastLogin: "Never (Activation pending)",
      failedAttempts: 0,
    }

    setUsers((prev) => [newUser, ...prev])
    setIsAddUserOpen(false)
    setNewUserName("")
    setNewUserEmail("")
    setActionNotice(`User ${newUserName} provisioned. Activation email with TOTP enrollment sent.`)
    setTimeout(() => setActionNotice(null), 4000)
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSearch && matchesRole
  })

  return (
    <Card id="users-roles" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Users & Roles Directory</CardTitle>
              <CardDescription className="text-xs">
                Manage user identity, role assignments, department mappings, and authentication requirements
              </CardDescription>
            </div>
          </div>

          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 cursor-pointer">
                <Plus className="h-4 w-4" /> Provision New User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <form onSubmit={handleCreateUser}>
                <DialogHeader>
                  <DialogTitle>Provision System / Finance User</DialogTitle>
                  <DialogDescription className="text-xs">
                    New users will receive a temporary credential link and mandatory TOTP setup instructions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      placeholder="e.g. Elena Rostova"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emailaddr">Corporate Email</Label>
                    <Input
                      id="emailaddr"
                      type="email"
                      placeholder="name@primepower.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignrole">Assigned Role</Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger id="assignrole">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accountant">Accountant (General Ledger)</SelectItem>
                        <SelectItem value="tax_accountant">Tax Accountant</SelectItem>
                        <SelectItem value="treasurer">Treasurer (Cash Management)</SelectItem>
                        <SelectItem value="finance_controller">Finance Controller / Approver</SelectItem>
                        <SelectItem value="chief_financial_officer">Chief Financial Officer</SelectItem>
                        <SelectItem value="auditor">Audit Committee / Auditor</SelectItem>
                        <SelectItem value="system_admin">System Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <AlertTriangle className="size-3.5" />
                      <span>Segregation of Duties Enforcement</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Assigning financial operational roles (Controller, Accountant, Treasurer) does not grant the administrator operational access to their ledger accounts.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {actionNotice && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-xs text-muted-foreground hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">System Admin</SelectItem>
                <SelectItem value="ceo">CEO</SelectItem>
                <SelectItem value="financial">CFO / Controller</SelectItem>
                <SelectItem value="accountant">Accountants</SelectItem>
                <SelectItem value="auditor">Auditors</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-xs font-semibold">User</TableHead>
                <TableHead className="text-xs font-semibold">Role & Department</TableHead>
                <TableHead className="text-xs font-semibold">MFA Policy</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-xs font-semibold">Last Login</TableHead>
                <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div>
                      <span className="font-semibold text-foreground">{user.name}</span>
                      <p className="text-[11px] text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{user.role}</div>
                    <div className="text-[11px] text-muted-foreground">{user.department}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 text-[10px]">
                      <Smartphone className="size-2.5 mr-1" />
                      {user.mfaStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.status === "Active" ? (
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[10px]">
                        Active
                      </Badge>
                    ) : user.status === "Temporarily Locked" ? (
                      <Badge variant="destructive" className="text-[10px] animate-pulse">
                        <Lock className="size-2.5 mr-1" /> Locked Out
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">
                        Suspended
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {user.status === "Temporarily Locked" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnlock(user.id, user.name)}
                          className="h-7 text-xs gap-1 border-rose-300 text-rose-700 dark:text-rose-300 hover:bg-rose-50 cursor-pointer"
                        >
                          <Unlock className="size-3" /> Unlock
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setActionNotice(`Password reset link dispatched to ${user.email}.`)
                            setTimeout(() => setActionNotice(null), 4000)
                          }}
                          className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <RotateCcw className="size-3" /> Reset
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 4. Permission Matrix ───────────────────────────────────────────────────
function PermissionMatrixSection() {
  const roles = [
    { key: "admin", label: "System Admin" },
    { key: "auditor", label: "Auditor" },
    { key: "ceo", label: "CEO" },
    { key: "cfo", label: "CFO" },
    { key: "controller", label: "Controller" },
    { key: "accountant", label: "Accountant" },
    { key: "treasurer", label: "Treasurer" },
  ]

  const capabilities = [
    {
      category: "System & Infrastructure",
      module: "System Configuration & Environments",
      perms: { admin: "Full Control", auditor: "Read-Only", ceo: "None", cfo: "None", controller: "None", accountant: "None", treasurer: "None" },
    },
    {
      category: "System & Infrastructure",
      module: "IAM, User Accounts & Password Resets",
      perms: { admin: "Full Control", auditor: "Read-Only", ceo: "None", cfo: "None", controller: "None", accountant: "None", treasurer: "None" },
    },
    {
      category: "System & Infrastructure",
      module: "Authentication, MFA & Session Management",
      perms: { admin: "Full Control", auditor: "Read-Only", ceo: "None", cfo: "None", controller: "None", accountant: "None", treasurer: "None" },
    },
    {
      category: "System & Infrastructure",
      module: "API Keys & Third-Party Integrations",
      perms: { admin: "Full Control", auditor: "Read-Only", ceo: "None", cfo: "None", controller: "None", accountant: "None", treasurer: "None" },
    },
    {
      category: "Technical & Audit Logs",
      module: "Technical Audit Trail (Auth, Lockouts, Configs)",
      perms: { admin: "Full Access", auditor: "Full Access", ceo: "None", cfo: "None", controller: "None", accountant: "None", treasurer: "None" },
    },
    {
      category: "Financial Operations (Isolated)",
      module: "General Ledger Posting & Journal Entries",
      perms: { admin: "RESTRICTED 🚫", auditor: "Read-Only", ceo: "Read-Only", cfo: "Approve Only", controller: "Approve Only", accountant: "Full Posting", treasurer: "None" },
    },
    {
      category: "Financial Operations (Isolated)",
      module: "Disbursement Approvals & Voucher Release",
      perms: { admin: "RESTRICTED 🚫", auditor: "Read-Only", ceo: "High Tier (>1M)", cfo: "Full Approval", controller: "Full Approval", accountant: "Prepare Only", treasurer: "Release Only" },
    },
    {
      category: "Financial Operations (Isolated)",
      module: "Cash Management & Bank Reconciliations",
      perms: { admin: "RESTRICTED 🚫", auditor: "Read-Only", ceo: "Read-Only", cfo: "Oversight", controller: "Review Only", accountant: "Review Only", treasurer: "Full Control" },
    },
    {
      category: "Financial Operations (Isolated)",
      module: "Accounts Payable & Accounts Receivable",
      perms: { admin: "RESTRICTED 🚫", auditor: "Read-Only", ceo: "Read-Only", cfo: "Oversight", controller: "Review Only", accountant: "Operational", treasurer: "Collections" },
    },
    {
      category: "Financial Operations (Isolated)",
      module: "Official Financial Reports (P&L, Balance Sheet)",
      perms: { admin: "RESTRICTED 🚫", auditor: "Full Review", ceo: "Full Executive", cfo: "Full Executive", controller: "Full Report", accountant: "Generate", treasurer: "View" },
    },
  ]

  const getBadgeForPerm = (perm: string) => {
    if (perm.includes("RESTRICTED")) {
      return (
        <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 text-[10px] font-semibold">
          <Lock className="size-2.5 mr-1 inline" /> {perm}
        </Badge>
      )
    }
    if (perm.includes("Full Control") || perm.includes("Full Access")) {
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px]">
          {perm}
        </Badge>
      )
    }
    if (perm.includes("Read-Only") || perm.includes("View") || perm.includes("Review")) {
      return (
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 text-[10px]">
          {perm}
        </Badge>
      )
    }
    if (perm === "None") {
      return <span className="text-[11px] text-muted-foreground/60">—</span>
    }
    return (
      <Badge variant="secondary" className="text-[10px]">
        {perm}
      </Badge>
    )
  }

  return (
    <Card id="permission-matrix" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Role Permission Matrix</CardTitle>
              <CardDescription className="text-xs">
                Comprehensive authorization matrix enforcing strict segregation between system IAM and financial records
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            Least Privilege Principle
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-xs font-semibold min-w-[200px]">Capability / Module</TableHead>
                {roles.map((r) => (
                  <TableHead key={r.key} className={`text-xs font-semibold text-center ${r.key === "admin" ? "bg-primary/5 text-primary" : ""}`}>
                    {r.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {capabilities.map((cap, idx) => (
                <TableRow key={idx} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{cap.category}</div>
                    <div className="text-foreground font-medium">{cap.module}</div>
                  </TableCell>
                  <TableCell className="text-center bg-primary/5 font-semibold">
                    {getBadgeForPerm(cap.perms.admin)}
                  </TableCell>
                  <TableCell className="text-center">{getBadgeForPerm(cap.perms.auditor)}</TableCell>
                  <TableCell className="text-center">{getBadgeForPerm(cap.perms.ceo)}</TableCell>
                  <TableCell className="text-center">{getBadgeForPerm(cap.perms.cfo)}</TableCell>
                  <TableCell className="text-center">{getBadgeForPerm(cap.perms.controller)}</TableCell>
                  <TableCell className="text-center">{getBadgeForPerm(cap.perms.accountant)}</TableCell>
                  <TableCell className="text-center">{getBadgeForPerm(cap.perms.treasurer)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 5. Account Status / Password Resets ────────────────────────────────────
function AccountStatusAndResets() {
  const [lockedAccounts, setLockedAccounts] = useState([
    {
      id: "ACC-LOCK-1",
      email: "treasurer@primepower.com",
      name: "Carlos Mendoza",
      reason: "5 consecutive failed password attempts",
      ip: "192.168.1.104 (Office Workstation 4)",
      lockedAt: "12 mins ago",
      cooldownRemaining: "2m 45s",
    },
    {
      id: "ACC-LOCK-2",
      email: "temp.contractor@primepower.com",
      name: "External Consultant",
      reason: "TOTP mismatch threshold exceeded",
      ip: "112.198.42.18 (External IP)",
      lockedAt: "28 mins ago",
      cooldownRemaining: "Expired (Awaiting Admin Unlock)",
    },
  ])

  const [notification, setNotification] = useState<string | null>(null)
  const [manualResetEmail, setManualResetEmail] = useState("")

  const unlockAccount = (id: string, name: string) => {
    setLockedAccounts((prev) => prev.filter((a) => a.id !== id))
    setNotification(`Lockout for ${name} cleared. User can now authenticate.`)
    setTimeout(() => setNotification(null), 4000)
  }

  const handleManualReset = (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualResetEmail) return
    setNotification(`One-time emergency password reset link sent to ${manualResetEmail}. Valid for 15 minutes.`)
    setManualResetEmail("")
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <div id="account-status-resets" className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Policy Card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Password & Lockout Policy</CardTitle>
              <CardDescription className="text-xs">Active credential governance rules</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b">
            <span className="text-muted-foreground">Minimum Password Length</span>
            <span className="font-semibold text-foreground">12 characters</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b">
            <span className="text-muted-foreground">Complexity Requirements</span>
            <span className="font-semibold text-foreground">Upper, Lower, Num, Special</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b">
            <span className="text-muted-foreground">Password Rotation Period</span>
            <span className="font-semibold text-foreground">90 days</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b">
            <span className="text-muted-foreground">Lockout Threshold</span>
            <Badge variant="outline" className="text-amber-600 border-amber-300">
              5 Failed Attempts
            </Badge>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b">
            <span className="text-muted-foreground">Automatic Lockout Cooldown</span>
            <span className="font-semibold text-foreground">15 minutes</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-muted-foreground">Prevent Password Reuse</span>
            <span className="font-semibold text-foreground">Last 5 passwords</span>
          </div>

          <div className="mt-4 pt-3 border-t">
            <h5 className="font-semibold text-xs mb-2">Emergency Reset Tool</h5>
            <form onSubmit={handleManualReset} className="space-y-2">
              <Input
                placeholder="Target user email..."
                type="email"
                value={manualResetEmail}
                onChange={(e) => setManualResetEmail(e.target.value)}
                className="text-xs"
              />
              <Button type="submit" size="sm" variant="outline" className="w-full text-xs cursor-pointer">
                Dispatch One-Time Reset Link
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Active Lockouts Table */}
      <Card className="lg:col-span-2 border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
                <AlertOctagon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Active Account Lockouts</CardTitle>
                <CardDescription className="text-xs">
                  Accounts temporarily suspended due to consecutive credential failures
                </CardDescription>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">
              {lockedAccounts.length} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {notification && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {lockedAccounts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-xs">
              <ShieldCheck className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
              <p>No active account lockouts at this moment.</p>
              <p className="text-[11px]">All system and finance users are in normal standing.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lockedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{account.name}</span>
                      <span className="text-muted-foreground">({account.email})</span>
                      <Badge variant="destructive" className="text-[9px] px-1.5 py-0">
                        Locked
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px] flex items-center gap-1.5">
                      <AlertTriangle className="size-3 text-amber-500" />
                      {account.reason} · Trigger IP: <span className="font-mono text-foreground">{account.ip}</span>
                    </p>
                    <p className="text-[10.5px] text-muted-foreground">
                      Locked {account.lockedAt} · Cooldown remaining:{" "}
                      <span className="font-semibold text-foreground">{account.cooldownRemaining}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => unlockAccount(account.id, account.name)}
                      className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                      <Unlock className="size-3" /> Unlock Account
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ─── 6. Security Settings ───────────────────────────────────────────────────
function SecuritySettingsSection() {
  const [settings, setSettings] = useState({
    enforceMfaAll: true,
    bruteForceProtection: true,
    idleSessionTimeout: true,
    restrictVpnSubnet: true,
    tlsHstsEnforce: true,
    immutableAuditLogs: true,
    dualAuthorization: true,
  })

  const [savedBanner, setSavedBanner] = useState(false)

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 3000)
  }

  return (
    <Card id="security-settings" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Security Settings & Hardening</CardTitle>
              <CardDescription className="text-xs">
                Platform-wide security posture, brute-force mitigation, and session integrity parameters
              </CardDescription>
            </div>
          </div>
          {savedBanner && (
            <Badge className="bg-emerald-600 text-white text-xs animate-fade-in">
              <CheckCircle2 className="size-3 mr-1 inline" /> Policy Updated
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
            <div className="space-y-0.5 pr-4">
              <div className="font-semibold text-xs text-foreground">Mandatory MFA for All Role Logins</div>
              <p className="text-[11px] text-muted-foreground">
                Enforces TOTP 6-digit challenge upon successful password verification for all users.
              </p>
            </div>
            <Switch checked={settings.enforceMfaAll} onCheckedChange={() => handleToggle("enforceMfaAll")} />
          </div>

          <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
            <div className="space-y-0.5 pr-4">
              <div className="font-semibold text-xs text-foreground">Brute-Force Shield & Rate Limiting</div>
              <p className="text-[11px] text-muted-foreground">
                Automatically activates 15-minute cooldown lockout upon 5 consecutive failed login attempts.
              </p>
            </div>
            <Switch checked={settings.bruteForceProtection} onCheckedChange={() => handleToggle("bruteForceProtection")} />
          </div>

          <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
            <div className="space-y-0.5 pr-4">
              <div className="font-semibold text-xs text-foreground">15-Minute Inactive Session Timeout</div>
              <p className="text-[11px] text-muted-foreground">
                Terminates idle client JWT tokens and clears session storage after 15 minutes of inactivity.
              </p>
            </div>
            <Switch checked={settings.idleSessionTimeout} onCheckedChange={() => handleToggle("idleSessionTimeout")} />
          </div>

          <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
            <div className="space-y-0.5 pr-4">
              <div className="font-semibold text-xs text-foreground">Subnet & Corporate VPN Restriction</div>
              <p className="text-[11px] text-muted-foreground">
                Restricts access to designated corporate CIDR blocks (192.168.1.0/24, 10.0.0.0/16).
              </p>
            </div>
            <Switch checked={settings.restrictVpnSubnet} onCheckedChange={() => handleToggle("restrictVpnSubnet")} />
          </div>

          <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
            <div className="space-y-0.5 pr-4">
              <div className="font-semibold text-xs text-foreground">Strict TLS 1.3 & HSTS Preload</div>
              <p className="text-[11px] text-muted-foreground">
                Requires encrypted transport with perfect forward secrecy across all API endpoints.
              </p>
            </div>
            <Switch checked={settings.tlsHstsEnforce} onCheckedChange={() => handleToggle("tlsHstsEnforce")} />
          </div>

          <div className="flex items-start justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
            <div className="space-y-0.5 pr-4">
              <div className="font-semibold text-xs text-foreground">Dual-Authorization for Admin Changes</div>
              <p className="text-[11px] text-muted-foreground">
                Requires co-approval from Audit Committee before activating elevated role privileges.
              </p>
            </div>
            <Switch checked={settings.dualAuthorization} onCheckedChange={() => handleToggle("dualAuthorization")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 7. Authentication & MFA ────────────────────────────────────────────────
function AuthenticationAndMfa() {
  const [testCode, setTestCode] = useState("")
  const [testResult, setTestResult] = useState<string | null>(null)

  const handleTestCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (testCode.length !== 6) {
      setTestResult("Code must be exactly 6 digits.")
      return
    }
    setTestResult(`Token ${testCode} verified successfully against server clock. Drift: +0.2s (Well within 30s window).`)
  }

  return (
    <div id="authentication-mfa" className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="border shadow-sm lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Authentication & MFA Configuration</CardTitle>
              <CardDescription className="text-xs">
                Two-factor authentication providers, TOTP parameters, and cryptographic enrollment
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="p-3 rounded-lg border bg-muted/20">
              <div className="text-xs text-muted-foreground font-medium">TOTP Authenticator</div>
              <div className="text-base font-bold text-foreground mt-1">RFC 6238 Standard</div>
              <Badge variant="outline" className="mt-2 text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300">
                Primary Standard
              </Badge>
            </div>
            <div className="p-3 rounded-lg border bg-muted/20">
              <div className="text-xs text-muted-foreground font-medium">FIDO2 / WebAuthn</div>
              <div className="text-base font-bold text-foreground mt-1">YubiKey Ready</div>
              <Badge variant="outline" className="mt-2 text-[10px] bg-blue-50 text-blue-700 border-blue-300">
                Hardware Keys
              </Badge>
            </div>
            <div className="p-3 rounded-lg border bg-muted/20">
              <div className="text-xs text-muted-foreground font-medium">SMS Verification</div>
              <div className="text-base font-bold text-rose-600 mt-1">Disabled by Policy</div>
              <Badge variant="destructive" className="mt-2 text-[10px]">
                Insecure (SIM Swap)
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-xs">
            <h5 className="font-semibold text-foreground">Supported Authenticator Applications</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Google Authenticator", "Microsoft Authenticator", "Twilio Authy", "1Password / Bitwarden"].map((app) => (
                <div key={app} className="flex items-center gap-1.5 p-2 rounded border bg-card text-[11px]">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOTP Diagnostic Tool */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">TOTP Token Diagnostic</CardTitle>
          <CardDescription className="text-xs">
            Test and diagnose user clock drift and token acceptance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form onSubmit={handleTestCode} className="space-y-2">
            <Label htmlFor="testcode" className="text-xs">Sample 6-Digit Token</Label>
            <Input
              id="testcode"
              maxLength={6}
              placeholder="000000"
              value={testCode}
              onChange={(e) => setTestCode(e.target.value.replace(/\D/g, ""))}
              className="text-center font-mono tracking-widest text-lg font-bold"
            />
            <Button type="submit" size="sm" className="w-full text-xs cursor-pointer">
              Validate Token Sync
            </Button>
          </form>

          {testResult && (
            <div className="p-2.5 rounded bg-muted/40 border text-xs text-muted-foreground mt-2">
              <p className="font-medium text-foreground">{testResult}</p>
            </div>
          )}

          <div className="text-[11px] text-muted-foreground space-y-1 pt-2 border-t">
            <div className="flex justify-between">
              <span>Time-Step:</span>
              <span className="font-semibold text-foreground">30 seconds</span>
            </div>
            <div className="flex justify-between">
              <span>Algorithm:</span>
              <span className="font-semibold text-foreground">HMAC-SHA1</span>
            </div>
            <div className="flex justify-between">
              <span>Skew Tolerance:</span>
              <span className="font-semibold text-foreground">±1 step (60s)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── 8. Session Management ──────────────────────────────────────────────────
function SessionManagementSection() {
  const [sessions, setSessions] = useState([
    {
      id: "SESS-9821",
      user: "Alex Mercer (You)",
      role: "System Administrator",
      ip: "10.0.4.12",
      device: "Windows 11 · Edge 131",
      location: "Makati, Philippines (VPN)",
      started: "45 mins ago",
      status: "Active (Current)",
    },
    {
      id: "SESS-9818",
      user: "John Carter",
      role: "CEO",
      ip: "192.168.1.15",
      device: "macOS 15 · Safari 18",
      location: "BGC Office HQ",
      started: "18 mins ago",
      status: "Active",
    },
    {
      id: "SESS-9814",
      user: "Maria Elena Ramos",
      role: "CFO",
      ip: "192.168.1.22",
      device: "Windows 11 · Chrome 130",
      location: "BGC Office HQ",
      started: "42 mins ago",
      status: "Active",
    },
    {
      id: "SESS-9799",
      user: "Victor Cruz",
      role: "Auditor",
      ip: "192.168.1.88",
      device: "macOS 15 · Chrome 130",
      location: "BGC Office HQ",
      started: "2 hours ago",
      status: "Idle (12m)",
    },
  ])

  const [sessionNotice, setSessionNotice] = useState<string | null>(null)

  const terminateSession = (id: string, user: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setSessionNotice(`Session ${id} for ${user} was revoked and token invalidated.`)
    setTimeout(() => setSessionNotice(null), 4000)
  }

  return (
    <Card id="session-management" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
              <Monitor className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Active Session Management</CardTitle>
              <CardDescription className="text-xs">
                Inspect, audit, and terminate concurrent authenticated sessions across the infrastructure
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {sessions.length} Active Tokens
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {sessionNotice && (
          <div className="mb-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{sessionNotice}</span>
          </div>
        )}

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-xs font-semibold">User & Role</TableHead>
                <TableHead className="text-xs font-semibold">IP & Location</TableHead>
                <TableHead className="text-xs font-semibold">Device / Client</TableHead>
                <TableHead className="text-xs font-semibold">Started</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-xs font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((sess) => (
                <TableRow key={sess.id} className="text-xs hover:bg-muted/30">
                  <TableCell>
                    <div className="font-semibold text-foreground">{sess.user}</div>
                    <div className="text-[11px] text-muted-foreground">{sess.role}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-foreground">{sess.ip}</div>
                    <div className="text-[11px] text-muted-foreground">{sess.location}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sess.device}</TableCell>
                  <TableCell className="text-muted-foreground">{sess.started}</TableCell>
                  <TableCell>
                    {sess.status.includes("Current") ? (
                      <Badge className="bg-emerald-600 text-white text-[10px]">Current Session</Badge>
                    ) : sess.status.includes("Idle") ? (
                      <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">
                        {sess.status}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!sess.status.includes("Current") && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => terminateSession(sess.id, sess.user)}
                        className="h-7 text-xs cursor-pointer"
                      >
                        Revoke
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 9. System Configuration ────────────────────────────────────────────────
function SystemConfigurationSection() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugLogs, setDebugLogs] = useState(false)
  const [poolSize, setPoolSize] = useState("100")
  const [backupSchedule, setBackupSchedule] = useState("daily")
  const [configBanner, setConfigBanner] = useState<string | null>(null)

  const handleSave = () => {
    setConfigBanner("System parameters saved to cluster configuration vault.")
    setTimeout(() => setConfigBanner(null), 3000)
  }

  return (
    <Card id="system-configuration" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">System Configuration & Environment</CardTitle>
              <CardDescription className="text-xs">
                Manage backend connection pooling, caching policies, automated backup cadence, and maintenance flags
              </CardDescription>
            </div>
          </div>
          {configBanner && (
            <Badge className="bg-emerald-600 text-white text-xs">
              <CheckCircle2 className="size-3 mr-1 inline" /> {configBanner}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-3 p-3.5 rounded-lg border bg-card">
            <h5 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <Database className="size-3.5 text-primary" /> Database & Storage Pools
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">PostgreSQL Max Pool Size</span>
                <Input
                  className="w-24 h-7 text-xs text-right font-mono"
                  value={poolSize}
                  onChange={(e) => setPoolSize(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Automated Snapshot Frequency</span>
                <Select value={backupSchedule} onValueChange={setBackupSchedule}>
                  <SelectTrigger className="w-32 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Every Hour</SelectItem>
                    <SelectItem value="daily">Daily at 02:00</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-foreground">Last Verified Snapshot</span>
                <span className="font-semibold text-emerald-600">35 mins ago (AES-256)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-3.5 rounded-lg border bg-card">
            <h5 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <Zap className="size-3.5 text-amber-500" /> Operational Controls
            </h5>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Maintenance Mode</div>
                  <p className="text-[11px] text-muted-foreground">Block all non-admin client traffic for upgrades</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Verbose Query Debug Logging</div>
                  <p className="text-[11px] text-muted-foreground">Write query execution plans to diagnostics</p>
                </div>
                <Switch checked={debugLogs} onCheckedChange={setDebugLogs} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="sm" onClick={handleSave} className="text-xs cursor-pointer">
            Save System Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 10. Integration / API Settings ─────────────────────────────────────────
function IntegrationAndApiSettings() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: "KEY-01",
      name: "BDO Banking Gateway Webhook",
      scope: "bank:statement:read (No Transactions)",
      created: "Sep 15, 2026",
      status: "Active",
      lastUsed: "4 mins ago",
    },
    {
      id: "KEY-02",
      name: "BIR Tax Portal Electronic Sync",
      scope: "tax:compliance:verify (Read Only)",
      created: "Aug 02, 2026",
      status: "Active",
      lastUsed: "2 hours ago",
    },
    {
      id: "KEY-03",
      name: "ERP Master Data Bridge",
      scope: "entity:sync:metadata",
      created: "Jul 11, 2026",
      status: "Active",
      lastUsed: "15 mins ago",
    },
  ])

  const [notice, setNotice] = useState<string | null>(null)

  const revokeKey = (id: string, name: string) => {
    setApiKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "Revoked" } : k)))
    setNotice(`API key ${name} revoked. Access terminated.`)
    setTimeout(() => setNotice(null), 3500)
  }

  return (
    <Card id="integration-api-settings" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400">
              <Webhook className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Integration & API Token Settings</CardTitle>
              <CardDescription className="text-xs">
                Manage external system bridges, API gateways, webhooks, and programmatic service credentials
              </CardDescription>
            </div>
          </div>
          <Button size="sm" variant="outline" className="text-xs gap-1 cursor-pointer">
            <Plus className="size-3.5" /> Generate Service Key
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {notice && (
          <div className="mb-3 p-2.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs text-amber-800 dark:text-amber-300">
            {notice}
          </div>
        )}

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-xs font-semibold">Integration / Key Name</TableHead>
                <TableHead className="text-xs font-semibold">Granular Scope</TableHead>
                <TableHead className="text-xs font-semibold">Created</TableHead>
                <TableHead className="text-xs font-semibold">Last Used</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
                <TableHead className="text-xs font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((k) => (
                <TableRow key={k.id} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-semibold text-foreground">{k.name}</TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{k.scope}</TableCell>
                  <TableCell className="text-muted-foreground">{k.created}</TableCell>
                  <TableCell className="text-muted-foreground">{k.lastUsed}</TableCell>
                  <TableCell>
                    {k.status === "Active" ? (
                      <Badge className="bg-emerald-600 text-white text-[10px]">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-[10px]">Revoked</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {k.status === "Active" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => revokeKey(k.id, k.name)}
                        className="h-7 text-xs text-rose-600 hover:text-rose-700 cursor-pointer"
                      >
                        Revoke
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 11. System Audit Logs (Technical Audit Logs Only) ──────────────────────
function SystemAuditLogsSection() {
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const logs = [
    {
      id: "LOG-5501",
      timestamp: "Today, 19:24:12",
      type: "auth",
      severity: "WARN",
      actor: "treasurer@primepower.com",
      action: "ACCOUNT_LOCKED_FAILED_ATTEMPTS",
      details: "User reached 5 consecutive failed login attempts. Automatic 15m cooldown initiated.",
      ip: "192.168.1.104",
    },
    {
      id: "LOG-5500",
      timestamp: "Today, 19:22:04",
      type: "auth",
      severity: "INFO",
      actor: "ceo@primepower.com",
      action: "TOTP_VERIFICATION_SUCCESS",
      details: "Two-factor authentication code accepted via RFC 6238 token.",
      ip: "192.168.1.15",
    },
    {
      id: "LOG-5499",
      timestamp: "Today, 19:15:30",
      type: "role",
      severity: "INFO",
      actor: "sysadmin@primepower.com",
      action: "PERMISSION_MATRIX_INSPECTED",
      details: "System Administrator viewed role segregation and permission matrix.",
      ip: "10.0.4.12",
    },
    {
      id: "LOG-5498",
      timestamp: "Today, 18:45:11",
      type: "config",
      severity: "INFO",
      actor: "sysadmin@primepower.com",
      action: "SECURITY_POLICY_CONFIRMED",
      details: "Session idle timeout confirmed at 15 minutes across all roles.",
      ip: "10.0.4.12",
    },
    {
      id: "LOG-5497",
      timestamp: "Today, 17:30:22",
      type: "api",
      severity: "INFO",
      actor: "API_GATEWAY",
      action: "BIR_GATEWAY_HEALTH_CHECK",
      details: "Periodic synthetic ping successful (110ms latency).",
      ip: "10.0.0.1",
    },
    {
      id: "LOG-5496",
      timestamp: "Today, 16:12:44",
      type: "auth",
      severity: "WARN",
      actor: "unknown@external.net",
      action: "UNAUTHORIZED_ADMIN_URL_BLOCKED",
      details: "Attempt to query administrative endpoint rejected by WAF rules.",
      ip: "45.33.32.156",
    },
    {
      id: "LOG-5495",
      timestamp: "Today, 15:04:19",
      type: "role",
      severity: "INFO",
      actor: "sysadmin@primepower.com",
      action: "USER_PROVISIONED",
      details: "Account for Elena Rostova created with mandatory TOTP enrollment.",
      ip: "10.0.4.12",
    },
  ]

  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType === "all" || log.type === filterType
    const matchesSearch =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery)
    return matchesType && matchesSearch
  })

  return (
    <Card id="system-audit-logs" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
              <FileTerminal className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold">Technical Audit Logs</CardTitle>
                <Badge variant="outline" className="text-[10px] bg-sky-50 text-sky-700 border-sky-300">
                  Immutable Stream
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Comprehensive technical event trail: login attempts, lockouts, role modifications, config edits, and integrations
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-xs gap-1.5 cursor-pointer">
              <Download className="size-3.5" /> Export Technical Logs
            </Button>
          </div>
        </div>

        {/* Financial Separation Clarification Banner */}
        <div className="mt-2 p-2.5 rounded-lg bg-muted/60 border text-xs text-muted-foreground flex items-center gap-2">
          <Info className="size-4 shrink-0 text-sky-600" />
          <span>
            <strong>Compliance Notice:</strong> This log viewer displays <em>technical and system infrastructure events</em> only. Financial ledger records (journal postings, disbursements, receipts) are stored in the financial audit vault restricted to certified finance auditors.
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search technical logs by actor, action, IP, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
          <Tabs value={filterType} onValueChange={setFilterType} className="w-full sm:w-auto">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs">All Events</TabsTrigger>
              <TabsTrigger value="auth" className="text-xs">Logins & Lockouts</TabsTrigger>
              <TabsTrigger value="role" className="text-xs">Role & IAM</TabsTrigger>
              <TabsTrigger value="config" className="text-xs">Config & System</TabsTrigger>
              <TabsTrigger value="api" className="text-xs">APIs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Logs Table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-xs font-semibold">Timestamp</TableHead>
                <TableHead className="text-xs font-semibold">Severity</TableHead>
                <TableHead className="text-xs font-semibold">Action / Event</TableHead>
                <TableHead className="text-xs font-semibold">Actor</TableHead>
                <TableHead className="text-xs font-semibold">IP Address</TableHead>
                <TableHead className="text-xs font-semibold">Technical Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="text-xs hover:bg-muted/30">
                  <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    {log.severity === "WARN" ? (
                      <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30">
                        WARN
                      </Badge>
                    ) : log.severity === "CRITICAL" ? (
                      <Badge variant="destructive" className="text-[10px]">
                        CRIT
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30">
                        INFO
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] font-semibold text-foreground">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.actor}</TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{log.ip}</TableCell>
                  <TableCell className="text-foreground max-w-md truncate">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── 12. My Profile ─────────────────────────────────────────────────────────
function MyProfileSection() {
  return (
    <Card id="my-profile" className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-500/15 text-slate-600 dark:text-slate-400">
            <UserCircle className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">System Administrator Profile</CardTitle>
            <CardDescription className="text-xs">
              Personal security credentials, cryptographic keys, and active privilege tier
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="space-y-3 p-4 rounded-xl border bg-muted/20">
            <div className="size-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
              AM
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground">Alex Mercer</h4>
              <p className="text-xs text-muted-foreground">Lead Infrastructure & Security Administrator</p>
              <Badge className="mt-2 text-[10px] bg-emerald-600 text-white">
                Tier 4 System Access
              </Badge>
            </div>
            <Separator />
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>Employee ID: <span className="font-semibold text-foreground">SYS-8821</span></div>
              <div>Department: <span className="font-semibold text-foreground">IT & IAM Governance</span></div>
              <div>Security Clearance: <span className="font-semibold text-foreground">Infrastructure Only</span></div>
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-xl border bg-muted/20 md:col-span-2">
            <h5 className="text-xs font-semibold text-foreground">Authentication & Keyring Credentials</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Hardware Security Key</span>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300">
                    Active
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">YubiKey 5C NFC (#YK-99420)</p>
              </div>

              <div className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">TOTP Authenticator</span>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300">
                    Enforced
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Google Authenticator (Sync OK)</p>
              </div>

              <div className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Password Last Changed</span>
                  <span className="text-[11px] text-muted-foreground">14 days ago</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Expires in 76 days</p>
              </div>

              <div className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Operational Finance Access</span>
                  <Badge variant="destructive" className="text-[10px]">
                    Locked (SoD)
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Non-financial persona enforced</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page Export ───────────────────────────────────────────────────────
export default function SystemAdminDashboard() {
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
    <SystemAdminLayout>
      <div className="flex-1 space-y-6 px-4 lg:px-6 pt-0">
        {/* Page Header */}
        <div className="flex md:flex-row flex-col md:items-center justify-between gap-4 md:gap-6 border-b pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">System Administrator Dashboard</h1>
              <Badge className="bg-emerald-600 text-white text-[11px]">
                System Access Only
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Broad visibility into platform reliability, user identities & technical audit logs · Segregated from financial operations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
              <Lock className="size-3 mr-1 inline" /> Segregation of Duties Active
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="size-3 mr-1 inline" /> Real-time Telemetry
            </Badge>
          </div>
        </div>

        {/* 1. System Health KPIs */}
        <SystemHealthKPIs />

        {/* 2. Segregation of Duties Boundary Banner */}
        <SegregationOfDutiesCallout />

        {/* 3. Users & Roles */}
        <UsersAndRolesSection />

        {/* 4. Permission Matrix */}
        <PermissionMatrixSection />

        {/* 5. Account Status / Password Resets */}
        <AccountStatusAndResets />

        {/* 6. Security Settings */}
        <SecuritySettingsSection />

        {/* 7. Authentication & MFA */}
        <AuthenticationAndMfa />

        {/* 8. Session Management */}
        <SessionManagementSection />

        {/* 9. System Configuration */}
        <SystemConfigurationSection />

        {/* 10. Integration / API Settings */}
        <IntegrationAndApiSettings />

        {/* 11. System Audit Logs */}
        <SystemAuditLogsSection />

        {/* 12. My Profile */}
        <MyProfileSection />
      </div>
    </SystemAdminLayout>
  )
}
