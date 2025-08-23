import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Clock, Bell, Activity, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMarketTiming } from "@/hooks/useMarketTiming";
import { isMarketDay, isMarketHoliday } from "@/lib/market-timing";

// Sample key events data (would typically come from an API or configuration)
const upcomingKeyEvents = [
  {
    event: "Federal Reserve Meeting",
    date: "2024-01-31",
    time: "02:00 PM EST",
    impact: "High",
    description: "Interest rate decision announcement"
  },
  {
    event: "Non-Farm Payrolls",
    date: "2024-02-02",
    time: "08:30 AM EST",
    impact: "High", 
    description: "Monthly employment data release"
  },
  {
    event: "CPI Inflation Data",
    date: "2024-02-13",
    time: "08:30 AM EST",
    impact: "Medium",
    description: "Consumer Price Index report"
  },
  {
    event: "Earnings Season Continues",
    date: "2024-02-15",
    time: "Various",
    impact: "High",
    description: "Q4 2024 earnings reports continue"
  }
];

const MarketTiming = () => {
  const { marketSessions, marketStatus, alerts, isLoading } = useMarketTiming();
  
  // Determine current market day status
  const isCurrentMarketDay = isMarketDay();
  const isHoliday = isMarketHoliday();
  
  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen w-full bg-background">
          <div className="flex w-full">
            <TradingSidebar />
            <main className="flex-1 flex items-center justify-center">
              <div className="text-muted-foreground">Loading market timing data...</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Market Timing</h1>
                <p className="text-sm text-muted-foreground">Track trading sessions and market events</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Current Market Status */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Current Market Status</h2>
                
                {/* Market Day Status Banner */}
                {(!isCurrentMarketDay || isHoliday) && (
                  <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-semibold text-destructive">
                          {isHoliday ? 'Market Holiday' : 'Weekend - Markets Closed'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isHoliday 
                            ? 'US stock markets are closed today for a federal holiday' 
                            : 'US stock markets are closed on weekends'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Current Session</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-foreground">{marketStatus.current}</p>
                          <div className="flex items-center mt-2">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              marketStatus.isMarketOpen ? 'bg-success' : 'bg-destructive'
                            }`}></div>
                            <span className={`text-sm ${
                              marketStatus.isMarketOpen ? 'text-success' : 'text-destructive'
                            }`}>
                              {marketStatus.isMarketOpen ? 'Active' : 'Closed'}
                            </span>
                          </div>
                        </div>
                        <Activity className={`h-8 w-8 ${
                          marketStatus.isMarketOpen ? 'text-success' : 'text-muted-foreground'
                        }`} />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Next Session</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-foreground">{marketStatus.nextSession}</p>
                          <p className="text-sm text-muted-foreground">in {marketStatus.timeUntilNext}</p>
                        </div>
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Market Time</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-foreground">{marketStatus.currentTime}</p>
                        <p className="text-sm text-muted-foreground">{marketStatus.timezone}</p>
                        <p className="text-xs text-muted-foreground mt-1">{marketStatus.currentDate}</p>
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Active Alerts</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-warning">
                            {alerts.filter(a => a.status === 'pending').length}
                          </p>
                        </div>
                        <Bell className="h-8 w-8 text-warning" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              </section>

              {/* Trading Sessions */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Trading Sessions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {marketSessions.map((session, index) => (
                    <GlassCard key={index}>
                      <GlassCardHeader>
                        <div className="flex items-center justify-between">
                          <GlassCardTitle className="text-lg">{session.session}</GlassCardTitle>
                          <Badge variant={
                            session.status === 'active' ? 'default' : 
                            session.status === 'upcoming' ? 'secondary' : 
                            'outline'
                          }>
                            {session.status}
                          </Badge>
                        </div>
                      </GlassCardHeader>
                      <GlassCardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-semibold text-foreground">{session.startTime} - {session.endTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Next Event</p>
                            <p className="font-semibold text-foreground">{session.nextEvent} at {session.nextTime}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{session.description}</p>
                        </div>
                      </GlassCardContent>
                    </GlassCard>
                  ))}
                </div>
              </section>

              {/* Recent Alerts */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Market Timing Alerts</h2>
                <GlassCard>
                  <GlassCardContent>
                    {alerts.length === 0 ? (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No active market timing alerts</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {alerts.map((alert) => (
                          <div key={alert.id} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                            <div className="flex items-center gap-4">
                              <div className={`flex items-center justify-center w-12 h-12 rounded-xl border ${
                                alert.status === 'triggered' ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20'
                              }`}>
                                {alert.status === 'triggered' ? (
                                  <Bell className="h-5 w-5 text-success" />
                                ) : (
                                  <Clock className="h-5 w-5 text-warning" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-foreground">{alert.type}</p>
                                  <Badge variant={alert.status === 'triggered' ? 'default' : 'secondary'}>
                                    {alert.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{alert.message}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{alert.time}</p>
                              <p className="text-sm text-muted-foreground">{alert.timestamp.split(' ')[0]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCardContent>
                </GlassCard>
              </section>

              {/* Key Market Events */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Key Events</h2>
                <GlassCard>
                  <GlassCardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/8">
                          <tr>
                            <th className="text-left p-4 text-muted-foreground font-medium">Event</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Time</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Impact</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingKeyEvents.map((event, index) => (
                            <tr key={index} className="border-b border-white/4 last:border-0 hover:bg-tahoe-hover transition-colors duration-200">
                              <td className="p-4">
                                <p className="font-semibold text-foreground">{event.event}</p>
                              </td>
                              <td className="p-4 text-foreground">{event.date}</td>
                              <td className="p-4 text-foreground">{event.time}</td>
                              <td className="p-4">
                                <Badge variant={
                                  event.impact === 'High' ? 'destructive' : 
                                  event.impact === 'Medium' ? 'default' : 'secondary'
                                }>
                                  {event.impact}
                                </Badge>
                              </td>
                              <td className="p-4 text-muted-foreground">{event.description}</td>
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

export default MarketTiming;