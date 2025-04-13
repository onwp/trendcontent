import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

interface PricingTier {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    monthlyPrice: "$0",
    annualPrice: "$0",
    description: "Perfect for trying out TrendContent",
    features: [
      "5 trend searches per day",
      "3 AI-generated content pieces per month",
      "Basic content library",
      "Single language support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    monthlyPrice: "$9",
    annualPrice: "$90",
    description: "Ideal for content creators and small businesses",
    features: [
      "50 trend searches per day",
      "50 AI-generated content pieces per month",
      "Advanced content library with tagging",
      "Multi-language support (5 languages)",
      "WordPress integration",
      "Email support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Business",
    monthlyPrice: "$29",
    annualPrice: "$290",
    description: "For teams and growing businesses",
    features: [
      "Unlimited trend searches",
      "200 AI-generated content pieces per month",
      "Advanced content library with tagging",
      "Multi-language support (all languages)",
      "All integrations (WordPress, social media)",
      "Priority support",
      "Team collaboration features",
    ],
    cta: "Get Started",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that's right for you and start creating trending
            content today.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className={`text-sm font-medium ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              aria-label="Toggle annual billing"
            />
            <span
              className={`text-sm font-medium ${isAnnual ? "text-primary" : "text-muted-foreground"}`}
            >
              Annual{" "}
              <span className="bg-primary/10 text-primary text-xs py-0.5 px-2 rounded-full ml-1">
                2 months free
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl shadow-sm border p-8 flex flex-col h-full relative ${tier.popular ? "border-primary" : "border-border"}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">
                    {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {isAnnual ? "/year" : "/month"}
                  </span>
                </div>
                {isAnnual && tier.name !== "Free" && (
                  <p className="text-xs text-primary mt-1">
                    Save 2 months with annual billing
                  </p>
                )}
                <p className="mt-3 text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-3 my-6 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className="mt-auto">
                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
