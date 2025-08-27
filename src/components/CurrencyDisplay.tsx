import { useSettings } from "@/hooks/useSettings";
import { useEffect, useState } from "react";

interface CurrencyDisplayProps {
  value: number;
  className?: string;
}

export const CurrencyDisplay = ({ value, className = "" }: CurrencyDisplayProps) => {
  const { settings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  // Listen for settings changes to force re-render
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      setLocalSettings(event.detail);
    };

    window.addEventListener('settingsChanged', handleSettingsChange as EventListener);
    return () => window.removeEventListener('settingsChanged', handleSettingsChange as EventListener);
  }, []);

  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const formatCurrency = (amount: number) => {
    const currency = localSettings.display.currency;
    
    const formatters: Record<string, Intl.NumberFormat> = {
      'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      'EUR': new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }),
      'GBP': new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
      'JPY': new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }),
      'CAD': new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }),
      'AUD': new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }),
      'CHF': new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }),
    };
    
    return formatters[currency]?.format(amount) || `$${amount.toLocaleString()}`;
  };

  return <span className={className}>{formatCurrency(value)}</span>;
};