import React, { useState } from "react";
import {
  Search,
  Filter,
  FolderPlus,
  Tag,
  Trash2,
  Edit,
  Download,
  Grid,
  List,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  language: string;
  region: string;
}

const ContentLibrary = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Mock data for content items
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Top 10 AI Trends in 2023",
      excerpt:
        "Exploring the most significant artificial intelligence trends that are shaping the technology landscape in 2023.",
      date: "2023-06-15",
      tags: ["AI", "Technology", "Trends"],
      language: "English",
      region: "United States",
    },
    {
      id: "2",
      title: "Sustainable Fashion: A Growing Movement",
      excerpt:
        "How sustainable fashion is changing the industry and what consumers need to know about eco-friendly clothing options.",
      date: "2023-05-22",
      tags: ["Fashion", "Sustainability", "Trends"],
      language: "English",
      region: "Global",
    },
    {
      id: "3",
      title: "Cryptocurrency Market Analysis",
      excerpt:
        "An in-depth look at the current state of cryptocurrency markets and predictions for future developments.",
      date: "2023-06-01",
      tags: ["Cryptocurrency", "Finance", "Bitcoin"],
      language: "English",
      region: "Global",
    },
    {
      id: "4",
      title: "Healthy Summer Recipes",
      excerpt:
        "Collection of nutritious and refreshing recipes perfect for the summer season.",
      date: "2023-06-10",
      tags: ["Food", "Health", "Recipes"],
      language: "English",
      region: "United States",
    },
    {
      id: "5",
      title: "Remote Work Best Practices",
      excerpt:
        "Tips and strategies for maximizing productivity and maintaining work-life balance in remote work environments.",
      date: "2023-05-15",
      tags: ["Work", "Productivity", "Remote"],
      language: "English",
      region: "Global",
    },
    {
      id: "6",
      title: "Gaming Industry Innovations",
      excerpt:
        "Recent technological advancements and trends shaping the future of the gaming industry.",
      date: "2023-06-05",
      tags: ["Gaming", "Technology", "Entertainment"],
      language: "English",
      region: "Global",
    },
  ];

  // All unique tags from content items
  const allTags = Array.from(
    new Set(contentItems.flatMap((item) => item.tags)),
  );

  // Filter content items based on search query and active tag
  const filteredItems = contentItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = activeTag === null || item.tags.includes(activeTag);

    return matchesSearch && matchesTag;
  });

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Content Library</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical (Z-A)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FolderPlus className="h-4 w-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    Enter a name for your new folder to organize your content.
                  </DialogDescription>
                </DialogHeader>
                <Input placeholder="Folder name" className="my-4" />
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Folder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No content items found. Try adjusting your search or filters.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      <span>
                        {item.language} • {item.region}
                      </span>
                    </CardFooter>
                    <div className="flex border-t p-2 justify-end space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Tag className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                          <span>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{item.language}</span>
                          <span>•</span>
                          <span>{item.region}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Tag className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="articles">
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                Article content will be displayed here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                Social media content will be displayed here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="drafts">
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                Draft content will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentLibrary;
