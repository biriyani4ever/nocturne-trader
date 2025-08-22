import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { DollarSign, Calendar, TrendingUp, Percent } from "lucide-react";

const dividendData = {
  summary: {
    totalAnnualDividends: 2850.75,
    yieldOnPortfolio: 2.24,
    nextPayment: 125.50,
    nextPaymentDate: "2024-01-15"
  },
  holdings: [
    {
      symbol: "AAPL",
      company: "Apple Inc.",
      shares: 150,
      quarterlyDividend: 0.24,
      annualDividend: 0.96,
      yield: 0.54,
      exDate: "2024-01-12",
      payDate: "2024-01-16",
      nextPayment: 36.00
    },
    {
      symbol: "MSFT",
      company: "Microsoft Corp.",
      shares: 85,
      quarterlyDividend: 0.75,
      annualDividend: 3.00,
      yield: 1.27,
      exDate: "2024-01-18",
      payDate: "2024-01-22",
      nextPayment: 63.75
    },
    {
      symbol: "JNJ",
      company: "Johnson & Johnson",
      shares: 50,
      quarterlyDividend: 1.13,
      annualDividend: 4.52,
      yield: 2.75,
      exDate: "2024-01-25",
      payDate: "2024-01-29",
      nextPayment: 56.50
    },
    {
      symbol: "KO",
      company: "Coca-Cola Co.",
      shares: 100,
      quarterlyDividend: 0.46,
      annualDividend: 1.84,
      yield: 3.12,
      exDate: "2024-02-01",
      payDate: "2024-02-05",
      nextPayment: 46.00
    },
    {
      symbol: "PG",
      company: "Procter & Gamble",
      shares: 75,
      quarterlyDividend: 0.91,
      annualDividend: 3.64,
      yield: 2.45,
      exDate: "2024-02-08",
      payDate: "2024-02-12",
      nextPayment: 68.25
    }
  ],
  calendar: [
    { date: "2024-01-12", company: "Apple Inc.", symbol: "AAPL", amount: 36.00 },
    { date: "2024-01-18", company: "Microsoft Corp.", symbol: "MSFT", amount: 63.75 },
    { date: "2024-01-25", company: "Johnson & Johnson", symbol: "JNJ", amount: 56.50 },
    { date: "2024-02-01", company: "Coca-Cola Co.", symbol: "KO", amount: 46.00 },
    { date: "2024-02-08", company: "Procter & Gamble", symbol: "PG", amount: 68.25 }
  ]
};

const Dividends = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Dividend Tracking</h1>
                <p className="text-sm text-muted-foreground">Monitor dividend payments and yields</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Dividend Summary */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Dividend Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Annual Dividends</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-success">
                            ${dividendData.summary.totalAnnualDividends.toLocaleString()}
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-success" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Portfolio Yield</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {dividendData.summary.yieldOnPortfolio}%
                          </p>
                        </div>
                        <Percent className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Next Payment</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-success">
                            ${dividendData.summary.nextPayment}
                          </p>
                          <p className="text-sm text-muted-foreground">{dividendData.summary.nextPaymentDate}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>

                  <GlassCard>
                    <GlassCardHeader>
                      <GlassCardTitle className="text-lg">Growth Rate</GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-success">+5.2%</p>
                          <p className="text-sm text-muted-foreground">YoY</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-success" />
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              </section>

              {/* Dividend Holdings */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Dividend Holdings</h2>
                <GlassCard>
                  <GlassCardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/8">
                          <tr>
                            <th className="text-left p-4 text-muted-foreground font-medium">Symbol</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Shares</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Quarterly</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Annual</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Yield</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Ex-Date</th>
                            <th className="text-left p-4 text-muted-foreground font-medium">Next Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dividendData.holdings.map((holding) => (
                            <tr key={holding.symbol} className="border-b border-white/4 last:border-0 hover:bg-tahoe-hover transition-colors duration-200">
                              <td className="p-4">
                                <div>
                                  <p className="font-semibold text-foreground">{holding.symbol}</p>
                                  <p className="text-sm text-muted-foreground">{holding.company}</p>
                                </div>
                              </td>
                              <td className="p-4 text-foreground">{holding.shares}</td>
                              <td className="p-4 text-foreground">${holding.quarterlyDividend}</td>
                              <td className="p-4 text-foreground">${holding.annualDividend}</td>
                              <td className="p-4">
                                <span className="text-success font-medium">{holding.yield}%</span>
                              </td>
                              <td className="p-4 text-foreground">{holding.exDate}</td>
                              <td className="p-4">
                                <span className="text-success font-semibold">${holding.nextPayment}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>

              {/* Dividend Calendar */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Dividend Calendar</h2>
                <GlassCard>
                  <GlassCardContent>
                    <div className="space-y-4">
                      {dividendData.calendar.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-tahoe backdrop-blur-tahoe border border-white/4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-tahoe-active border border-white/8">
                              <Calendar className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{payment.symbol} - {payment.company}</p>
                              <p className="text-sm text-muted-foreground">Ex-Dividend Date: {payment.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-success">${payment.amount}</p>
                            <p className="text-sm text-muted-foreground">Expected Payment</p>
                          </div>
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

export default Dividends;