import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { TrendingUp, Calendar, DollarSign, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ipoData = {
  upcoming: [
    {
      company: "TechCorp Inc.",
      ticker: "TECH",
      date: "2024-01-15",
      priceRange: "$18-22",
      shares: "50M",
      valuation: "$2.5B",
      status: "upcoming",
      description: "Cloud-based enterprise software solutions"
    },
    {
      company: "GreenEnergy Ltd.",
      ticker: "GREEN",
      date: "2024-01-20",
      priceRange: "$12-16",
      shares: "75M",
      valuation: "$1.8B",
      status: "upcoming",
      description: "Renewable energy and battery technology"
    },
    {
      company: "MedTech Solutions",
      ticker: "MEDT",
      date: "2024-01-25",
      priceRange: "$25-30",
      shares: "40M",
      valuation: "$3.2B",
      status: "upcoming",
      description: "AI-powered medical diagnostics"
    }
  ],
  recent: [
    {
      company: "CloudSoft",
      ticker: "CLOUD",
      date: "2024-01-10",
      ipoPrice: "$20.00",
      currentPrice: "$24.50",
      change: 22.5,
      shares: "60M",
      description: "Software development platform"
    },
    {
      company: "FinanceAI",
      ticker: "FINAI",
      date: "2024-01-08",
      ipoPrice: "$15.00",
      currentPrice: "$13.25",
      change: -11.67,
      shares: "45M",
      description: "Artificial intelligence for financial services"
    },
    {
      company: "BioInnovate",
      ticker: "BIOIN",
      date: "2024-01-05",
      ipoPrice: "$28.00",
      currentPrice: "$31.75",
      change: 13.39,
      shares: "35M",
      description: "Biotechnology and pharmaceutical research"
    }
  ]
};

const IpoAlerts = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">IPO Alerts</h1>
                <p className="text-sm text-muted-foreground">Track upcoming and recent initial public offerings</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Upcoming IPOs */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming IPOs</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {ipoData.upcoming.map((ipo, index) => (
                    <GlassCard key={index}>
                      <GlassCardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <GlassCardTitle className="text-lg">{ipo.company}</GlassCardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{ipo.ticker}</p>
                          </div>
                          <Badge variant="secondary">Upcoming</Badge>
                        </div>
                      </GlassCardHeader>
                      <GlassCardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">{ipo.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Date</p>
                                <p className="text-sm font-medium text-foreground">{ipo.date}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Price Range</p>
                                <p className="text-sm font-medium text-foreground">{ipo.priceRange}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Shares</p>
                              <p className="text-sm font-medium text-foreground">{ipo.shares}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Valuation</p>
                              <p className="text-sm font-medium text-foreground">{ipo.valuation}</p>
                            </div>
                          </div>
                        </div>
                      </GlassCardContent>
                    </GlassCard>
                  ))}
                </div>
              </section>

              {/* Recent IPOs */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent IPO Performance</h2>
                <GlassCard>
                  <GlassCardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/8">
                          <tr>
                            <th className="text-left p-4 text-muted-foreground font-medium">Company</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">IPO Date</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">IPO Price</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Current Price</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Performance</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Shares</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipoData.recent.map((ipo, index) => (
                            <tr key={index} className="border-b border-white/4 last:border-0 hover:bg-tahoe-hover transition-colors duration-200">
                              <td className="p-4">
                                <div>
                                  <p className="font-semibold text-foreground">{ipo.company}</p>
                                  <p className="text-sm text-muted-foreground">{ipo.ticker}</p>
                                </div>
                              </td>
                              <td className="p-4 text-foreground">{ipo.date}</td>
                              <td className="p-4 text-foreground font-medium">{ipo.ipoPrice}</td>
                              <td className="p-4 text-foreground font-medium">{ipo.currentPrice}</td>
                              <td className="p-4">
                                <div className={`flex items-center ${
                                  ipo.change >= 0 ? 'text-success' : 'text-destructive'
                                }`}>
                                  {ipo.change >= 0 ? (
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                  ) : (
                                    <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                                  )}
                                  <span className="font-semibold">
                                    {ipo.change >= 0 ? '+' : ''}{ipo.change.toFixed(2)}%
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-foreground">{ipo.shares}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>

              {/* IPO Calendar */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">This Week's IPO Calendar</h2>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <GlassCard key={day}>
                      <GlassCardContent className="p-4 text-center">
                        <p className="font-semibold text-foreground mb-2">{day}</p>
                        <p className="text-xs text-muted-foreground mb-2">Jan {10 + index}</p>
                        {index === 2 && (
                          <div className="text-xs bg-tahoe-active rounded-lg p-2">
                            <p className="text-foreground font-medium">TECH</p>
                            <p className="text-muted-foreground">TechCorp</p>
                          </div>
                        )}
                        {index === 5 && (
                          <div className="text-xs bg-tahoe-active rounded-lg p-2">
                            <p className="text-foreground font-medium">GREEN</p>
                            <p className="text-muted-foreground">GreenEnergy</p>
                          </div>
                        )}
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

export default IpoAlerts;