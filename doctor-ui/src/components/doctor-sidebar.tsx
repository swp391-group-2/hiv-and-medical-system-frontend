import { Outlet } from "react-router-dom";
import { Sidebar, SidebarNav, SidebarNavItem } from "./user/sidebar";
import {
  ChartColumnIncreasing,
  Clock,
  FileText,
  Users,
  Calendar,
  BookOpenCheck,
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
            path="/user-arv"
            icon={FileText}
            text="Kết quả hoàn thành"
            desc="Xét nghiệm đã có kết quả"
            isActive
          />
          <SidebarNavItem
            path="/user-checkup-result"
            icon={Users}
            text="Bệnh nhân"
            desc="Bệnh nhân của tôi"
            isActive
          />
          <SidebarNavItem
            path="/user-test-result"
            icon={Calendar}
            text="Lịch làm việc"
            desc="Theo dõi lịch làm việc"
            isActive
          />
          <SidebarNavItem
            path="/user-test-result"
            icon={BookOpenCheck}
            text="Chọn phác đồ"
            desc="Phác đồ điều trị HIV"
            isActive
          />
          <SidebarNavItem
            path="/user-test-result"
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
