"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// --- DEMO API MOCKS ---
// TODO: API INTEGRATION - Replace with FastAPI endpoints (e.g., GET /api/v1/maintenance)
const fetchMaintenanceRequests = async () => [
  { id: 101, assetTag: "AF-0003", issue: "Engine stalling", priority: "High", status: "Pending", requestedBy: "Mike Johnson" },
  { id: 102, assetTag: "AF-0114", issue: "Screen flickering", priority: "Medium", status: "In Progress", requestedBy: "Priya Singh" },
  { id: 103, assetTag: "AF-0042", issue: "Broken chair wheel", priority: "Low", status: "Resolved", requestedBy: "John Doe" },
];

export default function MaintenanceManagementScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // TODO: API INTEGRATION - Fetch maintenance data on mount
    fetchMaintenanceRequests().then(setRequests as any);
  }, []);

  const handleRaiseRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API INTEGRATION - POST /api/v1/maintenance
    // Backend should flip the associated asset's status to "Under Maintenance" upon approval.
    console.log("Maintenance request submitted.");
  };

  const updateStatus = (id: number, newStatus: string) => {
    // TODO: API INTEGRATION - PUT /api/v1/maintenance/{id}/status
    console.log(`Updated request ${id} to ${newStatus}`);
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Pending": return "bg-yellow-500 hover:bg-yellow-600";
      case "Approved": return "bg-blue-500 hover:bg-blue-600";
      case "In Progress": return "bg-purple-500 hover:bg-purple-600";
      case "Resolved": return "bg-green-500 hover:bg-green-600";
      case "Rejected": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Management</h1>
          <p className="text-muted-foreground">Route asset repairs through the approval workflow.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Raise Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report an Issue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRaiseRequest} className="space-y-4">
              <Input placeholder="Asset Tag (e.g., AF-0001)" required />
              <Input placeholder="Describe the issue in detail" required />
              {/* TODO: Add Shadcn Select for Priority (High, Medium, Low) */}
              <Input placeholder="Priority (High/Medium/Low)" required />
              <Input type="file" accept="image/*" />
              <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active & Pending</TabsTrigger>
          <TabsTrigger value="history">Resolved History</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Action Required</CardTitle>
              <CardDescription>Manage requests waiting for approval or currently in progress.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Tag</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.filter((r: any) => r.status !== "Resolved").map((req: any) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.assetTag}</TableCell>
                      <TableCell>{req.issue}</TableCell>
                      <TableCell><Badge variant={getPriorityBadge(req.priority) as any}>{req.priority}</Badge></TableCell>
                      <TableCell><Badge className={getStatusColor(req.status)}>{req.status}</Badge></TableCell>
                      <TableCell>{req.requestedBy}</TableCell>
                      <TableCell className="space-x-2">
                        {req.status === "Pending" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "Approved")}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => updateStatus(req.id, "Rejected")}>Reject</Button>
                          </>
                        )}
                        {req.status === "In Progress" && (
                          <Button size="sm" variant="default" onClick={() => updateStatus(req.id, "Resolved")}>Mark Resolved</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Log</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Similar table rendering only "Resolved" or "Rejected" requests */}
              <p className="text-sm text-muted-foreground">Historical records populate here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}