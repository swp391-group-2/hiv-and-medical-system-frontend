import { Sidebar, SidebarNav, SidebarNavItem } from "@/components/user/sidebar";
import { User, Calendar, Pill, FileText, FlaskConical } from "lucide-react";
import { Outlet } from "react-router-dom";

const UserBase = () => {
  return (
    <div className="w-full flex gap-5">
      <Sidebar>
        <SidebarNav>
          <SidebarNavItem
            path="/user-profile"
            icon={User}
            text="Hồ sơ"
            isActive
          />
          <SidebarNavItem
            path="/user-schedule"
            icon={Calendar}
            text="Lịch khám"
            isActive
          />
          <SidebarNavItem
            path="/user-arv"
            icon={Pill}
            text="Phác đồ điều trị"
            isActive
          />
          <SidebarNavItem
            path="/user-checkup-result"
            icon={FileText}
            text="Kết quả khám"
            isActive
          />
          <SidebarNavItem
            path="/user-test-result"
            icon={FlaskConical}
            text="Kết quả xét nghiệm"
            isActive
          />
        </SidebarNav>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default UserBase;
