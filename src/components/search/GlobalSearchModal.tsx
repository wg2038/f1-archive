"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, User, Shield, MapPin, Gauge, Calendar, ChevronRight } from "lucide-react";
import { SearchSummary, SearchItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      if (!data) {
        setIsLoading(true);
        fetch("/data/summary.json")
          .then((res) => res.json())
          .then((d: SearchSummary) => {
            setData(d);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      }
    }
  }, [isOpen, data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filterList = (list: any[] = []) => {
    if (!q) return list.slice(0, 4);
    return list.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.title_cn?.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q)
    ).slice(0, 6);
  };

  const filteredDrivers = filterList(data?.drivers);
  const filteredTeams = filterList(data?.teams);
  const filteredCircuits = filterList(data?.circuits);
  const filteredCars = filterList(data?.cars);
  const filteredSeasons = filterList(data?.seasons);

  const totalResults =
    filteredDrivers.length +
    filteredTeams.length +
    filteredCircuits.length +
    filteredCars.length +
    filteredSeasons.length;

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const getItemTitle = (item: any) => {
    if (lang === "zh" && item.title_cn) {
      return `${item.title_cn} (${item.title})`;
    }
    return item.title;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#121216] border border-zinc-700/80 rounded-xl shadow-2xl overflow-hidden text-zinc-100">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 bg-[#15151a]">
          <Search className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "zh"
                ? "搜索车手（如舒马赫）、车队（法拉利）、赛车、赛道、赛季..."
                : "Search drivers (Schumacher), teams (Ferrari), cars, circuits, seasons..."
            }
            className="w-full bg-transparent text-sm placeholder-zinc-500 focus:outline-none text-zinc-100"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded border border-zinc-700 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {isLoading && (
            <div className="py-8 text-center text-sm text-zinc-400">
              {lang === "zh" ? "正在索引 F1 历史数据库..." : "Loading F1 database index..."}
            </div>
          )}

          {!isLoading && totalResults === 0 && (
            <div className="py-8 text-center text-sm text-zinc-400">
              {lang === "zh" ? `未找到与 “${query}” 相关的内容` : `No results matching “${query}”`}
            </div>
          )}

          {/* Drivers */}
          {filteredDrivers.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <User className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                {lang === "zh" ? "车手" : "Drivers"} ({filteredDrivers.length})
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filteredDrivers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-100 group-hover:text-red-400">
                        {getItemTitle(item)}
                      </div>
                      <div className="text-xs text-zinc-400">{item.subtitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teams */}
          {filteredTeams.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <Shield className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                {lang === "zh" ? "制造车队" : "Constructors"} ({filteredTeams.length})
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filteredTeams.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-100 group-hover:text-amber-400">
                        {getItemTitle(item)}
                      </div>
                      <div className="text-xs text-zinc-400">{item.subtitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Circuits */}
          {filteredCircuits.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                {lang === "zh" ? "大奖赛赛道" : "Circuits"} ({filteredCircuits.length})
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filteredCircuits.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-100 group-hover:text-emerald-400">
                        {getItemTitle(item)}
                      </div>
                      <div className="text-xs text-zinc-400">{item.subtitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cars */}
          {filteredCars.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <Gauge className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                {lang === "zh" ? "赛车与引擎" : "Cars & Engines"} ({filteredCars.length})
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filteredCars.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-100 group-hover:text-purple-400">
                        {getItemTitle(item)}
                      </div>
                      <div className="text-xs text-zinc-400">{item.subtitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seasons */}
          {filteredSeasons.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-red-400" />
                {lang === "zh" ? "历史赛季" : "Seasons"} ({filteredSeasons.length})
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filteredSeasons.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-100 group-hover:text-red-400">
                        {getItemTitle(item)}
                      </div>
                      <div className="text-xs text-zinc-400">{item.subtitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#0e0e11] border-t border-zinc-800 text-[11px] text-zinc-500 flex justify-between items-center">
          <div>Formula 1 Historical Archive (2000–2025)</div>
          <div className="font-mono text-zinc-400">26 赛季 • 491 场大奖赛 • 129 位车手</div>
        </div>
      </div>
    </div>
  );
}
