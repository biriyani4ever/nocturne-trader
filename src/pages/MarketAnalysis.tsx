import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

const marketData = {
  indices: [
    { name: "S&P 500", symbol: "SPX", value: 4567.89, change: 23.45, changePercent: 0.52 },
    { name: "NASDAQ", symbol: "IXIC", value: 14234.56, change: -45.23, changePercent: -0.32 },
    { name: "Dow Jones", symbol: "DJI", value: 35678.90, change: 156.78, changePercent: 0.44 },
  ],
  movers: {
    gainers: [
      { symbol: "NVDA", name: "NVIDIA Corp", price: 456.78, change: 23.45, changePercent: 5.41 },
      { symbol: "AMZN", name: "Amazon.com Inc", price: 142.38, change: 8.92, changePercent: 6.69 },
      { symbol: "META", name: "Meta Platforms", price: 234.56, change: 12.34, changePercent: 5.56 },
    ],
    losers: [
      { symbol: "TSLA", name: "Tesla Inc", price: 187.43, change: -15.67, changePercent: -7.71 },
      { symbol: "NFLX", name: "Netflix Inc", price: 389.45, change: -12.89, changePercent: -3.20 },
      { symbol: "SNAP", name: "Snap Inc", price: 12.45, change: -1.23, changePercent: -8.98 },
    ]
  },
  sectors: [
    { name: "Technology", change: 1.24, volume: "2.4B" },
    { name: "Healthcare", change: -0.56, volume: "1.8B" },
    { name: "Financials", change: 0.78, volume: "1.6B" },
    { name: "Energy", change: 2.34, volume: "1.2B" },
    { name: "Consumer", change: -1.12, volume: "1.0B" },
  ]
};

const MarketAnalysis = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Market Analysis</h1>
                <p className="text-sm text-muted-foreground">Real-time market data and insights</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Market Indices */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Market Indices</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketData.indices.map((index) => (
                    <GlassCard key={index.symbol}>
                      <GlassCardHeader>
                        <GlassCardTitle className="text-lg">{index.name}</GlassCardTitle>
                      </GlassCardHeader>
                      <GlassCardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-foreground">
                              {index.value.toLocaleString()}
                            </p>
                            <div className={`flex items-center mt-2 ${
                              index.change >= 0 ? 'text-success' : 'text-destructive'
                            }`}>
                              {index.change >= 0 ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              <span className="text-sm font-medium">
                                {index.change >= 0 ? '+' : ''}{index.change} ({index.change >= 0 ? '+' : ''}{index.changePercent}%)
                              </span>
                            </div>
                          </div>
                          <BarChart3 className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </GlassCardContent>
                    </GlassCard>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Gainers */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Top Gainers</h2>
                  <GlassCard>
                    <GlassCardContent>
                      <div className="space-y-4">
                        {marketData.movers.gainers.map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                            <div>
                              <p className="font-semibold text-foreground">{stock.symbol}</p>
                              <p className="text-sm text-muted-foreground">{stock.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">${stock.price}</p>
                              <div className="flex items-center text-success">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                <span className="text-sm">+{stock.change} (+{stock.changePercent}%)</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </section>

                {/* Top Losers */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Top Losers</h2>
                  <GlassCard>
                    <GlassCardContent>
                      <div className="space-y-4">
                        {marketData.movers.losers.map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                            <div>
                              <p className="font-semibold text-foreground">{stock.symbol}</p>
                              <p className="text-sm text-muted-foreground">{stock.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">${stock.price}</p>
                              <div className="flex items-center text-destructive">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                <span className="text-sm">{stock.change} ({stock.changePercent}%)</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </section>
              </div>

              {/* Sector Performance */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Sector Performance</h2>
                <GlassCard>
                  <GlassCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {marketData.sectors.map((sector) => (
                        <div key={sector.name} className="p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4 text-center">
                          <p className="font-semibold text-foreground mb-2">{sector.name}</p>
                          <div className={`flex items-center justify-center mb-2 ${
                            sector.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {sector.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="font-medium">
                              {sector.change >= 0 ? '+' : ''}{sector.change}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Vol: {sector.volume}</p>
                        </div>
                      ))}
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

export default MarketAnalysis;