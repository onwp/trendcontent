import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, History, Wallet } from "lucide-react";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Billing</h1>
      </div>

      <Tabs
        defaultValue="invoices"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Usage & Credits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                View and download your past invoices from Lemon Squeezy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>INV-001</TableCell>
                    <TableCell>May 1, 2023</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>INV-002</TableCell>
                    <TableCell>June 1, 2023</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>INV-003</TableCell>
                    <TableCell>July 1, 2023</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage & Credits</CardTitle>
              <CardDescription>
                Monitor your usage and available credits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Content Generation Credits
                    </span>
                    <span className="text-sm font-medium">750 / 1000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Credits reset on June 1, 2023
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">API Requests</span>
                    <span className="text-sm font-medium">3,240 / 10,000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "32%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Requests reset on June 1, 2023
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm font-medium">1.2 GB / 5 GB</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "24%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Usage History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 15, 2023</TableCell>
                      <TableCell>Content Generation</TableCell>
                      <TableCell>Blog post about AI trends</TableCell>
                      <TableCell className="text-right">-5 credits</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 14, 2023</TableCell>
                      <TableCell>API Request</TableCell>
                      <TableCell>Trend analysis for tech industry</TableCell>
                      <TableCell className="text-right">-1 credit</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 12, 2023</TableCell>
                      <TableCell>Content Generation</TableCell>
                      <TableCell>Social media posts bundle</TableCell>
                      <TableCell className="text-right">-10 credits</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" /> View Full History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
