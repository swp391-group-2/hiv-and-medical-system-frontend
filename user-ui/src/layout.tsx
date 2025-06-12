import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
