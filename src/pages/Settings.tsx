import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Menu, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/useSettings";
import { exportToPDF } from "@/utils/pdfExport";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const timezones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
];

const currencies = [
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "CAD", label: "Canadian Dollar (CAD)" },
  { value: "AUD", label: "Australian Dollar (AUD)" },
  { value: "CHF", label: "Swiss Franc (CHF)" },
];

const languages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Español" },
  { value: "French", label: "Français" },
  { value: "German", label: "Deutsch" },
  { value: "Japanese", label: "日本語" },
  { value: "Chinese", label: "中文" },
];

const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "MMM DD, YYYY", label: "MMM DD, YYYY" },
];

const sessionTimeouts = [
  { value: "15 minutes", label: "15 minutes" },
  { value: "30 minutes", label: "30 minutes" },
  { value: "1 hour", label: "1 hour" },
  { value: "2 hours", label: "2 hours" },
  { value: "4 hours", label: "4 hours" },
  { value: "Never", label: "Never" },
];

const Settings = () => {
  const { settings, updateProfile, updateNotifications, updateDisplay, updateSecurity, saveSettings, isLoading } = useSettings();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password updated",
          description: "Your password has been successfully changed.",
        });
        setNewPassword("");
        setConfirmPassword("");
        setIsPasswordDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async (type: 'portfolio' | 'alerts' | 'transactions') => {
    try {
      exportToPDF(type);
      toast({
        title: "Export successful",
        description: `Your ${type} data has been exported to PDF.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadAccountData = async () => {
    try {
      // Import the new PDF export function
      const { exportAccountDataToPDF } = await import("@/utils/pdfExport");
      
      // Create comprehensive account data
      const accountData = {
        profile: settings.profile,
        preferences: settings.display,
        notifications: settings.notifications,
        security: {
          twoFactorAuth: settings.security.twoFactorAuth,
          loginAlerts: settings.security.loginAlerts,
          sessionTimeout: settings.security.sessionTimeout
        },
        exportDate: new Date().toISOString(),
        version: "1.0"
      };

      // Export to PDF
      exportAccountDataToPDF(accountData);

      toast({
        title: "Account data downloaded",
        description: "Your complete account data has been downloaded as a PDF file.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your account data.",
        variant: "destructive",
      });
    }
  };

  const handleSettingChange = (section: string, key: string, value: any) => {
    switch (section) {
      case 'profile':
        updateProfile({ [key]: value });
        break;
      case 'notifications':
        updateNotifications({ [key]: value });
        break;
      case 'display':
        updateDisplay({ [key]: value });
        break;
      case 'security':
        updateSecurity({ [key]: value });
        break;
    }
    
    // Show immediate feedback for important changes
    if (key === 'theme') {
      toast({
        title: "Theme changed",
        description: `Switched to ${value} mode. Save changes to persist.`,
      });
    } else if (key === 'currency') {
      toast({
        title: "Currency changed",
        description: `Now displaying in ${value}. Save changes to persist.`,
      });
    } else if (key === 'timezone') {
      toast({
        title: "Timezone changed",
        description: `Times will now display in ${value}. Save changes to persist.`,
      });
    } else if (key === 'language') {
      toast({
        title: "Language changed",
        description: `Interface language set to ${value}. Refresh page to see changes.`,
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger 
                className="mr-4 text-foreground hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-2 rounded-xl transition-all duration-300"
                aria-label="Toggle sidebar navigation"
              >
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground">Customize your Zylo experience</p>
              </div>
            </header>

            <div className="p-6 space-y-8">
              {/* Profile Settings */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>
                <GlassCard>
                  <GlassCardHeader>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <GlassCardTitle>Personal Information</GlassCardTitle>
                    </div>
                  </GlassCardHeader>
                  <GlassCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Full Name</Label>
                        <Input 
                          id="name" 
                          value={settings.profile.name}
                          onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-foreground">Timezone</Label>
                        <Select 
                          value={settings.profile.timezone} 
                          onValueChange={(value) => handleSettingChange('profile', 'timezone', value)}
                        >
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            {timezones.map((tz) => (
                              <SelectItem key={tz.value} value={tz.value} className="text-foreground hover:bg-accent">
                                {tz.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency" className="text-foreground">Default Currency</Label>
                        <Select 
                          value={settings.profile.currency} 
                          onValueChange={(value) => handleSettingChange('profile', 'currency', value)}
                        >
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            {currencies.map((curr) => (
                              <SelectItem key={curr.value} value={curr.value} className="text-foreground hover:bg-accent">
                                {curr.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button 
                        variant="default" 
                        onClick={saveSettings} 
                        disabled={isLoading}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>

              {/* Notification Settings */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Notification Preferences</h2>
                <GlassCard>
                  <GlassCardHeader>
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      <GlassCardTitle>Alert Settings</GlassCardTitle>
                    </div>
                  </GlassCardHeader>
                  <GlassCardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Price Alerts</p>
                          <p className="text-sm text-muted-foreground">Get notified when price targets are hit</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.priceAlerts} 
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'priceAlerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Dividend Alerts</p>
                          <p className="text-sm text-muted-foreground">Notifications for upcoming dividend payments</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.dividendAlerts} 
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'dividendAlerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">IPO Alerts</p>
                          <p className="text-sm text-muted-foreground">Updates on new IPOs and filings</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.ipoAlerts} 
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'ipoAlerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Market Timing</p>
                          <p className="text-sm text-muted-foreground">Session start/end notifications</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.marketTiming} 
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'marketTiming', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.emailNotifications} 
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Browser push notifications</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.pushNotifications} 
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
                        />
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Display Settings */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Display</h2>
                  <GlassCard>
                    <GlassCardHeader>
                      <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        <GlassCardTitle>Appearance</GlassCardTitle>
                      </div>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="theme" className="text-foreground">Theme</Label>
                          <Select 
                            value={settings.display.theme} 
                            onValueChange={(value) => handleSettingChange('display', 'theme', value)}
                          >
                            <SelectTrigger className="bg-input border-border text-foreground mt-2">
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                              <SelectItem value="dark" className="text-foreground hover:bg-accent">Dark</SelectItem>
                              <SelectItem value="light" className="text-foreground hover:bg-accent">Light</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="language" className="text-foreground">Language</Label>
                          <Select 
                            value={settings.display.language} 
                            onValueChange={(value) => handleSettingChange('display', 'language', value)}
                          >
                            <SelectTrigger className="bg-input border-border text-foreground mt-2">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                              {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value} className="text-foreground hover:bg-accent">
                                  {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="dateFormat" className="text-foreground">Date Format</Label>
                          <Select 
                            value={settings.display.dateFormat} 
                            onValueChange={(value) => handleSettingChange('display', 'dateFormat', value)}
                          >
                            <SelectTrigger className="bg-input border-border text-foreground mt-2">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                              {dateFormats.map((format) => (
                                <SelectItem key={format.value} value={format.value} className="text-foreground hover:bg-accent">
                                  {format.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {/* Save Changes Button for Display */}
                      <div className="pt-4 border-t border-white/6">
                        <Button 
                          onClick={saveSettings} 
                          disabled={isLoading}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {isLoading ? "Saving..." : "Save Display Changes"}
                        </Button>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </section>

                {/* Security Settings */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Security</h2>
                  <GlassCard>
                    <GlassCardHeader>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        <GlassCardTitle>Security & Privacy</GlassCardTitle>
                      </div>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                          </div>
                          <Switch 
                            checked={settings.security.twoFactorAuth} 
                            onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Login Alerts</p>
                            <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                          </div>
                          <Switch 
                            checked={settings.security.loginAlerts} 
                            onCheckedChange={(checked) => handleSettingChange('security', 'loginAlerts', checked)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="sessionTimeout" className="text-foreground">Session Timeout</Label>
                          <Select 
                            value={settings.security.sessionTimeout} 
                            onValueChange={(value) => handleSettingChange('security', 'sessionTimeout', value)}
                          >
                            <SelectTrigger className="bg-input border-border text-foreground mt-2">
                              <SelectValue placeholder="Select timeout" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border">
                              {sessionTimeouts.map((timeout) => (
                                <SelectItem key={timeout.value} value={timeout.value} className="text-foreground hover:bg-accent">
                                  {timeout.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent">
                                Change Password
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-background border-border">
                              <DialogHeader>
                                <DialogTitle className="text-foreground">Change Password</DialogTitle>
                                <DialogDescription className="text-muted-foreground">
                                  Enter your new password below. Make sure it's at least 6 characters long.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                                  <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="bg-input border-border text-foreground"
                                    placeholder="Enter new password"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                                  <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-input border-border text-foreground"
                                    placeholder="Confirm new password"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleChangePassword} disabled={!newPassword || !confirmPassword}>
                                  Change Password
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            onClick={handleDownloadAccountData}
                            className="w-full border-border text-foreground hover:bg-accent"
                          >
                            Download Account Data
                          </Button>
                        </div>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </section>
              </div>

              {/* Data Management */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Data Management</h2>
                <GlassCard>
                  <GlassCardHeader>
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      <GlassCardTitle>Account Data</GlassCardTitle>
                    </div>
                  </GlassCardHeader>
                  <GlassCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleExport('portfolio')}
                        className="border-border text-foreground hover:bg-accent flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export Portfolio Data
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleExport('alerts')}
                        className="border-border text-foreground hover:bg-accent flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export Alert History
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleExport('transactions')}
                        className="border-border text-foreground hover:bg-accent flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export Transaction History
                      </Button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/8">
                      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                        <p className="font-medium text-destructive mb-2">Danger Zone</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          These actions are permanent and cannot be undone.
                        </p>
                        <Button variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete Account</Button>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;