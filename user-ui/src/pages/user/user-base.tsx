import { Sidebar, SidebarNav, SidebarNavItem } from "@/components/user/sidebar";
import { User, Calendar, Pill, FileText, FlaskConical } from "lucide-react";
import { Outlet } from "react-router-dom";

const UserBase = () => {
  return (
    <div className="w-full flex gap-5">
      <Sidebar>
        <SidebarNav>
          <SidebarNavItem path="/profile" icon={User} text="Hồ sơ" isActive />
          <SidebarNavItem
            path="/appointments"
            icon={Calendar}
            text="Lịch khám"
            isActive
          />
          <SidebarNavItem
            path="/arv"
            icon={Pill}
            text="Phác đồ điều trị"
            isActive
          />
          <SidebarNavItem
            path="/checkup-result"
            icon={FileText}
            text="Kết quả khám"
            isActive
          />
          <SidebarNavItem
            path="/test-result"
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
