import { Outlet, useNavigate } from "react-router-dom";
import { FlaskConical, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "../logo";
import { useAuthStore } from "@/stores/auth.store";
import authApi from "@/api/auth.api";
import LogoutBtn from "../logout-btn";

const items = [
  {
    title: "Laboratory",
    url: "/lab/dashboard",
    icon: FlaskConical,
  },
];

const LabSidebar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
    logout();
    navigate("/login");
  };

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
            {isAuthenticated && (
              <SidebarFooter className="sticky bottom-0 bg-white p-4">
                {/* User card */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow">
                  {/* Avatar / icon wrapper */}
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  {/* Name + Role */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>

                {/* Logout button stays the same, just add a bit of top margin */}
                <LogoutBtn
                  handleLogout={handleLogout}
                  className="mt-4 cursor-pointer"
                />
              </SidebarFooter>
            )}
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

export default LabSidebar;
