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

const queryClient = new QueryClient();

function App() {
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
            <Route path="arv" element={<ManagerARV />} />
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
          {/* <Route
              path="*"
              element={
                <Navigate to={useAuth().user ? "/" : "/login"} replace />
              }
            /> */}
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
