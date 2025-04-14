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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Sparkles,
  Save,
  Download,
  Share2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import AIModelSelector from "./ContentGeneration/AIModelSelector";
import { generateContent, type AIRequestParams } from "@/services/aiService";

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
  const [apiError, setApiError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setApiError(null);

    try {
      const params: AIRequestParams = {
        prompt: `Generate content about ${selectedTrend}`,
        model: aiModel,
        tone: contentTone,
        length: contentLength[0],
        seoOptimized,
        customInstructions,
        trend: selectedTrend,
      };

      const response = await generateContent(params);

      if (response.error) {
        console.error("Error generating content:", response.error);
        setApiError(response.error);
      } else {
        setGeneratedContent(response.content);
      }
    } catch (error) {
      console.error("Error in content generation:", error);
      setApiError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsGenerating(false);
    }
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
      language: "English",
      region: "United States",
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
          {apiError && (
            <Alert variant="destructive" className="mb-4">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <AIModelSelector
                selectedModel={aiModel}
                onModelChange={setAiModel}
              />

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
                    onSave={(content) => setGeneratedContent(content)}
                    selectedTrend={selectedTrend}
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
            <Button
              variant="outline"
              size="sm"
              disabled={!generatedContent || isGenerating}
              onClick={handleGenerate}
            >
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
