import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, TrendingUp, Globe, Calendar, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface TrendData {
  keyword: string;
  values: number[];
  dates: string[];
  region: string;
  interest: number;
  relatedQueries?: string[];
  relatedTopics?: string[];
}

interface TrendVisualizationProps {
  selectedRegion?: string;
  selectedTimeframe?: string;
  selectedCategory?: string;
  onTrendSelect?: (trend: TrendData) => void;
}

const TrendVisualization: React.FC<TrendVisualizationProps> = ({
  selectedRegion = "US",
  selectedTimeframe = "past7Days",
  selectedCategory = "all",
  onTrendSelect = () => {},
}) => {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<TrendData | null>(null);
  const [viewType, setViewType] = useState("graph");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockData: TrendData[] = [
        {
          keyword: "Artificial Intelligence",
          values: [30, 40, 35, 50, 70, 65, 80],
          dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          region: selectedRegion,
          interest: 80,
          relatedQueries: ["AI tools", "AI for business", "AI news", "ChatGPT"],
          relatedTopics: [
            "Machine Learning",
            "Deep Learning",
            "Neural Networks",
          ],
        },
        {
          keyword: "Climate Change",
          values: [45, 50, 55, 60, 65, 75, 70],
          dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          region: selectedRegion,
          interest: 70,
          relatedQueries: [
            "Climate crisis",
            "Global warming",
            "Climate solutions",
          ],
          relatedTopics: ["Environment", "Sustainability", "Renewable Energy"],
        },
        {
          keyword: "Cryptocurrency",
          values: [60, 55, 65, 70, 60, 50, 55],
          dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          region: selectedRegion,
          interest: 65,
          relatedQueries: ["Bitcoin price", "Ethereum", "Crypto market", "NFT"],
          relatedTopics: [
            "Blockchain",
            "Digital Currency",
            "Decentralized Finance",
          ],
        },
        {
          keyword: "Remote Work",
          values: [40, 45, 50, 45, 55, 40, 35],
          dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          region: selectedRegion,
          interest: 55,
          relatedQueries: [
            "Work from home jobs",
            "Remote work tools",
            "Virtual collaboration",
          ],
          relatedTopics: ["Digital Nomad", "Home Office", "Virtual Meetings"],
        },
        {
          keyword: "Mental Health",
          values: [35, 40, 45, 50, 55, 60, 65],
          dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          region: selectedRegion,
          interest: 60,
          relatedQueries: [
            "Anxiety tips",
            "Depression help",
            "Mental wellness",
            "Therapy",
          ],
          relatedTopics: ["Wellness", "Self-care", "Psychology"],
        },
      ];
      setTrendData(mockData);
      setIsLoading(false);
    }, 1000);
  }, [selectedRegion, selectedTimeframe, selectedCategory]);

  // Format data for chart
  const formatChartData = () => {
    const chartData = [];
    if (trendData.length > 0) {
      for (let i = 0; i < trendData[0].dates.length; i++) {
        const dataPoint: any = { date: trendData[0].dates[i] };
        trendData.forEach((trend) => {
          dataPoint[trend.keyword] = trend.values[i];
        });
        chartData.push(dataPoint);
      }
    }
    return chartData;
  };

  const handleTrendClick = (trend: TrendData) => {
    setSelectedTrend(trend);
    onTrendSelect(trend);
  };

  const getInterestColor = (interest: number) => {
    if (interest >= 75) return "bg-red-500";
    if (interest >= 50) return "bg-orange-500";
    if (interest >= 25) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const chartColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088fe",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">
              Trending Topics
            </CardTitle>
            <CardDescription className="text-gray-500">
              Discover trending topics based on Google Trends data
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="w-[200px]">
              <Tabs value={viewType} onValueChange={setViewType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="graph">Graph</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Region: {selectedRegion}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {selectedTimeframe === "past7Days"
              ? "Past 7 Days"
              : selectedTimeframe}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            Category:{" "}
            {selectedCategory === "all" ? "All Categories" : selectedCategory}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs value={viewType} onValueChange={setViewType} className="w-full">
            <TabsContent value="graph" className="mt-0">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={formatChartData()}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    {trendData.map((trend, index) => (
                      <Area
                        key={trend.keyword}
                        type="monotone"
                        dataKey={trend.keyword}
                        stroke={chartColors[index % chartColors.length]}
                        fill={`${chartColors[index % chartColors.length]}33`}
                        activeDot={{
                          r: 8,
                          onClick: () => handleTrendClick(trend),
                        }}
                        isAnimationActive={true}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {trendData.map((trend, index) => (
                  <motion.div
                    key={trend.keyword}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => handleTrendClick(trend)}
                  >
                    <Card
                      className={`border-l-4 ${getInterestColor(trend.interest)} hover:shadow-lg transition-shadow`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {trend.keyword}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {trend.region}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="font-medium">
                              {trend.interest}%
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            Related Queries:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {trend.relatedQueries?.slice(0, 3).map((query) => (
                              <Badge
                                key={query}
                                variant="secondary"
                                className="text-xs"
                              >
                                {query}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {selectedTrend && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 border rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  {selectedTrend.keyword}
                </h3>
                <p className="text-sm text-gray-600">
                  Interest over time: {selectedTrend.interest}%
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTrendSelect(selectedTrend)}
              >
                Generate Content
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Related Queries</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedTrend.relatedQueries?.map((query) => (
                    <Badge key={query} variant="secondary" className="mb-1">
                      {query}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Related Topics</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedTrend.relatedTopics?.map((topic) => (
                    <Badge key={topic} variant="outline" className="mb-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendVisualization;
