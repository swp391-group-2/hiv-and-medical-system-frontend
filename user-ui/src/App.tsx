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
import ServiceDoctorList from "./pages/services/service-doctor-list";
import EducationPage from "./pages/static/EducationPage";

import { CookiesProvider } from "react-cookie";
import AppointmentBooking from "./pages/appointment/appointment-booking";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="services">
                <Route path="screeningtest">
                  <Route index element={<ServiceScreeningTest />} />
                  <Route
                    path="booking-appointment"
                    element={<AppointmentBooking />}
                  />
                </Route>
                <Route path="confirmatorytest">
                  <Route index element={<ServiceConfirmatoryTest />} />
                  <Route
                    path="booking-appointment"
                    element={<AppointmentBooking />}
                  />
                </Route>
                <Route path="treatment"></Route>
                <Route path="doctors">
                  <Route index element={<ServiceDoctorList />} />
                  <Route
                    path=":doctorId/booking-appointment"
                    element={<AppointmentBooking />}
                  />
                </Route>
              </Route>
              <Route path="education" element={<EducationPage />} />
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
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
