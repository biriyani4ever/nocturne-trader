import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Bell, TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alertsData = {
  active: [
    {
      id: 1,
      type: "Price Alert",
      symbol: "AAPL",
      condition: "Above $180.00",
      currentPrice: 178.25,
      target: 180.00,
      status: "active",
      created: "2024-01-08"
    },
    {
      id: 2,
      type: "Volume Alert",
      symbol: "TSLA",
      condition: "Volume > 50M",
      currentVolume: 35.2,
      target: 50,
      status: "active",
      created: "2024-01-09"
    },
    {
      id: 3,
      type: "Price Alert",
      symbol: "MSFT",
      condition: "Below $230.00",
      currentPrice: 235.89,
      target: 230.00,
      status: "active",
      created: "2024-01-10"
    }
  ],
  triggered: [
    {
      id: 4,
      type: "Price Alert",
      symbol: "NVDA",
      condition: "Above $450.00",
      triggeredPrice: 456.78,
      target: 450.00,
      status: "triggered",
      triggeredAt: "2024-01-11 09:45 AM"
    },
    {
      id: 5,
      type: "Volume Alert",
      symbol: "AMZN",
      condition: "Volume > 25M",
      triggeredVolume: 32.5,
      target: 25,
      status: "triggered",
      triggeredAt: "2024-01-11 10:30 AM"
    },
    {
      id: 6,
      type: "Price Alert",
      symbol: "GOOGL",
      condition: "Below $140.00",
      triggeredPrice: 139.25,
      target: 140.00,
      status: "triggered",
      triggeredAt: "2024-01-10 02:15 PM"
    }
  ],
  watchlist: [
    { symbol: "META", currentPrice: 234.56, change: 2.34, changePercent: 1.01 },
    { symbol: "NFLX", currentPrice: 389.45, change: -5.67, changePercent: -1.43 },
    { symbol: "SNAP", currentPrice: 12.45, change: 0.23, changePercent: 1.88 },
    { symbol: "UBER", currentPrice: 45.67, change: -1.23, changePercent: -2.62 }
  ]
};

const TradingAlerts = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Trading Alerts</h1>
                <p className="text-sm text-muted-foreground">Manage price, volume, and technical alerts</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Alert Summary */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Alert Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Active Alerts</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-foreground">{alertsData.active.length}</p>
                        </div>
                        <Bell className="h-8 w-8 text-warning" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Triggered Today</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-success">{alertsData.triggered.length}</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-success" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Watchlist Items</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-foreground">{alertsData.watchlist.length}</p>
                        </div>
                        <Target className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Hit Rate</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-success">78%</p>
                          <p className="text-sm text-muted-foreground">This week</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-success" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              </section>

              {/* Active Alerts */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Active Alerts</h2>
                <GlassCard>
                  <GlassCardContent>
                    <div className="space-y-4">
                      {alertsData.active.map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-warning/10 border border-warning/20">
                              <Bell className="h-5 w-5 text-warning" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-foreground">{alert.symbol}</p>
                                <Badge variant="secondary">{alert.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{alert.condition}</p>
                              {alert.currentPrice && (
                                <p className="text-sm text-muted-foreground">
                                  Current: ${alert.currentPrice} | Target: ${alert.target}
                                </p>
                              )}
                              {alert.currentVolume && (
                                <p className="text-sm text-muted-foreground">
                                  Current: {alert.currentVolume}M | Target: {alert.target}M
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">Active</Badge>
                            <p className="text-sm text-muted-foreground mt-1">Since {alert.created}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>

              {/* Recently Triggered */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Recently Triggered</h2>
                <GlassCard>
                  <GlassCardContent>
                    <div className="space-y-4">
                      {alertsData.triggered.map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/10 border border-success/20">
                              <AlertTriangle className="h-5 w-5 text-success" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-foreground">{alert.symbol}</p>
                                <Badge variant="default">{alert.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{alert.condition}</p>
                              {alert.triggeredPrice && (
                                <p className="text-sm text-success">
                                  Triggered at ${alert.triggeredPrice} (Target: ${alert.target})
                                </p>
                              )}
                              {alert.triggeredVolume && (
                                <p className="text-sm text-success">
                                  Triggered at {alert.triggeredVolume}M (Target: {alert.target}M)
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="default">Triggered</Badge>
                            <p className="text-sm text-muted-foreground mt-1">{alert.triggeredAt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>

              {/* Watchlist */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Watchlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {alertsData.watchlist.map((stock) => (
                    <GlassCard key={stock.symbol}>
                      <GlassCardContent className="p-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground mb-2">{stock.symbol}</p>
                          <p className="text-2xl font-bold text-foreground mb-2">${stock.currentPrice}</p>
                          <div className={`flex items-center justify-center ${
                            stock.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-sm font-medium">
                              {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.change >= 0 ? '+' : ''}{stock.changePercent}%)
                            </span>
                          </div>
                        </div>
                      </GlassCardContent>
                    </GlassCard>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TradingAlerts;