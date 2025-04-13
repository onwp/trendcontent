import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileCode, Twitter, Instagram, Calendar } from "lucide-react";
import WordPressIntegration from "./WordPressIntegration";

interface IntegrationsPanelProps {
  onIntegrationConnect?: (type: string, data: any) => void;
  onIntegrationDisconnect?: (type: string) => void;
  onExport?: (type: string, data: any) => void;
}

const IntegrationsPanel = ({
  onIntegrationConnect = () => {},
  onIntegrationDisconnect = () => {},
  onExport = () => {},
}: IntegrationsPanelProps) => {
  const [activeTab, setActiveTab] = useState("wordpress");

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Integrations</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wordpress" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              WordPress
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Content Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wordpress" className="mt-6">
            <WordPressIntegration
              onConnect={() =>
                onIntegrationConnect("wordpress", { connected: true })
              }
              onDisconnect={() => onIntegrationDisconnect("wordpress")}
              onExport={(data) => onExport("wordpress", data)}
            />
          </TabsContent>

          <TabsContent value="twitter" className="mt-6">
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/30">
              <Twitter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Connect to Twitter</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Share your trending content directly to Twitter and schedule
                posts for optimal engagement times.
              </p>
              <Button>Connect Twitter Account</Button>
            </div>
          </TabsContent>

          <TabsContent value="instagram" className="mt-6">
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/30">
              <Instagram className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Connect to Instagram</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Share your visual content directly to Instagram and schedule
                posts for optimal engagement times.
              </p>
              <Button>Connect Instagram Account</Button>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/30">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Connect Content Calendar
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Integrate with your content calendar to schedule and organize
                your content publishing workflow.
              </p>
              <div className="flex gap-4">
                <Button variant="outline">Connect Google Calendar</Button>
                <Button>Connect Other Calendar</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegrationsPanel;
