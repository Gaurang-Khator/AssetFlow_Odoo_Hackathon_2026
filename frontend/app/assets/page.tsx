"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// --- DEMO API MOCKS ---
// TODO: API INTEGRATION - Replace with FastAPI endpoints (e.g., GET /api/v1/assets)
const fetchAssets = async () => [
  { tag: "AF-0001", name: "MacBook Pro M2", category: "Electronics", status: "Allocated", location: "HQ-Floor 2" },
  { tag: "AF-0002", name: "Conference Projector", category: "Electronics", status: "Available", location: "Room B2" },
  { tag: "AF-0003", name: "Delivery Van", category: "Vehicles", status: "Under Maintenance", location: "Garage" },
];

export default function AssetDirectoryScreen() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // TODO: API INTEGRATION - Fetch assets on load
    fetchAssets().then(setAssets as any);
  }, []);

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API INTEGRATION - POST /api/v1/assets
    // Format form data and send to backend, then refresh the table.
    console.log("Asset registration submitted.");
  };

  // Helper for lifecycle status colors
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Available": return "bg-green-500 hover:bg-green-600";
      case "Allocated": return "bg-blue-500 hover:bg-blue-600";
      case "Under Maintenance": return "bg-orange-500 hover:bg-orange-600";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Asset Directory</h1>
        
        {/* Registration Modal via Shadcn Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Register New Asset</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register Asset</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegisterAsset} className="space-y-4">
              {/* TODO: Add proper Shadcn Form components here for validation */}
              <Input placeholder="Asset Name" required />
              <Input placeholder="Serial Number" required />
              <Button type="submit" className="w-full">Save Asset</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Inventory</CardTitle>
          <div className="pt-2">
            <Input 
              placeholder="Search by Tag, Name, or Serial..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Tag</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset: any) => (
                <TableRow key={asset.tag}>
                  <TableCell className="font-bold">{asset.tag}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View History</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}