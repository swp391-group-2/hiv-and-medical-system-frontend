import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/auth-layout";
import Dashboard from "./pages/home";
import UnauthLayout from "@/layout/unauth-layout";
import { AuthProvider, RequireAuth } from "./auth/auth-checker";
import UserProfile from "./pages/user/profile";
import PendingAppointment from "./pages/appointment/pending";
import LoginPage from "./pages/auth/login";
import PatientList from "./pages/appointment/completed";
import Questions from "./pages/questions/qa";
import Schedule from "./pages/appointment/schedule";

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
              <Route index path="/doctor/dashboard" element={<Dashboard />} />
              <Route path="/doctor/pending" element={<PendingAppointment />} />
              <Route path="/doctor/completed" element={<PatientList />} />
              <Route path="/doctor/schedule" element={<Schedule />} />
              <Route path="/doctor/qa" element={<Questions />} />
              <Route path="/doctor/profile" element={<UserProfile />} />
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
