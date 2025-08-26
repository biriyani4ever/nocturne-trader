import { Github, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">About</h3>
            <p className="text-sm text-black/80 leading-relaxed">
              Zylo is a comprehensive trading platform designed to help investors make informed decisions through real-time market analysis, portfolio management, and intelligent alerts.
            </p>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-black/80 hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-black/80 hover:text-black transition-colors">
                Cookies Policy
              </a>
              <a href="#" className="block text-sm text-black/80 hover:text-black transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-black/80 hover:text-black transition-colors">
                FAQ
              </a>
              <a href="#" className="block text-sm text-black/80 hover:text-black transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-sm text-black/80 hover:text-black transition-colors">
                Documentation
              </a>
            </div>
          </div>

          {/* Contact & Connect Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Contact & Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-black/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+916909473633" className="hover:text-black transition-colors">
                  +91-6909473633
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-black/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:anirban_ua2503aih38@iitp.ac.in" className="hover:text-black transition-colors">
                  anirban_ua2503aih38@iitp.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-black/80">
                <Github className="h-4 w-4" />
                <a 
                  href="https://github.com/Zylo-1-0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Connect & Contribute
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/80">
            © {new Date().getFullYear()} Zylo. All rights reserved.
          </p>
          <p className="text-sm text-black/80">
            Built with precision for traders and investors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;