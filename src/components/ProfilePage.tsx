import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    bio: "Content creator and digital marketer with a passion for SEO and social media trends.",
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Profile Settings</h2>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <div className="flex items-center gap-2">
              <div className="text-sm text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Card */}
              <Card className="w-full md:w-1/3">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {user.email}
                  </p>
                  <div className="w-full mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                  <div className="w-full mt-6 pt-6 border-t">
                    <p className="text-sm">{user.bio}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Settings Tabs */}
              <div className="w-full md:w-2/3">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Update your personal details here.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue={user.email}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" defaultValue={user.phone} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={user.location} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input id="bio" defaultValue={user.bio} />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="security" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                          Manage your password and security preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Update Password</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
