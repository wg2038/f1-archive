"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, User, Shield, MapPin, Gauge, Calendar, ArrowRight } from "lucide-react";
import { SearchSummary, SearchItem } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [data, setData] = useState<SearchSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/summary.json")
      .then((res) => res.json())
      .then((d: SearchSummary) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const q = query.toLowerCase().trim();

  const filterItems = (items: SearchItem[] = []) => {
    if (!q) return items.slice(0, 8);
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  };

  const filteredDrivers = filterItems(data?.drivers);
  const filteredTeams = filterItems(data?.teams);
  const filteredCircuits = filterItems(data?.circuits);
  const filteredCars = filterItems(data?.cars);
  const filteredSeasons = filterItems(data?.seasons);

  const totalCount =
    filteredDrivers.length +
    filteredTeams.length +
    filteredCircuits.length +
    filteredCars.length +
    filteredSeasons.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Input Bar */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase">
          F1 Historical Database Search
        </h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drivers, constructors, chassis, circuits, seasons..."
            className="w-full pl-12 pr-4 py-3 bg-[#111116] border border-zinc-700 rounded-xl text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 shadow-lg"
          />
        </div>
        <div className="text-xs text-zinc-400 font-mono">
          {loading ? "Indexing database..." : `Found ${totalCount} results for "${query || "all"}"`}
        </div>
      </div>

      {/* Grouped Results */}
      <div className="space-y-8">
        {/* Drivers */}
        {filteredDrivers.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Drivers ({filteredDrivers.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDrivers.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="bg-[#121217] hover:bg-[#181822] border border-zinc-800 hover:border-blue-500/50 rounded-lg p-3.5 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-200 group-hover:text-blue-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Teams */}
        {filteredTeams.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Constructors ({filteredTeams.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTeams.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="bg-[#121217] hover:bg-[#181822] border border-zinc-800 hover:border-amber-500/50 rounded-lg p-3.5 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-200 group-hover:text-amber-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Circuits */}
        {filteredCircuits.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Circuits ({filteredCircuits.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCircuits.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="bg-[#121217] hover:bg-[#181822] border border-zinc-800 hover:border-emerald-500/50 rounded-lg p-3.5 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-200 group-hover:text-emerald-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Cars */}
        {filteredCars.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-purple-400" />
              <span>Chassis & Engines ({filteredCars.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCars.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="bg-[#121217] hover:bg-[#181822] border border-zinc-800 hover:border-purple-500/50 rounded-lg p-3.5 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-200 group-hover:text-purple-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Seasons */}
        {filteredSeasons.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-red-400" />
              <span>Seasons ({filteredSeasons.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSeasons.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="bg-[#121217] hover:bg-[#181822] border border-zinc-800 hover:border-red-500/50 rounded-lg p-3.5 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-zinc-200 group-hover:text-red-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
