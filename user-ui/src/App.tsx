import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { CookiesProvider } from "react-cookie";

import AppRoutes from "./routes/app-routers";
import ScrollToTop from "./components/scroll-to-top";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
