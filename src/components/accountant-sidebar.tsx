"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  Building2,
  Scale,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Receipt,
  FileText,
  FileSpreadsheet,
  Users,
  BadgeDollarSign,
  HandCoins,
  ArrowRightLeft,
  Banknote,
  Wallet,
  Landmark,
  BarChart3,
  CirclePercent,
  FileCheck,
  CalendarCheck,
  UserCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Elena Cruz, CPA",
    email: "accountant@primepower.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/accountant#dashboard",
          icon: LayoutDashboard,
          color: "text-blue-600 dark:text-blue-400",
          hoverColor: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:bg-blue-400/10 dark:hover:text-blue-400",
        },
      ],
    },
    {
      label: "Accounting Records & Ledgers",
      items: [
        {
          title: "Ledgers",
          url: "/accountant#ledgers",
          icon: BookOpen,
          color: "text-indigo-600 dark:text-indigo-400",
          hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
          items: [
            {
              title: "General Ledger",
              url: "/accountant#general-ledger",
              icon: BookMarked,
              hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
            },
            {
              title: "Assets",
              url: "/accountant#assets",
              icon: Building2,
              hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
            },
            {
              title: "Liabilities",
              url: "/accountant#liabilities",
              icon: Scale,
              hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
            },
            {
              title: "Equity",
              url: "/accountant#equity",
              icon: ShieldCheck,
              hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
            },
            {
              title: "Revenue",
              url: "/accountant#revenue",
              icon: TrendingUp,
              hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
            },
            {
              title: "Expenses",
              url: "/accountant#expenses",
              icon: TrendingDown,
              hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
            },
          ],
        },
        {
          title: "Accounts Payable",
          url: "/accountant#accounts-payable",
          icon: Receipt,
          color: "text-rose-600 dark:text-rose-400",
          hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
          items: [
            {
              title: "Overview",
              url: "/accountant#ap-overview",
              icon: FileText,
              hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
            },
            {
              title: "Vendor invoices",
              url: "/accountant#ap-vendor-invoices",
              icon: FileSpreadsheet,
              hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
            },
            {
              title: "Payroll data (prepare/review only)",
              url: "/accountant#ap-payroll",
              icon: Users,
              hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
            },
          ],
        },
        {
          title: "Accounts Receivable",
          url: "/accountant#accounts-receivable",
          icon: BadgeDollarSign,
          color: "text-emerald-600 dark:text-emerald-400",
          hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
          items: [
            {
              title: "Overview",
              url: "/accountant#ar-overview",
              icon: FileText,
              hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
            },
            {
              title: "Invoices",
              url: "/accountant#ar-invoices",
              icon: Receipt,
              hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
            },
            {
              title: "Collections review",
              url: "/accountant#ar-collections-review",
              icon: HandCoins,
              hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
            },
            {
              title: "Payments reconciliation",
              url: "/accountant#ar-payments-reconciliation",
              icon: ArrowRightLeft,
              hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
            },
          ],
        },
        {
          title: "Disbursement Management",
          url: "/accountant#disbursement-management",
          icon: Banknote,
          color: "text-amber-600 dark:text-amber-400",
          hoverColor: "hover:bg-amber-500/10 hover:text-amber-600 dark:hover:bg-amber-400/10 dark:hover:text-amber-400",
        },
        {
          title: "Collection Management",
          url: "/accountant#collection-management",
          icon: HandCoins,
          color: "text-teal-600 dark:text-teal-400",
          hoverColor: "hover:bg-teal-500/10 hover:text-teal-600 dark:hover:bg-teal-400/10 dark:hover:text-teal-400",
        },
        {
          title: "Cash Management",
          url: "/accountant#cash-management",
          icon: Wallet,
          color: "text-cyan-600 dark:text-cyan-400",
          hoverColor: "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-400",
          items: [
            {
              title: "Bank reconciliation & cash-position",
              url: "/accountant#cash-management",
              icon: Landmark,
              hoverColor: "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-400",
            },
          ],
        },
      ],
    },
    {
      label: "Reporting & Governance",
      items: [
        {
          title: "Financial Reporting & Analytics",
          url: "/accountant#financial-reporting",
          icon: BarChart3,
          color: "text-violet-600 dark:text-violet-400",
          hoverColor: "hover:bg-violet-500/10 hover:text-violet-600 dark:hover:bg-violet-400/10 dark:hover:text-violet-400",
        },
        {
          title: "Tax Management",
          url: "/accountant#tax-management",
          icon: CirclePercent,
          color: "text-orange-600 dark:text-orange-400",
          hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
          items: [
            {
              title: "Supporting data & schedules only",
              url: "/accountant#tax-management",
              icon: FileCheck,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
          ],
        },
        {
          title: "Period Close & Reconciliation",
          url: "/accountant#period-close",
          icon: CalendarCheck,
          color: "text-emerald-600 dark:text-emerald-400",
          hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          title: "My Profile",
          url: "/accountant#my-profile",
          icon: UserCircle,
          color: "text-slate-600 dark:text-slate-400",
          hoverColor: "hover:bg-slate-500/10 hover:text-slate-600 dark:hover:bg-slate-400/10 dark:hover:text-slate-400",
        },
      ],
    },
  ],
}

export function AccountantSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/accountant">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
                  <Logo size={22} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight">PMS FINANCE</span>
                  <span className="truncate text-xs text-muted-foreground">Accountant Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
