import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Clock, Bell, Activity, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const marketTimingData = {
  sessionTimes: [
    {
      session: "Pre-Market Trading",
      time: "04:00 AM - 09:30 AM EST",
      status: "active",
      nextEvent: "Market Open",
      nextTime: "09:30 AM",
      description: "Extended hours trading before market open"
    },
    {
      session: "Regular Trading Hours",
      time: "09:30 AM - 04:00 PM EST",
      status: "upcoming",
      nextEvent: "Market Open",
      nextTime: "09:30 AM",
      description: "Primary trading session"
    },
    {
      session: "After-Hours Trading",
      time: "04:00 PM - 08:00 PM EST",
      status: "upcoming",
      nextEvent: "After-Hours Start",
      nextTime: "04:00 PM",
      description: "Extended hours trading after market close"
    }
  ],
  alerts: [
    {
      id: 1,
      type: "Session Start",
      message: "Pre-market trading has begun",
      time: "04:00 AM",
      status: "triggered",
      timestamp: "2024-01-11 04:00:00"
    },
    {
      id: 2,
      type: "Volume Alert",
      message: "High pre-market volume detected for TSLA",
      time: "07:45 AM",
      status: "triggered",
      timestamp: "2024-01-11 07:45:00"
    },
    {
      id: 3,
      type: "Market Open",
      message: "Regular trading session will begin in 30 minutes",
      time: "09:00 AM",
      status: "pending",
      timestamp: "2024-01-11 09:00:00"
    }
  ],
  keyEvents: [
    {
      event: "Federal Reserve Meeting",
      date: "2024-01-31",
      time: "02:00 PM EST",
      impact: "High",
      description: "Interest rate decision announcement"
    },
    {
      event: "Non-Farm Payrolls",
      date: "2024-01-05",
      time: "08:30 AM EST",
      impact: "High",
      description: "Monthly employment data release"
    },
    {
      event: "CPI Inflation Data",
      date: "2024-01-12",
      time: "08:30 AM EST",
      impact: "Medium",
      description: "Consumer Price Index report"
    },
    {
      event: "Earnings Season Begins",
      date: "2024-01-15",
      time: "Various",
      impact: "High",
      description: "Q4 2023 earnings reports start"
    }
  ],
  marketHours: {
    current: "Pre-Market",
    timeUntilNext: "2h 15m",
    nextSession: "Regular Trading",
    timezone: "Eastern Standard Time"
  }
};

const MarketTiming = () => {
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Current Session</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-foreground">{marketTimingData.marketHours.current}</p>
                          <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                            <span className="text-sm text-success">Active</span>
                          </div>
                        </div>
                        <Activity className="h-8 w-8 text-success" />
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
                          <p className="text-xl font-bold text-foreground">{marketTimingData.marketHours.nextSession}</p>
                          <p className="text-sm text-muted-foreground">in {marketTimingData.marketHours.timeUntilNext}</p>
                        </div>
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Timezone</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-foreground">EST</p>
                        <p className="text-sm text-muted-foreground">{marketTimingData.marketHours.timezone}</p>
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
                            {marketTimingData.alerts.filter(a => a.status === 'pending').length}
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
                  {marketTimingData.sessionTimes.map((session, index) => (
                    <GlassCard key={index}>
                      <GlassCardHeader>
                        <div className="flex items-center justify-between">
                          <GlassCardTitle className="text-lg">{session.session}</GlassCardTitle>
                          <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                        </div>
                      </GlassCardHeader>
                      <GlassCardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-semibold text-foreground">{session.time}</p>
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
                    <div className="space-y-4">
                      {marketTimingData.alerts.map((alert) => (
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
                          {marketTimingData.keyEvents.map((event, index) => (
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