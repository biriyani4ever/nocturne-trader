import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { CurrencyDisplay } from "@/components/CurrencyDisplay"
import { useMarketTiming } from "@/hooks/useMarketTiming"

const portfolioData = {
  totalValue: 127450.32,
  dailyChange: 2834.21,
  dailyChangePercent: 2.28,
  topHoldings: [
    { symbol: "AAPL", name: "Apple Inc.", value: 23450.00, change: 3.2 },
    { symbol: "MSFT", name: "Microsoft Corp.", value: 19230.00, change: -1.1 },
    { symbol: "GOOGL", name: "Alphabet Inc.", value: 15670.00, change: 2.8 },
    { symbol: "TSLA", name: "Tesla Inc.", value: 12340.00, change: 5.4 },
  ]
}

export function PortfolioOverview() {
  const { totalValue, dailyChange, dailyChangePercent, topHoldings } = portfolioData
  const { marketStatus } = useMarketTiming()
  const isPositive = dailyChange >= 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Portfolio Value */}
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="text-lg">Total Portfolio</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="flex items-center justify-between">
              <div>
                <CurrencyDisplay value={totalValue} className="text-3xl font-bold text-foreground" />
                <div className={`flex items-center mt-2 ${
                  isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    <CurrencyDisplay value={Math.abs(dailyChange)} /> ({Math.abs(dailyChangePercent)}%)
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Daily Performance */}
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="text-lg">Today's Performance</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="text-center">
              <p className={`text-2xl font-bold ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}>
                {isPositive ? '+' : ''}<CurrencyDisplay value={dailyChange} />
              </p>
              <div className={`flex items-center justify-center mt-2 ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">
                  {isPositive ? '+' : ''}{dailyChangePercent}%
                </span>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Market Status */}
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="text-lg">Market Status</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${marketStatus.isMarketOpen ? 'bg-success' : 'bg-destructive'}`}></div>
              <p className="text-lg font-semibold text-foreground">{marketStatus.isMarketOpen ? 'Open' : 'Closed'}</p>
              <p className="text-sm text-muted-foreground">{marketStatus.current} • {marketStatus.timeUntilNext} until {marketStatus.nextSession}</p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Top Holdings */}
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>Top Holdings</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-4">
            {topHoldings.map((holding) => (
              <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                <div>
                  <p className="font-semibold text-foreground">{holding.symbol}</p>
                  <p className="text-sm text-muted-foreground">{holding.name}</p>
                </div>
                <div className="text-right">
                  <CurrencyDisplay value={holding.value} className="font-semibold text-foreground" />
                  <div className={`flex items-center text-sm ${
                    holding.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {holding.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}