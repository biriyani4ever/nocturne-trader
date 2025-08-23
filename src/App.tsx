import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Portfolio from "./pages/Portfolio";
import MarketAnalysis from "./pages/MarketAnalysis";
import IpoAlerts from "./pages/IpoAlerts";
import Dividends from "./pages/Dividends";
import TradingAlerts from "./pages/TradingAlerts";
import MarketTiming from "./pages/MarketTiming";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/market" element={<ProtectedRoute><MarketAnalysis /></ProtectedRoute>} />
            <Route path="/ipo-alerts" element={<ProtectedRoute><IpoAlerts /></ProtectedRoute>} />
            <Route path="/dividends" element={<ProtectedRoute><Dividends /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><TradingAlerts /></ProtectedRoute>} />
            <Route path="/timing" element={<ProtectedRoute><MarketTiming /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
