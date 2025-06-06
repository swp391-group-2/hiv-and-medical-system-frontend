import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./pages/home";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import UserProfile from "./pages/user/profile";
import UserBase from "./pages/user/user-base";
import Appointments from "./pages/user/appointments";
import Arv from "./pages/user/arv";
import CheckUpResult from "./pages/user/checkup-result";
import TestResult from "./pages/user/test-result";

import ServiceConfirmatoryTest from "./pages/services/service-confirmatorytest";
import ServiceScreeningTest from "./pages/services/service-screeningtest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="service">
              <Route path="screeningtest" element={<ServiceScreeningTest />} />
              <Route
                path="confirmatorytest"
                element={<ServiceConfirmatoryTest />}
              />
            </Route>
            <Route element={<UserBase />}>
              <Route index path="profile" element={<UserProfile />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="arv" element={<Arv />} />
              <Route path="checkup-result" element={<CheckUpResult />} />
              <Route path="test-result" element={<TestResult />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
