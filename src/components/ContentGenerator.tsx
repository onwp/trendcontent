import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  AlertCircle,
  Sparkles,
  RefreshCw,
  Save,
  Globe,
  Send,
  Trash2,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import ContentPreview from "./ContentPreview";
import AIModelSelector from "./ContentGeneration/AIModelSelector";

interface ContentGeneratorProps {
  selectedTrend?: {
    title: string;
    region: string;
    category: string;
    searchVolume: number;
  };
  onSaveContent?: (content: any) => void;
}

const ContentGenerator = ({
  selectedTrend = {
    title: "Artificial Intelligence",
    region: "United States",
    category: "Technology",
    searchVolume: 85,
  },
  onSaveContent = () => {},
}: ContentGeneratorProps) => {
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedModel, setSelectedModel] = useState("openai");
  const [contentType, setContentType] = useState("blog");
  const [contentLength, setContentLength] = useState([1000]);
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [additionalKeywords, setAdditionalKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [contentTitle, setContentTitle] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate API call to generate content
    setTimeout(() => {
      const mockContent = `# ${selectedTrend.title}: The Future of Technology\n\n## Introduction\n\nIn recent years, ${selectedTrend.title} has emerged as one of the most transformative technologies of our time. With applications ranging from healthcare to finance, transportation to entertainment, its impact is being felt across virtually every industry.\n\n## Current Trends\n\nAccording to recent data from ${selectedTrend.region}, interest in ${selectedTrend.title} has grown significantly, particularly in the ${selectedTrend.category} sector. This surge in popularity can be attributed to several factors, including advancements in computing power, increased data availability, and growing recognition of its potential benefits.\n\n## Applications\n\n${selectedTrend.title} is being used in numerous ways, from predictive analytics to natural language processing, computer vision to autonomous systems. Companies are leveraging these capabilities to streamline operations, enhance customer experiences, and develop innovative products and services.\n\n## Future Outlook\n\nAs technology continues to evolve, we can expect ${selectedTrend.title} to play an increasingly important role in shaping our world. From personalized medicine to smart cities, the possibilities are virtually limitless.\n\n## Conclusion\n\nWhile challenges remain, including concerns about privacy, security, and ethical implications, the potential benefits of ${selectedTrend.title} are too significant to ignore. By addressing these issues proactively and thoughtfully, we can harness the power of this technology to create a better future for all.`;

      setGeneratedContent(mockContent);
      setContentTitle(`${selectedTrend.title}: The Future of Technology`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    onSaveContent({
      title: contentTitle,
      content: generatedContent,
      trend: selectedTrend,
      model: selectedModel,
      type: contentType,
      length: contentLength[0],
      tone: tone,
      keywords: additionalKeywords,
      audience: targetAudience,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Content Generator</CardTitle>
            <CardDescription>
              Generate SEO-optimized content based on trending topics
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-muted">
              {selectedTrend.region}
            </Badge>
            <Badge variant="outline" className="bg-muted">
              {selectedTrend.category}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Trending:{" "}
              {selectedTrend.searchVolume}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
          <ResizablePanel defaultSize={30} minSize={25}>
            <div className="p-6 h-full flex flex-col">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Selected Trend</h3>
                  <Card className="bg-muted/40">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg">
                        {selectedTrend.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trending in {selectedTrend.region} under{" "}
                        {selectedTrend.category}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Generation Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ai-model">AI Model</Label>
                      <AIModelSelector
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content-type">Content Type</Label>
                      <Select
                        value={contentType}
                        onValueChange={setContentType}
                      >
                        <SelectTrigger id="content-type">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="social">
                            Social Media Post
                          </SelectItem>
                          <SelectItem value="email">
                            Email Newsletter
                          </SelectItem>
                          <SelectItem value="product">
                            Product Description
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="content-length">Content Length</Label>
                        <span className="text-sm text-muted-foreground">
                          {contentLength[0]} words
                        </span>
                      </div>
                      <Slider
                        id="content-length"
                        min={100}
                        max={3000}
                        step={100}
                        value={contentLength}
                        onValueChange={setContentLength}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="authoritative">
                            Authoritative
                          </SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="include-keywords"
                        checked={includeKeywords}
                        onCheckedChange={setIncludeKeywords}
                      />
                      <Label htmlFor="include-keywords">
                        Include trend keywords
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional-keywords">
                        Additional Keywords (comma separated)
                      </Label>
                      <Input
                        id="additional-keywords"
                        placeholder="SEO, content marketing, digital strategy"
                        value={additionalKeywords}
                        onChange={(e) => setAdditionalKeywords(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target-audience">Target Audience</Label>
                      <Textarea
                        id="target-audience"
                        placeholder="Describe your target audience"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="resize-none h-20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={70}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col"
            >
              <div className="px-6 pt-6 border-b">
                <div className="flex justify-between items-center mb-4">
                  <Input
                    placeholder="Content Title"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    className="text-lg font-medium max-w-md"
                  />
                  <TabsList>
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="editor" className="flex-1 p-0 m-0">
                <div className="p-6 h-full">
                  <RichTextEditor
                    content={generatedContent}
                    onChange={setGeneratedContent}
                  />
                </div>
              </TabsContent>

              <TabsContent value="preview" className="flex-1 p-0 m-0">
                <div className="p-6 h-full overflow-auto">
                  <ContentPreview
                    title={contentTitle}
                    content={generatedContent}
                    trend={selectedTrend}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>

      <CardFooter className="border-t p-4 bg-muted/20">
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Translate
            </Button>
            <Button variant="outline" size="sm">
              <Send className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Discard
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGenerate()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save to Library
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentGenerator;
