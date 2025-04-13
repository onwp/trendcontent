import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Settings, CreditCard, Star } from "lucide-react";

const SubscriptionPage = () => {
  const [activeTab, setActiveTab] = useState("plans");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    currentPlan: "Pro",
    nextBillingDate: "May 15, 2023",
    subscriptionStatus: "active",
  };

  // Mock subscription plans
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic features for personal use",
      features: [
        "5 trend searches per day",
        "Basic content generation",
        "1 language",
        "Content library (max 10 items)",
      ],
      isCurrent: user.currentPlan === "Free",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Advanced features for professionals",
      features: [
        "Unlimited trend searches",
        "Advanced content generation",
        "5 languages",
        "Content library (unlimited)",
        "Priority support",
        "API access",
      ],
      isCurrent: user.currentPlan === "Pro",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "Complete solution for teams and businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "All languages",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
      ],
      isCurrent: user.currentPlan === "Enterprise",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Subscription</h2>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <div className="flex items-center gap-2">
              <div className="text-sm text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Current Subscription</CardTitle>
                      <CardDescription>
                        Manage your subscription plan and billing
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {user.subscriptionStatus.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Current Plan
                      </p>
                      <p className="text-xl font-semibold">
                        {user.currentPlan}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Next Billing Date
                      </p>
                      <p className="font-medium">{user.nextBillingDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Cancel Subscription
                      </Button>
                      <Button size="sm">Manage Billing</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
                <TabsTrigger value="history">Billing History</TabsTrigger>
              </TabsList>

              <TabsContent value="plans" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`relative ${plan.popular ? "border-primary" : ""}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-0 right-0 flex justify-center">
                          <Badge className="bg-primary hover:bg-primary">
                            <Star className="h-3 w-3 mr-1 fill-primary-foreground" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="mt-1">
                          <span className="text-3xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            {plan.period}
                          </span>
                        </div>
                        <CardDescription className="mt-2">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {plan.isCurrent ? (
                          <Button variant="outline" className="w-full" disabled>
                            Current Plan
                          </Button>
                        ) : (
                          <Button className="w-full">
                            {plan.price === "$0" ? "Get Started" : "Upgrade"}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View and download your past invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-4 font-medium border-b">
                        <div>Date</div>
                        <div>Invoice</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div></div>
                      </div>
                      <div className="divide-y">
                        {[
                          {
                            date: "Apr 15, 2023",
                            invoice: "INV-2023-041",
                            amount: "$19.00",
                            status: "Paid",
                          },
                          {
                            date: "Mar 15, 2023",
                            invoice: "INV-2023-032",
                            amount: "$19.00",
                            status: "Paid",
                          },
                          {
                            date: "Feb 15, 2023",
                            invoice: "INV-2023-021",
                            amount: "$19.00",
                            status: "Paid",
                          },
                        ].map((invoice, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-5 p-4 text-sm items-center"
                          >
                            <div>{invoice.date}</div>
                            <div>{invoice.invoice}</div>
                            <div>{invoice.amount}</div>
                            <div>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPage;
