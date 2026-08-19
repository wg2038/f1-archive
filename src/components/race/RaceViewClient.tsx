"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Flag,
  Calendar,
  MapPin,
  Clock,
  Zap,
  Gauge,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Race, SeasonDetail } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor, formatPoints } from "@/lib/utils";

interface RaceViewClientProps {
  race: Race;
  season: SeasonDetail;
}

export function RaceViewClient({ race, season }: RaceViewClientProps) {
  const { lang, t, dName, tName, cName, rName, natName, statName } = useLanguage();

  const roundNum = parseInt(String(race.round), 10);
  const totalRounds = season.races.length;
  const prevRace = season.races.find((r) => parseInt(String(r.round), 10) === roundNum - 1);
  const nextRace = season.races.find((r) => parseInt(String(r.round), 10) === roundNum + 1);

  const hasSprint = race.sprint && race.sprint.length > 0;
  const hasFP1 = race.practices?.fp1 && race.practices.fp1.length > 0;
  const hasFP2 = race.practices?.fp2 && race.practices.fp2.length > 0;
  const hasFP3 = race.practices?.fp3 && race.practices.fp3.length > 0;
  const hasQuali = race.qualifying && race.qualifying.length > 0;

  const yearNum = season.season;
  let flPointRuleDesc = lang === "zh" ? "无最快圈附加积分（历史规程）" : "No bonus points awarded (Historic Regulation)";
  if (yearNum >= 2019 && yearNum <= 2024) {
    flPointRuleDesc = lang === "zh" ? "获得最快圈且以前十名完赛的车手可获得 1 点积分奖励" : "1 Bonus Championship Point awarded for Fastest Lap (Top 10 Finishers only)";
  } else if (yearNum >= 2025) {
    flPointRuleDesc = lang === "zh" ? "FIA 于 2025 赛季正式取消最快圈附加分奖励" : "Fastest Lap bonus point abolished by FIA in 2025";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center space-x-2">
          <Link
            href={`/season/${season.season}`}
            className="flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors bg-[#121217] px-3 py-1.5 rounded-lg border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? `返回 ${season.season} 赛季` : `Back to ${season.season} Season`}</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-xs font-mono text-red-400 font-bold bg-red-950/40 px-2.5 py-1 rounded border border-red-900/40">
            {lang === "zh" ? `第 ${race.round} 站 / 共 ${totalRounds} 站` : `Round ${race.round} of ${totalRounds}`}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {prevRace && (
            <Link
              href={`/race/${season.season}/${prevRace.race_slug}`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#121217] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>R{prevRace.round}</span>
            </Link>
          )}
          {nextRace && (
            <Link
              href={`/race/${season.season}/${nextRace.race_slug}`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#121217] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-800 transition-colors"
            >
              <span>R{nextRace.round}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Header Dossier */}
      <div className="bg-[#101015] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="era">{season.season} FIA FORMULA ONE</Badge>
              <span className="text-xs font-mono text-zinc-500">{race.date || "N/A"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-mono">
              {season.season} {rName(race)}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <Link
                  href={race.circuit?.circuitId ? `/circuit/${race.circuit.circuitId}` : "#"}
                  className="text-zinc-200 hover:text-emerald-400 transition-colors font-medium"
                >
                  {cName(race.circuit)}
                </Link>
              </span>
              <span>•</span>
              <span className="text-zinc-300">
                {natName(race.circuit?.Location)}
              </span>
            </div>
          </div>

          {/* Quick Podium */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#16161d] border border-amber-500/30 rounded-lg p-3 text-center min-w-[120px]">
              <div className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                {t("th.winner")} 🥇
              </div>
              <div className="font-bold text-xs text-zinc-100 mt-1 truncate">
                {dName(race.winner)}
              </div>
              <div className="text-[10px] text-zinc-400 truncate mt-0.5">{tName(race.winner)}</div>
            </div>

            <div className="bg-[#16161d] border border-zinc-700/60 rounded-lg p-3 text-center min-w-[120px]">
              <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                {t("race.poleSitter")} ⏱️
              </div>
              <div className="font-bold text-xs text-zinc-100 mt-1 truncate">
                {dName(race.pole)}
              </div>
              <div className="text-[10px] text-zinc-400 truncate mt-0.5">{tName(race.pole)}</div>
            </div>

            <div className="bg-[#16161d] border border-zinc-700/60 rounded-lg p-3 text-center min-w-[120px]">
              <div className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">
                {t("race.fastestLap")} ⚡
              </div>
              <div className="font-bold text-xs text-zinc-100 mt-1 truncate">
                {dName(race.fastest_lap)}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                {race.fastest_lap?.time || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Multi-Session Tabs */}
      <Tabs defaultValue="race" className="space-y-6">
        <TabsList className="bg-[#111116] p-1 rounded-xl border border-zinc-800">
          <TabsTrigger value="race">
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === "zh" ? "正赛最终成绩" : "Race Classification"}</span>
          </TabsTrigger>
          {hasQuali && (
            <TabsTrigger value="qualifying">
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === "zh" ? "官方排位赛" : "Qualifying"}</span>
            </TabsTrigger>
          )}
          {hasSprint && (
            <TabsTrigger value="sprint">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === "zh" ? "冲刺赛" : "Sprint"}</span>
            </TabsTrigger>
          )}
          {hasFP1 && (
            <TabsTrigger value="fp1">
              <span>{lang === "zh" ? "一练 (FP1)" : "Practice 1"}</span>
            </TabsTrigger>
          )}
          {hasFP2 && (
            <TabsTrigger value="fp2">
              <span>{lang === "zh" ? "二练 (FP2)" : "Practice 2"}</span>
            </TabsTrigger>
          )}
          {hasFP3 && (
            <TabsTrigger value="fp3">
              <span>{lang === "zh" ? "三练 (FP3)" : "Practice 3"}</span>
            </TabsTrigger>
          )}
          {race.fastest_lap && (
            <TabsTrigger value="fastest_lap">
              <Gauge className="w-3.5 h-3.5 text-purple-400" />
              <span>{t("race.fastestLap")}</span>
            </TabsTrigger>
          )}
        </TabsList>

        {/* Race Results Table */}
        <TabsContent value="race" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center space-x-2">
              <Flag className="w-4 h-4 text-red-500" />
              <span>{t("race.classification")}</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              {race.results.length} {t("race.starters")}
            </span>
          </div>

          <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
            <div className="table-container">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">{t("th.pos")}</th>
                    <th className="py-3 px-3">{t("th.driver")}</th>
                    <th className="py-3 px-3">{t("th.constructor")}</th>
                    <th className="py-3 px-3 text-center font-mono w-14">{t("th.grid")}</th>
                    <th className="py-3 px-3 text-center font-mono w-14">{t("th.laps")}</th>
                    <th className="py-3 px-3 font-mono">{t("th.timeStatus")}</th>
                    <th className="py-3 px-3 text-right font-mono font-bold">{t("th.points")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {race.results.map((res, idx) => {
                    const teamColor = getTeamColor(res.constructor_id);
                    const isWinner = String(res.position) === "1";
                    const isDNF = !["Finished", "完赛", "+1 Lap", "+2 Laps", "+1圈", "+2圈"].includes(res.status) && !res.time?.includes(":");

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-zinc-800/40 transition-colors group ${
                          isWinner ? "bg-amber-950/10" : ""
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center">
                          <PositionBadge pos={res.positionText || res.position} />
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/driver/${res.driver_id}`}
                            className="flex items-center space-x-2 font-semibold text-zinc-200 group-hover:text-red-400 transition-colors"
                          >
                            <span>{dName(res)}</span>
                            {res.driver_code && (
                              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800">
                                {res.driver_code}
                              </span>
                            )}
                            {res.fastest_lap && (res.fastest_lap.rank === "1" || res.fastest_lap.rank === 1) && (
                              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-1 rounded border border-purple-800/40">
                                ⚡ FL
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/team/${res.constructor_id}`}
                            className="flex items-center space-x-1.5 text-zinc-400 hover:text-zinc-200"
                          >
                            <span
                              className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                              style={{ backgroundColor: teamColor }}
                            />
                            <span className="truncate max-w-[150px]">{tName(res)}</span>
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-400">
                          {res.grid}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-300">
                          {res.laps}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-xs">
                          {isDNF ? (
                            <span className="text-red-400/90 font-medium">{statName(res)}</span>
                          ) : (
                            <span className="text-zinc-200">{res.time}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-zinc-100 text-sm">
                          {res.points > 0 ? (
                            <span className="text-emerald-400">+{formatPoints(res.points)}</span>
                          ) : (
                            <span className="text-zinc-600">0</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Qualifying */}
        {hasQuali && (
          <TabsContent value="qualifying" className="space-y-4">
            <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
              <div className="table-container">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      <th className="py-3 px-3 w-10 text-center">{t("th.pos")}</th>
                      <th className="py-3 px-3">{t("th.driver")}</th>
                      <th className="py-3 px-3">{t("th.constructor")}</th>
                      <th className="py-3 px-3 font-mono text-zinc-300">Q1</th>
                      <th className="py-3 px-3 font-mono text-zinc-300">Q2</th>
                      <th className="py-3 px-3 font-mono text-zinc-300">Q3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {race.qualifying.map((q, idx) => {
                      const teamColor = getTeamColor(q.constructor_id);
                      return (
                        <tr key={idx} className="hover:bg-zinc-800/40 transition-colors group">
                          <td className="py-2.5 px-3 text-center">
                            <PositionBadge pos={q.position} />
                          </td>
                          <td className="py-2.5 px-3">
                            <Link
                              href={`/driver/${q.driver_id}`}
                              className="font-semibold text-zinc-200 group-hover:text-red-400 transition-colors"
                            >
                              {dName(q)}
                            </Link>
                          </td>
                          <td className="py-2.5 px-3">
                            <Link
                              href={`/team/${q.constructor_id}`}
                              className="flex items-center space-x-1.5 text-zinc-400 hover:text-zinc-200"
                            >
                              <span
                                className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                                style={{ backgroundColor: teamColor }}
                              />
                              <span>{tName(q)}</span>
                            </Link>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-zinc-300">{q.q1 || "-"}</td>
                          <td className="py-2.5 px-3 font-mono text-zinc-300">{q.q2 || "-"}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-red-400">{q.q3 || "-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        )}

        {/* Sprint */}
        {hasSprint && (
          <TabsContent value="sprint" className="space-y-4">
            <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
              <div className="table-container">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      <th className="py-3 px-3 w-10 text-center">{t("th.pos")}</th>
                      <th className="py-3 px-3">{t("th.driver")}</th>
                      <th className="py-3 px-3">{t("th.team")}</th>
                      <th className="py-3 px-3 text-center font-mono">{t("th.grid")}</th>
                      <th className="py-3 px-3 text-center font-mono">{t("th.laps")}</th>
                      <th className="py-3 px-3 font-mono">{t("th.timeStatus")}</th>
                      <th className="py-3 px-3 text-right font-mono">{t("th.points")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {race.sprint.map((sp, idx) => (
                      <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-2.5 px-3 text-center">
                          <PositionBadge pos={sp.position} />
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-zinc-200">{dName(sp)}</td>
                        <td className="py-2.5 px-3 text-zinc-400">{tName(sp)}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-400">{sp.grid}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-300">{sp.laps}</td>
                        <td className="py-2.5 px-3 font-mono text-zinc-200">{statName(sp)}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">
                          +{formatPoints(sp.points)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        )}

        {/* Practices */}
        {["fp1", "fp2", "fp3"].map((fpKey) => {
          const sessionLaps = race.practices?.[fpKey as "fp1" | "fp2" | "fp3"];
          if (!sessionLaps || sessionLaps.length === 0) return null;
          const sessionTitle = fpKey === "fp1" ? (lang === "zh" ? "自由练习赛 1 (FP1)" : "Free Practice 1") : fpKey === "fp2" ? (lang === "zh" ? "自由练习赛 2 (FP2)" : "Free Practice 2") : (lang === "zh" ? "自由练习赛 3 (FP3)" : "Free Practice 3");

          return (
            <TabsContent key={fpKey} value={fpKey} className="space-y-4">
              <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
                <div className="table-container">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                        <th className="py-3 px-3 w-10 text-center">{t("th.pos")}</th>
                        <th className="py-3 px-3 w-12 text-center font-mono">No</th>
                        <th className="py-3 px-3">{t("th.driver")}</th>
                        <th className="py-3 px-3">{t("th.team")}</th>
                        <th className="py-3 px-3 font-mono text-red-400">{t("th.bestLap")}</th>
                        <th className="py-3 px-3 text-center font-mono">{t("th.laps")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {sessionLaps.map((lap, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="py-2.5 px-3 text-center">
                            <PositionBadge pos={lap.position} />
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-zinc-500">{lap.number || "-"}</td>
                          <td className="py-2.5 px-3 font-semibold text-zinc-200">{dName(lap)}</td>
                          <td className="py-2.5 px-3 text-zinc-400">{tName(lap)}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-zinc-100">{lap.time}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-zinc-400">{lap.laps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          );
        })}

        {/* Fastest Lap */}
        {race.fastest_lap && (
          <TabsContent value="fastest_lap" className="space-y-4">
            <div className="bg-[#121217] border border-purple-500/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-purple-400 font-bold uppercase tracking-wider text-sm">
                <Gauge className="w-5 h-5" />
                <span>{t("race.fastestLap")}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800">
                  <div className="text-xs text-zinc-500 uppercase">{t("th.driver")}</div>
                  <div className="text-base font-bold text-zinc-100 mt-1">
                    {dName(race.fastest_lap)}
                  </div>
                  <div className="text-xs text-zinc-400">{tName(race.fastest_lap)}</div>
                </div>

                <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 font-mono">
                  <div className="text-xs text-zinc-500 uppercase">{t("race.lapTime")}</div>
                  <div className="text-lg font-bold text-purple-400 mt-1">
                    {race.fastest_lap.time || "N/A"}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {lang === "zh" ? `第 ${race.fastest_lap.lap} 圈` : `Lap ${race.fastest_lap.lap}`}
                  </div>
                </div>

                <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 font-mono">
                  <div className="text-xs text-zinc-500 uppercase">{t("race.avgSpeed")}</div>
                  <div className="text-base font-bold text-zinc-200 mt-1">
                    {race.fastest_lap.speed ? `${race.fastest_lap.speed} km/h` : "N/A"}
                  </div>
                </div>

                <div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800">
                  <div className="text-xs text-zinc-500 uppercase">{t("race.flBonus")}</div>
                  <div className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {flPointRuleDesc}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
