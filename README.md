<div align="center">

# 🏎️ F1 Archive (2000–2025)
### 一位 F1 业余车迷手搓的 26 年赛车历史档案与数据可视化小站

[![CI Build](https://github.com/wg2038/f1-archive/actions/workflows/ci.yml/badge.svg)](https://github.com/wg2038/f1-archive/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  收录 2000 至 2025 赛季共 <b>26 个赛季 · 491 场大奖赛 · 129 位车手 · 38 支车队 · 275 辆赛车</b> 的完整数据。<br/>
  支持中英双语切换、逐站积分折线走势图、车手六维雷达对比与 <code>⌘K</code> 全局搜索。
</p>

</div>

---

## 📖 为什么写这个小站？ (Why I Built This)

平时很喜欢看 F1 比赛，但在查阅往年历史成绩、车手年度积分走势或老车队演变时，总觉得缺少一个界面清爽、中英文对照方便、且自带直观数据图表的站点。

于是作为业余开发者，利用业余时间清洗了 2000 到 2025 年的历史数据，手搓了这个 F1 历史档案站。所有页面均采用静态预渲染（SSG），秒开无延迟，希望为同样喜欢 F1 的朋友们提供一个方便翻阅历史的掌中小库。

---

## ✨ 主要功能 (Features)

| 模块 | 功能说明 | 覆盖规模 |
| :--- | :--- | :---: |
| **🏆 赛季全览 (`/season/[year]`)** | 车手/车队年终冠军、每站赛历、**交互式赛季逐站积分走势折线图**（可勾选多车手动态对比）。 | 2000–2025 (26 个赛季) |
| **⏱️ 分站周末 Hub (`/race/[year]/[slug]`)** | 正赛成绩、排位赛 (Q1/Q2/Q3)、冲刺赛 (Sprint) 与练习赛圈速榜。 | 491 场大奖赛 |
| **🏎️ 车手生涯档案 (`/driver/[id]`)** | 车手生涯胜场/领奖台/杆位、历年积分与年终名次双轴图、详细分站战绩。 | 129 位车手 |
| **🛡️ 车队历史档案 (`/team/[id]`)** | 车队血统传承、参赛历史时间轴、历年赛车底盘与引擎供应商代号。 | 38 支车队 |
| **🗺️ 赛道几何蓝图 (`/circuits`, `/circuit/[id]`)** | 赛道简图、弯角编号、正赛最快圈纪录与历届分站冠军。 | 38 条赛道 |
| **⚔️ 多维对比竞技场 (`/compare`)** | 车手 vs 车手（六维雷达图对比）、车队 vs 车队、赛季 vs 赛季重叠对比。 | 全库自由对决 |
| **📊 全时代纪录榜 (`/statistics`)** | 跨时代冠军数、胜场、领奖台、杆位、历史胜率榜。 | 2000–2025 |
| **🔍 全局智能搜索 (`⌘K`)** | 毫秒级即时模糊搜索，中英文均可直接检索车手、车队、赛道与赛季。 | 全库即时索引 |
| **🌐 中英双语一键切换** | 顶部导航栏支持一键无刷新切换中文/英文。 | 全站覆盖 |

---

## 🛠️ 技术栈 (Tech Stack)

- **前端框架**：[Next.js 15](https://nextjs.org/) (App Router, SSG 静态全量生成)
- **UI & 样式**：[React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **图表可视化**：[Recharts](https://recharts.org/) (折线图、柱状图、多维雷达图)
- **开发语言**：TypeScript 5
- **数据源处理**：Python 3 数据清洗脚本 (清洗 FIA 官方成绩与 Jolpica / Ergast 历史数据)

---

## 🚀 本地启动指南 (Getting Started)

### 1. 克隆仓库与安装依赖
```bash
git clone https://github.com/wg2038/f1-archive.git
cd f1-archive
npm install
```

### 2. 启动本地开发服务器
```bash
npm run dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可查看。

### 3. 生产环境构建 (全量 SSG 静态页面)
```bash
npm run build
npm run start
```

---

## 🚧 迭代小计划 (Roadmap)

- [x] 2000–2025 全量历史数据集清洗与标准化
- [x] 中英双语切换与 `⌘K` 全局搜索
- [x] 26 个赛季逐站积分走势折线图
- [x] 129 位车手档案与年度名次/积分双轴走势图
- [x] 车手六维雷达对比竞技场
- [ ] **[进行中]** 正赛逐圈名次变化折线图
- [ ] **[进行中]** 进站策略与轮胎衰退分析
- [ ] **[进行中]** 移动端触控交互手势细节微调

---

## 📄 鸣谢与版权声明 (Attribution)

1. **比赛数据**：整理自国际汽联 (FIA)、Formula One 官方公开档案与 Jolpica / Ergast API、StatsF1。
2. **图片素材**：车手肖像与赛道示意图遵循 Wikimedia Commons 知识共享协议 (CC-BY-SA) 及学术与赛车历史研究合理使用。
3. **商标声明**：Formula 1、F1、FIA 及其相关标识均为其各自所有者的注册商标。本项目仅为业余爱好者个人出于兴趣制作的非商业性开源项目。

---

<div align="center">
  <sub>Made with ❤️ by a Formula 1 fan. © 2000–2025 F1 Archive.</sub>
</div>
