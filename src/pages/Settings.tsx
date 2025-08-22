import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "@/components/trading-sidebar";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const settingsData = {
  profile: {
    name: "John Doe",
    email: "john.doe@email.com",
    timezone: "Eastern Standard Time",
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

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex w-full">
          <TradingSidebar />
          
          <main className="flex-1">
            <header className="h-16 border-b border-white/6 bg-background/85 backdrop-blur-tahoe-lg flex items-center px-6">
              <SidebarTrigger className="mr-4 text-foreground hover:bg-tahoe-hover p-2 rounded-xl transition-all duration-300" />
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
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          defaultValue={settingsData.profile.name}
                          className="bg-tahoe backdrop-blur-tahoe border-white/8"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          defaultValue={settingsData.profile.email}
                          className="bg-tahoe backdrop-blur-tahoe border-white/8"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input 
                          id="timezone" 
                          defaultValue={settingsData.profile.timezone}
                          className="bg-tahoe backdrop-blur-tahoe border-white/8"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Input 
                          id="currency" 
                          defaultValue={settingsData.profile.currency}
                          className="bg-tahoe backdrop-blur-tahoe border-white/8"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button variant="default">Save Changes</Button>
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
                        <Switch defaultChecked={settingsData.notifications.priceAlerts} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Dividend Alerts</p>
                          <p className="text-sm text-muted-foreground">Notifications for upcoming dividend payments</p>
                        </div>
                        <Switch defaultChecked={settingsData.notifications.dividendAlerts} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">IPO Alerts</p>
                          <p className="text-sm text-muted-foreground">Updates on new IPOs and filings</p>
                        </div>
                        <Switch defaultChecked={settingsData.notifications.ipoAlerts} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Market Timing</p>
                          <p className="text-sm text-muted-foreground">Session start/end notifications</p>
                        </div>
                        <Switch defaultChecked={settingsData.notifications.marketTiming} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                        <Switch defaultChecked={settingsData.notifications.emailNotifications} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Browser push notifications</p>
                        </div>
                        <Switch defaultChecked={settingsData.notifications.pushNotifications} />
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
                          <Label htmlFor="theme">Theme</Label>
                          <Input 
                            id="theme" 
                            defaultValue={settingsData.display.theme}
                            className="bg-tahoe backdrop-blur-tahoe border-white/8 mt-2"
                            readOnly
                          />
                        </div>
                        <div>
                          <Label htmlFor="language">Language</Label>
                          <Input 
                            id="language" 
                            defaultValue={settingsData.display.language}
                            className="bg-tahoe backdrop-blur-tahoe border-white/8 mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateFormat">Date Format</Label>
                          <Input 
                            id="dateFormat" 
                            defaultValue={settingsData.display.dateFormat}
                            className="bg-tahoe backdrop-blur-tahoe border-white/8 mt-2"
                          />
                        </div>
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
                          <Switch defaultChecked={settingsData.security.twoFactorAuth} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Login Alerts</p>
                            <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                          </div>
                          <Switch defaultChecked={settingsData.security.loginAlerts} />
                        </div>
                        
                        <div>
                          <Label htmlFor="sessionTimeout">Session Timeout</Label>
                          <Input 
                            id="sessionTimeout" 
                            defaultValue={settingsData.security.sessionTimeout}
                            className="bg-tahoe backdrop-blur-tahoe border-white/8 mt-2"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full">Change Password</Button>
                          <Button variant="outline" className="w-full">Download Account Data</Button>
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
                      <Button variant="outline">Export Portfolio Data</Button>
                      <Button variant="outline">Export Alert History</Button>
                      <Button variant="outline">Export Transaction History</Button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/8">
                      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                        <p className="font-medium text-destructive mb-2">Danger Zone</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          These actions are permanent and cannot be undone.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
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