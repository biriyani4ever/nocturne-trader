import { useState, useEffect } from 'react';
import { 
  getMarketSessions, 
  getMarketStatus, 
  generateMarketAlerts,
  getUpcomingMarketEvents,
  generateEventAlerts,
  type MarketSession,
  type MarketStatus,
  type MarketAlert,
  type MarketEvent
} from '@/lib/market-timing';

interface UseMarketTimingReturn {
  marketSessions: MarketSession[];
  marketStatus: MarketStatus;
  alerts: MarketAlert[];
  marketEvents: MarketEvent[];
  eventAlerts: Array<{
    id: string;
    type: string;
    message: string;
    status: 'pending' | 'triggered';
    time: string;
    timestamp: string;
    category: string;
  }>;
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
  const [marketEvents, setMarketEvents] = useState<MarketEvent[]>([]);
  const [eventAlerts, setEventAlerts] = useState<Array<{
    id: string;
    type: string;
    message: string;
    status: 'pending' | 'triggered';
    time: string;
    timestamp: string;
    category: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const updateMarketData = () => {
    try {
      const sessions = getMarketSessions();
      const status = getMarketStatus();
      const marketAlerts = generateMarketAlerts();
      const events = getUpcomingMarketEvents();
      const eventsAlerts = generateEventAlerts(events);

      setMarketSessions(sessions);
      setMarketStatus(status);
      setAlerts(marketAlerts);
      setMarketEvents(events);
      setEventAlerts(eventsAlerts);
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
    marketEvents,
    eventAlerts,
    isLoading,
    lastUpdated
  };
}