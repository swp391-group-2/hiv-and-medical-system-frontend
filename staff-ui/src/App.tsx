import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/auth-layout";
import Dashboard from "./pages/home";
import UnauthLayout from "@/layout/unauth-layout";
import { AuthProvider, RequireAuth } from "./auth/auth-checker";
import UserProfile from "./pages/user/profile";
import LoginPage from "./pages/auth/login";
import Comeback from "./pages/appointment/comeback";
import OngoingAppointments from "./pages/appointment/on-going";
import FinishedAppointments from "./pages/appointment/finished";
import ArvManagement from "./pages/management/arv";
import DoctorSchedule from "./pages/management/doctor-schedule";
import PatientsManagement from "./pages/management/patients";
import CheckinPending from "./pages/appointment/checkin-pending";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<UnauthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route
              element={
                <RequireAuth>
                  <MainLayout />
                </RequireAuth>
              }
            >
              <Route index path="/staff/dashboard" element={<Dashboard />} />
              <Route
                path="/staff/checkin-pending"
                element={<CheckinPending />}
              />
              <Route path="/staff/on-going" element={<OngoingAppointments />} />
              <Route
                path="/staff/finished"
                element={<FinishedAppointments />}
              />
              <Route path="/staff/comeback" element={<Comeback />} />
              <Route path="/staff/patients" element={<PatientsManagement />} />
              <Route path="/staff/arv" element={<ArvManagement />} />
              <Route
                path="/staff/doctor-schedule"
                element={<DoctorSchedule />}
              />
              <Route path="/staff/profile" element={<UserProfile />} />
            </Route>
            {/* <Route
              path="*"
              element={
                <Navigate to={useAuth().user ? "/" : "/login"} replace />
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
