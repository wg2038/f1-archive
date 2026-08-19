"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gauge,
  ArrowLeft
} from "lucide-react";
import { Car } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor } from "@/lib/utils";

interface CarViewClientProps {
  car: Car;
}

export function CarViewClient({ car }: CarViewClientProps) {
  const { lang, t, tName, dName } = useLanguage();
  const teamColor = getTeamColor(car.constructor_id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/cars"
          className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors bg-[#121217] px-3 py-1.5 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "返回全部 275 辆赛车底盘库" : "All Formula 1 Cars (2000–2025)"}</span>
        </Link>
      </div>

      {/* 1. Car Dossier Hero */}
      <div className="bg-[#101015] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        {car.image && (
          <div className="relative w-full h-72 sm:h-96 bg-zinc-950 border-b border-zinc-800">
            <Image
              src={car.image}
              alt={`${car.team_name} ${car.chassis}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="era">{car.year} {lang === "zh" ? "FIA 一级方程式世界锦标赛" : "FIA Formula One Championship"}</Badge>
                <Badge variant="outline" className="font-mono">{car.engine_era}</Badge>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                {tName(car)} {car.chassis}
              </h1>
              <div className="flex items-center space-x-2 text-xs text-zinc-400 mt-1">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: teamColor }}
                />
                <Link href={`/team/${car.constructor_id}`} className="hover:text-zinc-200 font-medium">
                  {tName(car)}
                </Link>
                <span>•</span>
                <Link href={`/season/${car.year}`} className="hover:text-red-400 font-medium">
                  {car.year} {lang === "zh" ? "赛季总览" : "Season Hub"}
                </Link>
              </div>
            </div>

            {/* Performance Badges */}
            <div className="flex flex-wrap gap-2.5 font-mono">
              <div className="bg-[#16161d] p-3 rounded-lg border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "年终排名" : "RANK"}</div>
                <div className="text-lg font-bold text-amber-400">P{car.season_rank}</div>
              </div>
              <div className="bg-[#16161d] p-3 rounded-lg border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "胜场" : "WINS"}</div>
                <div className="text-lg font-bold text-red-400">{car.season_wins}</div>
              </div>
              <div className="bg-[#16161d] p-3 rounded-lg border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "领奖台" : "PODIUMS"}</div>
                <div className="text-lg font-bold text-zinc-200">{car.season_podiums}</div>
              </div>
              <div className="bg-[#16161d] p-3 rounded-lg border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "积分" : "POINTS"}</div>
                <div className="text-lg font-bold text-emerald-400">{car.season_points}</div>
              </div>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-zinc-800 font-mono text-xs">
            <div className="bg-[#14141a] p-4 rounded-xl border border-zinc-800/80 space-y-1.5">
              <div className="text-zinc-500 font-sans font-semibold uppercase text-[11px]">
                {lang === "zh" ? "赛车底盘代号" : "Chassis Designation"}
              </div>
              <div className="text-sm font-bold text-zinc-100">{car.chassis}</div>
              <div className="text-zinc-400 font-sans">{lang === "zh" ? "引擎供应商:" : "Engine Supplier:"} {car.engine_supplier}</div>
            </div>

            <div className="bg-[#14141a] p-4 rounded-xl border border-zinc-800/80 space-y-1.5">
              <div className="text-zinc-500 font-sans font-semibold uppercase text-[11px]">
                {lang === "zh" ? "动力单元与引擎规格" : "Power Unit Specification"}
              </div>
              <div className="text-sm font-bold text-zinc-100">{car.engine_model}</div>
              <div className="text-zinc-400 font-sans">{lang === "zh" ? "时代规程:" : "Formula Era:"} {car.engine_era}</div>
            </div>

            <div className="bg-[#14141a] p-4 rounded-xl border border-zinc-800/80 space-y-1.5">
              <div className="text-zinc-500 font-sans font-semibold uppercase text-[11px]">
                {lang === "zh" ? `驾驶车手阵容 (${car.year})` : `Drivers Lineup (${car.year})`}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {car.drivers.map((d) => (
                  <Link
                    key={d.driver_id}
                    href={`/driver/${d.driver_id}`}
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 px-2 py-0.5 rounded text-[11px]"
                  >
                    #{d.number} {d.driver_id.replace("_", " ")}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
