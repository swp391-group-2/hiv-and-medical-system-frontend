import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./pages/home";
import ServiceScreeningtest from "./pages/services/service-screeningtest";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="service">
              <Route path="screeningtest" element={<ServiceScreeningtest />} />
            </Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
