"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export type NavTab = "profil" | "project" | "contact";

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onScrollToSection: (id: string) => void;
  onOpenModal: () => void;
}

const navItems: { id: NavTab; label: string; ariaLabel: string }[] = [
  { id: "profil", label: "Profil", ariaLabel: "Buka bagian Profil" },
  { id: "project", label: "Project", ariaLabel: "Buka bagian Proyek" },
  { id: "contact", label: "Contact", ariaLabel: "Buka bagian Kontak" },
];

export function Navbar({
  activeTab,
  onSelectTab,
  onScrollToSection,
  onOpenModal,
}: NavbarProps) {
  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between pointer-events-none">
      {/* Monogram Logo */}
      <motion.button
        onClick={() => onScrollToSection("home")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto flex items-center gap-2 group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        title="Ke Layar Awal"
        aria-label="Ke layar beranda awal"
      >
        <div className="w-10 h-10 rounded-xl bg-card/90 border border-border backdrop-blur-md flex items-center justify-center font-mono font-black text-sm shadow-lg group-hover:border-cyan-400/60 transition-colors">
          <span className="bg-gradient-to-br from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            DB
          </span>
        </div>
      </motion.button>

      {/* Center Pill Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-card/85 backdrop-blur-md border border-border shadow-[0_8px_32px_rgba(0,0,0,0.45)] font-mono text-xs font-semibold tracking-wider"
        aria-label="Navigasi Utama"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onScrollToSection(item.id);
              }}
              aria-label={item.ariaLabel}
              className={`relative px-3.5 sm:px-4 py-1.5 rounded-full transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isActive ? "text-slate-950 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                />
              )}
              {item.label}
            </button>
          );
        })}
      </motion.nav>

      {/* Right Action */}
      <div className="pointer-events-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenModal}
          aria-label="Buka dialog formulir pesan langsung"
          className="bg-cyan-500/10 border-cyan-500/35 text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400/60 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">CONNECT</span>
        </Button>
      </div>
    </header>
  );
}
