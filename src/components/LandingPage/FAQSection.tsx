import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is TrendContent?",
    answer:
      "TrendContent is a SaaS platform that leverages real-time Google Trends data to help content creators generate SEO-optimized content across multiple languages and regions. It combines trend discovery with AI-powered content generation to help you create relevant, timely content that resonates with your audience.",
  },
  {
    question: "How does the trend discovery feature work?",
    answer:
      "Our trend discovery dashboard uses the Google Trends API to provide you with real-time data on trending topics across different regions and languages. You can filter trends by timeframe, category, country/region, and language to find the most relevant topics for your content strategy.",
  },
  {
    question: "Which AI models are available for content generation?",
    answer:
      "TrendContent supports multiple AI models including OpenAI (GPT-4), Google Gemini, and Perplexity. You can select your preferred model based on your specific content needs and quality requirements.",
  },
  {
    question: "Can I translate my content to other languages?",
    answer:
      "Yes! TrendContent offers multi-language support with translation preview and region-specific SEO recommendations. This allows you to create content that resonates with audiences in different countries and languages.",
  },
  {
    question: "Does TrendContent integrate with WordPress?",
    answer:
      "Absolutely. TrendContent offers integration options for WordPress, various social media platforms, and content calendars via API/webhooks. This makes it easy to publish your generated content directly to your preferred platform.",
  },
  {
    question: "How do I get started with TrendContent?",
    answer:
      "Getting started is easy! Simply sign up for our Free tier to explore basic features, or choose one of our paid plans for full access to all features. You can upgrade or downgrade your plan at any time based on your needs.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about TrendContent and how it can help
            you create better content.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
