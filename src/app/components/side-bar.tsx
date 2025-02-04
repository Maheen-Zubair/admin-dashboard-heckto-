import {Star, LayoutDashboard, ShoppingCart, Box, CreditCard, Users,Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Order",
        url: "/order",
        icon: ShoppingCart,
      },
      {
        title: "Inventory",
        url: "/inventory",
        icon: Box,
      },
      {
        title: "Payments",
        url: "/payment",
        icon: CreditCard,
      },
      {
        title: "Reviews",
        url: "/reviews",
        icon: Star,
      },
      
      {
        title: "Customers",
        url: "/customer",
        icon: Users,
      },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar className="h-screen w-64 bg-[#1E1E2F] shadow-xl">
      <SidebarContent className="p-4 bg-[#1E1E2F]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold text-gray-200 uppercase tracking-wide mb-3">
            Heckto
          </SidebarGroupLabel>
          <div className="w-full border-b border-gray-600 mb-3"></div>

          <SidebarGroupContent>
          <SidebarMenu>
  {items.map((item) => (
    <SidebarMenuItem key={item.title} className="mb-1">
      <SidebarMenuButton asChild>
        <a
          href={item.url}
          className="flex items-center p-3 text-gray-300 rounded-lg group transition-all duration-200 hover:bg-[#33334a] hover:text-white"
        >
          <item.icon className="w-5 h-5 mr-3 text-gray-300 group-hover:text-white transition-all duration-200" />
          <span className="text-sm font-medium">{item.title}</span>
        </a>
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
