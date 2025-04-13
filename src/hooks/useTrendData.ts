import { useState, useEffect } from "react";
import { getGoogleTrends } from "@shaivpidadi/trends-js";

export interface TrendData {
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

interface UseTrendDataOptions {
  region?: string;
  language?: string;
  category?: string;
  autoFetch?: boolean;
}

export const useTrendData = ({
  region = "US",
  language = "en",
  category = "all",
  autoFetch = true,
}: UseTrendDataOptions = {}) => {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  // Function to fetch trends data
  const fetchTrends = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getGoogleTrends({
        country: region,
        language: language,
        category: category === "all" ? undefined : category,
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
              region: region,
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
        setLastFetched(new Date());
      } else {
        setTrendData([]);
        setError("No trends data available for the selected criteria.");
      }
    } catch (err) {
      console.error("Error fetching trends:", err);
      setError("Failed to fetch trends data. Please try again later.");
      // Fallback to mock data if API fails
      setTrendData(generateMockTrendData(region));
      setTimeSeriesData(generateMockTimeSeriesData());
      setRegionalData(generateMockRegionalData());
      setLastFetched(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock data for fallback
  const generateMockTrendData = (selectedRegion: string): TrendData[] => [
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

  // Check if we should fetch data daily
  useEffect(() => {
    const shouldFetchDaily = () => {
      if (!lastFetched) return true;

      const now = new Date();
      const lastFetchDate = new Date(lastFetched);

      // Check if the last fetch was on a different day
      return (
        now.getDate() !== lastFetchDate.getDate() ||
        now.getMonth() !== lastFetchDate.getMonth() ||
        now.getFullYear() !== lastFetchDate.getFullYear()
      );
    };

    // Fetch on mount if autoFetch is true
    if (autoFetch) {
      fetchTrends();
    }

    // Set up daily fetch check
    const checkInterval = setInterval(() => {
      if (shouldFetchDaily()) {
        fetchTrends();
      }
    }, 3600000); // Check every hour

    return () => clearInterval(checkInterval);
  }, [region, language, category, autoFetch]);

  return {
    trendData,
    timeSeriesData,
    regionalData,
    isLoading,
    error,
    fetchTrends,
    lastFetched,
  };
};
