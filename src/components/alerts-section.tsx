import { Bell, TrendingUp, DollarSign, Clock } from "lucide-react"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

const alertsData = {
  ipoAlerts: [
    { company: "TechCorp Inc.", date: "2024-01-15", priceRange: "$18-22", status: "upcoming" },
    { company: "GreenEnergy Ltd.", date: "2024-01-20", priceRange: "$12-16", status: "upcoming" },
    { company: "CloudSoft", date: "2024-01-10", priceRange: "$25-30", status: "active" },
  ],
  dividendAlerts: [
    { company: "Apple Inc.", symbol: "AAPL", exDate: "2024-01-12", amount: "$0.24", yield: "0.8%" },
    { company: "Microsoft Corp.", symbol: "MSFT", exDate: "2024-01-18", amount: "$0.75", yield: "2.1%" },
    { company: "Coca-Cola", symbol: "KO", exDate: "2024-01-25", amount: "$0.46", yield: "3.2%" },
  ],
  marketTimingAlerts: [
    { type: "Pre-Market", time: "04:00 AM", status: "active", message: "Extended trading session started" },
    { type: "Market Open", time: "09:30 AM", status: "upcoming", message: "Regular trading begins" },
    { type: "Post-Market", time: "04:00 PM", status: "upcoming", message: "After-hours trading available" },
  ]
}

export function AlertsSection() {
  const { ipoAlerts, dividendAlerts, marketTimingAlerts } = alertsData

  return (
    <div className="space-y-6">
      {/* IPO Alerts */}
      <GlassCard>
        <GlassCardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <GlassCardTitle>IPO Alerts</GlassCardTitle>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            {ipoAlerts.map((ipo, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass-hover">
                <div>
                  <p className="font-semibold text-foreground">{ipo.company}</p>
                  <p className="text-sm text-muted-foreground">Price Range: {ipo.priceRange}</p>
                  <p className="text-sm text-muted-foreground">Date: {ipo.date}</p>
                </div>
                <Badge variant={ipo.status === "active" ? "default" : "secondary"}>
                  {ipo.status}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Dividend Alerts */}
      <GlassCard>
        <GlassCardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <GlassCardTitle>Dividend Alerts</GlassCardTitle>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            {dividendAlerts.map((dividend, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass-hover">
                <div>
                  <p className="font-semibold text-foreground">
                    {dividend.symbol} - {dividend.company}
                  </p>
                  <p className="text-sm text-muted-foreground">Ex-Date: {dividend.exDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">{dividend.amount}</p>
                  <p className="text-sm text-muted-foreground">Yield: {dividend.yield}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Market Timing Alerts */}
      <GlassCard>
        <GlassCardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <GlassCardTitle>Market Timing Alerts</GlassCardTitle>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            {marketTimingAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass-hover">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.status === "active" ? "bg-success" : "bg-muted"
                  }`}></div>
                  <div>
                    <p className="font-semibold text-foreground">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-foreground">{alert.time}</p>
                  <Badge variant={alert.status === "active" ? "default" : "secondary"} className="text-xs">
                    {alert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}