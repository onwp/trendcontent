import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  TrendingUp,
  Globe,
  Filter,
  Loader2,
} from "lucide-react";
import { getGoogleTrends } from "@shaivpidadi/trends-js";

interface TrendData {
  keyword: string;
  value: number;
  relatedQueries: string[];
  region: string;
}

interface GoogleTrendItem {
  title: string;
  formattedTraffic: string;
  relatedQueries?: string[];
  articles?: {
    title: string;
    timeAgo: string;
    source: string;
    url: string;
    snippet: string;
  }[];
}

interface TrendDiscoveryPanelProps {
  onSelectTrend?: (trend: TrendData) => void;
}

const TrendDiscoveryPanel = ({
  onSelectTrend = () => {},
}: TrendDiscoveryPanelProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("US");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<string>("past7days");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<any[]>([]);

  // Function to fetch trends data
  const fetchTrends = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getGoogleTrends({
        country: selectedRegion,
        language: selectedLanguage,
        category: selectedCategory === "all" ? undefined : selectedCategory,
        // The package doesn't support timeframe directly, but we can handle this in a future enhancement
      });

      if (response && response.length > 0) {
        // Transform the data to match our TrendData interface
        const transformedData: TrendData[] = response.map(
          (item: GoogleTrendItem, index: number) => {
            // Extract numeric value from formattedTraffic (e.g., "100K+" -> 100000)
            const trafficValue =
              parseInt(item.formattedTraffic.replace(/[^0-9]/g, "")) ||
              100 - index * 10;

            return {
              keyword: item.title,
              value: trafficValue,
              relatedQueries: item.relatedQueries || [],
              region: selectedRegion,
            };
          },
        );

        setTrendData(transformedData);

        // Generate time series data based on the top trends
        const topTrends = transformedData
          .slice(0, 3)
          .map((item) => item.keyword);
        const newTimeSeriesData = generateTimeSeriesData(topTrends);
        setTimeSeriesData(newTimeSeriesData);

        // Generate regional data
        const newRegionalData = generateRegionalData(
          transformedData[0].keyword,
        );
        setRegionalData(newRegionalData);
      } else {
        setTrendData([]);
        setError("No trends data available for the selected criteria.");
      }
    } catch (err) {
      console.error("Error fetching trends:", err);
      setError("Failed to fetch trends data. Please try again later.");
      // Fallback to mock data if API fails
      setTrendData(generateMockTrendData());
      setTimeSeriesData(generateMockTimeSeriesData());
      setRegionalData(generateMockRegionalData());
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock data for fallback
  const generateMockTrendData = (): TrendData[] => [
    {
      keyword: "Artificial Intelligence",
      value: 100,
      relatedQueries: ["AI tools", "AI news", "AI development"],
      region: selectedRegion,
    },
    {
      keyword: "Machine Learning",
      value: 85,
      relatedQueries: ["ML algorithms", "ML courses", "ML frameworks"],
      region: selectedRegion,
    },
    {
      keyword: "Data Science",
      value: 75,
      relatedQueries: ["Data analysis", "Big data", "Data visualization"],
      region: selectedRegion,
    },
    {
      keyword: "Blockchain",
      value: 65,
      relatedQueries: ["Cryptocurrency", "NFTs", "Web3"],
      region: selectedRegion,
    },
    {
      keyword: "Metaverse",
      value: 60,
      relatedQueries: [
        "Virtual reality",
        "Augmented reality",
        "Digital worlds",
      ],
      region: selectedRegion,
    },
  ];

  // Generate time series data based on trend keywords
  const generateTimeSeriesData = (trendKeywords: string[]) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    return months.map((month, i) => {
      const dataPoint: any = { name: month };
      trendKeywords.forEach((keyword, j) => {
        // Generate increasing values for each trend
        const baseValue = 20 + j * 10;
        const growth = i * (10 - j * 2);
        dataPoint[keyword] = baseValue + growth;
      });
      return dataPoint;
    });
  };

  const generateMockTimeSeriesData = () => {
    return [
      {
        name: "Jan",
        "Artificial Intelligence": 40,
        "Machine Learning": 30,
        "Data Science": 20,
      },
      {
        name: "Feb",
        "Artificial Intelligence": 45,
        "Machine Learning": 35,
        "Data Science": 25,
      },
      {
        name: "Mar",
        "Artificial Intelligence": 55,
        "Machine Learning": 40,
        "Data Science": 30,
      },
      {
        name: "Apr",
        "Artificial Intelligence": 60,
        "Machine Learning": 45,
        "Data Science": 35,
      },
      {
        name: "May",
        "Artificial Intelligence": 75,
        "Machine Learning": 55,
        "Data Science": 40,
      },
      {
        name: "Jun",
        "Artificial Intelligence": 85,
        "Machine Learning": 65,
        "Data Science": 50,
      },
      {
        name: "Jul",
        "Artificial Intelligence": 100,
        "Machine Learning": 85,
        "Data Science": 75,
      },
    ];
  };

  // Generate regional data for a specific trend
  const generateRegionalData = (trendKeyword: string) => {
    const regions = [
      { name: "USA", value: Math.floor(Math.random() * 30) + 70 },
      { name: "UK", value: Math.floor(Math.random() * 30) + 50 },
      { name: "Canada", value: Math.floor(Math.random() * 30) + 45 },
      { name: "Australia", value: Math.floor(Math.random() * 30) + 40 },
      { name: "Germany", value: Math.floor(Math.random() * 30) + 35 },
      { name: "France", value: Math.floor(Math.random() * 30) + 30 },
      { name: "Japan", value: Math.floor(Math.random() * 30) + 25 },
      { name: "India", value: Math.floor(Math.random() * 30) + 20 },
    ];
    return regions;
  };

  const generateMockRegionalData = () => [
    { name: "USA", value: 100 },
    { name: "UK", value: 80 },
    { name: "Canada", value: 75 },
    { name: "Australia", value: 70 },
    { name: "Germany", value: 65 },
    { name: "France", value: 60 },
    { name: "Japan", value: 55 },
    { name: "India", value: 50 },
  ];

  // Fetch trends when component mounts or when filters change
  useEffect(() => {
    fetchTrends();
  }, [selectedRegion, selectedLanguage, selectedCategory]);

  const regions = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "GB" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Japan", value: "JP" },
    { label: "India", value: "IN" },
  ];

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Japanese", value: "ja" },
    { label: "Chinese", value: "zh" },
    { label: "Hindi", value: "hi" },
    { label: "Arabic", value: "ar" },
  ];

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Business", value: "business" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Health", value: "health" },
    { label: "Science & Tech", value: "sci_tech" },
    { label: "Sports", value: "sports" },
    { label: "Top Stories", value: "top_stories" },
  ];

  const timeframes = [
    { label: "Past 24 hours", value: "past24h" },
    { label: "Past 7 days", value: "past7days" },
    { label: "Past 30 days", value: "past30days" },
    { label: "Past 90 days", value: "past90days" },
    { label: "Past 12 months", value: "past12months" },
    { label: "Custom Range", value: "custom" },
  ];

  const handleTrendSelect = (trend: TrendData) => {
    onSelectTrend(trend);
  };

  const handleRefresh = () => {
    fetchTrends();
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-6 w-6" />
            Trend Discovery
          </h2>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trends..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Filter className="mr-2 h-4 w-4" />
                  Refresh Trends
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium flex items-center mb-1">
              <Globe className="mr-1 h-4 w-4" />
              Region
            </label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Language</label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Timeframe</label>
            <Select
              value={selectedTimeframe}
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedTimeframe === "custom" && (
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <Tabs defaultValue="trends">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="trends">Top Trends</TabsTrigger>
            <TabsTrigger value="timeseries">Time Series</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading trends data...</span>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-64 text-destructive">
                    <p>{error}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trendData.map((trend, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleTrendSelect(trend)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{trend.keyword}</h3>
                              <p className="text-sm text-muted-foreground">
                                {trend.relatedQueries &&
                                trend.relatedQueries.length > 0 ? (
                                  <>
                                    Related:{" "}
                                    {trend.relatedQueries
                                      .slice(0, 3)
                                      .join(", ")}
                                  </>
                                ) : (
                                  "No related queries available"
                                )}
                              </p>
                            </div>
                            <div className="text-xl font-bold">
                              {trend.value}
                            </div>
                          </div>
                          <Button
                            className="w-full mt-2"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTrendSelect(trend);
                            }}
                          >
                            Generate Content
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeseries">
            <Card>
              <CardHeader>
                <CardTitle>Trend Evolution Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timeSeriesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {trendData.slice(0, 3).map((trend, index) => {
                        const colors = ["#8884d8", "#82ca9d", "#ffc658"];
                        return (
                          <Area
                            key={index}
                            type="monotone"
                            dataKey={trend.keyword}
                            stackId="1"
                            stroke={colors[index % colors.length]}
                            fill={colors[index % colors.length]}
                          />
                        );
                      })}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional">
            <Card>
              <CardHeader>
                <CardTitle>Regional Interest Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionalData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="value"
                        fill="#8884d8"
                        name="Interest Score"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrendDiscoveryPanel;
