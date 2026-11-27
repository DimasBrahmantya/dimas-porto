"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Layers, RotateCcw, Search } from "lucide-react";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { ContactModal } from "@/components/portfolio/ContactModal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projectsData } from "@/data/projects";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MagneticWrap,
  ShapeReveal,
} from "@/components/portfolio/MotionPrimitives";

type ArchiveCategory = "all" | "webapp" | "uiux";

const quickStacks = [
  "Next.js",
  "Supabase",
  "Laravel",
  "NestJS",
  "Figma",
  "MongoDB",
  "TypeScript",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ArchiveCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const counts = {
    all: projectsData.length,
    webapp: projectsData.filter((p) => p.category === "webapp").length,
    uiux: projectsData.filter((p) => p.category === "uiux").length,
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((item) => {
      const matchesCategory =
        activeCategory === "all" ? true : item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.tech.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryTabs: {
    id: ArchiveCategory;
    label: string;
    activeBg: string;
    idleClass: string;
  }[] = [
    {
      id: "all",
      label: `All (${counts.all})`,
      activeBg: "bg-[#111216]",
      idleClass: "bg-white text-[#475060] border-[#CBD2DF] hover:bg-[#F1F3F7]",
    },
    {
      id: "webapp",
      label: `Web App (${counts.webapp})`,
      activeBg: "bg-[#2563EB]",
      idleClass:
        "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE] hover:bg-[#DBEAFE]",
    },
    {
      id: "uiux",
      label: `UI/UX (${counts.uiux})`,
      activeBg: "bg-[#DB2777]",
      idleClass:
        "bg-[#FCE7F3] text-[#9D174D] border-[#F9A8D4] hover:bg-[#FBCFE8]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#111216] font-sans relative overflow-x-clip">
      {/* Top Sticky Editorial Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F4]/92 backdrop-blur-md border-b border-[#E2E5EC]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[76px] flex items-center justify-between gap-3">
          <MagneticWrap strength={0.16}>
            <Link
              href="/"
              data-cursor="Home"
              className="inline-flex items-center gap-2 min-h-[44px] h-11 px-4 sm:px-5 rounded-full bg-white border border-[#CBD2DF] text-xs sm:text-sm font-semibold text-[#111216] hover:bg-[#F1F3F7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </MagneticWrap>

          <Link
            href="/"
            data-cursor="Home"
            className="inline-flex items-center min-h-[44px] font-serif italic text-2xl sm:text-[26px] font-bold tracking-tight text-[#111216] rounded-lg px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <span className="inline-flex items-baseline gap-1">
              <span>Dimas.</span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#DB2777] mb-1 shrink-0"
                aria-hidden="true"
              />
            </span>
          </Link>

          <MagneticWrap>
            <Button
              size="default"
              data-cursor="Message"
              onClick={() => setIsContactOpen(true)}
              aria-label="Open direct contact message form"
              className="h-11 px-5"
            >
              Contact
            </Button>
          </MagneticWrap>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        {/* Page Intro */}
        <ShapeReveal
          variant="curtain-up"
          once
          className="relative z-10 text-center max-w-3xl mx-auto mb-10"
        >
          <span className="font-mono text-xs font-bold tracking-[0.08em] text-[#BE185D] uppercase block mb-3">
            PROJECT ARCHIVE &amp; CASE STUDIES
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[#111216] leading-none">
            Project{" "}
            <span className="font-serif italic font-normal text-[#BE185D]">
              Archive.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-[15px] text-[#272B35] leading-relaxed max-w-2xl mx-auto">
            Complete collection of {counts.all} built and deployed web apps,
            full-stack systems, and Figma UI/UX prototypes. Select any card for
            system details and live links.
          </p>
        </ShapeReveal>

        {/* Search, Morphing Category Tabs & Quick Stack Filter */}
        <div className="relative z-10 space-y-4 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <label htmlFor="archive-search" className="sr-only">
                Search projects by title or technology
              </label>
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6272]"
                aria-hidden="true"
              />
              <input
                id="archive-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, stack, or role (e.g. Next.js, Figma)..."
                className="w-full h-12 pl-10 pr-16 rounded-2xl bg-white border border-[#CBD2DF] text-sm text-[#111216] placeholder:text-[#5A6272] transition-colors focus-visible:outline-none focus-visible:border-[#2563EB] focus-visible:ring-2 focus-visible:ring-[#2563EB]/25"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] px-2.5 rounded-lg text-xs font-mono font-semibold text-[#5A6272] hover:text-[#111216] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Morphing Category Tabs */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Filter archive by category"
            >
              {categoryTabs.map((tab) => {
                const isSelected = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    data-cursor="Filter"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`relative min-h-[44px] px-4 rounded-full text-xs font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                      isSelected ? "border-transparent text-white" : tab.idleClass
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="archive-category-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className={`absolute inset-0 rounded-full ${tab.activeBg}`}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stack Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#5A6272] mr-1">
              Filter by stack:
            </span>
            {quickStacks.map((tech) => {
              const isSelected =
                searchQuery.toLowerCase() === tech.toLowerCase();
              const isFigma = tech === "Figma";
              return (
                <motion.button
                  key={tech}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSearchQuery(isSelected ? "" : tech)}
                  aria-pressed={isSelected}
                  className={`min-h-[44px] px-3.5 rounded-lg font-mono text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isSelected
                      ? isFigma
                        ? "bg-[#DB2777] text-white"
                        : "bg-[#2563EB] text-white"
                      : isFigma
                      ? "bg-[#FDF2F8] text-[#9D174D] border border-[#F9A8D4] hover:bg-[#FCE7F3]"
                      : "bg-white text-[#272B35] border border-[#E2E5EC] hover:border-[#CBD2DF]"
                  }`}
                >
                  #{tech}
                </motion.button>
              );
            })}
            {(searchQuery || activeCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="min-h-[44px] px-3 rounded-lg text-xs font-mono font-bold text-[#BE185D] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid / Honest Empty State with Shape-In / Shape-Out */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 px-6 bg-white border border-[#E2E5EC] rounded-3xl max-w-lg mx-auto"
          >
            <Layers
              className="w-10 h-10 text-[#5A6272] mx-auto mb-3"
              aria-hidden="true"
            />
            <h2 className="text-lg font-bold text-[#111216]">
              No matching projects found
            </h2>
            <p className="text-sm text-[#5A6272] mt-1 mb-5">
              No projects matched &quot;{searchQuery}&quot; under the selected
              category filter.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reset Filters</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 22,
                    scale: 0.95,
                    clipPath: "inset(8% 0% 0% 0% round 22px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    clipPath: "inset(0% 0% 0% 0% round 16px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    clipPath: "inset(10% 10% 10% 10% round 28px)",
                  }}
                  transition={{
                    duration: 0.36,
                    delay: Math.min(index * 0.035, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    onSelect={setSelectedProject}
                    variant="archive"
                  />
                </motion.div>
              ))}

              {/* Companion Collaboration CTA Card balancing row 4 when all 10 projects are shown */}
              {filteredProjects.length % 3 === 1 && (
                <ShapeReveal
                  key="collaboration-cta"
                  variant="pill-expand"
                  className="md:col-span-1 lg:col-span-2 flex"
                >
                  <div className="w-full relative overflow-hidden rounded-3xl bg-white border border-[#F9A8D4] p-7 sm:p-10 flex flex-col justify-between shadow-[0_10px_28px_-8px_rgba(17,18,22,0.07)]">
                    <div className="relative z-10 max-w-xl">
                      <Badge variant="pink" className="mb-4">
                        SOUTH JAKARTA / ON-SITE / REMOTE / FREELANCE
                      </Badge>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111216] leading-tight">
                        Hiring a Full Stack
                        <span className="block font-serif italic font-normal text-[#BE185D] mt-0.5">
                          &amp; Web Developer?
                        </span>
                      </h2>
                      <p className="mt-3 text-sm text-[#272B35] leading-relaxed">
                        Based in South Jakarta and open for full-time Full
                        Stack Developer &amp; Web Developer roles (on-site
                        Jakarta or remote) and freelance web or UI/UX projects.
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
                      <MagneticWrap>
                        <Button
                          variant="pink"
                          size="lg"
                          data-cursor="Send"
                          onClick={() => setIsContactOpen(true)}
                        >
                          Send Message
                        </Button>
                      </MagneticWrap>
                      <MagneticWrap strength={0.16}>
                        <Link
                          href="/"
                          data-cursor="Home"
                          className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white border border-[#CBD2DF] hover:bg-[#F1F3F7] text-sm font-semibold text-[#111216] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                          <span>Back to Home</span>
                        </Link>
                      </MagneticWrap>
                    </div>
                  </div>
                </ShapeReveal>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="mt-14 pt-6 border-t border-[#E2E5EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-[#5A6272]">
          <p>Dimas Brahmantya Aryasena | Project Archive ({counts.all} Works)</p>
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] px-2 font-semibold text-[#2563EB] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg"
          >
            Back to Home
          </Link>
        </footer>
      </main>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </div>
  );
}
