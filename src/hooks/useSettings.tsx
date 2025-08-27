import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "@/hooks/use-toast";

export interface SettingsState {
  profile: {
    name: string;
    email: string;
    timezone: string;
    currency: string;
  };
  notifications: {
    priceAlerts: boolean;
    dividendAlerts: boolean;
    ipoAlerts: boolean;
    marketTiming: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  display: {
    theme: string;
    currency: string;
    language: string;
    dateFormat: string;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
    loginAlerts: boolean;
  };
}

const initialSettings: SettingsState = {
  profile: {
    name: "John Doe",
    email: "john.doe@email.com",
    timezone: "America/New_York",
    currency: "USD"
  },
  notifications: {
    priceAlerts: true,
    dividendAlerts: true,
    ipoAlerts: true,
    marketTiming: true,
    emailNotifications: false,
    pushNotifications: true
  },
  display: {
    theme: "dark",
    currency: "USD",
    language: "English",
    dateFormat: "MM/DD/YYYY"
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: "30 minutes",
    loginAlerts: true
  }
};

// Create context for settings
const SettingsContext = createContext<{
  settings: SettingsState;
  updateProfile: (profile: Partial<SettingsState['profile']>) => void;
  updateNotifications: (notifications: Partial<SettingsState['notifications']>) => void;
  updateDisplay: (display: Partial<SettingsState['display']>) => void;
  updateSecurity: (security: Partial<SettingsState['security']>) => void;
  saveSettings: () => Promise<void>;
  isLoading: boolean;
} | null>(null);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('trading-app-settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Apply theme changes to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.display.theme === 'dark');
  }, [settings.display.theme]);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('trading-app-settings', JSON.stringify(settings));
  }, [settings]);

  const updateProfile = (profile: Partial<SettingsState['profile']>) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
  };

  const updateNotifications = (notifications: Partial<SettingsState['notifications']>) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications }
    }));
  };

  const updateDisplay = (display: Partial<SettingsState['display']>) => {
    setSettings(prev => ({
      ...prev,
      display: { ...prev.display, ...display }
    }));
  };

  const updateSecurity = (security: Partial<SettingsState['security']>) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, ...security }
    }));
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('trading-app-settings', JSON.stringify(settings));
      
      // Force re-render of components that depend on settings
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    settings,
    isLoading,
    updateProfile,
    updateNotifications,
    updateDisplay,
    updateSecurity,
    saveSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};