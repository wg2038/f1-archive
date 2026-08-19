"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gauge, ArrowRight } from "lucide-react";
import { Car } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor } from "@/lib/utils";

export default function CarsCatalogPage() {
  const { lang, t, tName } = useLanguage();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetch("/data/cars.json")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="era">{lang === "zh" ? "技术底盘库" : "TECHNICAL DOSSIER"}</Badge>
          <span className="text-xs font-mono text-zinc-400">2000–2025 Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-mono">
          {lang === "zh" ? "275 辆 F1 赛车底盘与动力单元" : "275 Formula 1 Cars & Engines"}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {lang === "zh"
            ? "收录 2000–2025 年间参赛的每一辆 F1 赛车底盘代号、引擎型号、供应商与参赛战绩档案。"
            : "Comprehensive technical and sporting records of every Grand Prix car, engine architecture, and powertrain configuration engineered for the FIA Formula 1 World Championship."}
        </p>
      </div>

      {/* Grid of Cars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cars.map((car) => {
          const teamColor = getTeamColor(car.constructor_id);
          return (
            <div
              key={car.slug}
              className="bg-[#111116] border border-zinc-800/90 hover:border-zinc-700 rounded-xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo or placeholder */}
                <div className="relative w-full h-44 bg-[#16161d] overflow-hidden border-b border-zinc-800/80">
                  {car.image ? (
                    <Image
                      src={car.image}
                      alt={`${car.team_name} ${car.chassis}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 font-mono">
                      <Gauge className="w-8 h-8 mb-1 text-zinc-700" />
                      <span className="text-sm font-bold text-zinc-500">{car.chassis}</span>
                      <span className="text-[10px] text-zinc-600">{lang === "zh" ? "技术规格档案已收录" : "Technical Data Available"}</span>
                    </div>
                  )}

                  {/* Season pill */}
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm border border-zinc-700 px-2 py-0.5 rounded text-xs font-mono font-bold text-zinc-200">
                    {car.year}
                  </div>

                  {car.season_wins > 0 && (
                    <div className="absolute top-2 right-2 bg-red-950/80 backdrop-blur-sm border border-red-800/80 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-red-300">
                      🏆 {car.season_wins} {lang === "zh" ? "胜" : "Wins"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/car/${car.slug}`}
                        className="font-bold text-base text-zinc-100 group-hover:text-red-400 transition-colors"
                      >
                        {tName(car)} {car.chassis}
                      </Link>
                      <div className="flex items-center space-x-1.5 text-xs text-zinc-400 mt-0.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: teamColor }}
                        />
                        <Link href={`/team/${car.constructor_id}`} className="hover:text-zinc-200">
                          {tName(car)}
                        </Link>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-mono text-[11px]">
                      {car.engine_era}
                    </Badge>
                  </div>

                  <div className="text-xs font-mono text-zinc-400 space-y-1 pt-1 border-t border-zinc-800/60">
                    <div>⚙️ {lang === "zh" ? "发动机" : "Engine"}: <span className="text-zinc-300">{car.engine_model}</span></div>
                    <div>🏭 {lang === "zh" ? "供应商" : "Supplier"}: <span className="text-zinc-300">{car.engine_supplier}</span></div>
                    {car.season_rank !== "N/A" && (
                      <div>
                        📊 {lang === "zh" ? "年终排名" : "Championship"}: <span className="text-amber-400 font-bold">P{car.season_rank}</span> ({car.season_points} pts)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-[#0d0d10] border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <Link
                  href={`/season/${car.year}`}
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  {car.year} {lang === "zh" ? "赛季" : "Season"}
                </Link>
                <Link
                  href={`/car/${car.slug}`}
                  className="text-red-400 hover:text-red-300 font-medium flex items-center space-x-1"
                >
                  <span>{lang === "zh" ? "技术规格档案" : "Technical Dossier"}</span>
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
