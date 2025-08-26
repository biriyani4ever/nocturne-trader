import { ArrowLeft, Code, Database, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Documentation</h1>
          <p className="text-muted-foreground mt-2">Complete guide to using Zylo trading platform</p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Start Guide
                </CardTitle>
                <CardDescription>
                  Get up and running with Zylo in minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">1. Account Setup</h4>
                    <p className="text-sm text-muted-foreground">
                      Create your account and complete the verification process. Set up your profile 
                      with trading preferences and risk tolerance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">2. Portfolio Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Add your existing holdings or start fresh. Configure your preferred markets 
                      and asset classes for tracking.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">3. Alert System</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up custom alerts for price movements, volume changes, and technical indicators 
                      to stay informed about market opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">4. Dashboard Customization</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize your dashboard layout, choose your preferred charts, and set up 
                      watchlists for easy monitoring.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Management</CardTitle>
                  <CardDescription>
                    Track and analyze your investment portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Real-time portfolio valuation</li>
                    <li>• Performance analytics and metrics</li>
                    <li>• Asset allocation visualization</li>
                    <li>• Historical performance tracking</li>
                    <li>• Risk assessment tools</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                  <CardDescription>
                    Advanced tools for market research
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Technical indicator analysis</li>
                    <li>• Market sentiment tracking</li>
                    <li>• Economic calendar integration</li>
                    <li>• Sector performance comparison</li>
                    <li>• Custom screening tools</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert System</CardTitle>
                  <CardDescription>
                    Stay informed with intelligent notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Price movement alerts</li>
                    <li>• Volume spike notifications</li>
                    <li>• Technical pattern recognition</li>
                    <li>• News and earnings alerts</li>
                    <li>• Custom condition triggers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <CardDescription>
                    Export your data for external analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Portfolio data in PDF format</li>
                    <li>• Transaction history export</li>
                    <li>• Alert history reports</li>
                    <li>• Performance analytics</li>
                    <li>• Custom report generation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API Integration
                </CardTitle>
                <CardDescription>
                  Connect external applications with Zylo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    All API requests require authentication using JWT tokens.
                  </p>
                  <code className="bg-muted p-2 rounded text-xs block">
                    Authorization: Bearer your_jwt_token
                  </code>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Base URL</h4>
                  <code className="bg-muted p-2 rounded text-xs block">
                    https://api.zylo.com/v1/
                  </code>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Rate Limits</h4>
                  <p className="text-sm text-muted-foreground">
                    API requests are limited to 1000 requests per hour per user.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Features
                </CardTitle>
                <CardDescription>
                  How we protect your data and trading activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Data Encryption</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AES-256 encryption at rest</li>
                      <li>• TLS 1.3 for data in transit</li>
                      <li>• End-to-end encryption</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Access Control</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Multi-factor authentication</li>
                      <li>• Role-based permissions</li>
                      <li>• Session management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Monitoring</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 24/7 security monitoring</li>
                      <li>• Anomaly detection</li>
                      <li>• Audit logging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Compliance</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SOC 2 Type II certified</li>
                      <li>• GDPR compliant</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;