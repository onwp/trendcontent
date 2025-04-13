import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Check,
  Copy,
  Edit,
  Globe,
  RotateCcw,
  Save,
  Share2,
  Trash2,
} from "lucide-react";

interface ContentPreviewProps {
  content?: string;
  translations?: Record<string, string>;
  wordCount?: number;
  seoScore?: number;
  onEdit?: () => void;
  onRegenerate?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

const ContentPreview = ({
  content = "This is a preview of your generated content. Select a trend and generate content to see it here. You can edit, regenerate, or save the content once it's generated.",
  translations = {
    en: "This is a preview of your generated content. Select a trend and generate content to see it here. You can edit, regenerate, or save the content once it's generated.",
    es: "Esta es una vista previa de su contenido generado. Seleccione una tendencia y genere contenido para verlo aquí. Puede editar, regenerar o guardar el contenido una vez que se haya generado.",
    fr: "Ceci est un aperçu de votre contenu généré. Sélectionnez une tendance et générez du contenu pour le voir ici. Vous pouvez modifier, régénérer ou enregistrer le contenu une fois qu'il est généré.",
  },
  wordCount = 0,
  seoScore = 0,
  onEdit = () => {},
  onRegenerate = () => {},
  onSave = () => {},
  onDelete = () => {},
}: ContentPreviewProps) => {
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy =
      activeLanguage === "en" ? content : translations[activeLanguage] || "";
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availableLanguages = Object.keys(translations);
  const displayContent =
    activeLanguage === "en" ? content : translations[activeLanguage] || "";

  // Calculate SEO score color
  const getSeoScoreColor = () => {
    if (seoScore >= 80) return "text-green-500";
    if (seoScore >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full h-full bg-white border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Content Preview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="text-xs">Words:</span> {wordCount}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="text-xs">SEO Score:</span>
              <span className={getSeoScoreColor()}>{seoScore}</span>
            </Badge>
          </div>
        </div>
        <Tabs
          defaultValue="en"
          className="w-full"
          onValueChange={setActiveLanguage}
        >
          <TabsList className="grid grid-cols-3 w-48">
            {availableLanguages.map((lang) => (
              <TabsTrigger key={lang} value={lang} className="text-xs">
                {lang.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 pb-2">
        <div className="prose max-w-none min-h-[300px] max-h-[500px] overflow-y-auto p-2 rounded-md bg-gray-50">
          {displayContent}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit content in the rich text editor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onRegenerate}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Regenerate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate new content with the same settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy content to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-1" />
                  Translate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Translate content to other languages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share content with others</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="sm" onClick={onSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save content to your library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the current content. This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentPreview;
