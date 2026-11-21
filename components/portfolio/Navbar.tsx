"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticWrap } from "@/components/portfolio/MotionPrimitives";

export type NavTab = "home" | "works" | "about" | "contact";

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onScrollToSection: (id: string) => void;
  onOpenModal: () => void;
}

const navItems: { id: NavTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar({
  activeTab,
  onSelectTab,
  onScrollToSection,
  onOpenModal,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<NavTab | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavigate = (id: NavTab) => {
    onSelectTab(id);
    onScrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F4]/92 backdrop-blur-md border-b border-[#E2E5EC]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[76px] flex items-center justify-between gap-4">
        {/* Left: Editorial Serif Brand */}
        <motion.a
          href="#home"
          data-cursor="Top"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("home");
          }}
          className="inline-flex items-center min-h-[44px] font-serif italic text-2xl sm:text-[28px] font-bold tracking-tight text-[#111216] rounded-lg px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          aria-label="Dimas Brahmantya home"
        >
          <span className="inline-flex items-baseline gap-1">
            <span>Dimas.</span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#DB2777] mb-1 shrink-0"
              whileHover={{ scale: 1.5 }}
              aria-hidden="true"
            />
          </span>
        </motion.a>

        {/* Center: Desktop Section Links with Cursor-Sliding Hover Pill & Morphing Active Indicator */}
        <nav
          className="hidden md:flex items-center gap-2"
          aria-label="Primary Navigation"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isHovered = hoveredTab === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor={item.label}
                onMouseEnter={() => setHoveredTab(item.id)}
                onFocus={() => setHoveredTab(item.id)}
                onBlur={() => setHoveredTab(null)}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.id);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex items-center min-h-[44px] py-2 px-4 text-sm font-sans transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isActive
                    ? "text-[#111216] font-semibold"
                    : "text-[#5A6272] font-medium hover:text-[#111216]"
                }`}
              >
                {isHovered && (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#FDF2F8] border border-[#F9A8D4]/70 -z-10"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute left-3.5 right-3.5 bottom-1 flex items-center gap-1"
                    aria-hidden="true"
                  >
                    <span className="h-[2.5px] flex-1 rounded-full bg-[#2563EB]" />
                    <span className="h-[2.5px] w-3 rounded-full bg-[#DB2777]" />
                  </motion.span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Desktop Contact CTA + Mobile Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-white border border-[#CBD2DF] text-xs font-semibold text-[#111216] hover:bg-[#F1F3F7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
            <span>Menu</span>
          </button>

          <MagneticWrap>
            <Button
              size="default"
              data-cursor="Message"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal();
              }}
              aria-label="Open direct contact message form"
              className="h-11 px-6"
            >
              Contact
            </Button>
          </MagneticWrap>
        </div>
      </div>

      {/* Animated Mobile Dropdown Drawer (Shape-In / Shape-Out) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav-menu"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-[#E2E5EC] bg-[#FAF8F4] px-4 py-4 space-y-1.5 overflow-hidden"
          >
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: idx * 0.04, duration: 0.22 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.id);
                  }}
                  className={`flex items-center justify-between min-h-[44px] px-4 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isActive
                      ? "bg-white border border-[#E2E5EC] text-[#111216] font-semibold"
                      : "text-[#475060] hover:bg-white/70 hover:text-[#111216]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#2563EB]"
                      aria-hidden="true"
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ delay: 0.16, duration: 0.22 }}
            >
              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between min-h-[44px] px-4 rounded-xl text-sm font-semibold text-[#9D174D] bg-[#FDF2F8] border border-[#F9A8D4] hover:bg-[#FCE7F3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <span>Full Archive</span>
                <span className="font-mono text-xs">/projects</span>
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
