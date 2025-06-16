import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/auth-layout";
import Dashboard from "./pages/home";
import UnauthLayout from "@/layout/unauth-layout";
import { AuthProvider, RequireAuth, useAuth } from "./auth/auth-checker";
import UserProfile from "./pages/user/profile";
import PendingAppointment from "./pages/appointment/pending";
import LoginPage from "./pages/auth/login";
import PatientList from "./pages/appointment/completed";
import Questions from "./pages/questions/qa";
import Schedule from "./pages/appointment/schedule";
import ARVSeclect from "./pages/ARVSelect/arvSelect";
import DoctorProfile from "./pages/doctorProfile/doctorProfile";
// import type { JSX } from "react";


const queryClient = new QueryClient();
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const isAuthenticated = localStorage.getItem("doctorEmail");
//   if (!isAuthenticated) {
//     return <Navigate to="/login"  />;
//   }
//   return children;
// }
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
              <Route path="/doctor/arv-seclect" element={<ARVSeclect />} />
              <Route path="/doctor/setting" element={<DoctorProfile />} />
            </Route>
            <Route
              path="*"
              element={
                <Navigate to={useAuth().user ? "/" : "/login"} replace />
              }
            />
            {/* <Route path="*" element={<RedirectBasedOnAuth />} /> */}
          </Routes>
        </BrowserRouter>
        
       
      </AuthProvider>
        
    </QueryClientProvider>
  );
}

export default App;
