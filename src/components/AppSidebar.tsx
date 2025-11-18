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
  PanelLeftClose,
  PanelLeft,
  LogOut,
  User,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { authService } from "../services/auth";

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

interface AppSidebarProps {
  user?: {
    email: string;
    id: string;
  } | null;
}

export function AppSidebar({ user }: AppSidebarProps = {}) {
  const { open, isMobile, setOpenMobile, toggleSidebar, state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMenuItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      if (isMobile) {
        setOpenMobile(false);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-semibold text-base group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col overflow-y-auto scrollbar-hide">
        {/* Logo */}
        <div className="p-2 border-b">
          <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
            <a
              href="/new-qr"
              className="w-32 h-14 flex items-center justify-center overflow-hidden group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:h-auto"
            >
              <img
                src="/logo.png"
                alt="QRify Logo"
                className="w-full h-full object-contain group-data-[collapsible=icon]:hidden cursor-pointer"
              />
            </a>
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors group-data-[collapsible=icon]:p-1.5"
                title={
                  state === "expanded" ? "Collapse sidebar" : "Expand sidebar"
                }
              >
                {state === "expanded" ? (
                  <PanelLeftClose className="w-5 h-5 text-sidebar-foreground" />
                ) : (
                  <PanelLeft className="w-5 h-5 text-sidebar-foreground" />
                )}
              </button>
            )}
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
                        onClick={handleMenuItemClick}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-primary-foreground"
                              : "text-sidebar-foreground"
                          }`}
                        />
                        <span
                          className={`font-semibold text-base group-data-[collapsible=icon]:hidden ${
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
                        onClick={handleMenuItemClick}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-primary-foreground"
                              : "text-sidebar-foreground"
                          }`}
                        />
                        <span
                          className={`font-semibold text-base group-data-[collapsible=icon]:hidden ${
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

        {/* User Profile Section - Mobile Only */}
        {isMobile && user && (
          <SidebarGroup className="px-3 border-t pt-4">
            <SidebarGroupContent>
              <div className="space-y-2">
                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sidebar-accent/50">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                    {getInitials(user.email)}
                  </div>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-semibold text-sidebar-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="h-auto p-0">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-semibold text-base w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <LogOut className="w-5 h-5 text-sidebar-foreground" />
                        <span className="font-semibold text-base group-data-[collapsible=icon]:hidden">
                          Logout
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
