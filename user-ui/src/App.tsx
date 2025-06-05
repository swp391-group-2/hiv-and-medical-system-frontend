import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./pages/home";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import UserProfile from "./pages/user/profile";
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
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
