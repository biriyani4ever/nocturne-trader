import { useState } from "react";
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

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    settings,
    isLoading,
    updateProfile,
    updateNotifications,
    updateDisplay,
    updateSecurity,
    saveSettings,
  };
};