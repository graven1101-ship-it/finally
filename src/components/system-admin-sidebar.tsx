"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Monitor,
  Sliders,
  Webhook,
  FileTerminal,
  UserCircle,
  Lock,
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
    name: "System Administrator",
    email: "sysadmin@primepower.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Overview",
      items: [
        {
          title: "System Dashboard",
          url: "/system-admin-dashboard",
          icon: LayoutDashboard,
          color: "text-blue-600 dark:text-blue-400",
          hoverColor: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:bg-blue-400/10 dark:hover:text-blue-400",
        },
      ],
    },
    {
      label: "Identity & Access Control",
      items: [
        {
          title: "Users & Roles",
          url: "/system-admin-dashboard#users-roles",
          icon: Users,
          color: "text-indigo-600 dark:text-indigo-400",
          hoverColor: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-400",
        },
        {
          title: "Permission Matrix",
          url: "/system-admin-dashboard#permission-matrix",
          icon: KeyRound,
          color: "text-purple-600 dark:text-purple-400",
          hoverColor: "hover:bg-purple-500/10 hover:text-purple-600 dark:hover:bg-purple-400/10 dark:hover:text-purple-400",
        },
        {
          title: "Account Status / Password Resets",
          url: "/system-admin-dashboard#account-status-resets",
          icon: RotateCcw,
          color: "text-amber-600 dark:text-amber-400",
          hoverColor: "hover:bg-amber-500/10 hover:text-amber-600 dark:hover:bg-amber-400/10 dark:hover:text-amber-400",
        },
      ],
    },
    {
      label: "Security & Governance",
      items: [
        {
          title: "Security Settings",
          url: "/system-admin-dashboard#security-settings",
          icon: ShieldAlert,
          color: "text-rose-600 dark:text-rose-400",
          hoverColor: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400",
        },
        {
          title: "Authentication & MFA",
          url: "/system-admin-dashboard#authentication-mfa",
          icon: Smartphone,
          color: "text-emerald-600 dark:text-emerald-400",
          hoverColor: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400",
        },
        {
          title: "Session Management",
          url: "/system-admin-dashboard#session-management",
          icon: Monitor,
          color: "text-cyan-600 dark:text-cyan-400",
          hoverColor: "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-400",
        },
      ],
    },
    {
      label: "Infrastructure & Systems",
      items: [
        {
          title: "System Configuration",
          url: "/system-admin-dashboard#system-configuration",
          icon: Sliders,
          color: "text-teal-600 dark:text-teal-400",
          hoverColor: "hover:bg-teal-500/10 hover:text-teal-600 dark:hover:bg-teal-400/10 dark:hover:text-teal-400",
        },
        {
          title: "Integration / API Settings",
          url: "/system-admin-dashboard#integration-api-settings",
          icon: Webhook,
          color: "text-orange-600 dark:text-orange-400",
          hoverColor: "hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-400/10 dark:hover:text-orange-400",
        },
      ],
    },
    {
      label: "Technical Logs",
      items: [
        {
          title: "System Audit Logs",
          url: "/system-admin-dashboard#system-audit-logs",
          icon: FileTerminal,
          color: "text-sky-600 dark:text-sky-400",
          hoverColor: "hover:bg-sky-500/10 hover:text-sky-600 dark:hover:bg-sky-400/10 dark:hover:text-sky-400",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          title: "My Profile",
          url: "/system-admin-dashboard#my-profile",
          icon: UserCircle,
          color: "text-slate-600 dark:text-slate-400",
          hoverColor: "hover:bg-slate-500/10 hover:text-slate-600 dark:hover:bg-slate-400/10 dark:hover:text-slate-400",
        },
      ],
    },
  ],
}

export function SystemAdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/system-admin-dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-600 text-white border-none ring-0 shadow-none">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-wide">PMS FINANCE</span>
                  <span className="truncate text-xs font-medium text-emerald-600 dark:text-emerald-400">System Administrator</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Segregation of Duties Notice Badge in Sidebar */}
        <div className="mx-2 mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400">
            <Lock className="size-3.5 shrink-0" />
            <span className="text-[11px] tracking-tight">Segregation of Duties</span>
          </div>
          <p className="text-[10.5px] text-muted-foreground mt-1 leading-snug">
            System & IAM access only. Operational finance modules restricted.
          </p>
        </div>
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
