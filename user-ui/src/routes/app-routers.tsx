import MainLayout from "@/layout";
import EducationPage from "@/pages/static/education-page";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import Home from "@/pages/home";
import UserBase from "@/pages/user/user-base";
import UserProfile from "@/pages/user/profile";
import Appointments from "@/pages/user/appointments";
import Arv from "@/pages/user/arv";
import CheckUpResult from "@/pages/user/checkup-result";
import TestResult from "@/pages/user/test-result";
import AppointmentBooking from "@/pages/appointment/appointment-booking";
import BookingConfirm from "@/pages/appointment/booking-confirm";
import SelectProfileBooking from "@/pages/appointment/select-profile-booking";
import ServiceConfirmatoryTest from "@/pages/services/service-confirmatorytest";
import ServiceDoctorList from "@/pages/services/service-doctor-list";
import ServiceScreeningTest from "@/pages/services/service-screeningtest";
import ProtectedRoute from "@/components/auth/protected-route";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import PaymentSuccess from "@/pages/payment/payment-success";
import PaymentCancel from "@/pages/payment/payment-cancel";
import EduBlogDetail from "@/components/eduBlog/edu-blog-detail";

const AppRoutes = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="user" element={<UserBase />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="arv" element={<Arv />} />
            <Route path="checkup-result" element={<CheckUpResult />} />
            <Route path="test-result" element={<TestResult />} />
          </Route>

          <Route
            path="select-profile-booking/:serviceType"
            element={<SelectProfileBooking />}
          />
          <Route
            path="select-profile-booking/:serviceType/:doctorId"
            element={<SelectProfileBooking />}
          />

          <Route
            path="booking-confirm/:serviceType"
            element={<BookingConfirm />}
          />
          <Route
            path="booking-confirm/:serviceType/:doctorId"
            element={<BookingConfirm />}
          />
        </Route>
      </Route>

      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="education" element={<EducationPage />} />
        <Route path="education/:blogId" element={<EduBlogDetail />} />
        <Route path="screening" element={<ServiceScreeningTest />} />
        <Route path="confirmatory" element={<ServiceConfirmatoryTest />} />
        <Route path="consultation">
          <Route path="doctors" element={<ServiceDoctorList />} />
        </Route>
        <Route path="booking/:serviceType" element={<AppointmentBooking />} />
        <Route
          path="booking/:serviceType/:doctorId"
          element={<AppointmentBooking />}
        />
      </Route>
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="payment-cancel" element={<PaymentCancel />} />
    </Routes>
  );
};

export default AppRoutes;
