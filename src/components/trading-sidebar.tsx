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
      ? "bg-glass border border-white/20 text-foreground font-medium" 
      : "hover:bg-glass-hover transition-all duration-200"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-white/10 bg-background/80 backdrop-blur-xl`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <div className="mb-8">
          <h1 className={`font-bold text-xl text-foreground ${collapsed ? "hidden" : "block"}`}>
            TradePro
          </h1>
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-glass border border-white/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
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
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClassName({ isActive })}`
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