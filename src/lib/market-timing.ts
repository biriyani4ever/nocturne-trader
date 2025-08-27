import { format, isWeekend, addDays, startOfDay, isBefore, isAfter, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { toZonedTime, formatInTimeZone } from 'date-fns-tz';

export interface MarketSession {
  session: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'upcoming' | 'closed';
  nextEvent: string;
  nextTime: string;
  description: string;
}

export interface MarketStatus {
  current: string;
  timeUntilNext: string;
  nextSession: string;
  timezone: string;
  isMarketOpen: boolean;
  currentDate: string;
  currentTime: string;
}

export interface MarketAlert {
  id: string;
  type: string;
  message: string;
  time: string;
  status: 'triggered' | 'pending';
  timestamp: string;
}

// Market session times in EST
export const MARKET_SESSIONS = {
  PRE_MARKET: { start: { hour: 4, minute: 0 }, end: { hour: 9, minute: 30 } },
  REGULAR: { start: { hour: 9, minute: 30 }, end: { hour: 16, minute: 0 } },
  AFTER_HOURS: { start: { hour: 16, minute: 0 }, end: { hour: 20, minute: 0 } },
};

// US market holidays (simplified - major ones)
export const MARKET_HOLIDAYS_2024 = [
  '2024-01-01', // New Year's Day
  '2024-01-15', // Martin Luther King Jr. Day
  '2024-02-19', // Presidents Day
  '2024-03-29', // Good Friday
  '2024-05-27', // Memorial Day
  '2024-06-19', // Juneteenth
  '2024-07-04', // Independence Day
  '2024-09-02', // Labor Day
  '2024-10-14', // Columbus Day
  '2024-11-11', // Veterans Day
  '2024-11-28', // Thanksgiving
  '2024-12-25', // Christmas Day
];

const EST_TIMEZONE = 'America/New_York';

export function getMarketDate(timezone?: string): Date {
  return toZonedTime(new Date(), timezone || EST_TIMEZONE);
}

export function isMarketHoliday(date: Date = new Date(), timezone?: string): boolean {
  const dateStr = formatInTimeZone(date, timezone || EST_TIMEZONE, 'yyyy-MM-dd');
  return MARKET_HOLIDAYS_2024.includes(dateStr);
}

export function isMarketDay(date: Date = new Date(), timezone?: string): boolean {
  return !isWeekend(date) && !isMarketHoliday(date, timezone);
}

export function getNextMarketDay(date: Date = new Date(), timezone?: string): Date {
  let nextDay = addDays(date, 1);
  while (!isMarketDay(nextDay, timezone)) {
    nextDay = addDays(nextDay, 1);
  }
  return nextDay;
}

export function getCurrentMarketSession(timezone?: string): string {
  const now = getMarketDate(timezone);
  
  if (!isMarketDay(now, timezone)) {
    return 'Closed';
  }

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const preMarketStart = MARKET_SESSIONS.PRE_MARKET.start.hour * 60 + MARKET_SESSIONS.PRE_MARKET.start.minute;
  const preMarketEnd = MARKET_SESSIONS.PRE_MARKET.end.hour * 60 + MARKET_SESSIONS.PRE_MARKET.end.minute;
  const regularStart = MARKET_SESSIONS.REGULAR.start.hour * 60 + MARKET_SESSIONS.REGULAR.start.minute;
  const regularEnd = MARKET_SESSIONS.REGULAR.end.hour * 60 + MARKET_SESSIONS.REGULAR.end.minute;
  const afterHoursStart = MARKET_SESSIONS.AFTER_HOURS.start.hour * 60 + MARKET_SESSIONS.AFTER_HOURS.start.minute;
  const afterHoursEnd = MARKET_SESSIONS.AFTER_HOURS.end.hour * 60 + MARKET_SESSIONS.AFTER_HOURS.end.minute;

  if (currentTimeInMinutes >= preMarketStart && currentTimeInMinutes < preMarketEnd) {
    return 'Pre-Market';
  } else if (currentTimeInMinutes >= regularStart && currentTimeInMinutes < regularEnd) {
    return 'Regular Hours';
  } else if (currentTimeInMinutes >= afterHoursStart && currentTimeInMinutes < afterHoursEnd) {
    return 'After-Hours';
  } else {
    return 'Closed';
  }
}

export function getTimeUntilNextSession(timezone?: string): { session: string; timeUntil: string; nextEventTime: string } {
  const now = getMarketDate(timezone);
  
  if (!isMarketDay(now, timezone)) {
    const nextMarketDay = getNextMarketDay(now, timezone);
    const nextPreMarketStart = new Date(nextMarketDay);
    nextPreMarketStart.setHours(MARKET_SESSIONS.PRE_MARKET.start.hour, MARKET_SESSIONS.PRE_MARKET.start.minute, 0, 0);
    
    const minutesUntil = differenceInMinutes(nextPreMarketStart, now);
    return {
      session: 'Pre-Market',
      timeUntil: formatDuration(minutesUntil),
      nextEventTime: formatInTimeZone(nextPreMarketStart, timezone || EST_TIMEZONE, 'h:mm a')
    };
  }

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const preMarketStart = MARKET_SESSIONS.PRE_MARKET.start.hour * 60 + MARKET_SESSIONS.PRE_MARKET.start.minute;
  const preMarketEnd = MARKET_SESSIONS.PRE_MARKET.end.hour * 60 + MARKET_SESSIONS.PRE_MARKET.end.minute;
  const regularStart = MARKET_SESSIONS.REGULAR.start.hour * 60 + MARKET_SESSIONS.REGULAR.start.minute;
  const regularEnd = MARKET_SESSIONS.REGULAR.end.hour * 60 + MARKET_SESSIONS.REGULAR.end.minute;
  const afterHoursStart = MARKET_SESSIONS.AFTER_HOURS.start.hour * 60 + MARKET_SESSIONS.AFTER_HOURS.start.minute;
  const afterHoursEnd = MARKET_SESSIONS.AFTER_HOURS.end.hour * 60 + MARKET_SESSIONS.AFTER_HOURS.end.minute;

  // Before pre-market
  if (currentTimeInMinutes < preMarketStart) {
    return {
      session: 'Pre-Market',
      timeUntil: formatDuration(preMarketStart - currentTimeInMinutes),
      nextEventTime: '4:00 AM'
    };
  }
  
  // During pre-market
  if (currentTimeInMinutes >= preMarketStart && currentTimeInMinutes < preMarketEnd) {
    return {
      session: 'Regular Hours',
      timeUntil: formatDuration(preMarketEnd - currentTimeInMinutes),
      nextEventTime: '9:30 AM'
    };
  }
  
  // During regular hours
  if (currentTimeInMinutes >= regularStart && currentTimeInMinutes < regularEnd) {
    return {
      session: 'After-Hours',
      timeUntil: formatDuration(regularEnd - currentTimeInMinutes),
      nextEventTime: '4:00 PM'
    };
  }
  
  // During after-hours
  if (currentTimeInMinutes >= afterHoursStart && currentTimeInMinutes < afterHoursEnd) {
    return {
      session: 'Closed',
      timeUntil: formatDuration(afterHoursEnd - currentTimeInMinutes),
      nextEventTime: '8:00 PM'
    };
  }
  
  // After market close - next session is tomorrow's pre-market
  const nextMarketDay = getNextMarketDay(now, timezone);
  const nextPreMarketStart = new Date(nextMarketDay);
  nextPreMarketStart.setHours(MARKET_SESSIONS.PRE_MARKET.start.hour, MARKET_SESSIONS.PRE_MARKET.start.minute, 0, 0);
  
  const minutesUntil = differenceInMinutes(nextPreMarketStart, now);
  return {
    session: 'Pre-Market',
    timeUntil: formatDuration(minutesUntil),
    nextEventTime: formatInTimeZone(nextPreMarketStart, timezone || EST_TIMEZONE, 'h:mm a')
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days}d ${remainingHours}h`;
}

export function getMarketSessions(timezone?: string): MarketSession[] {
  const currentSession = getCurrentMarketSession(timezone);
  
  return [
    {
      session: 'Pre-Market Trading',
      startTime: '4:00 AM EST',
      endTime: '9:30 AM EST',
      status: currentSession === 'Pre-Market' ? 'active' : 
              (currentSession === 'Closed' && getTimeUntilNextSession(timezone).session === 'Pre-Market') ? 'upcoming' : 'closed',
      nextEvent: 'Market Open',
      nextTime: '9:30 AM',
      description: 'Extended hours trading before market open'
    },
    {
      session: 'Regular Trading Hours',
      startTime: '9:30 AM EST',
      endTime: '4:00 PM EST',
      status: currentSession === 'Regular Hours' ? 'active' : 
              (currentSession === 'Pre-Market') ? 'upcoming' : 'closed',
      nextEvent: 'Market Close',
      nextTime: '4:00 PM',
      description: 'Primary trading session'
    },
    {
      session: 'After-Hours Trading',
      startTime: '4:00 PM EST',
      endTime: '8:00 PM EST',
      status: currentSession === 'After-Hours' ? 'active' : 
              (currentSession === 'Regular Hours') ? 'upcoming' : 'closed',
      nextEvent: 'After-Hours End',
      nextTime: '8:00 PM',
      description: 'Extended hours trading after market close'
    }
  ];
}

export function getMarketStatus(timezone?: string): MarketStatus {
  const now = getMarketDate(timezone);
  const currentSession = getCurrentMarketSession(timezone);
  const nextSession = getTimeUntilNextSession(timezone);
  
  return {
    current: currentSession,
    timeUntilNext: nextSession.timeUntil,
    nextSession: nextSession.session,
    timezone: 'Eastern Standard Time',
    isMarketOpen: currentSession !== 'Closed',
    currentDate: formatInTimeZone(now, timezone || EST_TIMEZONE, 'MMM dd, yyyy'),
    currentTime: formatInTimeZone(now, timezone || EST_TIMEZONE, 'h:mm:ss a')
  };
}

export function generateMarketAlerts(timezone?: string): MarketAlert[] {
  const now = getMarketDate(timezone);
  const currentSession = getCurrentMarketSession(timezone);
  const alerts: MarketAlert[] = [];
  
  // Generate session-based alerts
  if (currentSession === 'Pre-Market') {
    alerts.push({
      id: 'premarket-active',
      type: 'Session Active',
      message: 'Pre-market trading is currently active',
      time: '4:00 AM',
      status: 'triggered',
      timestamp: formatInTimeZone(now, timezone || EST_TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
    });
  }
  
  if (currentSession === 'Regular Hours') {
    alerts.push({
      id: 'market-open',
      type: 'Market Open',
      message: 'Regular trading session is now active',
      time: '9:30 AM',
      status: 'triggered',
      timestamp: formatInTimeZone(now, timezone || EST_TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
    });
  }
  
  if (currentSession === 'After-Hours') {
    alerts.push({
      id: 'afterhours-active',
      type: 'After-Hours Active',
      message: 'After-hours trading is currently active',
      time: '4:00 PM',
      status: 'triggered',
      timestamp: formatInTimeZone(now, timezone || EST_TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
    });
  }
  
  // Add upcoming session alerts
  const nextSession = getTimeUntilNextSession(timezone);
  if (nextSession.session !== 'Closed') {
    alerts.push({
      id: 'next-session',
      type: 'Upcoming Session',
      message: `${nextSession.session} will begin in ${nextSession.timeUntil}`,
      time: nextSession.nextEventTime,
      status: 'pending',
      timestamp: formatInTimeZone(now, timezone || EST_TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
    });
  }
  
  return alerts;
}

// Re-export market events functions
export { getUpcomingMarketEvents, generateEventAlerts, type MarketEvent } from './market-events';