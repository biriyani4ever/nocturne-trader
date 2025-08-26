import { ArrowLeft, BookOpen, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HelpCenter = () => {
  const navigate = useNavigate();

  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn how to set up your account and start trading",
      icon: BookOpen
    },
    {
      title: "Portfolio Management",
      description: "Tips for managing and tracking your investments",
      icon: BookOpen
    },
    {
      title: "Setting Up Alerts",
      description: "Configure notifications for market movements",
      icon: BookOpen
    },
    {
      title: "Market Analysis",
      description: "Understanding our analysis tools and indicators",
      icon: BookOpen
    }
  ];

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
          <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground mt-2">Get the help you need to make the most of Zylo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <topic.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Quick Support
              </CardTitle>
              <CardDescription>
                Get immediate help with common issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Common Issues:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Login and authentication problems</li>
                  <li>• Setting up trading alerts</li>
                  <li>• Exporting portfolio data</li>
                  <li>• Market data synchronization</li>
                </ul>
              </div>
              <Button className="w-full" onClick={() => navigate("/faq")}>
                View FAQ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Reach out to our support team directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href="tel:+916909473633" className="text-primary hover:underline">
                    +91-6909473633
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:anirban_ua2503aih38@iitp.ac.in" className="text-primary hover:underline">
                    anirban_ua2503aih38@iitp.ac.in
                  </a>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Support Hours:</p>
                <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Response time: Within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Trading Resources</CardTitle>
              <CardDescription>
                Educational materials to improve your trading knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Beginner Guides</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Understanding market basics</li>
                    <li>• Risk management strategies</li>
                    <li>• Technical analysis primer</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Advanced Topics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Options trading strategies</li>
                    <li>• Portfolio optimization</li>
                    <li>• Market timing techniques</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Platform Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Advanced charting tools</li>
                    <li>• Custom alert systems</li>
                    <li>• Data export options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;