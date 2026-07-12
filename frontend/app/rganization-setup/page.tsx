"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// --- DEMO API MOCKS ---
// TODO: API INTEGRATION - Replace these with actual fetch calls to your FastAPI backend
const fetchDepartments = async () => [{ id: 1, name: "IT", head: "Alice Admin", status: "Active" }];
const fetchCategories = async () => [{ id: 1, name: "Electronics", hasWarranty: true }];
const fetchEmployees = async () => [
  { id: 101, name: "John Doe", email: "john@assetflow.com", dept: "IT", role: "Employee", status: "Active" },
  { id: 102, name: "Jane Smith", email: "jane@assetflow.com", dept: "HR", role: "Department Head", status: "Active" }
];

export default function OrganizationSetupScreen() {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // TODO: API INTEGRATION - Load initial data from backend endpoints
    // Example: fetch("http://localhost:8000/api/v1/departments").then(...)
    fetchDepartments().then(setDepartments as any);
    fetchCategories().then(setCategories as any);
    fetchEmployees().then(setEmployees as any);
  }, []);

  const promoteEmployee = (id: number, newRole: string) => {
    // TODO: API INTEGRATION - POST/PUT to /api/v1/employees/{id}/role
    console.log(`Promoting employee ${id} to ${newRole}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Organization Setup</h1>
      
      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="categories">Asset Categories</TabsTrigger>
          <TabsTrigger value="directory">Employee Directory</TabsTrigger>
        </TabsList>

        {/* TAB A: Departments */}
        <TabsContent value="departments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Manage organizational hierarchy and department heads.</CardDescription>
              </div>
              <Button>+ Add Department</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept: any) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.head}</TableCell>
                      <TableCell><Badge>{dept.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB B: Categories */}
        <TabsContent value="categories">
          <Card>
             {/* Similar Table Structure for Categories */}
             <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Asset Categories</CardTitle>
              <Button>+ Add Category</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Specific Fields</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat: any) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell>{cat.hasWarranty ? "Tracks Warranty" : "Standard"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB C: Employee Directory */}
        <TabsContent value="directory">
          <Card>
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>View staff and assign ERP roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp: any) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-medium">{emp.name}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>
                        <Badge variant={emp.role === "Employee" ? "secondary" : "default"}>
                          {emp.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => promoteEmployee(emp.id, 'Asset Manager')}>
                          Promote
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}