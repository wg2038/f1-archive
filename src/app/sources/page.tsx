"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n";

export default function SourcesPage() {
  const { lang, t } = useLanguage();
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/sources.json")
      .then((res) => res.json())
      .then((d) => setSources(d))
      .catch((e) => console.error(e));
  }, []);

  const rulesCatalog = [
    {
      era: "2000–2002",
      title: lang === "zh" ? "前六名积分规程 (Top 6)" : "Top 6 Points System",
      desc: lang === "zh" ? "按 10-6-4-3-2-1 授予正赛前 6 名完赛者。最快圈不设附加积分。" : "10-6-4-3-2-1 points awarded to top 6 finishers. 0 points for fastest lap."
    },
    {
      era: "2003–2009",
      title: lang === "zh" ? "前八名积分规程 (Top 8)" : "Top 8 Points System",
      desc: lang === "zh" ? "按 10-8-6-5-4-3-2-1 授予正赛前 8 名完赛者。最快圈不设附加积分。" : "10-8-6-5-4-3-2-1 points awarded to top 8 finishers. 0 points for fastest lap."
    },
    {
      era: "2005",
      title: lang === "zh" ? "美国站米其林轮胎罢赛事件" : "US GP Michelin Withdrawal",
      desc: lang === "zh" ? "印第安纳波利斯站米其林阵营车手因安全原因退赛，正赛仅 6 辆普利司通赛车完赛并精确记录。" : "Michelin tire safety withdrawal at Indianapolis resulting in a 6-car race classification recorded accurately."
    },
    {
      era: "2007",
      title: lang === "zh" ? "迈凯伦间谍门车队积分清零" : "McLaren Spygate Exclusion",
      desc: lang === "zh" ? "根据国际汽联 WMSC 判决，迈凯伦车队当年制造车队总积分被全额取消（0 分），车手积分予以保留。" : "McLaren excluded from the World Constructors' Championship (0 points recorded) following the FIA WMSC decision."
    },
    {
      era: "2010–2018",
      title: lang === "zh" ? "前十名积分规程 (Top 10)" : "Top 10 Points System",
      desc: lang === "zh" ? "按 25-18-15-12-10-8-6-4-2-1 授予正赛前 10 名完赛者。" : "25-18-15-12-10-8-6-4-2-1 points awarded to top 10 finishers. 0 points for fastest lap."
    },
    {
      era: "2014",
      title: lang === "zh" ? "阿布扎比收官战双倍积分" : "Abu Dhabi Double Points",
      desc: lang === "zh" ? "收官战阿布扎比大奖赛采用双倍积分制（50-36-30-24-20-16-12-8-4-2），本库严格依规计算。" : "Final round double points rule (50-36-30-24-20-16-12-8-4-2) applied strictly to Abu Dhabi GP."
    },
    {
      era: "2019–2024",
      title: lang === "zh" ? "最快圈附加积分规程" : "Fastest Lap Bonus Point",
      desc: lang === "zh" ? "获得最快圈且最终正赛排名前 10 完赛的车手可获得 1 个车手/车队积分奖励。" : "1 championship bonus point awarded for fastest lap ONLY if the driver finished in the top 10."
    },
    {
      era: "2021",
      title: lang === "zh" ? "冲刺排位赛与比利时半积分" : "Sprint Qualifying Trials & Rain Half Points",
      desc: lang === "zh" ? "冲刺排位赛前 3 名授予 3-2-1 分。比利时大奖赛因极端暴雨提前终止，依规授予半数积分。" : "3-2-1 points awarded for trial sprint qualifying. Belgian GP awarded half points due to weather stoppage."
    },
    {
      era: "2022",
      title: lang === "zh" ? "冲刺赛扩充前八名赋分" : "Expanded Top 8 Sprint",
      desc: lang === "zh" ? "冲刺赛赋分范围扩充至前 8 名完赛车手（8-7-6-5-4-3-2-1）。" : "Sprint points expanded to top 8 finishers (8-7-6-5-4-3-2-1)."
    },
    {
      era: "2023–2024",
      title: lang === "zh" ? "独立冲刺排位赛 (Shootout)" : "Standalone Sprint Shootout",
      desc: lang === "zh" ? "冲刺赛与正赛排位彻底解耦，引入独立冲刺排位赛（每赛季 6 站）。" : "Sprint Shootout introduced as an independent session for 6 rounds per season."
    },
    {
      era: "2025",
      title: lang === "zh" ? "FIA 废除最快圈附加分" : "Abolition of Fastest Lap Point",
      desc: lang === "zh" ? "自 2025 赛季起，FIA 正式废除全场最快圈附加 1 分积分奖励规则（记录为 0 分）。" : "FIA officially abolished the fastest lap bonus point from 2025 onwards (0 points recorded)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="era">{lang === "zh" ? "官方数据审计" : "DATA PROVENANCE & AUDIT"}</Badge>
          <span className="text-xs font-mono text-zinc-400">Quality Control Verified</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-mono">
          {t("sources.title")}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {t("sources.subtitle")}
        </p>
      </div>

      {/* 1. Primary Data Sources Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
            <Database className="w-4 h-4 text-red-500" />
            <span>{t("sources.primaryTitle")}</span>
          </h3>
          <span className="text-xs font-mono text-zinc-400">{sources.length} {lang === "zh" ? "项来源审计记录" : "Audit Entries"}</span>
        </div>

        <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
          <div className="table-container">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <th className="py-3 px-3 w-32 font-mono">{lang === "zh" ? "来源代码" : "Source ID"}</th>
                  <th className="py-3 px-3">{lang === "zh" ? "组织 / 数据库" : "Organization / Repository"}</th>
                  <th className="py-3 px-3">{lang === "zh" ? "数据类型" : "Data Type"}</th>
                  <th className="py-3 px-3 font-mono">{lang === "zh" ? "覆盖赛季" : "Seasons"}</th>
                  <th className="py-3 px-3">{lang === "zh" ? "可靠性分级" : "Reliability"}</th>
                  <th className="py-3 px-3 text-right">{lang === "zh" ? "原始链接" : "URL"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {sources.slice(0, 10).map((src: any) => (
                  <tr key={src["Source ID"]} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-zinc-400">{src["Source ID"]}</td>
                    <td className="py-3 px-3 font-bold text-zinc-200">{src["Website"]}</td>
                    <td className="py-3 px-3 text-zinc-300">{src["Data Type"]}</td>
                    <td className="py-3 px-3 font-mono text-zinc-400">{src["Season"]}</td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={src["Reliability"]?.includes("Tier 1") ? "gold" : "outline"}
                      >
                        {src["Reliability"]}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={src["URL"]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-400 hover:text-red-300 inline-flex items-center space-x-1"
                      >
                        <span>{lang === "zh" ? "访问官方源" : "Access"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Historical Sporting Regulations Exceptions */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{t("sources.regulationsTitle")}</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {lang === "zh"
              ? "严格按照历史规则和官方判罚执行，绝无合成或伪造数据。"
              : "How historical rules and sporting decisions are enforced without synthetic data manipulation."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rulesCatalog.map((r, idx) => (
            <Card key={idx} className="p-4 bg-[#121217] border-zinc-800 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <Badge variant="era">{r.era}</Badge>
                <span className="font-bold text-xs text-zinc-200">{r.title}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{r.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Image Licensing & Creative Commons Attribution */}
      <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>{t("sources.licensingTitle")}</span>
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
          {lang === "zh"
            ? "所有车手肖像、赛道蓝图与赛车底盘图像均严格遵循维基共享资源知识共享协议 (CC-BY-SA 3.0 / 4.0)、公有领域授权及赛车运动历史研究的合理使用规范。"
            : "All driver portraits, circuit blueprints, and chassis imagery are archived in compliance with Wikimedia Commons Creative Commons (CC-BY-SA 3.0 / 4.0), public domain releases, and educational fair use for motorsport historical documentation."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-mono">
          <div className="bg-[#15151c] p-4 rounded-xl border border-zinc-800 space-y-1">
            <div className="font-bold text-zinc-200">{lang === "zh" ? "车手肖像照片" : "Driver Portraits"}</div>
            <div className="text-zinc-400 font-sans">Source: Wikimedia Commons / CC-BY-SA</div>
            <div className="text-[11px] text-zinc-500 font-sans">{lang === "zh" ? "已在 image_sources.json 中建立元数据索引。" : "Indexed in image_sources.json with original author links."}</div>
          </div>

          <div className="bg-[#15151c] p-4 rounded-xl border border-zinc-800 space-y-1">
            <div className="font-bold text-zinc-200">{lang === "zh" ? "赛道几何布局图" : "Circuit Layout Blueprints"}</div>
            <div className="text-zinc-400 font-sans">Source: OpenStreetMap / Wikimedia / FIA Maps</div>
            <div className="text-[11px] text-zinc-500 font-sans">{lang === "zh" ? "精准展现 FIA 认证赛道弯角几何。" : "Accurate track geometry and corner counts."}</div>
          </div>

          <div className="bg-[#15151c] p-4 rounded-xl border border-zinc-800 space-y-1">
            <div className="font-bold text-zinc-200">{lang === "zh" ? "赛车底盘与动力单元" : "Chassis & Car Imagery"}</div>
            <div className="text-zinc-400 font-sans">Source: Motorsport Media Archive / CC-BY-SA</div>
            <div className="text-[11px] text-zinc-500 font-sans">{lang === "zh" ? "冠军赛车实车历史照片。" : "Championship-winning chassis photography."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
