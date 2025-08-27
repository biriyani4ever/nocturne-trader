# Backend Requirements for Zylo Trading Dashboard

## Overview
This document outlines the backend API requirements for the Zylo Trading Dashboard. The frontend is fully functional with mock data and requires real API endpoints to replace the hardcoded data.

## Technology Stack
- **Current Backend**: Supabase (Authentication + Database)
- **Required**: RESTful API endpoints for market data and trading operations
- **Authentication**: Supabase Auth (already implemented)

## API Endpoints Required

### 1. Market Data APIs

#### GET /api/market/indices
Returns major market indices data
```json
{
  "indices": [
    {
      "symbol": "SPY",
      "name": "S&P 500",
      "price": 445.20,
      "change": 2.15,
      "changePercent": 0.48,
      "volume": "45.2M"
    }
  ]
}
```

#### GET /api/market/sectors
Returns sector performance data
```json
{
  "sectors": [
    {
      "name": "Technology",
      "change": 1.25,
      "changePercent": 2.1,
      "volume": "120M"
    }
  ]
}
```

### 2. Portfolio APIs

#### GET /api/portfolio/holdings
Returns user's portfolio holdings
```json
{
  "holdings": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "shares": 100,
      "avgCost": 150.00,
      "currentPrice": 175.50,
      "marketValue": 17550.00,
      "unrealizedGain": 2550.00,
      "unrealizedGainPercent": 17.0
    }
  ],
  "totalValue": 125000.00,
  "totalGain": 15000.00,
  "totalGainPercent": 13.6
}
```

#### GET /api/portfolio/performance
Returns portfolio performance over time
```json
{
  "performance": [
    {
      "date": "2024-01-01",
      "value": 110000.00,
      "gain": 10000.00,
      "gainPercent": 10.0
    }
  ]
}
```

### 3. Trading Alerts APIs

#### GET /api/alerts/trading
Returns trading alerts for the user
```json
{
  "alerts": [
    {
      "id": "alert_1",
      "type": "price_target",
      "symbol": "AAPL",
      "message": "AAPL reached target price of $175",
      "status": "active",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### GET /api/alerts/ipo
Returns IPO alerts
```json
{
  "ipoAlerts": [
    {
      "id": "ipo_1",
      "company": "TechCorp Inc.",
      "symbol": "TECH",
      "expectedDate": "2024-02-15",
      "priceRange": "$18-22",
      "status": "upcoming"
    }
  ]
}
```

#### GET /api/alerts/dividends
Returns dividend alerts
```json
{
  "dividendAlerts": [
    {
      "id": "div_1",
      "symbol": "MSFT",
      "company": "Microsoft Corp.",
      "amount": 0.68,
      "exDate": "2024-02-14",
      "payDate": "2024-03-14",
      "frequency": "quarterly"
    }
  ]
}
```

### 4. Market Analysis APIs

#### GET /api/analysis/trends
Returns market trend analysis
```json
{
  "trends": [
    {
      "category": "AI & Technology",
      "sentiment": "bullish",
      "confidence": 85,
      "description": "Strong growth in AI sector",
      "keyStocks": ["NVDA", "MSFT", "GOOGL"]
    }
  ]
}
```

## Data Models

### Market Event Structure
```typescript
interface MarketEvent {
  id: string;
  event: string;
  date: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  category: string;
  daysUntil: number;
}
```

### Portfolio Holding Structure
```typescript
interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  sector?: string;
  lastUpdated: string;
}
```

## Real-time Data Requirements

### WebSocket Endpoints (Optional but Recommended)
- `ws://api/market/prices` - Real-time price updates
- `ws://api/alerts/live` - Live alert notifications

## Authentication Integration

The frontend uses Supabase Auth with the following flow:
1. User authenticates via Supabase
2. Frontend receives JWT token
3. All API calls include `Authorization: Bearer <token>` header
4. Backend validates token with Supabase

## Current Mock Data Locations

The following files contain hardcoded data that need real API integration:

1. **Market Data**: 
   - `src/pages/Index.tsx` - Market indices and sectors
   - `src/pages/MarketAnalysis.tsx` - Analysis data

2. **Portfolio Data**:
   - `src/pages/Portfolio.tsx` - Holdings and performance
   - `src/components/portfolio-overview.tsx` - Summary data

3. **Alerts Data**:
   - `src/pages/TradingAlerts.tsx` - Trading alerts
   - `src/pages/IpoAlerts.tsx` - IPO data
   - `src/pages/Dividends.tsx` - Dividend data
   - `src/lib/market-events.ts` - Market events and alerts

4. **Market Timing**:
   - `src/lib/market-timing.ts` - Market hours and status
   - `src/hooks/useMarketTiming.tsx` - Real-time market status

## Implementation Priority

1. **High Priority**:
   - Portfolio holdings and performance APIs
   - Basic market data (indices, sectors)
   - User authentication integration

2. **Medium Priority**:
   - Trading alerts system
   - Market analysis data
   - Real-time price updates

3. **Low Priority**:
   - IPO alerts
   - Dividend tracking
   - Advanced market events

## Testing Considerations

- The frontend includes comprehensive error handling
- All API calls should return consistent error formats
- Rate limiting should be implemented for market data endpoints
- Mock API responses are available in the current codebase for reference

## Deployment Notes

- Frontend is built with Vite and can be deployed as static files
- Backend APIs should support CORS for the frontend domain
- Consider implementing API versioning (/api/v1/) for future updates
- Monitor API usage and implement appropriate caching strategies

## Contact & Handoff

For questions about the frontend implementation or specific data requirements, refer to the existing mock data structures and component implementations in the codebase.