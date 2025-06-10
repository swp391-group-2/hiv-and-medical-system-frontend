import { Outlet } from "react-router-dom";
import { Sidebar, SidebarNav, SidebarNavItem } from "./user/sidebar";
import {
  ChartColumnIncreasing,
  Clock,
  Users,
  Calendar,
  RefreshCcw,
  FastForward,
  UserCheck,
  Pill,
} from "lucide-react";

const StaffSidebar = () => {
  return (
    <div className="w-full flex gap-5">
      <Sidebar>
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
                  text="Chờ khám"
                  desc="Danh sách chờ"
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
          <SidebarNavItem
            path="/staff/comeback"
            icon={RefreshCcw}
            text="Quản lý tái khám"
            desc="Danh sách tái khám"
          />
          <SidebarNavItem
            path="/staff/patients"
            icon={Users}
            text="Quản lý bệnh nhân"
            desc="Danh sách bệnh nhân"
          />
          <SidebarNavItem
            path="/staff/arv"
            icon={Pill}
            text="Quản lý phác đồ"
            desc="Phác đồ HIV"
          />
          <SidebarNavItem
            path="/staff/doctor-schedule"
            icon={Calendar}
            text="Lịch làm việc bác sĩ"
            desc="Theo dõi lịch làm việc bác sĩ"
          />
        </SidebarNav>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default StaffSidebar;
