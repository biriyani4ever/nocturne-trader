import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I get started with Zylo?",
      answer: "Simply create an account, complete your profile setup, and start exploring our trading dashboard. You can begin by adding your portfolio and setting up alerts for your preferred stocks."
    },
    {
      question: "Is my trading data secure?",
      answer: "Yes, we use bank-level encryption and security measures to protect all your data. Your information is encrypted both in transit and at rest, and we never share your trading data with third parties."
    },
    {
      question: "How do trading alerts work?",
      answer: "You can set custom alerts based on price movements, volume changes, or technical indicators. When your conditions are met, you'll receive instant notifications via email or in-app alerts."
    },
    {
      question: "Can I export my trading data?",
      answer: "Yes, you can export your portfolio data, alert history, and transaction history in PDF format from the Settings page under Data Management."
    },
    {
      question: "What markets does Zylo support?",
      answer: "Zylo supports major global markets including US stocks, Indian markets (NSE/BSE), and popular cryptocurrencies. We're continuously adding support for more markets."
    },
    {
      question: "How accurate are the market predictions?",
      answer: "Our algorithms use advanced technical analysis and machine learning, but remember that all trading involves risk. Past performance doesn't guarantee future results. Always do your own research."
    },
    {
      question: "Can I use Zylo on mobile devices?",
      answer: "Yes, Zylo is fully responsive and works seamlessly on all devices including smartphones and tablets through your web browser."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team at anirban_ua2503aih38@iitp.ac.in or call us at +91-6909473633. We typically respond within 24 hours."
    }
  ];

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
          <h1 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">Find answers to common questions about Zylo</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <a href="mailto:anirban_ua2503aih38@iitp.ac.in">
                Email Support
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+916909473633">
                Call Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;