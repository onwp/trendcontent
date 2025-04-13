import React, { useState } from "react";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Tag,
  Trash2,
  Edit,
  Share,
  Download,
  MoreHorizontal,
  Folder,
  FolderPlus,
} from "lucide-react";
import { motion } from "framer-motion";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
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
import { Separator } from "./ui/separator";

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  dateCreated: string;
  tags: string[];
  language: string;
  wordCount: number;
  status: "draft" | "published" | "scheduled";
  trend?: string;
}

const ContentLibraryManager = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dateDesc");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);

  // Mock data for content items
  const mockContentItems: ContentItem[] = [
    {
      id: "1",
      title: "The Rise of AI in Content Marketing",
      excerpt:
        "Exploring how artificial intelligence is transforming content marketing strategies...",
      dateCreated: "2023-09-15",
      tags: ["AI", "Marketing", "Technology"],
      language: "English",
      wordCount: 1250,
      status: "published",
      trend: "AI Marketing",
    },
    {
      id: "2",
      title: "Sustainable Fashion Trends 2023",
      excerpt:
        "An analysis of eco-friendly fashion trends gaining popularity this year...",
      dateCreated: "2023-09-10",
      tags: ["Fashion", "Sustainability", "Trends"],
      language: "English",
      wordCount: 980,
      status: "published",
      trend: "Sustainable Fashion",
    },
    {
      id: "3",
      title: "Remote Work Best Practices",
      excerpt:
        "Tips and strategies for maintaining productivity while working remotely...",
      dateCreated: "2023-09-05",
      tags: ["Remote Work", "Productivity", "Business"],
      language: "English",
      wordCount: 1450,
      status: "draft",
    },
    {
      id: "4",
      title: "Crypto Market Analysis Q3 2023",
      excerpt:
        "A detailed look at cryptocurrency market trends and predictions...",
      dateCreated: "2023-08-28",
      tags: ["Cryptocurrency", "Finance", "Market Analysis"],
      language: "English",
      wordCount: 1800,
      status: "scheduled",
      trend: "Cryptocurrency",
    },
    {
      id: "5",
      title: "Tendencias de Marketing Digital 2023",
      excerpt:
        "Un análisis de las estrategias de marketing digital más efectivas...",
      dateCreated: "2023-08-20",
      tags: ["Marketing Digital", "SEO", "Social Media"],
      language: "Spanish",
      wordCount: 1100,
      status: "published",
      trend: "Marketing Digital",
    },
    {
      id: "6",
      title: "Plant-Based Diet Benefits",
      excerpt:
        "Exploring the health and environmental benefits of plant-based eating...",
      dateCreated: "2023-08-15",
      tags: ["Nutrition", "Health", "Environment"],
      language: "English",
      wordCount: 1350,
      status: "draft",
      trend: "Plant-Based Diet",
    },
  ];

  // Filter and sort content items
  const filteredContent = mockContentItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      const matchesLanguage =
        filterLanguage === "all" || item.language === filterLanguage;

      return matchesSearch && matchesStatus && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dateAsc":
          return (
            new Date(a.dateCreated).getTime() -
            new Date(b.dateCreated).getTime()
          );
        case "dateDesc":
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          );
        case "titleAsc":
          return a.title.localeCompare(b.title);
        case "titleDesc":
          return b.title.localeCompare(a.title);
        case "wordCountAsc":
          return a.wordCount - b.wordCount;
        case "wordCountDesc":
          return b.wordCount - a.wordCount;
        default:
          return 0;
      }
    });

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    // In a real app, this would call an API to delete the selected items
    console.log("Deleting items:", selectedItems);
    setSelectedItems([]);
    setIsDeleteDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Library</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsCreateFolderDialogOpen(true)}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by title, tag, or keyword..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterLanguage} onValueChange={setFilterLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateDesc">Newest First</SelectItem>
              <SelectItem value="dateAsc">Oldest First</SelectItem>
              <SelectItem value="titleAsc">Title (A-Z)</SelectItem>
              <SelectItem value="titleDesc">Title (Z-A)</SelectItem>
              <SelectItem value="wordCountDesc">
                Word Count (High-Low)
              </SelectItem>
              <SelectItem value="wordCountAsc">
                Word Count (Low-High)
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center justify-between bg-muted p-2 rounded-md">
            <span className="text-sm">
              {selectedItems.length} items selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Tag className="mr-2 h-4 w-4" />
                Tag
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={
              selectedItems.length === filteredContent.length &&
              filteredContent.length > 0
            }
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </label>
        </div>
        <Separator className="mx-4" orientation="vertical" />
        <span className="text-sm text-muted-foreground">
          {filteredContent.length} items
        </span>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="social">Social Posts</TabsTrigger>
          <TabsTrigger value="emails">Email Content</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            className="mt-1"
                          />
                          <div>
                            <CardTitle className="text-lg">
                              {item.title}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {new Date(
                                  item.dateCreated,
                                ).toLocaleDateString()}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                •
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {item.wordCount} words
                              </span>
                              <span className="text-xs text-muted-foreground">
                                •
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}
                              >
                                {item.status.charAt(0).toUpperCase() +
                                  item.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-0">
                      {item.trend && (
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">
                            Trend: {item.trend}
                          </Badge>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
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
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="w-10 p-2 text-left">
                      <Checkbox
                        checked={
                          selectedItems.length === filteredContent.length &&
                          filteredContent.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-2 text-left font-medium text-sm">Title</th>
                    <th className="p-2 text-left font-medium text-sm">
                      Status
                    </th>
                    <th className="p-2 text-left font-medium text-sm">
                      Language
                    </th>
                    <th className="p-2 text-left font-medium text-sm">Date</th>
                    <th className="p-2 text-left font-medium text-sm">Words</th>
                    <th className="p-2 text-left font-medium text-sm">Tags</th>
                    <th className="w-10 p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="border-t hover:bg-muted/50"
                    >
                      <td className="p-2">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                        />
                      </td>
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {item.excerpt}
                          </div>
                          {item.trend && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Trend: {item.trend}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-2">{item.language}</td>
                      <td className="p-2 text-sm">
                        {new Date(item.dateCreated).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-sm">{item.wordCount}</td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles">
          <div className="flex items-center justify-center h-40 border rounded-md">
            <p className="text-muted-foreground">Filter applied: Articles</p>
          </div>
        </TabsContent>

        <TabsContent value="social">
          <div className="flex items-center justify-center h-40 border rounded-md">
            <p className="text-muted-foreground">
              Filter applied: Social Posts
            </p>
          </div>
        </TabsContent>

        <TabsContent value="emails">
          <div className="flex items-center justify-center h-40 border rounded-md">
            <p className="text-muted-foreground">
              Filter applied: Email Content
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedItems.length} selected
              item{selectedItems.length !== 1 ? "s" : ""}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Folder Dialog */}
      <Dialog
        open={isCreateFolderDialogOpen}
        onOpenChange={setIsCreateFolderDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder to organize your content.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input placeholder="Folder name" />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateFolderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsCreateFolderDialogOpen(false)}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentLibraryManager;
