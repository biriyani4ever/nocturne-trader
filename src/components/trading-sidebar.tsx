import { NavLink, useLocation } from "react-router-dom"
import { 
  BarChart3, 
  Bell, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Settings,
  Home,
  Briefcase
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Market Analysis", url: "/market", icon: BarChart3 },
  { title: "IPO Alerts", url: "/ipo-alerts", icon: TrendingUp },
  { title: "Dividends", url: "/dividends", icon: DollarSign },
  { title: "Trading Alerts", url: "/alerts", icon: Bell },
  { title: "Market Timing", url: "/timing", icon: Clock },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function TradingSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const isExpanded = navigationItems.some((item) => isActive(item.url))

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-tahoe-active backdrop-blur-tahoe border border-white/12 text-foreground font-medium shadow-tahoe" 
      : "hover:bg-tahoe-hover backdrop-blur-tahoe transition-all duration-300 ease-out"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-white/6 bg-background/90 backdrop-blur-tahoe-lg`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <div className="mb-8">
          <h1 className={`font-bold text-2xl text-foreground tracking-tight ${collapsed ? "hidden" : "block"}`}>
            Zylo
          </h1>
          {collapsed && (
            <div className="w-10 h-10 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/6 flex items-center justify-center shadow-tahoe">
              <BarChart3 className="w-5 h-5" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-muted-foreground ${collapsed ? "hidden" : "block"}`}>
            Trading Suite
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out ${getNavClassName({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
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