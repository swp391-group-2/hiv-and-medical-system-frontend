import { Outlet, useNavigate } from "react-router-dom";
import {
  ChartColumnIncreasing,
  Clock,
  Users,
  Calendar,
  MessageCircle,
  Newspaper,
  Stethoscope,
  LogOut,
  StickyNote,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import Logo from "./logo";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/auth.store";

const items = [
  {
    title: "Dashboard",
    url: "/doctor/dashboard",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Chờ khám",
    url: "/doctor/pending",
    icon: Clock,
  },
  {
    title: "Bệnh nhân",
    url: "/doctor/completed",
    icon: Users,
  },
  {
    title: "Lịch làm việc",
    url: "/doctor/schedule",
    icon: Calendar,
  },
  {
    title: "Tư vấn ẩn danh",
    url: "/doctor/qa",
    icon: MessageCircle,
  },
  // {
  //   title: "Chọn phác đồ ARV",
  //   url: "/doctor/arv-seclect",
  //   icon: Newspaper,
  // },
  {
    title: "Đăng bài viết chia sẻ",
    url: "/doctor/blogs",
    icon: StickyNote,
  },
  {
    title: "Cài đặt tài khoản",
    url: "/doctor/setting",
    icon: Newspaper,
  },
];

const DoctorSidebar = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutStore();
    navigate("/login");
  };

  const getDoctorName = localStorage.getItem("doctorName");

  console.log("Doctor Name:", getDoctorName);
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarProvider>
        <Sidebar className="border-r shadow-sm">
          <SidebarContent className="bg-white flex flex-col justify-between h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <Logo />
            </div>

            {/* Menu - Nằm giữa */}
            <div className="flex-1 overflow-y-auto">
              <SidebarGroup className="px-4 py-6">
                <SidebarGroupLabel className="flex items-center gap-3 px-3 py-4 text-sm font-semibold text-gray-800 bg-sky-50 rounded-lg mb-4">
                  <Stethoscope className="h-5 w-5 text-sky-400" />
                  Các Tính Năng Của Bác Sĩ
                </SidebarGroupLabel>
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
              </SidebarGroup>
            </div>

            {/* Footer - Nằm sát đáy */}
            <div className="px-4 pb-6">
              <div className="flex flex-col items-center w-full bg-gray-50 rounded-lg p-3 mb-3">
                <div className="font-semibold text-gray-800 text-base text-center">
                  Bác sĩ {getDoctorName}
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 py-3 font-semibold rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </Button>
            </div>
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

export default DoctorSidebar;
