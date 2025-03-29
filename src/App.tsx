
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";
import Habits from "./pages/Habits";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { TelegramProvider } from "./context/TelegramContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TelegramProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Today />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Navbar />
          </div>
        </TelegramProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
