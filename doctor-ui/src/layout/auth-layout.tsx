import { Outlet } from "react-router-dom";
import DoctorSidebar from "@/components/doctor-sidebar";

function MainLayout() {
  return (
    <div>
      <DoctorSidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
