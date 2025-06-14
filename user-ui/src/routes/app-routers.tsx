import MainLayout from "@/layout";
import EducationPage from "@/pages/static/EducationPage";
import { Route, Routes } from "react-router-dom";
import ServiceRouters from "./service-routers";
import UserRoutes from "./user-routers";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import Home from "@/pages/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="education" element={<EducationPage />} />

        <Route path="/*" element={<ServiceRouters />} />
        <Route path="user/*" element={<UserRoutes />} />
      </Route>
      <Route path="auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
