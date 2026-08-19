"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Database, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="border-t border-zinc-800/80 bg-[#070709] text-zinc-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-800/60">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="bg-red-600 text-white font-black text-xs px-1.5 py-0.5 rounded tracking-tighter">
                F1
              </span>
              <span className="font-bold text-zinc-200 tracking-wider uppercase text-sm">
                {lang === "zh" ? "F1 档案库" : "Archive"}
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {lang === "zh"
                ? "2000–2025 F1 历史数据库。面向现代赛车统计与工程档案的高精度数据分析与查询平台。"
                : "2000–2025 Formula 1 Historical Database. A high-performance, precision data platform for modern motorsport statistics and engineering archives."}
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-zinc-500 font-mono">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                {lang === "zh"
                  ? "491 场大奖赛 • 26 个赛季 • 129 位车手"
                  : "491 Grands Prix • 26 Seasons • 129 Drivers"}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] mb-3">
              {lang === "zh" ? "核心档案库" : "Archives"}
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="/season/2025" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "赛季总览 (2000–2025)" : "Season Index (2000–2025)"}
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "全时代历史纪录榜" : "All-Time Statistics & Records"}
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "车手/车队对比竞技场" : "Head-to-Head Comparison Arena"}
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "275 辆赛车与动力单元" : "Historical Cars & Chassis Catalog"}
                </Link>
              </li>
              <li>
                <Link href="/circuits" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "全球 38 条大奖赛赛道" : "Global Circuit Geometries"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Eras */}
          <div>
            <h4 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] mb-3">
              {lang === "zh" ? "动力单元规程时代" : "Engine Eras"}
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="/season/2004" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "3.0L V10 时代 (2000–2005)" : "3.0L V10 Era (2000–2005)"}
                </Link>
              </li>
              <li>
                <Link href="/season/2010" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "2.4L V8 & KERS 时代 (2006–2013)" : "2.4L V8 & KERS Era (2006–2013)"}
                </Link>
              </li>
              <li>
                <Link href="/season/2021" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "1.6L V6 涡轮混动时代 (2014–2021)" : "1.6L V6 Turbo Hybrid (2014–2021)"}
                </Link>
              </li>
              <li>
                <Link href="/season/2025" className="hover:text-zinc-200 transition-colors">
                  {lang === "zh" ? "地面效应气动时代 (2022–2025)" : "Ground Effect Era (2022–2025)"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparency & Legal */}
          <div>
            <h4 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] mb-3">
              {lang === "zh" ? "数据溯源与版权声明" : "Data Lineage & Attribution"}
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-3">
              {lang === "zh"
                ? "所有分站官方排名、练习赛圈速及技术参数均溯源自 FIA、Formula 1 官方成绩库、Jolpica / Ergast 与 StatsF1。"
                : "Historical timing, sporting classifications, and technical specs sourced directly from FIA, Formula 1 Official Results Archive, Jolpica / Ergast, and StatsF1."}
            </p>
            <div className="space-y-1">
              <Link
                href="/sources"
                className="inline-flex items-center text-red-400 hover:text-red-300 font-medium text-xs space-x-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>{lang === "zh" ? "查看完整数据来源与图片授权 →" : "View Full Sources & Image Licenses →"}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} F1 Archive. {lang === "zh" ? "非商业性质历史研究数据库。" : "Non-commercial historical research database."} Formula 1, F1, and related marks are trademarks of Formula One Licensing B.V.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sources" className="hover:text-zinc-400 transition-colors">
              {t("nav.sources")}
            </Link>
            <Link href="/compare" className="hover:text-zinc-400 transition-colors">
              {t("nav.compare")}
            </Link>
            <Link href="/statistics" className="hover:text-zinc-400 transition-colors">
              {t("nav.statistics")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
