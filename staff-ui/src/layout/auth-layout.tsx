import { Outlet } from "react-router-dom";
import StaffSidebar from "@/components/staff-sidebar";

function MainLayout() {
  return (
    <div>
      <StaffSidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
