import { useState } from "react";
import {
  QrCode,
  Plus,
  BarChart3,
  Grid3X3,
  Settings,
  Users,
  Phone,
  Layers,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export { SidebarTrigger };

const mainItems = [
  { title: "New QR", url: "/new-qr", icon: Plus },
  { title: "Bulk QR generation", url: "/bulk-qr", icon: Layers },
  { title: "My QR codes", url: "/my-qr-codes", icon: QrCode },
  { title: "Stats", url: "/stats", icon: BarChart3 },
  { title: "Templates", url: "/templates", icon: Grid3X3 },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Users", url: "/users", icon: Users },
];

const bottomItems = [{ title: "Contact", url: "/contact", icon: Phone }];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-semibold text-base ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col overflow-y-auto scrollbar-hide">
        {/* Logo */}
        <div className="p-2 border-b">
          <div className="flex items-center justify-center">
            <div className="w-32 h-14 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="QRify Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1 px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-auto p-0">
                      <NavLink
                        to={item.url}
                        className={getNavCls({ isActive: active })}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-primary-foreground"
                              : "text-sidebar-foreground"
                          }`}
                        />
                        <span
                          className={`font-semibold text-base ${
                            active
                              ? "text-primary-foreground"
                              : "text-sidebar-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup className="px-3 border-t pt-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {bottomItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-auto p-0">
                      <NavLink
                        to={item.url}
                        className={getNavCls({ isActive: active })}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-primary-foreground"
                              : "text-sidebar-foreground"
                          }`}
                        />
                        <span
                          className={`font-semibold text-base ${
                            active
                              ? "text-primary-foreground"
                              : "text-sidebar-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
