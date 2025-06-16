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
  User,
} from "lucide-react";
import Logo from "./logo";
import { SidebarFooter } from "./ui/sidebar";
import LogoutBtn from "./logout-btn";

const StaffSidebar = () => {
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
      <SidebarFooter className="sticky bottom-0">
        <div className="flex flex-col gap-3 items-center border border-gray-300 shadow rounded p-4">
          <div className="flex gap-4">
            <User />
            <span>Họ và tên</span>
          </div>
          <span>Role</span>
        </div>
        <LogoutBtn className="cursor-pointer" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default StaffSidebar;
