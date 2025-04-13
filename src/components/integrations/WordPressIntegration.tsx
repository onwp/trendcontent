import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Workflow, Link2, Settings2, RefreshCw, Check } from "lucide-react";

interface WordPressIntegrationProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onExport?: (data: any) => void;
}

const WordPressIntegration = ({
  onConnect = () => {},
  onDisconnect = () => {},
  onExport = () => {},
}: WordPressIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [postStatus, setPostStatus] = useState("draft");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [exportInProgress, setExportInProgress] = useState(false);

  // Mock content items
  const contentItems = [
    {
      id: "1",
      title: "Top 10 AI Trends in 2023",
      excerpt:
        "Exploring the most significant artificial intelligence trends that are shaping the technology landscape in 2023.",
      date: "2023-06-15",
    },
    {
      id: "2",
      title: "Sustainable Fashion: A Growing Movement",
      excerpt:
        "How sustainable fashion is changing the industry and what consumers need to know about eco-friendly clothing options.",
      date: "2023-05-22",
    },
    {
      id: "3",
      title: "Cryptocurrency Market Analysis",
      excerpt:
        "An in-depth look at the current state of cryptocurrency markets and predictions for future developments.",
      date: "2023-06-01",
    },
  ];

  // Mock WordPress site data
  const wpSiteData = {
    name: "My WordPress Blog",
    url: "https://example.com",
    categories: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Business" },
      { id: 3, name: "Lifestyle" },
      { id: 4, name: "Finance" },
    ],
    tags: [
      { id: 1, name: "AI" },
      { id: 2, name: "Trends" },
      { id: 3, name: "Innovation" },
      { id: 4, name: "Digital" },
      { id: 5, name: "Future" },
    ],
  };

  const handleConnect = () => {
    if (!siteUrl || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsConnecting(true);

    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      onConnect();
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSiteUrl("");
    setUsername("");
    setPassword("");
    onDisconnect();
  };

  const handleContentSelect = (id: string) => {
    setSelectedContent((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleExport = () => {
    if (selectedContent.length === 0) {
      alert("Please select at least one content item to export");
      return;
    }

    setExportInProgress(true);

    // Simulate API call
    setTimeout(() => {
      setExportInProgress(false);
      onExport({
        content: selectedContent,
        status: postStatus,
        categories,
        tags,
      });
      alert(
        `Successfully exported ${selectedContent.length} items to WordPress`,
      );
      setSelectedContent([]);
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Workflow className="h-6 w-6 text-[#21759b]" />
            <div>
              <CardTitle>WordPress Integration</CardTitle>
              <CardDescription>
                Connect and export content to your WordPress site
              </CardDescription>
            </div>
          </div>
          {isConnected && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <Check className="h-3 w-3 mr-1" /> Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-url">WordPress Site URL</Label>
              <Input
                id="site-url"
                placeholder="https://your-wordpress-site.com"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="WordPress username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Application Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="WordPress application password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Generate an application password in your WordPress dashboard
                under Users → Profile → Application Passwords
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Link2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{wpSiteData.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {wpSiteData.url}
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings2 className="h-4 w-4 mr-1" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>WordPress Connection Settings</DialogTitle>
                    <DialogDescription>
                      Manage your WordPress connection settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-url-settings">Site URL</Label>
                      <Input
                        id="site-url-settings"
                        value={wpSiteData.url}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="auto-publish">Auto-Publish</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-publish" />
                        <Label htmlFor="auto-publish" className="text-sm">
                          Automatically publish content to WordPress
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sync-comments">Sync Comments</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="sync-comments" />
                        <Label htmlFor="sync-comments" className="text-sm">
                          Sync comments from WordPress to TrendContent
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Export Content</h3>

              <div className="border rounded-md">
                <div className="p-3 border-b bg-muted font-medium">
                  Select Content to Export
                </div>
                <div className="divide-y">
                  {contentItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3"
                    >
                      <Checkbox
                        id={`content-${item.id}`}
                        checked={selectedContent.includes(item.id)}
                        onCheckedChange={() => handleContentSelect(item.id)}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`content-${item.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {item.title}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {item.excerpt.substring(0, 100)}...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created: {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-status">Post Status</Label>
                  <Select value={postStatus} onValueChange={setPostStatus}>
                    <SelectTrigger id="post-status">
                      <SelectValue placeholder="Select post status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="publish">Publish</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <Select>
                    <SelectTrigger id="categories">
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {wpSiteData.categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Textarea
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  className="h-20"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {wpSiteData.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() =>
                        setTags((prev) =>
                          prev.includes(tag.name)
                            ? prev.filter((t) => t !== tag.name)
                            : [...prev, tag.name],
                        )
                      }
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isConnected ? (
          <Button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect to WordPress"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleExport}
            disabled={selectedContent.length === 0 || exportInProgress}
          >
            {exportInProgress ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              "Export to WordPress"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WordPressIntegration;
