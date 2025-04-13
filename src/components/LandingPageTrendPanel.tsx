import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Loader2, ExternalLink, BarChart3 } from "lucide-react";
import { useTrendData, TrendData } from "@/hooks/useTrendData";

interface LandingPageTrendPanelProps {
  maxTrends?: number;
  showRefreshButton?: boolean;
}

const LandingPageTrendPanel = ({
  maxTrends = 5,
  showRefreshButton = true,
}: LandingPageTrendPanelProps) => {
  const { trendData, isLoading, error, fetchTrends, lastFetched } =
    useTrendData({
      region: "US",
      language: "en",
      category: "all",
      autoFetch: true,
    });

  const displayTrends = trendData.slice(0, maxTrends);

  return (
    <div className="w-full bg-card p-6 rounded-lg shadow-md border border-muted">
      <div className="flex flex-col space-y-6">
        {/* Feature Showcase Banner */}
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Real-time Trend Discovery
              </h3>
              <p className="text-sm text-muted-foreground">
                TrendContent automatically tracks and analyzes trending topics
                across multiple regions and languages. Use these insights to
                create content that resonates with your audience right when
                they're searching for it.
              </p>
              <div className="mt-2">
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm font-medium flex items-center"
                  asChild
                >
                  <a href="#features">
                    Learn more about our trend features{" "}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Trending Topics
          </h2>
          {showRefreshButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchTrends()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Refresh Trends"
              )}
            </Button>
          )}
        </div>

        {lastFetched && (
          <p className="text-sm text-muted-foreground">
            Last updated: {lastFetched.toLocaleString()}
          </p>
        )}

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle>Top Trending Topics</CardTitle>
            <CardDescription>
              These are the topics people are searching for right now. With
              TrendContent, you can generate optimized content for any of these
              trends in just a few clicks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading trends data...</span>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-32 text-destructive">
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayTrends.map((trend, index) => (
                  <Card
                    key={index}
                    className="hover:bg-accent/50 transition-colors border-primary/10 hover:border-primary/30"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-primary">
                            {trend.keyword}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {trend.relatedQueries &&
                            trend.relatedQueries.length > 0 ? (
                              <>
                                Related:{" "}
                                {trend.relatedQueries.slice(0, 2).join(", ")}
                              </>
                            ) : (
                              "No related queries available"
                            )}
                          </p>
                        </div>
                        <div className="text-xl font-bold bg-primary/10 px-2 py-1 rounded-md text-primary">
                          {trend.value}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            Sign up today to unlock the full power of trend-based content
            generation
          </p>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Start Creating Trending Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageTrendPanel;
