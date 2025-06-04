import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import UserProfile from "./pages/user/profile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex justify-center">
          <UserProfile />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
