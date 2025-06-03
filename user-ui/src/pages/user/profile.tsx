import { Sidebar, SidebarNav, SidebarNavItem } from "@/components/sidebar";
import { User, Calendar, Pill, FileText, FlaskConical } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="w-full">
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
    </div>
  );
};

export default UserProfile;
