import React from "react";
import Link from "next/link";
import { Flag, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-500 mx-auto">
          <Flag className="w-8 h-8" />
        </div>
        <div className="text-4xl font-extrabold font-mono text-white">404</div>
        <h1 className="text-xl font-bold text-zinc-200">Historical Telemetry Record Not Found</h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          The requested season, driver, constructor, car, or Grand Prix session does not exist in the 2000–2025 archive database.
        </p>
        <div className="pt-2 flex justify-center space-x-3">
          <Link
            href="/"
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Archive Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
