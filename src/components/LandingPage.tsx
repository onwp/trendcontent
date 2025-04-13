import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  FileText,
  LayoutGrid,
  Globe,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import PricingSection from "./LandingPage/PricingSection";
import FAQSection from "./LandingPage/FAQSection";
import LandingPageTrendPanel from "./LandingPageTrendPanel";

const LandingPage = () => {
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
            <h1 className="text-xl font-bold">TrendContent</h1>
            <div className="hidden md:flex items-center gap-4">
              <a href="#pricing">
                <Button variant="ghost">Pricing</Button>
              </a>
              <a href="#demo">
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
              <a href="#pricing" className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  Pricing
                </Button>
              </a>
              <a href="#demo" className="py-2">
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Trending Content with AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Leverage real-time Google Trends data to generate SEO-optimized
            content that resonates with your audience.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trend Discovery</h3>
              <p className="text-muted-foreground">
                Explore trending topics across multiple regions and languages
                with interactive visualizations and filters.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI Content Generation
              </h3>
              <p className="text-muted-foreground">
                Generate high-quality content with customizable AI models, tone
                controls, and one-click generation based on trends.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Library</h3>
              <p className="text-muted-foreground">
                Save, organize, and edit your generated content with powerful
                tagging and search functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Topics Section */}
      <section id="demo" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <TrendingUp className="mr-2 h-8 w-8 text-primary" />
            Today's Trending Topics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-center">
            See what's trending right now and get inspired for your next content
            piece. Our platform automatically updates these trends daily.
          </p>
          <LandingPageTrendPanel maxTrends={6} showRefreshButton={false} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to create trending content?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of content creators who are leveraging AI and Google
            Trends to stay ahead of the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Sign up for free</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

export default LandingPage;
