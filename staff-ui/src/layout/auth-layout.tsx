import { Outlet } from "react-router-dom";
import StaffSidebar from "@/components/staff-sidebar";

function MainLayout() {
  return (
    <div className="flex gap-5">
      <StaffSidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
