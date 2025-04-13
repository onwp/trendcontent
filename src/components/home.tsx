import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutGrid,
  LineChart,
  FileText,
  Settings,
  LogOut,
  User,
  CreditCard,
  Receipt,
} from "lucide-react";
import TrendDiscoveryPanel from "./TrendDiscoveryPanel";
import ContentGenerationPanel from "./ContentGenerationPanel";
import ContentLibrary from "./ContentLibrary";
import ProfilePage from "./ProfilePage";
import SubscriptionPage from "./SubscriptionPage";
import BillingPage from "./BillingPage";
import SettingsPage from "./SettingsPage";
import { TrendData } from "@/hooks/useTrendData";

const Home = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [selectedTrend, setSelectedTrend] = useState<TrendData | null>(null);
  const [savedContent, setSavedContent] = useState<any[]>([]);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  };

  const handleTrendSelect = (trend: TrendData) => {
    setSelectedTrend(trend);
    setActiveTab("generate");
  };

  const handleSaveContent = (content: any) => {
    setSavedContent((prev) => [content, ...prev]);
    setActiveTab("library");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <LineChart className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">TrendContent</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant={activeTab === "trends" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("trends")}
          >
            <LineChart className="mr-2 h-4 w-4" />
            Trend Discovery
          </Button>
          <Button
            variant={activeTab === "generate" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("generate")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Content Generation
          </Button>
          <Button
            variant={activeTab === "library" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("library")}
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Content Library
          </Button>
        </nav>

        <div className="mt-auto pt-4 border-t space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("subscription")}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Subscription
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("billing")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">
            {activeTab === "trends" && "Trend Discovery"}
            {activeTab === "generate" && "Content Generation"}
            {activeTab === "library" && "Content Library"}
            {activeTab === "profile" && "Profile"}
            {activeTab === "subscription" && "Subscription"}
            {activeTab === "billing" && "Billing"}
            {activeTab === "settings" && "Settings"}
          </h2>

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
          {activeTab === "trends" && (
            <TrendDiscoveryPanel onSelectTrend={handleTrendSelect} />
          )}
          {activeTab === "generate" && (
            <ContentGenerationPanel
              selectedTrend={selectedTrend?.keyword}
              onSaveContent={handleSaveContent}
            />
          )}
          {activeTab === "library" && (
            <ContentLibrary initialContent={savedContent} />
          )}
          {activeTab === "profile" && <ProfilePage />}
          {activeTab === "subscription" && <SubscriptionPage />}
          {activeTab === "billing" && <BillingPage />}
          {activeTab === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default Home;
