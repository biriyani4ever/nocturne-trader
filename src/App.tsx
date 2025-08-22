import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/market" element={<MarketAnalysis />} />
          <Route path="/ipo-alerts" element={<IpoAlerts />} />
          <Route path="/dividends" element={<Dividends />} />
          <Route path="/alerts" element={<TradingAlerts />} />
          <Route path="/timing" element={<MarketTiming />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
