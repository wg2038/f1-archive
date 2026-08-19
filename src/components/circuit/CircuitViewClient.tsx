"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Trophy,
  ArrowLeft,
  Layers
} from "lucide-react";
import { Circuit } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n";

interface CircuitViewClientProps {
  circuit: Circuit;
}

export function CircuitViewClient({ circuit }: CircuitViewClientProps) {
  const { lang, t, cName, dName, tName, rName, natName } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Button */}
      <div>
        <Link
          href="/circuits"
          className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors bg-[#121217] px-3 py-1.5 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "全部 38 条大奖赛赛道" : "All 38 Circuits"}</span>
        </Link>
      </div>

      {/* 1. Circuit Header Dossier */}
      <div className="bg-[#101015] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Circuit Info (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="era">{circuit.track_type}</Badge>
              <Badge variant="outline" className="font-mono text-zinc-400">
                {lang === "zh" ? `比赛方向: ${circuit.direction === "Clockwise" ? "顺时针" : "逆时针"}` : `Direction: ${circuit.direction}`}
              </Badge>
              <span className="text-xs font-mono text-zinc-500">
                {lang === "zh" ? `F1 首战: ${circuit.first_f1_race}` : `F1 Debut: ${circuit.first_f1_race}`}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
              {cName(circuit)}
            </h1>
            {lang === "zh" && circuit.official_name !== cName(circuit) && (
              <div className="text-sm font-mono text-zinc-400">{circuit.official_name}</div>
            )}

            <div className="text-sm text-zinc-400 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>
                {circuit.city}, {natName(circuit)} ({circuit.location?.lat}, {circuit.location?.lng})
              </span>
            </div>

            {/* Track Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800 font-mono text-xs">
              <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "单圈长度" : "TRACK LENGTH"}</div>
                <div className="text-base font-bold text-zinc-100 mt-1">{circuit.current_length_km} km</div>
              </div>
              <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "弯道数量" : "CORNERS / TURNS"}</div>
                <div className="text-base font-bold text-zinc-100 mt-1">{circuit.current_corners} {lang === "zh" ? "个弯" : "turns"}</div>
              </div>
              <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "正赛圈数" : "RACE LAPS"}</div>
                <div className="text-base font-bold text-zinc-100 mt-1">{circuit.race_laps} {lang === "zh" ? "圈" : "Laps"}</div>
              </div>
              <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-sans">{lang === "zh" ? "比赛总里程" : "RACE DISTANCE"}</div>
                <div className="text-base font-bold text-zinc-100 mt-1">{circuit.race_distance_km} km</div>
              </div>
            </div>

            {/* Lap Record Card */}
            {circuit.lap_record && (
              <div className="bg-[#15151e] border border-purple-500/30 p-3.5 rounded-xl font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="text-purple-400 font-bold block text-[11px] font-sans">
                    {lang === "zh" ? "官方正赛最快圈速纪录" : "OFFICIAL LAP RECORD"}
                  </span>
                  <span className="text-zinc-200 font-bold text-sm">
                    {circuit.lap_record.driver} ({circuit.lap_record.year})
                  </span>
                  {circuit.lap_record.car && (
                    <span className="text-zinc-400 text-[11px] block font-sans">
                      {lang === "zh" ? `驾驶赛车: ${circuit.lap_record.car}` : `Car: ${circuit.lap_record.car}`}
                    </span>
                  )}
                </div>
                <div className="text-lg font-bold text-purple-400">
                  {circuit.lap_record.time}
                </div>
              </div>
            )}
          </div>

          {/* Circuit Map (Right) */}
          <div className="lg:col-span-5 bg-[#14141a] rounded-xl p-6 border border-zinc-800/80 flex items-center justify-center min-h-[260px] relative">
            {circuit.image ? (
              <div className="relative w-full h-64">
                <Image
                  src={circuit.image}
                  alt={circuit.official_name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain filter invert opacity-95"
                  priority
                />
              </div>
            ) : (
              <div className="text-center text-zinc-600 font-mono">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-zinc-700" />
                <p className="text-xs text-zinc-500">{lang === "zh" ? "赛道几何示意图" : "Track Map Schematic Geometry"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Historical Layout Evolution */}
      {circuit.historical_layouts && circuit.historical_layouts.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{lang === "zh" ? "历史赛道布局改建与演变版本" : "Historical Track Layout Configurations"}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {lang === "zh"
                ? "赛道改建、减速弯重新设计与高速弯道改动历史。"
                : "Modifications, chicane redesigns, and speed alterations across Formula 1 regulatory eras."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {circuit.historical_layouts.map((layout, idx) => (
              <Card key={idx} className="p-5 bg-[#121217] border-zinc-800 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <Badge variant="era">{layout.era}</Badge>
                  <span className="text-xs font-mono text-zinc-400 font-bold">
                    {layout.length_km} km • {layout.corners} {lang === "zh" ? "个弯道" : "Corners"}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {layout.description}
                </p>
                {layout.lap_record && (
                  <div className="pt-2 border-t border-zinc-800/60 text-xs font-mono text-zinc-400 flex justify-between">
                    <span>{lang === "zh" ? "该版本纪录:" : "Era Record:"}</span>
                    <span className="text-purple-400 font-bold">
                      {layout.lap_record.time} ({layout.lap_record.driver}, {layout.lap_record.year})
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3. 2000–2025 Grand Prix History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>{lang === "zh" ? "该赛道 F1 大奖赛历史战绩 (2000–2025)" : "Formula 1 Grand Prix Race History (2000–2025)"}</span>
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            {circuit.total_grands_prix} {lang === "zh" ? "场大奖赛" : "Races Hosted"}
          </span>
        </div>

        <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
          <div className="table-container">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-3 w-20 font-mono text-center">{lang === "zh" ? "赛季" : "Season"}</th>
                  <th className="py-3 px-3">{t("th.gp")}</th>
                  <th className="py-3 px-3 hidden sm:table-cell font-mono">{t("th.date")}</th>
                  <th className="py-3 px-3">{t("th.winner")} 🥇</th>
                  <th className="py-3 px-3">{lang === "zh" ? "获胜车队" : "Winning Constructor"}</th>
                  <th className="py-3 px-3 text-right">{t("th.hub")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {circuit.races_history.map((r) => (
                  <tr
                    key={`${r.season}-${r.round}`}
                    className="hover:bg-zinc-800/40 transition-colors group"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-zinc-200 text-center">
                      <Link href={`/season/${r.season}`} className="hover:text-red-400">
                        {r.season}
                      </Link>
                    </td>
                    <td className="py-3 px-3 font-semibold text-zinc-200">
                      <Link
                        href={`/race/${r.season}/${r.race_slug}`}
                        className="hover:text-red-400 transition-colors"
                      >
                        {rName(r)}
                      </Link>
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-400 hidden sm:table-cell">
                      {r.date || "N/A"}
                    </td>
                    <td className="py-3 px-3">
                      {r.winner ? (
                        <Link
                          href={`/driver/${r.winner.driver_id}`}
                          className="font-bold text-amber-400 hover:text-amber-300"
                        >
                          {dName(r.winner)}
                        </Link>
                      ) : (
                        <span className="text-zinc-600">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-zinc-300 font-medium">
                      {tName(r.winner)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/race/${r.season}/${r.race_slug}`}
                        className="text-xs text-red-400 hover:text-red-300 font-semibold"
                      >
                        {lang === "zh" ? "成绩详情 →" : "Session Results →"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
