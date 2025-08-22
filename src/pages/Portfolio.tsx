import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const portfolioData = {
  totalValue: 127450.32,
  totalGainLoss: 8245.67,
  totalGainLossPercent: 6.87,
  positions: [
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      shares: 150, 
      avgPrice: 156.33, 
      currentPrice: 178.25, 
      marketValue: 26737.50,
      gainLoss: 3288.00,
      gainLossPercent: 14.03
    },
    { 
      symbol: "MSFT", 
      name: "Microsoft Corp.", 
      shares: 85, 
      avgPrice: 226.45, 
      currentPrice: 235.89, 
      marketValue: 20050.65,
      gainLoss: 803.40,
      gainLossPercent: 4.17
    },
    { 
      symbol: "GOOGL", 
      name: "Alphabet Inc.", 
      shares: 45, 
      avgPrice: 134.28, 
      currentPrice: 142.18, 
      marketValue: 6398.10,
      gainLoss: 355.50,
      gainLossPercent: 5.88
    },
    { 
      symbol: "TSLA", 
      name: "Tesla Inc.", 
      shares: 75, 
      avgPrice: 145.67, 
      currentPrice: 187.43, 
      marketValue: 14057.25,
      gainLoss: 3132.00,
      gainLossPercent: 28.68
    },
    { 
      symbol: "AMZN", 
      name: "Amazon.com Inc.", 
      shares: 25, 
      avgPrice: 123.45, 
      currentPrice: 142.38, 
      marketValue: 3559.50,
      gainLoss: 473.25,
      gainLossPercent: 15.31
    }
  ]
};

const Portfolio = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Portfolio Management</h1>
                <p className="text-sm text-muted-foreground">Track your holdings and performance</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Portfolio Summary */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Portfolio Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Total Value</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-foreground">
                            ${portfolioData.totalValue.toLocaleString()}
                          </p>
                        </div>
                        <PieChart className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Total Gain/Loss</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">
                          +${portfolioData.totalGainLoss.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-center mt-2 text-success">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">+{portfolioData.totalGainLossPercent}%</span>
                        </div>
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Positions</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{portfolioData.positions.length}</p>
                        <p className="text-sm text-muted-foreground">Active Holdings</p>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              </section>

              {/* Holdings Table */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Holdings</h2>
                <GlassCard>
                  <GlassCardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/8">
                          <tr>
                            <th className="text-left p-4 text-muted-foreground font-medium">Symbol</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Shares</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Avg Price</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Current Price</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Market Value</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Gain/Loss</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portfolioData.positions.map((position, index) => (
                            <tr key={position.symbol} className="border-b border-white/4 last:border-0 hover:bg-tahoe-hover transition-colors duration-200">
                              <td className="p-4">
                                <div>
                                  <p className="font-semibold text-foreground">{position.symbol}</p>
                                  <p className="text-sm text-muted-foreground">{position.name}</p>
                                </div>
                              </td>
                              <td className="p-4 text-foreground">{position.shares}</td>
                              <td className="p-4 text-foreground">${position.avgPrice.toFixed(2)}</td>
                              <td className="p-4 text-foreground">${position.currentPrice.toFixed(2)}</td>
                              <td className="p-4 text-foreground font-semibold">${position.marketValue.toLocaleString()}</td>
                              <td className="p-4">
                                <div className="flex items-center text-success">
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  <span className="font-semibold">+${position.gainLoss.toLocaleString()}</span>
                                  <span className="text-sm ml-1">(+{position.gainLossPercent}%)</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Portfolio;