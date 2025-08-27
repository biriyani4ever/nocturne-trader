import { useSettings } from "@/hooks/useSettings";

interface CurrencyDisplayProps {
  value: number;
  className?: string;
}

export const CurrencyDisplay = ({ value, className = "" }: CurrencyDisplayProps) => {
  const { settings } = useSettings();
  
  const formatCurrency = (amount: number) => {
    const currency = settings.display.currency;
    
    const formatters: Record<string, Intl.NumberFormat> = {
      'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      'EUR': new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }),
      'GBP': new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
      'JPY': new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }),
    };
    
    return formatters[currency]?.format(amount) || `$${amount.toLocaleString()}`;
  };

  return <span className={className}>{formatCurrency(value)}</span>;
};