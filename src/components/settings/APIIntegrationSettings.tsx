import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Key,
  Copy,
  RefreshCw,
  Webhook,
  Shield,
  Code,
  FileJson,
  Braces,
} from "lucide-react";

interface APIIntegrationSettingsProps {
  onSave?: () => void;
}

const APIIntegrationSettings = ({
  onSave = () => {},
}: APIIntegrationSettingsProps) => {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookActive, setWebhookActive] = useState(true);
  const [webhookEvents, setWebhookEvents] = useState({
    contentCreated: true,
    contentUpdated: true,
    contentDeleted: false,
    trendDiscovered: true,
  });
  const [webhookFormat, setWebhookFormat] = useState("json");

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast notification here
    alert("Copied to clipboard!");
  };

  const handleRegenerateKey = (keyType: string) => {
    // In a real app, this would call an API to regenerate the key
    alert(`Regenerating ${keyType} key...`);
  };

  const handleTestWebhook = () => {
    // In a real app, this would call an API to test the webhook
    alert(`Testing webhook at ${webhookUrl}...`);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        <TabsTrigger value="code-samples">Code Samples</TabsTrigger>
      </TabsList>

      <TabsContent value="api-keys" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage your API keys for accessing TrendContent services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4" />
                  <Label>Production API Key</Label>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerateKey("production")}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Regenerate
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  value="tc_live_51KjTESLkj2lkj32lkj23lkj2l3kj2l3kj2l3k•••••••••••••"
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopyToClipboard(
                      "tc_live_51KjTESLkj2lkj32lkj23lkj2l3kj2l3kj2l3k",
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4" />
                  <Label>Test API Key</Label>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerateKey("test")}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Regenerate
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  value="tc_test_51KjTESLkj2lkj32lkj23lkj2l3kj2l3kj2l3k•••••••••••••"
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopyToClipboard(
                      "tc_test_51KjTESLkj2lkj32lkj23lkj2l3kj2l3kj2l3k",
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-rate-limit">API Rate Limit</Label>
              <Select defaultValue="500">
                <SelectTrigger id="api-rate-limit">
                  <SelectValue placeholder="Select rate limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 requests/minute</SelectItem>
                  <SelectItem value="500">500 requests/minute</SelectItem>
                  <SelectItem value="1000">1000 requests/minute</SelectItem>
                  <SelectItem value="unlimited">
                    Unlimited (Enterprise only)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <Label htmlFor="api-ip-restriction">IP Restriction</Label>
              </div>
              <Switch id="api-ip-restriction" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="webhooks" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Webhook Settings</CardTitle>
            <CardDescription>
              Configure webhooks to receive real-time updates from TrendContent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Webhook className="h-4 w-4" />
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="webhook-active" className="text-sm">
                    Active
                  </Label>
                  <Switch
                    id="webhook-active"
                    checked={webhookActive}
                    onCheckedChange={setWebhookActive}
                  />
                </div>
              </div>
              <Input
                id="webhook-url"
                placeholder="https://your-domain.com/webhook"
                className="font-mono text-sm"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="webhook-secret"
                  value="whsec_1234567890abcdefghijklmnopqrstuvwxyz•••••••"
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopyToClipboard(
                      "whsec_1234567890abcdefghijklmnopqrstuvwxyz",
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerateKey("webhook-secret")}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Webhook Events</Label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="event-content-created"
                    checked={webhookEvents.contentCreated}
                    onCheckedChange={(checked) =>
                      setWebhookEvents({
                        ...webhookEvents,
                        contentCreated: checked,
                      })
                    }
                  />
                  <Label htmlFor="event-content-created" className="text-sm">
                    content.created
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="event-content-updated"
                    checked={webhookEvents.contentUpdated}
                    onCheckedChange={(checked) =>
                      setWebhookEvents({
                        ...webhookEvents,
                        contentUpdated: checked,
                      })
                    }
                  />
                  <Label htmlFor="event-content-updated" className="text-sm">
                    content.updated
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="event-content-deleted"
                    checked={webhookEvents.contentDeleted}
                    onCheckedChange={(checked) =>
                      setWebhookEvents({
                        ...webhookEvents,
                        contentDeleted: checked,
                      })
                    }
                  />
                  <Label htmlFor="event-content-deleted" className="text-sm">
                    content.deleted
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="event-trend-discovered"
                    checked={webhookEvents.trendDiscovered}
                    onCheckedChange={(checked) =>
                      setWebhookEvents({
                        ...webhookEvents,
                        trendDiscovered: checked,
                      })
                    }
                  />
                  <Label htmlFor="event-trend-discovered" className="text-sm">
                    trend.discovered
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-format">Payload Format</Label>
              <Select value={webhookFormat} onValueChange={setWebhookFormat}>
                <SelectTrigger id="webhook-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="form">Form-encoded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-test">Test Payload</Label>
              <Textarea
                id="webhook-test"
                className="font-mono text-xs h-32"
                readOnly
                value={`{
  "event": "content.created",
  "created": 1623445789,
  "data": {
    "id": "cont_12345",
    "title": "New Content",
    "status": "draft"
  }
}`}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleTestWebhook}>
              Test Webhook
            </Button>
            <Button onClick={onSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="code-samples" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Code Samples</CardTitle>
            <CardDescription>
              Examples of how to integrate with TrendContent API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList className="mb-4">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
                <TabsTrigger value="ruby">Ruby</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <FileJson className="h-4 w-4 mr-2" />
                      Fetch Trending Topics
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          `const fetchTrends = async () => {\n  const response = await fetch('https://api.trendcontent.com/v1/trends', {\n    method: 'GET',\n    headers: {\n      'Authorization': 'Bearer tc_live_YOUR_API_KEY',\n      'Content-Type': 'application/json'\n    }\n  });\n  const data = await response.json();\n  return data;\n};`,
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
                        {`const fetchTrends = async () => {\n  const response = await fetch('https://api.trendcontent.com/v1/trends', {\n    method: 'GET',\n    headers: {\n      'Authorization': 'Bearer tc_live_YOUR_API_KEY',\n      'Content-Type': 'application/json'\n    }\n  });\n  const data = await response.json();\n  return data;\n};`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <Braces className="h-4 w-4 mr-2" />
                      Generate Content
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          `const generateContent = async (trend, options) => {\n  const response = await fetch('https://api.trendcontent.com/v1/content/generate', {\n    method: 'POST',\n    headers: {\n      'Authorization': 'Bearer tc_live_YOUR_API_KEY',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      trend,\n      model: options.model || 'openai',\n      tone: options.tone || 'professional',\n      length: options.length || 500,\n      seoOptimized: options.seoOptimized || true\n    })\n  });\n  const data = await response.json();\n  return data;\n};`,
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
                        {`const generateContent = async (trend, options) => {\n  const response = await fetch('https://api.trendcontent.com/v1/content/generate', {\n    method: 'POST',\n    headers: {\n      'Authorization': 'Bearer tc_live_YOUR_API_KEY',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      trend,\n      model: options.model || 'openai',\n      tone: options.tone || 'professional',\n      length: options.length || 500,\n      seoOptimized: options.seoOptimized || true\n    })\n  });\n  const data = await response.json();\n  return data;\n};`}
                      </code>
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="python" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <FileJson className="h-4 w-4 mr-2" />
                      Fetch Trending Topics
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          `import requests\n\ndef fetch_trends():\n    response = requests.get(\n        'https://api.trendcontent.com/v1/trends',\n        headers={\n            'Authorization': 'Bearer tc_live_YOUR_API_KEY',\n            'Content-Type': 'application/json'\n        }\n    )\n    return response.json()`,
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
                        {`import requests\n\ndef fetch_trends():\n    response = requests.get(\n        'https://api.trendcontent.com/v1/trends',\n        headers={\n            'Authorization': 'Bearer tc_live_YOUR_API_KEY',\n            'Content-Type': 'application/json'\n        }\n    )\n    return response.json()`}
                      </code>
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="php" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <FileJson className="h-4 w-4 mr-2" />
                      Fetch Trending Topics
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          `<?php\nfunction fetchTrends() {\n    $curl = curl_init();\n    curl_setopt_array($curl, [\n        CURLOPT_URL => "https://api.trendcontent.com/v1/trends",\n        CURLOPT_RETURNTRANSFER => true,\n        CURLOPT_HTTPHEADER => [\n            "Authorization: Bearer tc_live_YOUR_API_KEY",\n            "Content-Type: application/json"\n        ],\n    ]);\n    $response = curl_exec($curl);\n    curl_close($curl);\n    return json_decode($response, true);\n}\n?>`,
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
                        {`<?php\nfunction fetchTrends() {\n    $curl = curl_init();\n    curl_setopt_array($curl, [\n        CURLOPT_URL => "https://api.trendcontent.com/v1/trends",\n        CURLOPT_RETURNTRANSFER => true,\n        CURLOPT_HTTPHEADER => [\n            "Authorization: Bearer tc_live_YOUR_API_KEY",\n            "Content-Type: application/json"\n        ],\n    ]);\n    $response = curl_exec($curl);\n    curl_close($curl);\n    return json_decode($response, true);\n}\n?>`}
                      </code>
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ruby" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <FileJson className="h-4 w-4 mr-2" />
                      Fetch Trending Topics
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          `require 'net/http'\nrequire 'json'\n\ndef fetch_trends\n  uri = URI('https://api.trendcontent.com/v1/trends')\n  request = Net::HTTP::Get.new(uri)\n  request['Authorization'] = 'Bearer tc_live_YOUR_API_KEY'\n  request['Content-Type'] = 'application/json'\n  \n  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|\n    http.request(request)\n  end\n  \n  JSON.parse(response.body)\nend`,
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
                        {`require 'net/http'\nrequire 'json'\n\ndef fetch_trends\n  uri = URI('https://api.trendcontent.com/v1/trends')\n  request = Net::HTTP::Get.new(uri)\n  request['Authorization'] = 'Bearer tc_live_YOUR_API_KEY'\n  request['Content-Type'] = 'application/json'\n  \n  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|\n    http.request(request)\n  end\n  \n  JSON.parse(response.body)\nend`}
                      </code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default APIIntegrationSettings;
