import { Outlet } from "react-router-dom";
import StaffSidebar from "@/components/staff-sidebar";

function MainLayout() {
  return (
    <div className="flex gap-5">
      <StaffSidebar />
      <main className="pb-5 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
