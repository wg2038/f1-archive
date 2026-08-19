"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Shield,
  Calendar,
  Flag,
  Gauge,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  ArrowRight
} from "lucide-react";
import { SeasonDetail } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { ChampionshipProgressionChart } from "@/components/charts/ChampionshipProgressionChart";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor, formatPoints } from "@/lib/utils";

interface SeasonViewClientProps {
  season: SeasonDetail;
}

export function SeasonViewClient({ season }: SeasonViewClientProps) {
  const { lang, t, dName, tName, cName, rName, natName } = useLanguage();

  const yrNum = season.season;
  const prevYear = yrNum > 2000 ? yrNum - 1 : null;
  const nextYear = yrNum < 2025 ? yrNum + 1 : null;

  const dChamp = season.drivers_champion;
  const cChamp = season.constructors_champion;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Navigation & Season Selector */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center space-x-2">
          {prevYear ? (
            <Link
              href={`/season/${prevYear}`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#121217] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{prevYear}</span>
            </Link>
          ) : (
            <span className="px-3 py-1.5 text-xs font-mono text-zinc-600">
              {lang === "zh" ? "起始年" : "Era Start"}
            </span>
          )}

          <div className="px-4 py-1 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 font-mono font-bold text-sm">
            {season.season} {t("season.seasonDossier")}
          </div>

          {nextYear ? (
            <Link
              href={`/season/${nextYear}`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#121217] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-800 transition-colors"
            >
              <span>{nextYear}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="px-3 py-1.5 text-xs font-mono text-zinc-600">
              {lang === "zh" ? "最新赛季" : "Latest"}
            </span>
          )}
        </div>

        {/* Regulations Epoch badge */}
        <div className="hidden sm:flex items-center space-x-2">
          <Badge variant="era">{season.engine_era}</Badge>
        </div>
      </div>

      {/* 2. Champions Banner & Regulations Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Drivers Champion */}
        <div className="bg-[#121217] border border-amber-500/30 rounded-xl p-5 relative overflow-hidden shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400 flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{t("season.wdc")}</span>
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
              {dChamp?.points ? `${dChamp.points} pts` : "Champion"}
            </span>
          </div>

          <div className="flex items-start space-x-4 mt-2">
            <div className="flex-grow">
              <Link
                href={dChamp?.driver_id ? `/driver/${dChamp.driver_id}` : "#"}
                className="text-xl font-extrabold text-zinc-100 hover:text-amber-400 transition-colors"
              >
                {dName(dChamp)}
              </Link>
              <div className="text-xs text-zinc-400 mt-0.5">
                {natName(dChamp)} • <span className="text-zinc-200">{tName(dChamp)}</span>
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-2 space-y-0.5">
                <div>🏎️ {lang === "zh" ? "冠军赛车" : "Chassis"}: <span className="text-zinc-200">{dChamp?.car || "N/A"}</span></div>
                <div>⚙️ {lang === "zh" ? "发动机" : "Engine"}: <span className="text-zinc-300">{dChamp?.engine || "N/A"}</span></div>
                <div>🏆 {lang === "zh" ? "分站冠军" : "Wins"}: <span className="text-amber-300 font-bold">{dChamp?.wins ?? 0}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* World Constructors Champion */}
        <div className="bg-[#121217] border border-zinc-800 rounded-xl p-5 relative overflow-hidden shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-300 flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-red-500" />
              <span>{t("season.wcc")}</span>
            </span>
            <span className="text-xs font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
              {cChamp?.points ? `${cChamp.points} pts` : "Champion"}
            </span>
          </div>

          <div className="mt-2">
            <Link
              href={cChamp?.constructor_id ? `/team/${cChamp.constructor_id}` : "#"}
              className="text-xl font-extrabold text-zinc-100 hover:text-red-400 transition-colors"
            >
              {tName(cChamp)}
            </Link>
            <div className="text-xs text-zinc-400 mt-0.5">{natName(cChamp)}</div>
            <div className="text-xs font-mono text-zinc-400 mt-2 space-y-0.5">
              <div>🏎️ {lang === "zh" ? "冠军赛车" : "Chassis"}: <span className="text-zinc-200">{cChamp?.car || "N/A"}</span></div>
              <div>⚙️ {lang === "zh" ? "发动机" : "Engine"}: <span className="text-zinc-300">{cChamp?.engine || "N/A"}</span></div>
              <div>🏆 {lang === "zh" ? "分站冠军" : "Wins"}: <span className="text-red-400 font-bold">{cChamp?.wins ?? 0}</span></div>
            </div>
          </div>
        </div>

        {/* Season Regulations */}
        <div className="bg-[#121217] border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-2 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>{t("season.regulations")}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-zinc-800/60 pb-1.5">
                <span className="text-zinc-400">{t("season.pointSystem")}</span>
                <span className="font-mono text-zinc-200 font-medium">{season.point_system_rule}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/60 pb-1.5">
                <span className="text-zinc-400">{t("season.flRule")}</span>
                <span className="font-mono text-zinc-300 text-right max-w-[180px]">{season.fastest_lap_rule}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">{t("season.sprintFormat")}</span>
                <span className="font-mono text-zinc-300 text-right max-w-[180px]">{season.sprint_rule}</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-800/60 flex justify-between text-[11px] font-mono text-zinc-400">
            <span>{season.total_grands_prix} {lang === "zh" ? "分站" : "Rounds"}</span>
            <span>{season.total_drivers} {lang === "zh" ? "车手" : "Drivers"}</span>
            <span>{season.total_constructors} {lang === "zh" ? "车队" : "Teams"}</span>
          </div>
        </div>
      </div>

      {/* 3. Championship Progression Chart */}
      {season.progression_data && season.progression_data.length > 0 && (
        <Card className="p-6 bg-[#101014] border-zinc-800/90">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span>{season.season} {t("season.progression")}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{t("season.progressionSub")}</p>
            </div>
          </div>
          <ChampionshipProgressionChart
            data={season.progression_data}
            standings={season.driver_standings}
          />
        </Card>
      )}

      {/* 4. Standings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Drivers Standings */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t("season.driverStandings")}</span>
            </h3>
            <span className="text-xs text-zinc-400 font-mono">
              {season.driver_standings.length} {lang === "zh" ? "位入榜车手" : "Drivers"}
            </span>
          </div>

          <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
            <div className="table-container">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">{t("th.pos")}</th>
                    <th className="py-3 px-3">{t("th.driver")}</th>
                    <th className="py-3 px-3">{t("th.team")}</th>
                    <th className="py-3 px-3 text-right font-mono">{t("th.points")}</th>
                    <th className="py-3 px-3 text-center font-mono">{t("th.wins")}</th>
                    <th className="py-3 px-3 text-center font-mono hidden sm:table-cell">{t("th.podiums")}</th>
                    <th className="py-3 px-3 text-center font-mono hidden md:table-cell">{t("th.poles")}</th>
                    <th className="py-3 px-3 text-center font-mono hidden md:table-cell">{t("th.fl")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {season.driver_standings.map((d) => {
                    const teamColor = getTeamColor(d.constructor_id);
                    return (
                      <tr
                        key={d.driver_id}
                        className="hover:bg-zinc-800/40 transition-colors group"
                      >
                        <td className="py-2.5 px-3 text-center">
                          <PositionBadge pos={d.position} />
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/driver/${d.driver_id}`}
                            className="flex items-center space-x-2 font-semibold text-zinc-200 group-hover:text-red-400 transition-colors"
                          >
                            <span>{dName(d)}</span>
                            {d.driver_code && (
                              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800">
                                {d.driver_code}
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/team/${d.constructor_id}`}
                            className="flex items-center space-x-1.5 text-zinc-400 hover:text-zinc-200"
                          >
                            <span
                              className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                              style={{ backgroundColor: teamColor }}
                            />
                            <span className="truncate max-w-[140px]">{tName(d)}</span>
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-zinc-100 text-sm">
                          {formatPoints(d.points)}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-medium text-zinc-300">
                          {d.wins > 0 ? (
                            <span className="text-red-400 font-bold">{d.wins}</span>
                          ) : (
                            <span className="text-zinc-600">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-400 hidden sm:table-cell">
                          {d.podiums > 0 ? d.podiums : "-"}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-400 hidden md:table-cell">
                          {d.poles > 0 ? d.poles : "-"}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-zinc-400 hidden md:table-cell">
                          {d.fastest_laps > 0 ? d.fastest_laps : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Constructors Standings */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>{t("season.constructorStandings")}</span>
            </h3>
          </div>

          <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
            <div className="table-container">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">{t("th.pos")}</th>
                    <th className="py-3 px-3">{t("th.team")}</th>
                    <th className="py-3 px-3 text-right font-mono">{t("th.points")}</th>
                    <th className="py-3 px-3 text-center font-mono">{t("th.wins")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {season.constructor_standings.map((c) => {
                    const teamColor = getTeamColor(c.constructor_id);
                    return (
                      <tr
                        key={c.constructor_id}
                        className="hover:bg-zinc-800/40 transition-colors group"
                      >
                        <td className="py-2.5 px-3 text-center">
                          <PositionBadge pos={c.position} />
                        </td>
                        <td className="py-2.5 px-3">
                          <Link
                            href={`/team/${c.constructor_id}`}
                            className="flex items-center space-x-2 font-semibold text-zinc-200 group-hover:text-red-400 transition-colors"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                              style={{ backgroundColor: teamColor }}
                            />
                            <span className="truncate">{tName(c)}</span>
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-zinc-100 text-sm">
                          {formatPoints(c.points)}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-medium text-zinc-300">
                          {c.wins > 0 ? (
                            <span className="text-red-400 font-bold">{c.wins}</span>
                          ) : (
                            <span className="text-zinc-600">-</span>
                          )}
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

      {/* 5. Grand Prix Calendar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
              <Flag className="w-4 h-4 text-red-500" />
              <span>{season.season} {t("season.calendar")}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{t("season.calendarSub")}</p>
          </div>
          <span className="text-xs font-mono text-zinc-400">{season.races.length} {lang === "zh" ? "站" : "Rounds"}</span>
        </div>

        <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
          <div className="table-container">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-3 w-12 text-center font-mono">{t("th.round")}</th>
                  <th className="py-3 px-3">{t("th.gp")}</th>
                  <th className="py-3 px-3 hidden md:table-cell">{t("th.circuit")}</th>
                  <th className="py-3 px-3 hidden sm:table-cell">{t("th.date")}</th>
                  <th className="py-3 px-3">{t("th.pole")}</th>
                  <th className="py-3 px-3">{t("th.winner")}</th>
                  <th className="py-3 px-3 hidden lg:table-cell">{t("th.fl")}</th>
                  <th className="py-3 px-3 text-right">{t("th.hub")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {season.races.map((r) => (
                  <tr
                    key={r.round}
                    className="hover:bg-zinc-800/40 transition-colors group"
                  >
                    <td className="py-3 px-3 text-center font-mono text-zinc-400 font-bold">
                      R{r.round}
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/race/${season.season}/${r.race_slug}`}
                        className="font-bold text-zinc-100 group-hover:text-red-400 transition-colors block"
                      >
                        {rName(r)}
                      </Link>
                      <span className="text-[11px] text-zinc-500 md:hidden">
                        {cName(r.circuit)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-300 hidden md:table-cell">
                      <Link
                        href={r.circuit?.circuitId ? `/circuit/${r.circuit.circuitId}` : "#"}
                        className="hover:text-zinc-100 transition-colors"
                      >
                        {cName(r.circuit)}
                      </Link>
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-400 hidden sm:table-cell">
                      {r.date || "N/A"}
                    </td>
                    <td className="py-3 px-3">
                      {r.pole ? (
                        <Link
                          href={`/driver/${r.pole.driver_id}`}
                          className="text-zinc-300 hover:text-zinc-100 font-medium block"
                        >
                          ⏱️ {dName(r.pole)}
                        </Link>
                      ) : (
                        <span className="text-zinc-600">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {r.winner ? (
                        <Link
                          href={`/driver/${r.winner.driver_id}`}
                          className="font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                        >
                          <span>🥇 {dName(r.winner)}</span>
                        </Link>
                      ) : (
                        <span className="text-zinc-600">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-3 hidden lg:table-cell text-zinc-400 font-mono">
                      {r.fastest_lap ? (
                        <span>
                          ⚡ {dName(r.fastest_lap)} ({r.fastest_lap.time || "N/A"})
                        </span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/race/${season.season}/${r.race_slug}`}
                        className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold space-x-1 text-xs"
                      >
                        <span>{t("season.results")}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. Cars & Engines Grid */}
      {season.cars_grid && season.cars_grid.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-purple-400" />
                <span>{season.season} {t("season.chassisGrid")}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{t("season.chassisGridSub")}</p>
            </div>
            <Link
              href="/cars"
              className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center space-x-1"
            >
              <span>{lang === "zh" ? "完整底盘库" : "Full Chassis Catalog"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {season.cars_grid.map((c, idx) => {
              const carSlug = `${c.constructor_id}-${c.chassis?.replace(/[\/\s]/g, "-")}-${season.season}`.toLowerCase();
              return (
                <div
                  key={idx}
                  className="bg-[#111116] border border-zinc-800/80 hover:border-zinc-700 rounded-xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Link
                      href={`/team/${c.constructor_id}`}
                      className="font-bold text-sm text-zinc-100 hover:text-red-400 transition-colors"
                    >
                      {tName(c)}
                    </Link>
                    <Badge variant="outline" className="font-mono">
                      {c.chassis}
                    </Badge>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 space-y-1 mt-2">
                    <div>⚙️ {lang === "zh" ? "发动机" : "Engine"}: <span className="text-zinc-300">{c.engine_model}</span></div>
                    <div>🏭 {lang === "zh" ? "供应商" : "Supplier"}: <span className="text-zinc-300">{c.engine_supplier}</span></div>
                    <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap gap-2">
                      {c.drivers?.map((d) => (
                        <Link
                          key={d.driver_id}
                          href={`/driver/${d.driver_id}`}
                          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[11px] border border-zinc-800"
                        >
                          #{d.number} {d.driver_id.replace("_", " ")}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
