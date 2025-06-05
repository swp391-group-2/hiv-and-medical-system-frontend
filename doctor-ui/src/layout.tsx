import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
