"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, AlertTriangle, CheckCircle2, History } from 'lucide-react';

// Mock database simulating live backend asset lookups and their complete log trail
const MOCK_ASSETS_DATABASE: Record<string, { 
  name: string; 
  currentHolder: string | null; 
  department: string | null;
  history: Array<{ date: string; description: string }>;
}> = {
  "AF-0114": {
    name: "Dell laptop",
    currentHolder: "Priya Shah",
    department: "Engineering",
    history: [
      { date: "Mar 12", description: "Allocated to Priya shah - Engineering" },
      { date: "Jan 04", description: "Returned by Arjun Nair - condition: good" }
    ]
  },
  "AF-0022": {
    name: "Logitech MX Master Mouse",
    currentHolder: null,
    department: null,
    history: [
      { date: "Feb 10", description: "Returned by Kabir Mehta - condition: excellent" }
    ]
  }
};

// Global default fallback log history when no specific asset search context matches yet
const GLOBAL_SYSTEM_HISTORY = [
  { date: "Mar 12", description: "Allocated to Priya shah - Engineering (AF-0114)" },
  { date: "Feb 10", description: "Returned by Kabir Mehta - condition: excellent (AF-0022)" },
  { date: "Jan 04", description: "Returned by Arjun Nair - condition: good (AF-0114)" }
];

export default function AssetAllocationPage() {
  const [searchTag, setSearchTag] = useState('');
  const [targetEmployee, setTargetEmployee] = useState('');
  const [transferReason, setTransferReason] = useState('');

  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isConflict, setIsConflict] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAssetCheck = (tagValue: string) => {
    setSearchTag(tagValue);
    
    // Clean string input to guarantee match hits
    const normalizedTag = tagValue.trim().toUpperCase();
    
    // TODO: BACKEND_INTEGRATION
    // Target Route: GET /api/v1/assets/{asset_tag}
    if (MOCK_ASSETS_DATABASE[normalizedTag]) {
      const asset = MOCK_ASSETS_DATABASE[normalizedTag];
      setSelectedAsset(asset);
      setIsConflict(!!asset.currentHolder); 
    } else {
      setSelectedAsset(null);
      setIsConflict(false);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (isConflict) {
      // TODO: BACKEND_INTEGRATION: POST /api/v1/allocations/transfer-request
      setStatusMessage(`Transfer workflow successfully initialized for ${searchTag.toUpperCase()}. Request routed to Department Head for approval.`);
    } else {
      // TODO: BACKEND_INTEGRATION: POST /api/v1/allocations/allocate
      setStatusMessage(`Asset ${searchTag.toUpperCase()} successfully allocated directly to ${targetEmployee}.`);
    }

    setTargetEmployee('');
    setTransferReason('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 md:p-10 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Asset Flow Console</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
            Screen 5: Asset allocation & Transfer (the double-allocation block in action)
          </p>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
          <form onSubmit={handleSubmitRequest} className="space-y-6">
            
            {/* Asset Input Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Asset</label>
              <input 
                type="text"
                placeholder="Type asset tag here (e.g., AF-0114)..."
                value={searchTag}
                onChange={(e) => handleAssetCheck(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-zinc-700 dark:text-white placeholder-zinc-400"
              />
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block">
                Type <strong>AF-0114</strong> to trigger the live allocation conflict alert panel state.
              </span>
            </div>

            {/* Mockup Red Conflict Block */}
            {isConflict && selectedAsset && (
              <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Already Allocated to {selectedAsset.currentHolder} ({selectedAsset.department})</p>
                  <p className="text-xs opacity-90 mt-0.5">Direct re-allocation is blocked - submit a transfer request below</p>
                </div>
              </div>
            )}

            {/* Transfer Fields Group */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Transfer Request Details
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">From</label>
                  <input 
                    type="text"
                    readOnly
                    placeholder="—"
                    value={isConflict && selectedAsset ? selectedAsset.currentHolder : ''}
                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 cursor-not-allowed focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">To</label>
                  <input 
                    type="text"
                    required
                    placeholder="Select Employee...."
                    value={targetEmployee}
                    onChange={(e) => setTargetEmployee(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-zinc-700 dark:text-white placeholder-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Reason</label>
                <textarea 
                  rows={4}
                  required={isConflict}
                  placeholder="Provide details regarding this asset reassignment request..."
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-zinc-700 dark:text-white placeholder-zinc-400"
                />
              </div>
            </div>

            {statusMessage && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-md text-sm flex items-start gap-2 border border-emerald-100 dark:border-emerald-900/30">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button type="submit" className={isConflict ? 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-700' : ''}>
                <ArrowLeftRight className="h-4 w-4 mr-2" /> Submit Request
              </Button>
            </div>
          </form>
        </div>

        {/* ALWAYS VISIBLE ALLOCATION HISTORY COMPONENT BOX */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <History className="h-4 w-4 text-zinc-400" /> 
            Allocation history {selectedAsset ? `for ${searchTag.toUpperCase()}` : '(Global Logs View)'}
          </h3>
          <div className="space-y-2 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4 ml-1">
            {selectedAsset ? (
              // Shows specific logs when a target hit occurs
              selectedAsset.history.map((log: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <span className="font-semibold text-zinc-600 dark:text-zinc-400 text-xs mr-2">{log.date} —</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-mono text-xs">{log.description}</span>
                </div>
              ))
            ) : (
              // Fallback logs show before user selects a row to keep the template full
              GLOBAL_SYSTEM_HISTORY.map((log: any, idx: number) => (
                <div key={idx} className="text-sm opacity-70">
                  <span className="font-semibold text-zinc-600 dark:text-zinc-400 text-xs mr-2">{log.date} —</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-mono text-xs">{log.description}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}