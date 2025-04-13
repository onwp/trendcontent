import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Sparkles,
  Save,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";

interface ContentGenerationPanelProps {
  selectedTrend?: string;
  onSaveContent?: (content: any) => void;
}

const ContentGenerationPanel: React.FC<ContentGenerationPanelProps> = ({
  selectedTrend = "Artificial Intelligence",
  onSaveContent = () => {},
}) => {
  const [aiModel, setAiModel] = useState<string>("openai");
  const [contentTone, setContentTone] = useState<string>("professional");
  const [contentLength, setContentLength] = useState<number[]>([500]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [customInstructions, setCustomInstructions] = useState<string>("");
  const [seoOptimized, setSeoOptimized] = useState<boolean>(true);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const mockContent = `<h2>Understanding ${selectedTrend}</h2><p>In today's rapidly evolving digital landscape, ${selectedTrend} has emerged as a transformative force across industries. This technology continues to reshape how businesses operate and how consumers interact with products and services.</p><p>Recent studies indicate that adoption of ${selectedTrend} has increased by 45% in the past year alone, with organizations reporting significant improvements in efficiency and customer satisfaction.</p><h3>Key Benefits</h3><ul><li>Enhanced operational efficiency</li><li>Improved decision-making capabilities</li><li>Reduced costs and resource utilization</li><li>Personalized customer experiences</li></ul><p>As we look toward the future, the potential applications of ${selectedTrend} appear limitless, promising continued innovation and disruption across the global economy.</p>`;

      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    onSaveContent({
      title: `Content about ${selectedTrend}`,
      content: generatedContent,
      trend: selectedTrend,
      model: aiModel,
      tone: contentTone,
      length: contentLength[0],
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="w-full h-full bg-background p-4">
      <Card className="w-full h-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Content Generation</CardTitle>
              <CardDescription>
                Generate SEO-optimized content based on trending topics
              </CardDescription>
            </div>
            {selectedTrend && (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Selected Trend: {selectedTrend}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger id="ai-model">
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                    <SelectItem value="perplexity">Perplexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-tone">Content Tone</Label>
                <Select value={contentTone} onValueChange={setContentTone}>
                  <SelectTrigger id="content-tone">
                    <SelectValue placeholder="Select Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
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
                  max={2000}
                  step={100}
                  value={contentLength}
                  onValueChange={setContentLength}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="seo-optimized">SEO Optimized</Label>
                  <Switch
                    id="seo-optimized"
                    checked={seoOptimized}
                    onCheckedChange={setSeoOptimized}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Optimize content for search engines with relevant keywords
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-instructions">Custom Instructions</Label>
                <Textarea
                  id="custom-instructions"
                  placeholder="Add any specific instructions for the AI..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="h-24"
                />
              </div>

              <Button
                className="w-full"
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

            <div className="md:col-span-2 space-y-4">
              <Tabs defaultValue="editor">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="min-h-[500px]">
                  <RichTextEditor
                    content={generatedContent}
                    onChange={setGeneratedContent}
                  />
                </TabsContent>
                <TabsContent
                  value="preview"
                  className="min-h-[500px] border rounded-md p-4 overflow-auto"
                >
                  {generatedContent ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: generatedContent }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mb-2" />
                      <p>
                        No content generated yet. Use the controls on the left
                        to generate content.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled={!generatedContent}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled={!generatedContent}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" disabled={!generatedContent}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm" disabled={!generatedContent} onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save to Library
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentGenerationPanel;
