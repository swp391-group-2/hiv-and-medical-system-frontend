import { Sidebar, SidebarNav, SidebarNavItem } from "@/components/user/sidebar";
import { User, Calendar, Pill, FileText, FlaskConical } from "lucide-react";
import { Outlet } from "react-router-dom";

const UserBase = () => {
  const sidebarItems = [
    { path: "/user/profile", icon: User, text: "Hồ sơ" },
    { path: "/user/appointments", icon: Calendar, text: "Lịch khám" },
    { path: "/user/arv", icon: Pill, text: "Phác đồ điều trị" },
    { path: "/user/checkup-result", icon: FileText, text: "Kết quả khám" },
    {
      path: "/user/test-result",
      icon: FlaskConical,
      text: "Kết quả xét nghiệm",
    },
  ];

  return (
    <div className="w-[calc(100%-40px)] mx-auto flex gap-5">
      <Sidebar>
        <SidebarNav>
          {sidebarItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </SidebarNav>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default UserBase;
