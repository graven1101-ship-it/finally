"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  Receipt,
  Wallet,
  CirclePercent,
  ShieldCheck,
  FileSearch,
  AlertTriangle,
  History,
  FolderCheck,
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
    name: "Audit Committee",
    email: "audit.committee@primepower.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Overview",
      items: [
        {
          title: "Audit Dashboard",
          url: "/audit-dashboard",
          icon: LayoutDashboard,
          color: "text-blue-600 dark:text-blue-400",
          hoverColor: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:bg-blue-400/10 dark:hover:text-blue-400",
        },
        {
          title: "Financial Reporting & Analytics",
          url: "/audit-dashboard#financial-reporting",
          icon: BarChart3,
          color: "text-indigo-600 dark:text-indigo-400",
          hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
        },
      ],
    },
    {
      label: "Audit & Compliance Reviews",
      items: [
        {
          title: "General Ledger (read-only)",
          url: "/audit-dashboard#general-ledger",
          icon: BookOpen,
          color: "text-emerald-600 dark:text-emerald-400",
          hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
        },
        {
          title: "AP / AR Review (read-only)",
          url: "/audit-dashboard#ap-ar-review",
          icon: Receipt,
          color: "text-violet-600 dark:text-violet-400",
          hoverColor: "hover:bg-violet-500/10 hover:text-violet-600 dark:hover:bg-violet-400/10 dark:hover:text-violet-400",
        },
        {
          title: "Cash Management Review (read-only)",
          url: "/audit-dashboard#cash-management",
          icon: Wallet,
          color: "text-teal-600 dark:text-teal-400",
          hoverColor: "hover:bg-teal-500/10 hover:text-teal-600 dark:hover:bg-teal-400/10 dark:hover:text-teal-400",
        },
        {
          title: "Tax Compliance Review (read-only)",
          url: "/audit-dashboard#tax-compliance",
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
          url: "/audit-dashboard#governance-risk",
          icon: ShieldCheck,
          color: "text-orange-600 dark:text-orange-400",
          hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
          items: [
            {
              title: "Audit Trail",
              url: "/audit-dashboard#audit-trail",
              icon: FileSearch,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
            {
              title: "Exception Reports",
              url: "/audit-dashboard#exception-reports",
              icon: AlertTriangle,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
            {
              title: "Approval History",
              url: "/audit-dashboard#approval-history",
              icon: History,
              hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
            },
            {
              title: "Period Close Evidence",
              url: "/audit-dashboard#period-close-evidence",
              icon: FolderCheck,
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
          url: "/audit-dashboard#my-profile",
          icon: UserCircle,
          color: "text-rose-600 dark:text-rose-400",
          hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
        },
      ],
    },
  ],
}

export function AuditSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/audit-dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground border-none ring-0 shadow-none">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FINANCE</span>
                  <span className="truncate text-xs">Audit Committee</span>
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
