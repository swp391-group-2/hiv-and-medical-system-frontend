import { Outlet } from "react-router-dom";
import { Sidebar, SidebarNav, SidebarNavItem } from "./user/sidebar";
import {
  ChartColumnIncreasing,
  Clock,
  Users,
  Calendar,
  MessageCircle,
} from "lucide-react";

const DoctorSidebar = () => {
  return (
    <div className="w-full flex gap-5">
      <Sidebar>
        <SidebarNav>
          <SidebarNavItem
            path="/doctor/dashboard"
            icon={ChartColumnIncreasing}
            text="Dashboard"
            desc="Tổng quan"
            isActive
          />
          <SidebarNavItem
            path="/doctor/pending"
            icon={Clock}
            text="Chờ kết quả"
            desc="Xét nghiệm chờ cập nhật"
            isActive
          />
          <SidebarNavItem
            path="/doctor/completed"
            icon={Users}
            text="Bệnh nhân"
            desc="Bệnh nhân của tôi"
            isActive
          />
          <SidebarNavItem
            path="/doctor/schedule"
            icon={Calendar}
            text="Lịch làm việc"
            desc="Theo dõi lịch làm việc"
            isActive
          />
          <SidebarNavItem
            path="/doctor/qa"
            icon={MessageCircle}
            text="Tư vấn ẩn danh"
            desc="Hỏi đáp với bệnh nhân"
            isActive
          />
        </SidebarNav>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default DoctorSidebar;
