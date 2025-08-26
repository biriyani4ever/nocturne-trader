import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Zylo trading platform, you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to abide by these terms, 
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Use License</h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily access Zylo for personal, non-commercial transitory 
              viewing only. This is the grant of a license, not a transfer of title, and under this license 
              you may not modify or copy the materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Trading Risks</h2>
            <p className="text-muted-foreground">
              Trading involves substantial risk and is not suitable for all investors. Past performance 
              does not guarantee future results. You should carefully consider your financial situation 
              and risk tolerance before making any trading decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Zylo shall not be liable for any damages arising out of the use or inability to use 
              the platform, including but not limited to direct, indirect, incidental, punitive, 
              and consequential damages.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;