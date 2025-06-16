import { Outlet } from "react-router-dom";
import { Grid2x2, Pill } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "../logo";

const items = [
  {
    title: "Dashboard",
    url: "/manager/dashboard",
    icon: Grid2x2,
  },
  {
    title: "ARV Storage",
    url: "/manager/arv",
    icon: Pill,
  },
];

const ManagerSidebar = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarProvider>
        <Sidebar className="border-r shadow-sm">
          <SidebarContent className="bg-white">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200">
              <Logo />
            </div>

            <SidebarGroup className="px-4 py-2">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        size="lg"
                        className="w-full justify-start hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200"
                      >
                        <a
                          href={item.url}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-base font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 shadow-sm">
            <SidebarTrigger className="hover:bg-gray-100 transition-colors" />
          </div>
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default ManagerSidebar;
