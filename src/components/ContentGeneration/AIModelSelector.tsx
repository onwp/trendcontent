import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  strengths: string[];
  badge?: string;
}

const AIModelSelector = ({
  selectedModel,
  onModelChange,
}: AIModelSelectorProps) => {
  const aiModels: AIModel[] = [
    {
      id: "openai",
      name: "OpenAI (GPT-4)",
      description: "Advanced language model with strong reasoning capabilities",
      strengths: [
        "Creative writing",
        "Detailed explanations",
        "Code generation",
      ],
      badge: "Recommended",
    },
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Google's multimodal AI model with strong analytical skills",
      strengths: ["Data analysis", "Technical content", "Research summaries"],
    },
    {
      id: "perplexity",
      name: "Perplexity",
      description: "Specialized in research and information retrieval",
      strengths: ["Fact checking", "Current events", "Research papers"],
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "Known for thoughtful, harmless, and honest responses",
      strengths: ["Long-form content", "Nuanced topics", "Ethical reasoning"],
    },
  ];

  const selectedModelData =
    aiModels.find((model) => model.id === selectedModel) || aiModels[0];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ai-model">AI Model</Label>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger id="ai-model">
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            {aiModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex items-center justify-between w-full">
                  <span>{model.name}</span>
                  {model.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {model.badge}
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{selectedModelData.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            {selectedModelData.description}
          </p>
          <div className="mt-2">
            <p className="text-xs font-medium mb-1">Strengths:</p>
            <div className="flex flex-wrap gap-1">
              {selectedModelData.strengths.map((strength) => (
                <Badge key={strength} variant="outline" className="text-xs">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelSelector;
