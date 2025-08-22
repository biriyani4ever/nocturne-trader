import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { PortfolioOverview } from "@/components/portfolio-overview";
import { AlertsSection } from "@/components/alerts-section";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            {/* Header */}
            <header className="h-16 border-b border-white/10 bg-background/80 backdrop-blur-xl flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-glass-hover p-2 rounded-lg" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Trading Dashboard</h1>
                <p className="text-sm text-muted-foreground">Monitor your portfolio and market alerts</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Market Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">Open</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-6 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Portfolio Overview</h2>
                <PortfolioOverview />
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Alerts & Notifications</h2>
                <AlertsSection />
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
