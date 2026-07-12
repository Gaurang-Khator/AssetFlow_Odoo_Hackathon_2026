"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Calendar, 
  AlertTriangle, 
  Package, 
  CheckCircle, 
  Clock, 
  Layers, 
  ArrowLeftRight, 
  Shield, 
  BarChart3, 
  UserCheck 
} from 'lucide-react';

export default function RootPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulated metrics for the Operational Home Page
  const [metrics] = useState({
    assetsAvailable: 124,
    assetsAllocated: 89,
    maintenanceToday: 5,
    activeBookings: 12,
    pendingTransfers: 3,
    upcomingReturns: 7
  });

  const [overdueReturns] = useState([
    { id: 'AF-0114', name: 'MacBook Pro 16"', holder: 'Priya Sharma', overdueDays: 4 },
    { id: 'AF-0492', name: 'Dell Monitor 27"', holder: 'Raj Patel', overdueDays: 2 }
  ]);

  useEffect(() => {
    // TODO: BACKEND_INTEGRATION
    // Replace this check with your official token/session validation logic.
    // For now, it checks if a user token exists in localStorage.
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <p className="text-zinc-500 animate-pulse">Loading AssetFlow workspace...</p>
      </div>
    );
  }

  // ==========================================
  // VIEW A: PUBLIC LANDING DASHBOARD (Not Logged In)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col justify-between">
        {/* Navbar */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">AssetFlow</span>
            <div className="flex gap-3">
              <Link href="/login"><Button variant="outline">Log In</Button></Link>
              <Link href="/signup"><Button>Sign Up</Button></Link>
            </div>
          </div>
        </header>

        {/* Hero Dashboard Content */}
        <main className="max-w-7xl mx-auto px-6 py-16 flex-1 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 rounded-full">
              Enterprise Resource Planning
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Simplify and digitize your organization's physical assets[cite: 1].
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Track lifecycle states, allocate gear seamlessly without double-booking conflicts, and run automated audit cycles in one place[cite: 1].
            </p>
            <div className="flex gap-4">
              <Link href="/signup">
                <Button size="lg" className="px-6">Get Started as Employee</Button>
              </Link>
            </div>
          </div>

          {/* Feature Highlight Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm space-y-2">
              <Shield className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
              <h3 className="font-semibold text-zinc-950 dark:text-white">Role-based Access</h3>
              <p className="text-xs text-zinc-500">Secure directory mapping for Employees, Asset Managers, and Admins[cite: 1].</p>
            </div>
            <div className="p-5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm space-y-2">
              <ArrowLeftRight className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
              <h3 className="font-semibold text-zinc-950 dark:text-white">Conflict Prevention</h3>
              <p className="text-xs text-zinc-500">Intelligent engine handles overlap blockades for physical items & rooms[cite: 1].</p>
            </div>
            <div className="p-5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm space-y-2">
              <BarChart3 className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
              <h3 className="font-semibold text-zinc-950 dark:text-white">Audit Tracking</h3>
              <p className="text-xs text-zinc-500">Run structured verification cycles and auto-generate discrepancy logs[cite: 1].</p>
            </div>
            <div className="p-5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm space-y-2">
              <UserCheck className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
              <h3 className="font-semibold text-zinc-950 dark:text-white">Lifecycle States</h3>
              <p className="text-xs text-zinc-500">Track states instantly from Available to Maintenance or Retired[cite: 1].</p>
            </div>
          </div>
        </main>

        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500">
          AssetFlow System Central Module. All rights reserved.
        </footer>
      </div>
    );
  }

  // ==========================================
  // VIEW B: OPERATIONAL INTERNAL HOME PAGE (Logged In)
  // ==========================================
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">AssetFlow Workspace</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Welcome back! Real-time operational snapshot[cite: 1].</p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            {/* Quick Actions Panel */}
            <Button className="flex items-center gap-2" variant="outline">
              <PlusCircle className="h-4 w-4" /> Register Asset[cite: 1]
            </Button>
            <Button className="flex items-center gap-2" variant="outline">
              <Calendar className="h-4 w-4" /> Book Resource[cite: 1]
            </Button>
            <Button className="flex items-center gap-2" variant="destructive">
              <AlertTriangle className="h-4 w-4" /> Raise Maintenance[cite: 1]
            </Button>
            <Button onClick={handleLogout} variant="ghost" className="text-zinc-500 hover:text-zinc-950">
              Log Out
            </Button>
          </div>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* Operational KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-zinc-500"><span className="text-xs font-medium uppercase tracking-wider">Available</span><Package className="h-4 w-4 text-emerald-500" /></div>
            <div className="text-2xl font-bold mt-2 text-zinc-950 dark:text-white">{metrics.assetsAvailable}</div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-zinc-500"><span className="text-xs font-medium uppercase tracking-wider">Allocated</span><CheckCircle className="h-4 w-4 text-blue-500" /></div>
            <div className="text-2xl font-bold mt-2 text-zinc-950 dark:text-white">{metrics.assetsAllocated}</div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-zinc-500"><span className="text-xs font-medium uppercase tracking-wider">Maintenance</span><AlertTriangle className="h-4 w-4 text-amber-500" /></div>
            <div className="text-2xl font-bold mt-2 text-zinc-950 dark:text-white">{metrics.maintenanceToday}</div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-zinc-500"><span className="text-xs font-medium uppercase tracking-wider">Active Bookings</span><Calendar className="h-4 w-4 text-purple-500" /></div>
            <div className="text-2xl font-bold mt-2 text-zinc-950 dark:text-white">{metrics.activeBookings}</div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-zinc-500"><span className="text-xs font-medium uppercase tracking-wider">Transfers</span><ArrowLeftRight className="h-4 w-4 text-indigo-500" /></div>
            <div className="text-2xl font-bold mt-2 text-zinc-950 dark:text-white">{metrics.pendingTransfers}</div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between text-zinc-500"><span className="text-xs font-medium uppercase tracking-wider">Upcoming Returns</span><Clock className="h-4 w-4 text-zinc-500" /></div>
            <div className="text-2xl font-bold mt-2 text-zinc-950 dark:text-white">{metrics.upcomingReturns}</div>
          </div>
        </div>

        {/* Highlighted Overdue Exceptions Section */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-rose-200 dark:border-rose-950/50 shadow-sm overflow-hidden">
          <div className="bg-rose-50 dark:bg-rose-950/20 px-6 py-4 border-b border-rose-100 dark:border-rose-950/40 flex items-center gap-2">
            <Layers className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-lg font-semibold text-rose-900 dark:text-rose-300">Action Required: Overdue Asset Returns[cite: 1]</h2>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {overdueReturns.map((item) => (
              <div key={item.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold">{item.id}</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Currently held by: <strong className="text-zinc-700 dark:text-zinc-300">{item.holder}</strong></p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-sm font-medium text-rose-600 dark:text-rose-400">{item.overdueDays} days past expected date[cite: 1]</span>
                  <Button size="sm" variant="outline" className="text-xs">Ping User</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}