import { useState, useEffect } from 'react';
import { 
  getMarketSessions, 
  getMarketStatus, 
  generateMarketAlerts,
  type MarketSession,
  type MarketStatus,
  type MarketAlert
} from '@/lib/market-timing';

interface UseMarketTimingReturn {
  marketSessions: MarketSession[];
  marketStatus: MarketStatus;
  alerts: MarketAlert[];
  isLoading: boolean;
  lastUpdated: Date;
}

export function useMarketTiming(): UseMarketTimingReturn {
  const [marketSessions, setMarketSessions] = useState<MarketSession[]>([]);
  const [marketStatus, setMarketStatus] = useState<MarketStatus>({
    current: 'Closed',
    timeUntilNext: '0m',
    nextSession: 'Pre-Market',
    timezone: 'Eastern Standard Time',
    isMarketOpen: false,
    currentDate: '',
    currentTime: ''
  });
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const updateMarketData = () => {
    try {
      const sessions = getMarketSessions();
      const status = getMarketStatus();
      const marketAlerts = generateMarketAlerts();

      setMarketSessions(sessions);
      setMarketStatus(status);
      setAlerts(marketAlerts);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating market timing data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    updateMarketData();

    // Update every second for real-time countdown
    const interval = setInterval(updateMarketData, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    marketSessions,
    marketStatus,
    alerts,
    isLoading,
    lastUpdated
  };
}