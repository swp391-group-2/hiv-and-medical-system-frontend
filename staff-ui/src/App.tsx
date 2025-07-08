import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/auth-layout";
import Dashboard from "./pages/home";
import UnauthLayout from "@/layout/unauth-layout";
import UserProfile from "./pages/user/profile";
import LoginPage from "./pages/auth/login";
import OngoingAppointments from "./pages/appointment/on-going";
import FinishedAppointments from "./pages/appointment/finished";
import CheckinPending from "./pages/appointment/checkin-pending";
import Lab from "./pages/lab/lab";
import LabSidebar from "./components/lab/lab-sidebar";
import { Toaster } from "sonner";
import ManagerSidebar from "./components/manager/manager-sidebar";
import ManagerDashboard from "./pages/manager/dashboard";
import ManagerARV from "./pages/manager/arv";
// import ManagerDoctors from "./pages/manager/doctors";
import ManagerStaffs from "./pages/manager/staffs";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";
import AdminSidebar from "./components/admin/admin-sidebar";
import AdminDashboard from "./pages/admin/dashboard";

import AdminBlogs from "./pages/admin/blogs";
import ManagerBlogs from "./pages/manager/blogs";
import BlogPost from "./pages/manager/blog-post";
import BlogCreate from "./pages/manager/blog-create";
import AdminAccounts from "./pages/admin/accounts";
import ManagerDoctorsV2 from "./pages/manager/doctors-v2";
import Manageservices from "./pages/manager/services";

const queryClient = new QueryClient();

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* unauth screen */}
          <Route path="/" element={<UnauthLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          {/* laboratory */}
          <Route path="lab" element={<LabSidebar />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Lab />} />
          </Route>
          {/* manager */}
          <Route path="manager" element={<ManagerSidebar />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="doctors" element={<ManagerDoctorsV2 />} />
            <Route path="staffs" element={<ManagerStaffs />} />
            <Route path="arv" element={<ManagerARV />} />
            <Route path="blogs">
              <Route index element={<ManagerBlogs />} />
              <Route path=":blogId" element={<BlogPost />} />
              <Route path="create" element={<BlogCreate />} />
            </Route>
             <Route path="services" element={<Manageservices/>} />
          </Route>
          {/* admin */}
          <Route path="admin" element={<AdminSidebar />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="accounts" element={<AdminAccounts />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
          {/* staff */}
          <Route path="staff" element={<MainLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="checkin-pending" element={<CheckinPending />} />
            <Route path="on-going" element={<OngoingAppointments />} />
            <Route path="finished" element={<FinishedAppointments />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
        <Toaster richColors position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
