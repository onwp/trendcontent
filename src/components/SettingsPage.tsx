import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  Bell,
  Shield,
  Eye,
  Globe,
  Moon,
  Key,
  Webhook,
  Copy,
  RefreshCw,
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Settings</h2>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <select
                          id="language"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <select
                          id="timezone"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <option value="utc">UTC</option>
                          <option value="est">Eastern Time (ET)</option>
                          <option value="cst">Central Time (CT)</option>
                          <option value="pst">Pacific Time (PT)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <Label htmlFor="browser-notifications">
                          Browser Notifications
                        </Label>
                      </div>
                      <Switch id="browser-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <Label htmlFor="marketing-emails">
                          Marketing Emails
                        </Label>
                      </div>
                      <Switch id="marketing-emails" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Manage your privacy and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <Label htmlFor="two-factor">
                          Two-Factor Authentication
                        </Label>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <Label htmlFor="public-profile">Public Profile</Label>
                      </div>
                      <Switch id="public-profile" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize the look and feel of the application.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Moon className="h-4 w-4" />
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <select
                        id="font-size"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="small">Small</option>
                        <option value="medium" selected>
                          Medium
                        </option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>
                      Manage your API keys and access tokens.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Key className="h-4 w-4" />
                          <Label>API Key</Label>
                        </div>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                          Regenerate
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          value="sk_live_51KjTESLkj2lkj32lkj23lkj2l3kj2l3kj2l3k•••••••••••••"
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button variant="ghost" size="sm">
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
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                          Regenerate
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          value="sk_test_51KjTESLkj2lkj32lkj23lkj2l3kj2l3kj2l3k•••••••••••••"
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="api-rate-limit">API Rate Limit</Label>
                      <select
                        id="api-rate-limit"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="100">100 requests/minute</option>
                        <option value="500" selected>
                          500 requests/minute
                        </option>
                        <option value="1000">1000 requests/minute</option>
                        <option value="unlimited">
                          Unlimited (Enterprise only)
                        </option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <Label htmlFor="api-ip-restriction">
                          IP Restriction
                        </Label>
                      </div>
                      <Switch id="api-ip-restriction" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="webhooks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Settings</CardTitle>
                    <CardDescription>
                      Configure webhooks to receive real-time updates.
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
                          <Switch id="webhook-active" defaultChecked />
                        </div>
                      </div>
                      <Input
                        id="webhook-url"
                        placeholder="https://your-domain.com/webhook"
                        className="font-mono text-sm"
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
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Webhook Events</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="event-content-created" defaultChecked />
                          <Label
                            htmlFor="event-content-created"
                            className="text-sm"
                          >
                            content.created
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="event-content-updated" defaultChecked />
                          <Label
                            htmlFor="event-content-updated"
                            className="text-sm"
                          >
                            content.updated
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="event-content-deleted" />
                          <Label
                            htmlFor="event-content-deleted"
                            className="text-sm"
                          >
                            content.deleted
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="event-trend-discovered" defaultChecked />
                          <Label
                            htmlFor="event-trend-discovered"
                            className="text-sm"
                          >
                            trend.discovered
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-format">Payload Format</Label>
                      <select
                        id="webhook-format"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="json" selected>
                          JSON
                        </option>
                        <option value="xml">XML</option>
                        <option value="form">Form-encoded</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-test">Test Payload</Label>
                      <Textarea
                        id="webhook-test"
                        className="font-mono text-xs h-32"
                        readOnly
                        value='{"event":"content.created","created":1623445789,"data":{"id":"cont_12345","title":"New Content","status":"draft"}}'
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Test Webhook</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
