import { useSettings } from "@/hooks/useSettings";
import { formatInTimeZone } from "date-fns-tz";

interface DateTimeDisplayProps {
  date: Date;
  format?: string;
  className?: string;
}

export const DateTimeDisplay = ({ 
  date, 
  format = 'MMM dd, yyyy h:mm a', 
  className = "" 
}: DateTimeDisplayProps) => {
  const { settings } = useSettings();
  
  const formatDateTime = (date: Date, formatStr: string) => {
    const timezone = settings.profile.timezone;
    const dateFormat = settings.display.dateFormat;
    
    // Convert display date format to actual format
    let actualFormat = formatStr;
    if (formatStr.includes('MMM dd, yyyy')) {
      switch (dateFormat) {
        case 'DD/MM/YYYY':
          actualFormat = formatStr.replace('MMM dd, yyyy', 'dd/MM/yyyy');
          break;
        case 'YYYY-MM-DD':
          actualFormat = formatStr.replace('MMM dd, yyyy', 'yyyy-MM-dd');
          break;
        case 'MM/DD/YYYY':
        default:
          actualFormat = formatStr.replace('MMM dd, yyyy', 'MM/dd/yyyy');
          break;
      }
    }
    
    return formatInTimeZone(date, timezone, actualFormat);
  };

  return <span className={className}>{formatDateTime(date, format)}</span>;
};