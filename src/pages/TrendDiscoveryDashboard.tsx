import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Filter, RefreshCw } from "lucide-react";
import TrendVisualization from "@/components/TrendVisualization";
import ContentGenerator from "@/components/ContentGenerator";
import ContentLibraryManager from "@/components/ContentLibraryManager";

const TrendDiscoveryDashboard = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [region, setRegion] = useState("us");
  const [category, setCategory] = useState("all");
  const [timeframe, setTimeframe] = useState("past7days");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  // Mock data for demonstration purposes
  const regions = [
    { value: "us", label: "United States" },
    { value: "gb", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "business", label: "Business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science & Technology" },
    { value: "sports", label: "Sports" },
    { value: "politics", label: "Politics" },
  ];

  const timeframes = [
    { value: "past24h", label: "Past 24 Hours" },
    { value: "past7days", label: "Past 7 Days" },
    { value: "past30days", label: "Past 30 Days" },
    { value: "past90days", label: "Past 90 Days" },
    { value: "past12months", label: "Past 12 Months" },
    { value: "custom", label: "Custom Date Range" },
  ];

  const handleTrendSelect = (trend: string) => {
    setSelectedTrend(trend);
    setActiveTab("generate");
  };

  const refreshTrends = () => {
    // This would trigger a refresh of the trend data
    console.log("Refreshing trends with filters:", {
      region,
      category,
      timeframe,
      date,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">
              Google Trends Content Generator
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Settings</Button>
            <Button variant="ghost">Help</Button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-medium">JD</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="trends">Trend Discovery</TabsTrigger>
              <TabsTrigger value="generate">Content Generator</TabsTrigger>
              <TabsTrigger value="library">Content Library</TabsTrigger>
            </TabsList>

            {activeTab === "trends" && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={refreshTrends}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            )}
          </div>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trend Discovery Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="w-full md:w-auto">
                    <label className="text-sm font-medium mb-1 block">
                      Region
                    </label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="text-sm font-medium mb-1 block">
                      Category
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <label className="text-sm font-medium mb-1 block">
                      Timeframe
                    </label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeframes.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {timeframe === "custom" && (
                    <div className="w-full md:w-auto">
                      <label className="text-sm font-medium mb-1 block">
                        Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[200px] justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}

                  <div className="w-full md:w-auto flex items-end">
                    <Button onClick={refreshTrends}>
                      <Filter className="h-4 w-4 mr-2" />
                      Apply Filters
                    </Button>
                  </div>
                </div>

                <TrendVisualization
                  region={region}
                  category={category}
                  timeframe={timeframe}
                  date={date}
                  onTrendSelect={handleTrendSelect}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate">
            <ContentGenerator selectedTrend={selectedTrend} />
          </TabsContent>

          <TabsContent value="library">
            <ContentLibraryManager />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-4">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2023 Google Trends Content Generator. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrendDiscoveryDashboard;
