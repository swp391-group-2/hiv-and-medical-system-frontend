import { Sidebar, SidebarNav, SidebarNavItem } from "./user/sidebar";
import {
  ChartColumnIncreasing,
  Clock,
  Calendar,
  FastForward,
  UserCheck,
  User,
} from "lucide-react";
import Logo from "./logo";
import { SidebarFooter } from "./ui/sidebar";
import LogoutBtn from "./logout-btn";
import { useAuthStore } from "@/stores/auth.store";
import authApi from "@/api/auth.api";
import { useNavigate } from "react-router-dom";

const StaffSidebar = () => {
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
    <Sidebar>
      <div className="p-6 border-b border-gray-200">
        <Logo />
      </div>
      <SidebarNav>
        <SidebarNavItem
          path="/staff/dashboard"
          icon={ChartColumnIncreasing}
          text="Dashboard"
          desc="Tổng quan"
        />
        <SidebarNavItem
          path="/staff/checkin-pending"
          icon={Calendar}
          text="Quản lý lịch khám"
          desc="Tất cả lịch khám"
          defaultOpen
          collapsible
          children={
            <>
              <SidebarNavItem
                className="pl-4"
                path="/staff/checkin-pending"
                icon={Clock}
                text="Chờ Check-in"
                desc="Danh sách chờ check-in"
              />
              <SidebarNavItem
                className="pl-4"
                path="/staff/on-going"
                icon={FastForward}
                text="Đang khám"
                desc="Danh sách đang khám"
              />
              <SidebarNavItem
                className="pl-4"
                path="/staff/finished"
                icon={UserCheck}
                text="Đã khám"
                desc="Danh sách đã khám xong"
              />
            </>
          }
        />
      </SidebarNav>
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
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Logout button stays the same, just add a bit of top margin */}
          <LogoutBtn
            handleLogout={handleLogout}
            className="mt-4 cursor-pointer"
          />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default StaffSidebar;
