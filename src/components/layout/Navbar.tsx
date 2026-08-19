"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Flag,
  Trophy,
  Shield,
  MapPin,
  Gauge,
  BarChart2,
  GitCompare,
  BookOpen,
  Globe
} from "lucide-react";
import { GlobalSearchModal } from "@/components/search/GlobalSearchModal";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang, t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: t("nav.seasons"), href: "/season/2025", icon: Flag },
    { name: t("nav.drivers"), href: "/driver/michael_schumacher", icon: Trophy },
    { name: t("nav.teams"), href: "/team/ferrari", icon: Shield },
    { name: t("nav.cars"), href: "/cars", icon: Gauge },
    { name: t("nav.circuits"), href: "/circuits", icon: MapPin },
    { name: t("nav.statistics"), href: "/statistics", icon: BarChart2 },
    { name: t("nav.compare"), href: "/compare", icon: GitCompare },
    { name: t("nav.sources"), href: "/sources", icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090c]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="bg-red-600 text-white font-black text-xs px-1.5 py-0.5 rounded tracking-tighter group-hover:bg-red-500 transition-colors">
                F1
              </span>
              <span className="font-extrabold tracking-wider text-sm sm:text-base text-zinc-100 uppercase">
                {lang === "zh" ? "F1 档案库" : "ARCHIVE"}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50">
                2000–2025
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href.split("/")[1] ? `/${link.href.split("/")[1]}` : link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                    isActive
                      ? "text-red-400 bg-red-950/30 border border-red-900/40"
                      : "text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher, Search Trigger & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#15151c] hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-200 hover:text-red-400 transition-colors shadow-sm"
              title="Switch Language / 切换中英文"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-mono text-[11px]">{lang === "zh" ? "中 / EN" : "EN / 中"}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 px-2.5 py-1.5 rounded-lg text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">{t("nav.search")}</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-[#0c0c10] px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(`/${link.href.split("/")[1]}`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium",
                    isActive
                      ? "text-red-400 bg-red-950/30 border border-red-900/40"
                      : "text-zinc-300 hover:bg-zinc-800"
                  )}
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
