import { format, addDays, addMonths, startOfMonth, endOfMonth, isAfter, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export interface MarketEvent {
  id: string;
  event: string;
  date: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  category: 'Fed' | 'Economic' | 'Earnings' | 'Options' | 'Futures' | 'Market Structure';
  countdown?: string;
  daysUntil: number;
}

// FOMC Meeting dates for 2024-2025 (real scheduled dates)
const FOMC_MEETINGS = [
  { date: '2024-01-31', time: '02:00 PM' },
  { date: '2024-03-20', time: '02:00 PM' },
  { date: '2024-05-01', time: '02:00 PM' },
  { date: '2024-06-12', time: '02:00 PM' },
  { date: '2024-07-31', time: '02:00 PM' },
  { date: '2024-09-18', time: '02:00 PM' },
  { date: '2024-11-07', time: '02:00 PM' },
  { date: '2024-12-18', time: '02:00 PM' },
  { date: '2025-01-29', time: '02:00 PM' },
  { date: '2025-03-19', time: '02:00 PM' },
  { date: '2025-04-30', time: '02:00 PM' },
  { date: '2025-06-11', time: '02:00 PM' }
];

// Economic calendar schedule (monthly recurring events)
const ECONOMIC_EVENTS = [
  { 
    name: 'Non-Farm Payrolls', 
    dayOfWeek: 5, // Friday
    weekOfMonth: 1, // First Friday
    time: '08:30 AM',
    impact: 'High' as const,
    description: 'Monthly employment data release'
  },
  {
    name: 'Consumer Price Index (CPI)',
    dayOfMonth: 13, // Around mid-month
    time: '08:30 AM',
    impact: 'High' as const,
    description: 'Monthly inflation data release'
  },
  {
    name: 'Producer Price Index (PPI)',
    dayOfMonth: 14, // Day after CPI
    time: '08:30 AM',
    impact: 'Medium' as const,
    description: 'Wholesale inflation data'
  },
  {
    name: 'Retail Sales',
    dayOfMonth: 15, // Mid-month
    time: '08:30 AM',
    impact: 'Medium' as const,
    description: 'Monthly consumer spending data'
  }
];

// Options expiration calendar
function getOptionsExpirationDates(year: number, month: number): Date[] {
  const expirations: Date[] = [];
  const monthStart = new Date(year, month, 1);
  const monthEnd = endOfMonth(monthStart);
  
  // Third Friday of each month
  const firstDay = monthStart.getDay();
  const firstFriday = 6 - firstDay; // Days until first Friday
  const thirdFriday = firstFriday + 14; // Third Friday
  
  if (thirdFriday <= monthEnd.getDate()) {
    expirations.push(new Date(year, month, thirdFriday));
  }
  
  return expirations;
}

// Earnings season calculator
function getEarningsSeasons(year: number): Array<{start: Date, end: Date, quarter: string}> {
  return [
    { start: new Date(year, 0, 15), end: new Date(year, 1, 28), quarter: 'Q4 Previous Year' },
    { start: new Date(year, 3, 15), end: new Date(year, 4, 31), quarter: 'Q1' },
    { start: new Date(year, 6, 15), end: new Date(year, 7, 31), quarter: 'Q2' },
    { start: new Date(year, 9, 15), end: new Date(year, 10, 30), quarter: 'Q3' }
  ];
}

// Calculate days until event
function calculateDaysUntil(eventDate: string): number {
  const today = new Date();
  const event = new Date(eventDate);
  const diffTime = event.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Generate FOMC meeting events
function getFOMCEvents(): MarketEvent[] {
  const today = new Date();
  return FOMC_MEETINGS
    .filter(meeting => isAfter(new Date(meeting.date), today))
    .slice(0, 4) // Next 4 meetings
    .map((meeting, index) => ({
      id: `fomc-${index}`,
      event: 'Federal Reserve Meeting',
      date: meeting.date,
      time: `${meeting.time} EST`,
      impact: 'High' as const,
      description: 'Interest rate decision and policy statement',
      category: 'Fed' as const,
      daysUntil: calculateDaysUntil(meeting.date)
    }));
}

// Generate economic calendar events
function getEconomicEvents(months: number = 2): MarketEvent[] {
  const events: MarketEvent[] = [];
  const today = new Date();
  
  for (let i = 0; i < months; i++) {
    const targetMonth = addMonths(today, i);
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();
    
    ECONOMIC_EVENTS.forEach((eventTemplate, index) => {
      let eventDate: Date;
      
      if (eventTemplate.dayOfMonth) {
        eventDate = new Date(year, month, eventTemplate.dayOfMonth);
      } else if (eventTemplate.dayOfWeek && eventTemplate.weekOfMonth) {
        // Calculate Nth weekday of month (e.g., first Friday)
        const firstDay = new Date(year, month, 1);
        const firstWeekday = firstDay.getDay();
        const daysToTarget = (eventTemplate.dayOfWeek - firstWeekday + 7) % 7;
        const targetDay = 1 + daysToTarget + ((eventTemplate.weekOfMonth - 1) * 7);
        eventDate = new Date(year, month, targetDay);
      } else {
        return;
      }
      
      if (isAfter(eventDate, today)) {
        events.push({
          id: `econ-${i}-${index}`,
          event: eventTemplate.name,
          date: format(eventDate, 'yyyy-MM-dd'),
          time: `${eventTemplate.time} EST`,
          impact: eventTemplate.impact,
          description: eventTemplate.description,
          category: 'Economic',
          daysUntil: calculateDaysUntil(format(eventDate, 'yyyy-MM-dd'))
        });
      }
    });
  }
  
  return events;
}

// Generate earnings season events
function getEarningsEvents(): MarketEvent[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const seasons = [...getEarningsSeasons(currentYear), ...getEarningsSeasons(currentYear + 1)];
  
  const events: MarketEvent[] = [];
  
  seasons.forEach((season, index) => {
    if (isAfter(season.start, today)) {
      events.push({
        id: `earnings-start-${index}`,
        event: `Earnings Season Begins`,
        date: format(season.start, 'yyyy-MM-dd'),
        time: 'Various',
        impact: 'High' as const,
        description: `${season.quarter} earnings season begins`,
        category: 'Earnings',
        daysUntil: calculateDaysUntil(format(season.start, 'yyyy-MM-dd'))
      });
    }
    
    if (isAfter(season.end, today)) {
      events.push({
        id: `earnings-peak-${index}`,
        event: `Earnings Season Peak`,
        date: format(addDays(season.start, 10), 'yyyy-MM-dd'),
        time: 'Various',
        impact: 'Medium' as const,
        description: `Peak of ${season.quarter} earnings releases`,
        category: 'Earnings',
        daysUntil: calculateDaysUntil(format(addDays(season.start, 10), 'yyyy-MM-dd'))
      });
    }
  });
  
  return events.slice(0, 6); // Next 6 earnings events
}

// Generate options expiration events
function getOptionsEvents(): MarketEvent[] {
  const today = new Date();
  const events: MarketEvent[] = [];
  
  for (let i = 0; i < 4; i++) {
    const targetMonth = addMonths(today, i);
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();
    
    const expirations = getOptionsExpirationDates(year, month);
    
    expirations.forEach((expiration, index) => {
      if (isAfter(expiration, today)) {
        events.push({
          id: `options-${i}-${index}`,
          event: 'Options Expiration',
          date: format(expiration, 'yyyy-MM-dd'),
          time: '04:00 PM EST',
          impact: 'Medium' as const,
          description: 'Monthly options expiration (OpEx)',
          category: 'Options',
          daysUntil: calculateDaysUntil(format(expiration, 'yyyy-MM-dd'))
        });
      }
    });
  }
  
  return events;
}

// Generate market structure events
function getMarketStructureEvents(): MarketEvent[] {
  const today = new Date();
  const events: MarketEvent[] = [];
  
  // Quadruple witching (quarterly)
  const currentYear = today.getFullYear();
  const quadWitchingMonths = [2, 5, 8, 11]; // March, June, September, December
  
  quadWitchingMonths.forEach(month => {
    const year = month < today.getMonth() ? currentYear + 1 : currentYear;
    const expirations = getOptionsExpirationDates(year, month);
    
    expirations.forEach(expiration => {
      if (isAfter(expiration, today)) {
        events.push({
          id: `quad-witch-${month}`,
          event: 'Quadruple Witching',
          date: format(expiration, 'yyyy-MM-dd'),
          time: '04:00 PM EST',
          impact: 'High' as const,
          description: 'Quarterly expiration of stocks, stock index futures, stock index options, and stock options',
          category: 'Market Structure',
          daysUntil: calculateDaysUntil(format(expiration, 'yyyy-MM-dd'))
        });
      }
    });
  });
  
  return events.slice(0, 2); // Next 2 quad witching events
}

// Main function to get all upcoming market events
export function getUpcomingMarketEvents(daysAhead: number = 60): MarketEvent[] {
  const allEvents: MarketEvent[] = [
    ...getFOMCEvents(),
    ...getEconomicEvents(),
    ...getEarningsEvents(),
    ...getOptionsEvents(),
    ...getMarketStructureEvents()
  ];
  
  // Filter events within the specified timeframe and sort by date
  const filteredEvents = allEvents
    .filter(event => event.daysUntil >= 0 && event.daysUntil <= daysAhead)
    .sort((a, b) => a.daysUntil - b.daysUntil);
  
  return filteredEvents.slice(0, 20); // Return top 20 upcoming events
}

// Generate event-based alerts
export function generateEventAlerts(events: MarketEvent[]): Array<{
  id: string;
  type: string;
  message: string;
  status: 'pending' | 'triggered';
  time: string;
  timestamp: string;
  category: string;
}> {
  const alerts = [];
  const today = new Date();
  const estTime = toZonedTime(today, 'America/New_York');
  
  events.forEach(event => {
    if (event.daysUntil === 0) {
      alerts.push({
        id: `event-today-${event.id}`,
        type: 'Event Today',
        message: `${event.event} is scheduled for today at ${event.time}`,
        status: 'triggered' as const,
        time: format(estTime, 'HH:mm'),
        timestamp: format(estTime, 'yyyy-MM-dd HH:mm:ss'),
        category: event.category
      });
    } else if (event.daysUntil === 1) {
      alerts.push({
        id: `event-tomorrow-${event.id}`,
        type: 'Event Tomorrow',
        message: `${event.event} is scheduled for tomorrow at ${event.time}`,
        status: 'pending' as const,
        time: format(estTime, 'HH:mm'),
        timestamp: format(estTime, 'yyyy-MM-dd HH:mm:ss'),
        category: event.category
      });
    } else if (event.daysUntil <= 3 && event.impact === 'High') {
      alerts.push({
        id: `high-impact-${event.id}`,
        type: 'High Impact Event',
        message: `${event.event} in ${event.daysUntil} days - High market impact expected`,
        status: 'pending' as const,
        time: format(estTime, 'HH:mm'),
        timestamp: format(estTime, 'yyyy-MM-dd HH:mm:ss'),
        category: event.category
      });
    }
  });
  
  return alerts;
}