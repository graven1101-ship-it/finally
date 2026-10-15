"use client"

import * as React from "react"
import { AuditSidebar } from "@/components/audit-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useSidebarConfig } from "@/hooks/use-sidebar-config"
import { SensitiveValuesProvider } from "@/components/sensitive-values-provider"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface AuditLayoutProps {
  children: React.ReactNode
}

export function AuditLayout({ children }: AuditLayoutProps) {
  const { config } = useSidebarConfig()

  return (
    <SensitiveValuesProvider>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
      className={config.collapsible === "none" ? "sidebar-none-mode" : ""}
    >
      {config.side === "left" ? (
        <>
          <AuditSidebar
            variant={config.variant}
            collapsible={config.collapsible}
            side={config.side}
          />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
            <SiteFooter />
          </SidebarInset>
        </>
      ) : (
        <>
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
            <SiteFooter />
          </SidebarInset>
          <AuditSidebar
            variant={config.variant}
            collapsible={config.collapsible}
            side={config.side}
          />
        </>
      )}
    </SidebarProvider>
    </SensitiveValuesProvider>
  )
}
