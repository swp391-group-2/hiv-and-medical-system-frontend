import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/auth-layout";
import Dashboard from "./pages/home";
import UnauthLayout from "@/layout/unauth-layout";
import { RequireAuth, useAuth } from "./auth/auth-checker";
import UserProfile from "./pages/user/profile";
import PendingAppointment from "./pages/appointment/pending";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<UnauthLayout />} />
          <Route
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/pending" element={<PendingAppointment />} />
            <Route path="/completed" element={<PendingAppointment />} />
            <Route path="" element={<PendingAppointment />} />
            <Route path="" element={<PendingAppointment />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={useAuth().user ? "/" : "/login"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
