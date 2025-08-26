import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CookiesPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Cookies Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit our website. They are widely used to make websites work more efficiently and provide 
              information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">How We Use Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies to enhance your trading experience, remember your preferences, 
              keep you signed in, and analyze how you use our platform to improve our services.
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Essential cookies for platform functionality</li>
              <li>Authentication cookies to keep you logged in</li>
              <li>Preference cookies to remember your settings</li>
              <li>Analytics cookies to improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control and manage cookies in your browser settings. However, please note that 
              disabling certain cookies may affect the functionality of our trading platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us at 
              anirban_ua2503aih38@iitp.ac.in.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;