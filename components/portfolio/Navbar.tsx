"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_HREF } from "@/lib/site";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 48;
    if (next !== isScrolled) {
      setIsScrolled(next);
    }
  });

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
    <header
      className={`sticky top-0 z-40 w-full transition-[padding] duration-300 ease-out ${
        isScrolled ? "px-3 sm:px-6 pt-3" : "px-0 pt-0"
      }`}
    >
      <div
        className={`relative mx-auto overflow-hidden transition-all duration-300 ease-out ${
          isScrolled
            ? "max-w-4xl rounded-full bg-white/72 backdrop-blur-xl saturate-150 border border-white/80 ring-1 ring-[#111216]/[0.07] shadow-[0_12px_36px_-8px_rgba(17,18,22,0.14)]"
            : "max-w-full rounded-none bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#E2E5EC]/70"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 transition-all duration-300 ease-out ${
            isScrolled
              ? "px-4 sm:px-6 h-[64px]"
              : "max-w-7xl px-4 sm:px-8 h-[76px]"
          }`}
        >
          {/* Left: Editorial Serif Brand */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("home");
            }}
            className="inline-flex items-center min-h-[44px] font-serif italic text-2xl sm:text-[26px] font-bold tracking-tight text-[#111216] rounded-lg px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            aria-label="Dimas Brahmantya home"
          >
            <span className="inline-flex items-baseline gap-1">
              <span>Dimas</span>
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#DB2777] mb-1 shrink-0"
                whileHover={{ scale: 1.5 }}
                aria-hidden="true"
              />
            </span>
          </motion.a>

          {/* Center: Desktop Section Links with Cursor-Sliding Hover Pill & Morphing Active Indicator */}
          <nav
            className="hidden md:flex items-center gap-1.5"
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
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onFocus={() => setHoveredTab(item.id)}
                  onBlur={() => setHoveredTab(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.id);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex items-center min-h-[40px] py-1.5 px-4 text-sm font-sans transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isActive
                      ? "text-[#111216] font-semibold"
                      : "text-[#5A6272] font-medium hover:text-[#111216]"
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-[#FDF2F8]/90 border border-[#F9A8D4]/70 -z-10"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute left-3.5 right-3.5 bottom-0.5 flex items-center gap-1"
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

          {/* Right: Download CV + Desktop Contact CTA + Mobile Controls */}
          <div className="flex items-center gap-2">
            <MagneticWrap strength={0.16} className="hidden lg:inline-flex">
              <a
                href={CV_HREF}
                download="CV-Dimas-Brahmantya-Aryasena.pdf"
                className="group inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white/90 border border-[#CBD2DF] text-xs font-semibold text-[#111216] hover:bg-[#F1F3F7] hover:border-[#94A3B8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Download
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                <span>CV</span>
              </a>
            </MagneticWrap>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="md:hidden inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full bg-white/90 border border-[#CBD2DF] text-xs font-semibold text-[#111216] hover:bg-[#F1F3F7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
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
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal();
                }}
                aria-label="Open direct contact message form"
                className="h-10 px-5"
              >
                Contact
              </Button>
            </MagneticWrap>
          </div>
        </div>

        {/* Thin Scroll Progress Line at Bottom Edge of Navbar */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: smoothProgress }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left pointer-events-none bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#DB2777]"
          />
        )}
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
            className={`md:hidden mx-auto mt-2 px-4 py-4 space-y-1.5 overflow-hidden ${
              isScrolled
                ? "max-w-4xl rounded-3xl bg-white/92 backdrop-blur-xl border border-[#E2E5EC] shadow-[0_14px_32px_rgba(17,18,22,0.12)]"
                : "border-t border-[#E2E5EC] bg-[#FAF8F4]"
            }`}
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
              className="grid grid-cols-2 gap-2 pt-1"
            >
              <a
                href={CV_HREF}
                download="CV-Dimas-Brahmantya-Aryasena.pdf"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-xl text-sm font-semibold text-[#111216] bg-white border border-[#CBD2DF] hover:bg-[#F1F3F7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download CV</span>
              </a>

              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-xl text-sm font-semibold text-[#9D174D] bg-[#FDF2F8] border border-[#F9A8D4] hover:bg-[#FCE7F3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <span>Archive</span>
                <span className="font-mono text-xs">/projects</span>
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
