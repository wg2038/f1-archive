<div align="center">

# 🏎️ F1 Archive (2000–2025)
### Formula 1 Historical Telemetry & Results Database (Bilingual 中英双语)

[![Project Status: WIP](https://img.shields.io/badge/Status-Work_In_Progress_(进行中·未完成)-amber?style=for-the-badge&logo=git)](https://github.com/wg2038)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <b>« 现代化、高精度、无合成数据的 2000–2025 F1 历史数据库与交互式赛车档案平台 »</b><br/>
  <i>Bloomberg Terminal × Modern Sports Statistics × Premium Motorsport Archive</i>
</p>

[English Overview](#english-overview) • [中文介绍](#中文介绍) • [核心特性](#-核心功能亮点) • [规程规则遵从](#-历史规程与积分规则精准遵从) • [快速启动](#-快速启动指南) • [开发路线图 (Roadmap)](#-开发路线图-wip-roadmap)

</div>

---

> [!WARNING]
> ### ⚠️ Project Status Notice / 项目状态提示
> **EN**: This repository is currently a **Work In Progress (WIP)**. Core data structures, season progression charts, multi-session telemetry, and bilingual systems are built and statically generated (1,007 SSG pages), while additional telemetry charts, lap-by-lap matrix overlays, pit stop delta analysis, and interactive mobile gestures are actively being refined.
>
> **ZH**: 本项目目前处于 **“进行中·未完成 (WIP)”** 状态。核心数据库模型、26 个赛季积分演进、分站多节周末遥测及中英双语切换系统已完成构建与全量静态化生成 (1,007 页 SSG)，更多高级圈速矩阵、进站策略分析图及移动端微交互仍在持续打磨迭代中。

---

## 📖 项目简介 (Introduction)

**F1 Archive (2000–2025)** 不是一个普通的 F1 新闻资讯站，而是一个以**高精度工程数据、赛事官方判罚、动力单元技术规程与深度对比分析**为核心的现代化一级方程式交互式历史数据库。

全库收录了 2000 年至 2025 年共 **26 个赛季、491 场分站大奖赛、129 位车手、38 支制造车队、38 条全球赛道与 275 辆赛车动力单元**的完整历史档案。

### 🌟 核心设计理念 (Philosophy)
1. **零虚构 / 零 Mock 数据**：所有比赛成绩、发车顺位、圈速时间、退赛状态与引擎代号均经过 FIA、Formula 1 官方数据库、Jolpica / Ergast 与 StatsF1 交叉验证清洗。
2. **克制高级的赛车美学 (Motorsport Data Aesthetic)**：采用 `#08080a` 暗黑竞技基调、等宽计时字体、动态车队主色调徽章、高对比度数据走势折线图与多维雷达图。
3. **中英全量无缝双语 (Seamless Bilingual)**：顶部导航栏配备一键切换按钮（`中 / EN`），支持使用中文（如“迈克尔·舒马赫”、“法拉利”、“蒙扎”）或英文进行 `⌘K` 全局即时模糊搜索。

---

## ✨ 核心功能亮点 (Key Features)

| 模块 | 功能说明 | 覆盖规模 |
| :--- | :--- | :---: |
| **🏆 赛季全览 (`/season/[year]`)** | 世界车手/车队冠军横幅、积分规程徽章、**交互式赛季逐站积分走势折线图**（支持多车手动态勾选）、正赛赛历、参赛底盘与动力单元矩阵。 | 26 赛季 (2000–2025) |
| **⏱️ 分站周末 Hub (`/race/[year]/[slug]`)** | 多节周末 Tab 切换：**正赛最终排名、官方排位赛 (Q1/Q2/Q3)、冲刺赛 (Sprint)、自由练习赛 (FP1/FP2/FP3)** 及全场最快圈速时速分析。 | 491 场大奖赛 |
| **🏎️ 车手生涯档案 (`/driver/[id]`)** | 车手肖像大图、总冠军/胜场/领奖台/杆位/最快圈/积分徽章、**历年赛季表现走势图**（柱状积分 vs 折线年终名次）与生涯逐年详细战绩。 | 129 位车手 |
| **🛡️ 车队历史档案 (`/team/[id]`)** | 车队血统传承、总部所在地、26 年参赛历史时间轴、历年赛车底盘与引擎供应商代号、历史登场车手阵容。 | 38 支车队 |
| **🗺️ 赛道几何蓝图 (`/circuits`, `/circuit/[id]`)** | 赛道矢量示意图、顺逆时针方向、弯道编号、官方正赛最快圈速纪录、**历史改建版本演变**与历届大奖赛冠军历史。 | 38 条大奖赛赛道 |
| **⚙️ 赛车与动力单元 (`/cars`, `/car/[slug]`)** | 275 辆赛车底盘型号、动力单元规格 (V10 / V8 KERS / V6 Turbo Hybrid / Ground Effect)、引擎供应商与年终战绩。 | 275 辆赛车 |
| **⚔️ 历史对比竞技场 (`/compare`)** | **车手 vs 车手**（六维多边形雷达图对比）、**车队 vs 车队**、**赛季 vs 赛季** 深度重叠对比分析。 | 全库自由对决 |
| **📊 全时代历史纪录榜 (`/statistics`)** | 冠军数、胜场、领奖台、杆位、最快圈、生涯累计积分榜以及**单赛季最高统治力胜率榜**。 | 跨四大动力单元时代 |
| **🔍 全局智能搜索 (`⌘K`)** | 毫秒级即时模糊搜索，支持中英文双语检索车手、车队、赛道、赛车及赛季。 | 全库即时索引 |
| **📜 数据来源与审计 (`/sources`)** | 详细列出 Tier 1 / 2 / 3 官方数据源审计日志、历史规则变更记录与图片 CC 授权索引。 | 100% 透明溯源 |

---

## ⚖️ 历史规程与积分规则精准遵从

本项目严格按照真实历史规程与判决执行，杜绝数据失真：
- **2000–2002 赛季**：前 6 名完赛赋分（`10-6-4-3-2-1`），最快圈不设附加积分。
- **2003–2009 赛季**：前 8 名完赛赋分（`10-8-6-5-4-3-2-1`），最快圈不设附加积分。
- **2005 年美国大奖赛**：米其林阵营车手罢赛，精准记录 6 辆普利司通赛车完赛成绩。
- **2007 年迈凯伦“间谍门”**：根据 FIA 判决，迈凯伦当年制造车队总积分全额取消（记录为 0 分），车手积分予以保留。
- **2010–2018 赛季**：前 10 名完赛赋分（`25-18-15-12-10-8-6-4-2-1`）。
- **2014 年收官战阿布扎比**：严格依规执行双倍积分规则（`50-36-30-24-20-16-12-8-4-2`）。
- **2019–2024 赛季**：全场最快圈附加 1 分积分奖励（仅限最终进入前十名的完赛车手）。
- **2021 年比利时大奖赛**：极端暴雨提前终止，依规记录半数积分。
- **2021–2024 赛季**：冲刺排位赛（3-2-1 分）与后续独立冲刺赛（8-7-6-5-4-3-2-1 分）规则演进。
- **2025 赛季**：FIA 正式废除最快圈附加积分奖励（记录为 0 分）。

---

## 🛠️ 技术栈 (Tech Stack)

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Pure SSG Static Site Generation, 1,007 Pre-rendered Pages)
- **UI & Components**: [React 19](https://react.dev/), [Tailwind CSS v3](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Data Visualizations**: [Recharts](https://recharts.org/) (Responsive Line, Bar, and Radar charts)
- **Language & Type Safety**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Typed Schema)
- **ETL & Normalization**: Python 3 Data Cleaning Pipeline with custom translation dictionaries
- **Architecture**: In-memory static JSON database, Zero-latency client route prefetching

---

## 🚀 快速启动指南 (Getting Started)

### 1. 克隆仓库
```bash
git clone https://github.com/wg2038/f1-archive.git
cd f1-archive
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发服务器
```bash
npm run dev
```
在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可查看。

### 4. 生产环境构建与全量静态化生成
```bash
npm run build
npm run start
```
> 将自动静态预渲染所有 26 个赛季、491 场分站、129 位车手、38 支车队、38 条赛道与 275 辆赛车共 **1,007 个独立 SSG 页面**。

---

## 🚧 开发路线图 (WIP Roadmap)

- [x] 2000–2025 全量历史数据集清洗与标准化 ETL (Python)
- [x] 全站中英文双语本地化与即时无刷新语言切换 Context
- [x] 26 个赛季逐站积分走势折线图 (Recharts)
- [x] 491 场大奖赛全周末多节成绩（FP1/FP2/FP3/Quali/Sprint/Race）
- [x] 129 位车手生涯档案与年度名次/积分双轴走势图
- [x] 38 支车队血统、26 年参赛历史与历年代号
- [x] 38 条世界锦标赛赛道几何示意图与历史布局改建版本演变
- [x] 275 辆赛车底盘代号与动力单元档案
- [x] 车手/车队/赛季多维对比竞技场 (Radar Chart)
- [x] 跨时代官方纪录全书与单赛季最高统治力榜
- [x] `⌘K` 全局中英文智能联想搜索弹窗
- [ ] **[WIP]** 正赛逐圈排名变化图 (Lap-by-Lap Position Chart)
- [ ] **[WIP]** 进站策略与轮胎配方衰退时间差分析矩阵 (Pit Stop Strategy Matrix)
- [ ] **[WIP]** 排位赛队友微秒级极速与分段成绩对比图 (Teammate Head-to-Head Delta)
- [ ] **[WIP]** 移动端横划手势与触控交互细节优化

---

## 📄 数据与版权声明 (Attribution & Licenses)

1. **比赛成绩与官方遥测**：数据溯源自国际汽联 (FIA)、Formula One World Championship Limited 官方成绩档案、Jolpica / Ergast API 与 StatsF1。
2. **视觉媒体与图片素材**：所有车手肖像、赛车历史照片与赛道矢量图均遵循 Wikimedia Commons 知识共享协议 (CC-BY-SA 3.0 / 4.0)、公有领域授权及赛车历史学术研究之合理使用规范。详细索引见 `public/data/image_sources.json`。
3. **商标声明**：Formula 1、F1、FIA 及相关标识为 Formula One Licensing B.V. 之注册商标。本项目为**非商业性质的开源赛车历史研究与数据可视化项目**。

---

<div align="center">
  <sub>Developed with ❤️ for Motorsport & Formula 1 Fans. © 2000–2025 F1 Archive.</sub>
</div>
