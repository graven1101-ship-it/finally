"use client"

import * as React from "react"
import {
  LayoutDashboard,
  TrendingUp,
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
    name: "CEO",
    email: "ceo@primepower.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/ceo-dashboard",
          icon: LayoutDashboard,
          color: "text-blue-600 dark:text-blue-400",
          hoverColor: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:bg-blue-400/10 dark:hover:text-blue-400",
        },
        {
          title: "Executive Financial Overview",
          url: "/ceo-dashboard#executive-overview",
          icon: TrendingUp,
          color: "text-emerald-600 dark:text-emerald-400",
          hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
        },
      ],
    },
    {
      label: "Financial Operations",
      items: [
        {
          title: "Financial Reporting & Analytics",
          url: "/ceo-dashboard#financial-reporting",
          icon: BarChart3,
          color: "text-indigo-600 dark:text-indigo-400",
          hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
        },
        {
          title: "Budget Management",
          url: "/ceo-dashboard#budget-management",
          icon: PieChart,
          color: "text-amber-600 dark:text-amber-400",
          hoverColor: "hover:bg-amber-500/10 hover:text-amber-600 dark:hover:bg-amber-400/10 dark:hover:text-amber-400",
        },
        {
          title: "Cash Management",
          url: "/ceo-dashboard#cash-management",
          icon: Wallet,
          color: "text-teal-600 dark:text-teal-400",
          hoverColor: "hover:bg-teal-500/10 hover:text-teal-600 dark:hover:bg-teal-400/10 dark:hover:text-teal-400",
        },
        {
          title: "Disbursement Approvals",
          url: "/ceo-dashboard#disbursement-approvals",
          icon: Banknote,
          color: "text-red-600 dark:text-red-400",
          hoverColor: "hover:bg-red-500/10 hover:text-red-600 dark:hover:bg-red-400/10 dark:hover:text-red-400",
        },
        {
          title: "Collections & AR Summary",
          url: "/ceo-dashboard#collections-ar",
          icon: HandCoins,
          color: "text-violet-600 dark:text-violet-400",
          hoverColor: "hover:bg-violet-500/10 hover:text-violet-600 dark:hover:bg-violet-400/10 dark:hover:text-violet-400",
        },
        {
          title: "Tax Compliance Summary",
          url: "/ceo-dashboard#tax-compliance",
          icon: CirclePercent,
          color: "text-cyan-600 dark:text-cyan-400",
          hoverColor: "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-400",
        },
      ],
    },
    {
      label: "Governance & Risk",
      items: [
        {
          title: "Governance & Risk",
          url: "/ceo-dashboard#governance-risk",
          icon: ShieldCheck,
          color: "text-orange-600 dark:text-orange-400",
          hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
          items: [
            {
              title: "Audit Trail (read-only)",
              url: "/ceo-dashboard#audit-trail",
              icon: FileSearch,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
            {
              title: "Exception Reports",
              url: "/ceo-dashboard#exception-reports",
              icon: AlertTriangle,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
            {
              title: "Period Close Summary",
              url: "/ceo-dashboard#period-close",
              icon: CalendarCheck,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
          ],
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          title: "My Profile",
          url: "/ceo-dashboard#my-profile",
          icon: UserCircle,
          color: "text-rose-600 dark:text-rose-400",
          hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
        },
      ],
    },
  ],
}

export function CeoSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/ceo-dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground border-none ring-0 shadow-none">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FINANCE</span>
                  <span className="truncate text-xs">CEO Dashboard</span>
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
