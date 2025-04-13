import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link,
  Image,
  Languages,
  Search,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Globe,
  Save,
} from "lucide-react";

interface RichTextEditorProps {
  content?: string;
  onSave?: (content: string) => void;
  selectedTrend?: string;
  language?: string;
  region?: string;
}

const RichTextEditor = ({
  content = "",
  onSave = () => {},
  selectedTrend = "Artificial Intelligence",
  language = "English",
  region = "United States",
}: RichTextEditorProps) => {
  const [editorContent, setEditorContent] = useState(content);
  const [activeTab, setActiveTab] = useState("write");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedRegion, setSelectedRegion] = useState(region);
  const [seoScore, setSeoScore] = useState(85);

  // Mock SEO recommendations
  const seoRecommendations = [
    { text: "Add more headings to structure content", status: "warning" },
    { text: "Keyword density is good (2.3%)", status: "success" },
    { text: "Consider adding more internal links", status: "warning" },
    { text: "Meta description is optimized", status: "success" },
    { text: "Content length is appropriate (1,250 words)", status: "success" },
  ];

  // Mock translation data
  const translations = {
    English: editorContent,
    Spanish:
      "Este es un contenido de ejemplo traducido al español sobre Inteligencia Artificial.",
    French:
      "Ceci est un exemple de contenu traduit en français sur l'Intelligence Artificielle.",
    German:
      "Dies ist ein Beispielinhalt, der auf Deutsch über Künstliche Intelligenz übersetzt wurde.",
    Japanese: "人工知能に関する日本語に翻訳されたサンプルコンテンツです。",
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
  };

  const handleSave = () => {
    onSave(editorContent);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // In a real implementation, this would trigger a translation API call
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    // In a real implementation, this would update SEO recommendations for the region
  };

  return (
    <Card className="w-full bg-white border rounded-lg shadow-sm">
      <CardContent className="p-0">
        <div className="p-2 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {selectedTrend}
            </Badge>
            <Separator orientation="vertical" className="h-5" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    <span>{selectedRegion}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Content optimized for {selectedRegion}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator orientation="vertical" className="h-5" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Languages className="h-4 w-4" />
                    <span>{selectedLanguage}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Content language: {selectedLanguage}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-4">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger
                value="write"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Write
              </TabsTrigger>
              <TabsTrigger
                value="translate"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Translate
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                SEO
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="write" className="p-0 m-0">
            <div className="p-2 border-b flex flex-wrap items-center space-x-1 bg-gray-50">
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="sm">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="sm">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="sm">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heading2 className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="sm">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Image className="h-4 w-4" />
              </Button>
              <div className="ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI Enhance
                </Button>
              </div>
            </div>

            <div className="p-4">
              <Textarea
                className="min-h-[400px] w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start writing or use AI to generate content based on the selected trend..."
                value={editorContent}
                onChange={handleContentChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="translate" className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Label>Source Language</Label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  className="min-h-[300px] w-full"
                  value={editorContent}
                  onChange={handleContentChange}
                  placeholder="Original content"
                />
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Label>Target Language</Label>
                  <Select defaultValue="Spanish">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  className="min-h-[300px] w-full bg-gray-50"
                  value={translations["Spanish"]}
                  readOnly
                  placeholder="Translated content will appear here"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Copy Translation</Button>
              <Button>Save Translation</Button>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Target Keyword</Label>
                    <div className="flex space-x-2">
                      <Input defaultValue={selectedTrend} className="flex-1" />
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Region-specific SEO</Label>
                    <Select
                      value={selectedRegion}
                      onValueChange={handleRegionChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="United Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="mb-2 block">SEO Recommendations</Label>
                    <Card className="p-4">
                      <ul className="space-y-2">
                        {seoRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            {rec.status === "success" ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                            )}
                            <span>{rec.text}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>

              <div>
                <Card className="p-4 h-full">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold">{seoScore}/100</div>
                    <div className="text-sm text-gray-500">SEO Score</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Readability</Label>
                        <span className="text-sm text-green-600">Good</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Keyword Usage</Label>
                        <span className="text-sm text-green-600">
                          Excellent
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Content Length</Label>
                        <span className="text-sm text-green-600">Good</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label>Meta Data</Label>
                        <span className="text-sm text-amber-600">
                          Needs Work
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Auto-optimize</Label>
                      <Switch defaultChecked />
                    </div>
                    <Button className="w-full">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Optimize Content
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
