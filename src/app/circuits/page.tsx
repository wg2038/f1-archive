"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Circuit } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";

export default function CircuitsCatalogPage() {
  const { lang, t, cName, natName } = useLanguage();
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  useEffect(() => {
    fetch("/data/circuits.json")
      .then((res) => res.json())
      .then((data) => setCircuits(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="era">{lang === "zh" ? "赛道几何蓝图" : "CIRCUIT BLUEPRINTS"}</Badge>
          <span className="text-xs font-mono text-zinc-400">{lang === "zh" ? "38 条赛道 (2000–2025)" : "38 Tracks (2000–2025)"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-mono">
          {lang === "zh" ? "F1 世界锦标赛赛道总览" : "World Championship Circuits"}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {lang === "zh"
            ? "收录 2000–2025 年间举办过 F1 大奖赛的全部 38 条赛道架构、弯道编号、圈速纪录与历史改建版本。"
            : "Detailed track architectures, corner numbers, DRS zones, lap records, and historic layout configurations across every Grand Prix circuit hosted in the modern era."}
        </p>
      </div>

      {/* Grid of Circuits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {circuits.map((circuit) => {
          return (
            <div
              key={circuit.circuit_id}
              className="bg-[#111116] border border-zinc-800/90 hover:border-zinc-700 rounded-xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Circuit Layout Map */}
                <div className="relative w-full h-48 bg-[#15151c] overflow-hidden border-b border-zinc-800/80 p-4 flex items-center justify-center">
                  {circuit.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={circuit.image}
                        alt={circuit.official_name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain filter invert opacity-90 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-600 font-mono">
                      <MapPin className="w-8 h-8 mb-1 text-zinc-700" />
                      <span className="text-xs text-zinc-500">{lang === "zh" ? "赛道几何档案已收录" : "Track Geometry Catalog"}</span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm border border-zinc-700 px-2 py-0.5 rounded text-xs font-mono font-bold text-emerald-400">
                    {circuit.total_grands_prix} {lang === "zh" ? "场大奖赛" : "GPs"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <Link
                      href={`/circuit/${circuit.circuit_id}`}
                      className="font-bold text-base text-zinc-100 group-hover:text-emerald-400 transition-colors"
                    >
                      {cName(circuit)}
                    </Link>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {circuit.city}, {natName(circuit)} • <span className="text-zinc-500">{circuit.track_type}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800/60">
                    <div>
                      <span className="text-zinc-500 text-[10px] block">{lang === "zh" ? "单圈长度" : "LENGTH"}</span>
                      <span className="text-zinc-200">{circuit.current_length_km} km</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">{lang === "zh" ? "弯道数量" : "CORNERS"}</span>
                      <span className="text-zinc-200">{circuit.current_corners} {lang === "zh" ? "个弯" : "turns"}</span>
                    </div>
                  </div>

                  {circuit.lap_record && (
                    <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 p-2 rounded border border-zinc-800/80">
                      ⚡ {lang === "zh" ? "最快圈:" : "Record:"} <span className="text-purple-400 font-bold">{circuit.lap_record.time}</span> ({circuit.lap_record.driver}, {circuit.lap_record.year})
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-[#0d0d10] border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">
                  {lang === "zh" ? `举办历史: ${circuit.first_f1_race}–${circuit.last_f1_race}` : `Active: ${circuit.first_f1_race}–${circuit.last_f1_race}`}
                </span>
                <Link
                  href={`/circuit/${circuit.circuit_id}`}
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center space-x-1"
                >
                  <span>{lang === "zh" ? "赛道历史与布局" : "Track History"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
