"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// --- DEMO API MOCKS ---
// TODO: API INTEGRATION - Replace with FastAPI endpoints (e.g., GET /api/v1/bookings)
const fetchBookings = async () => [
  { id: 1, resource: "Conference Room B2", user: "John Doe", date: "2026-07-15", startTime: "09:00", endTime: "10:00", status: "Upcoming" },
  { id: 2, resource: "Projector AF-0002", user: "Jane Smith", date: "2026-07-12", startTime: "13:00", endTime: "15:00", status: "Ongoing" },
  { id: 3, resource: "Company Van", user: "Mike Johnson", date: "2026-07-10", startTime: "08:00", endTime: "17:00", status: "Completed" },
];

export default function ResourceBookingScreen() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // TODO: API INTEGRATION - Fetch existing bookings from the backend
    fetchBookings().then(setBookings as any);
  }, []);

  const handleBookResource = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API INTEGRATION - POST /api/v1/bookings
    // The backend should return a 409 Conflict error if there is a time overlap.
    // Example: if (response.status === 409) { alert("Time slot overlaps with an existing booking!"); }
    console.log("Booking request submitted. Backend should validate overlaps.");
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Upcoming": return "bg-blue-500";
      case "Ongoing": return "bg-green-500";
      case "Completed": return "bg-gray-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Resource Booking</h1>
          <p className="text-muted-foreground">Reserve shared rooms, vehicles, and equipment.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Book a Resource</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Booking</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleBookResource} className="space-y-4">
              {/* TODO: Swap Input for a Shadcn Select component linked to your Resources API */}
              <Input placeholder="Select Resource (e.g., Room B2)" required />
              <Input type="date" required />
              <div className="flex gap-4">
                <Input type="time" placeholder="Start Time" required />
                <Input type="time" placeholder="End Time" required />
              </div>
              <Button type="submit" className="w-full">Confirm Booking</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>View and manage resource reservations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Booked By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b: any) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.resource}</TableCell>
                  <TableCell>{b.user}</TableCell>
                  <TableCell>{b.date}</TableCell>
                  <TableCell>{b.startTime} - {b.endTime}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(b.status)}>{b.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {b.status === "Upcoming" && (
                      <Button variant="destructive" size="sm">Cancel</Button>
                    )}
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