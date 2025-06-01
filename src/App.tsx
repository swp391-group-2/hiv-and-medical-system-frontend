import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex justify-center">
          <div className="flex justify-center w-4/5 mt-5"></div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
