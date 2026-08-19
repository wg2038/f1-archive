"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { Team } from "@/lib/types";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor, formatPoints } from "@/lib/utils";

interface TeamViewClientProps {
  team: Team;
}

export function TeamViewClient({ team }: TeamViewClientProps) {
  const { lang, t, tName, dName, natName } = useLanguage();
  const teamColor = getTeamColor(team.constructor_id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Button */}
      <div>
        <Link
          href="/statistics"
          className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors bg-[#121217] px-3 py-1.5 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t("team.allTeams")}</span>
        </Link>
      </div>

      {/* 1. Team Header Dossier */}
      <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span
                className="w-4 h-4 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: teamColor }}
              />
              <span className="text-xs font-mono text-zinc-400">
                {natName(team)} • {lang === "zh" ? "总部" : "HQ"}: {team.headquarters || "N/A"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
              {tName(team)}
            </h1>
            {lang === "zh" && team.name !== tName(team) && (
              <div className="text-sm font-mono text-zinc-400">{team.name}</div>
            )}

            {team.lineage && (
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                {t("team.lineage")}: {team.lineage}
              </p>
            )}

            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400 pt-1">
              <span>
                {lang === "zh"
                  ? `在 2000–2025 年间参加了 ${team.active_seasons.length} 个赛季`
                  : `Active in ${team.active_seasons.length} Seasons (2000–2025)`}
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800 text-center min-w-[100px]">
              <div className="text-[10px] text-zinc-500 font-sans">{t("driver.titles")}</div>
              <div className="text-xl font-bold text-amber-400">{team.championships}</div>
            </div>
            <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800 text-center min-w-[100px]">
              <div className="text-[10px] text-zinc-500 font-sans">{t("driver.wins")}</div>
              <div className="text-xl font-bold text-red-400">{team.wins}</div>
            </div>
            <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800 text-center min-w-[100px]">
              <div className="text-[10px] text-zinc-500 font-sans">{t("driver.podiums")}</div>
              <div className="text-xl font-bold text-zinc-200">{team.podiums}</div>
            </div>
            <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800 text-center min-w-[100px]">
              <div className="text-[10px] text-zinc-500 font-sans">{t("driver.poles")}</div>
              <div className="text-xl font-bold text-zinc-200">{team.poles}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Historical Seasons Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>{lang === "zh" ? "历年赛季成绩单 (2000–2025)" : "Season by Season Performance (2000–2025)"}</span>
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            {team.seasons_history.length} {lang === "zh" ? "个参赛赛季" : "Seasons Active"}
          </span>
        </div>

        <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
          <div className="table-container">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-3 w-16 text-center font-mono">{lang === "zh" ? "赛季" : "Season"}</th>
                  <th className="py-3 px-3 text-center w-14">{t("th.pos")}</th>
                  <th className="py-3 px-3 text-right font-mono">{t("th.points")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.wins")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.podiums")}</th>
                  <th className="py-3 px-3 text-center font-mono">{t("th.poles")}</th>
                  <th className="py-3 px-3">{lang === "zh" ? "赛车与发动机" : "Chassis & Engine"}</th>
                  <th className="py-3 px-3 text-right">{t("th.hub")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {team.seasons_history.map((sh) => {
                  const car = team.cars.find((c) => c.season === sh.season);
                  return (
                    <tr
                      key={sh.season}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3 text-center font-mono font-bold text-zinc-200">
                        <Link
                          href={`/season/${sh.season}`}
                          className="hover:text-red-400 transition-colors"
                        >
                          {sh.season}
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <PositionBadge pos={sh.position} />
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-zinc-100 text-sm">
                        {formatPoints(sh.points)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-zinc-300">
                        {sh.wins > 0 ? (
                          <span className="text-red-400">{sh.wins}</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {sh.podiums > 0 ? sh.podiums : "-"}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {sh.poles > 0 ? sh.poles : "-"}
                      </td>
                      <td className="py-3 px-3 font-mono text-zinc-400">
                        {car ? (
                          <span>
                            {car.chassis} • {car.engine_supplier} {car.engine_model}
                          </span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/season/${sh.season}`}
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

      {/* 3. Driver Roster */}
      {team.drivers && team.drivers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>{t("team.roster")}</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">{team.drivers.length} {lang === "zh" ? "位车手" : "Drivers"}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {team.drivers.map((did) => (
              <Link
                key={did}
                href={`/driver/${did}`}
                className="bg-[#121217] hover:bg-[#181822] text-zinc-200 hover:text-red-400 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              >
                {did.replace(/_/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
