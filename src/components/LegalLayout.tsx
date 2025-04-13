import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LineChart, Menu, X } from "lucide-react";

interface LegalLayoutProps {
  children: ReactNode;
}

const LegalLayout = ({ children }: LegalLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <LineChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <Link to="/" className="text-xl font-bold">
              TrendContent
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <a href="/#pricing">
                <Button variant="ghost">Pricing</Button>
              </a>
              <a href="/#demo">
                <Button variant="ghost">Demo</Button>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-2 pb-4 border-t">
            <div className="flex flex-col space-y-2">
              <a href="/#pricing" className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  Pricing
                </Button>
              </a>
              <a href="/#demo" className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  Demo
                </Button>
              </a>
              <div className="border-t my-2"></div>
              <Link to="/login" className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="py-2">
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-card py-10 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <LineChart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">TrendContent</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex gap-4 mb-2 md:mb-0">
                <Link
                  to="/terms-of-service"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} TrendContent. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalLayout;
