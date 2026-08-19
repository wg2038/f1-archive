"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Calendar,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { Driver } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { CareerProgressionChart } from "@/components/charts/CareerProgressionChart";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor, formatPoints } from "@/lib/utils";

interface DriverViewClientProps {
  driver: Driver;
}

export function DriverViewClient({ driver }: DriverViewClientProps) {
  const { lang, t, dName, tName, natName } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/statistics"
          className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors bg-[#121217] px-3 py-1.5 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t("driver.allDrivers")}</span>
        </Link>
      </div>

      {/* 1. Driver Profile Hero Header */}
      <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          {/* Portrait Photo */}
          <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-zinc-900 border-2 border-zinc-700/80 flex-shrink-0 shadow-lg">
            {driver.image ? (
              <Image
                src={driver.image}
                alt={driver.full_name}
                fill
                sizes="(max-width: 768px) 150px, 200px"
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 font-mono">
                <span className="text-3xl font-bold">{driver.code || "F1"}</span>
                <span className="text-xs mt-1 text-zinc-600">Portrait N/A</span>
              </div>
            )}
            {driver.championships > 0 && (
              <div className="absolute top-2 right-2 bg-black/85 backdrop-blur-sm border border-amber-500/50 rounded px-2 py-0.5 text-xs font-bold text-amber-300 font-mono">
                {driver.championships}× {lang === "zh" ? "世界冠军" : "WDC"}
              </div>
            )}
          </div>

          {/* Details & Metrics */}
          <div className="flex-grow text-center md:text-left space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-zinc-300">
                  {driver.code || "DRV"}
                </Badge>
                <span className="text-xs font-mono text-zinc-400">
                  {natName(driver)}
                </span>
                {driver.date_of_birth && (
                  <span className="text-xs text-zinc-500">
                    • {lang === "zh" ? `出生于 ${driver.date_of_birth}` : `Born ${driver.date_of_birth}`}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                {dName(driver)}
              </h1>
              {lang === "zh" && driver.full_name !== dName(driver) && (
                <div className="text-sm font-mono text-zinc-400 mt-1">{driver.full_name}</div>
              )}

              {/* Active Teams */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-3">
                {(lang === "zh" && driver.teams_cn && driver.teams_cn.length > 0 ? driver.teams_cn : driver.teams).map((tStr) => (
                  <span
                    key={tStr}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
                  >
                    {tStr}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Metrics Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-4 border-t border-zinc-800 font-mono">
              <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-sans">{t("driver.titles")}</div>
                <div className="text-lg font-bold text-amber-400">{driver.championships}</div>
              </div>
              <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-sans">{t("driver.wins")}</div>
                <div className="text-lg font-bold text-red-400">{driver.wins}</div>
              </div>
              <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-sans">{t("driver.podiums")}</div>
                <div className="text-lg font-bold text-zinc-200">{driver.podiums}</div>
              </div>
              <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-sans">{t("driver.poles")}</div>
                <div className="text-lg font-bold text-zinc-200">{driver.poles}</div>
              </div>
              <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-sans">{t("driver.fls")}</div>
                <div className="text-lg font-bold text-purple-400">{driver.fastest_laps}</div>
              </div>
              <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-sans">{t("driver.points")}</div>
                <div className="text-lg font-bold text-emerald-400">{formatPoints(driver.points)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Career Progression Chart */}
      {driver.season_records && driver.season_records.length > 0 && (
        <Card className="p-6 bg-[#101014] border-zinc-800/90">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span>{t("driver.seasonTrend")}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{t("driver.seasonTrendSub")}</p>
            </div>
          </div>
          <CareerProgressionChart data={driver.season_records} />
        </Card>
      )}

      {/* 3. Season by Season Breakdown Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>{t("driver.recordsTitle")}</span>
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            {driver.season_records.length} {lang === "zh" ? "个赛季" : "Seasons"}
          </span>
        </div>

        <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
          <div className="table-container">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-3 w-16 text-center font-mono">{lang === "zh" ? "赛季" : "Season"}</th>
                  <th className="py-3 px-3">{t("th.team")}</th>
                  <th className="py-3 px-3 text-center w-14">{t("th.pos")}</th>
                  <th className="py-3 px-3 text-right font-mono">{t("th.points")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.wins")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.podiums")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.poles")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.fl")}</th>
                  <th className="py-3 px-3 text-right">{t("th.hub")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {driver.season_records.map((sr) => {
                  const teamColor = getTeamColor(sr.constructor_id);
                  return (
                    <tr
                      key={sr.season}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3 text-center font-mono font-bold text-zinc-200">
                        <Link
                          href={`/season/${sr.season}`}
                          className="hover:text-red-400 transition-colors"
                        >
                          {sr.season}
                        </Link>
                      </td>
                      <td className="py-3 px-3">
                        <Link
                          href={`/team/${sr.constructor_id}`}
                          className="flex items-center space-x-2 font-medium text-zinc-300 hover:text-zinc-100"
                        >
                          <span
                            className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                            style={{ backgroundColor: teamColor }}
                          />
                          <span>{tName(sr)}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <PositionBadge pos={sr.position} />
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-zinc-100 text-sm">
                        {formatPoints(sr.points)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-zinc-300">
                        {sr.wins > 0 ? (
                          <span className="text-red-400">{sr.wins}</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {sr.podiums > 0 ? sr.podiums : "-"}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {sr.poles > 0 ? sr.poles : "-"}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {sr.fastest_laps > 0 ? sr.fastest_laps : "-"}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/season/${sr.season}`}
                          className="text-xs text-red-400 hover:text-red-300 font-semibold"
                        >
                          {lang === "zh" ? "查看赛季 →" : "View Season →"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
