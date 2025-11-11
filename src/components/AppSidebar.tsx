import { useState } from "react"
import { 
  QrCode, 
  Plus, 
  BarChart3, 
  Grid3X3, 
  Globe, 
  CreditCard, 
  Settings, 
  Users, 
  HelpCircle, 
  Phone, 
  Code,
  Layers
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "New QR", url: "/new-qr", icon: Plus },
  { title: "Bulk QR generation", url: "/bulk-qr", icon: Layers },
  { title: "My QR codes", url: "/my-qr-codes", icon: QrCode },
  { title: "Stats", url: "/stats", icon: BarChart3 },
  { title: "Templates", url: "/templates", icon: Grid3X3 },
  { title: "My domains", url: "/my-domains", icon: Globe },
  { title: "Plans and payments", url: "/plans", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Users", url: "/users", icon: Users },
]

const bottomItems = [
  { title: "Contact", url: "/contact", icon: Phone },
  { title: "Help center", url: "/help", icon: HelpCircle },
  { title: "Developers", url: "/developers", icon: Code },
]

export function AppSidebar() {
  const { open } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            {open && <span className="font-bold text-lg">Logo</span>}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 text-sidebar-foreground" />
                      <span className="text-sidebar-foreground">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 text-sidebar-foreground" />
                      <span className="text-sidebar-foreground">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}