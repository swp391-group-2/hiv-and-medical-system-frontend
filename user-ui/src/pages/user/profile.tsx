import { Sidebar, SidebarNav, SidebarNavItem } from "@/components/sidebar";
import { User, Calendar, Pill, FileText, FlaskConical } from "lucide-react";

import UserSummary from "@/components/user-summary";

const sample_user = {
  name: "John",
  phone: "0976657677",
  email: "john@gmail.com",
  id: "BN001",
};

const UserProfile = () => {
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
      <div className="w-full mt-7">
        <h2 className="text-3xl font-bold mb-5">Hồ sơ</h2>
        <div className="w-full flex gap-5">
          <UserSummary user={sample_user} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
