"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center text-amber-500 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="text-2xl font-bold text-zinc-100">Telemetry Pipeline Exception</div>
        <p className="text-xs text-zinc-400 leading-relaxed font-mono">
          {error.message || "An unexpected error occurred while querying the historical database."}
        </p>
        <div className="pt-2 flex justify-center space-x-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 border border-zinc-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Query</span>
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
