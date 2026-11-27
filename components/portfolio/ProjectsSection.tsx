"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import {
  MagneticWrap,
  RollingNumber,
  ShapeReveal,
  SplitTextReveal,
  TextScramble,
} from "@/components/portfolio/MotionPrimitives";

export type ProjectFilter = "all" | "webapp" | "uiux";

interface ProjectsSectionProps {
  projects: Project[];
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({
  projects,
  filter,
  onFilterChange,
  onSelectProject,
}: ProjectsSectionProps) {
  const filteredProjects = projects.filter((p) =>
    filter === "all" ? true : p.category === filter
  );

  const counts = {
    all: projects.length,
    webapp: projects.filter((p) => p.category === "webapp").length,
    uiux: projects.filter((p) => p.category === "uiux").length,
  };

  // Keep the homepage editorial layout crisp: Flagship + 3 key cards when "all", or matching subset when filtered
  const showcaseProjects =
    filter === "all"
      ? [
          projects[0],
          projects[1],
          projects[2],
          projects[4],
        ].filter(Boolean)
      : filteredProjects.slice(0, 4);

  const flagship = showcaseProjects[0];
  const supporting = showcaseProjects.slice(1);

  const tabOptions: {
    id: ProjectFilter;
    label: string;
    activeBg: string;
    idleClass: string;
  }[] = [
    {
      id: "all",
      label: `All (${counts.all})`,
      activeBg: "bg-[#111216]",
      idleClass: "bg-white text-[#475060] border-[#E2E5EC] hover:border-[#CBD2DF]",
    },
    {
      id: "webapp",
      label: `Web App (${counts.webapp})`,
      activeBg: "bg-[#2563EB]",
      idleClass: "bg-white text-[#475060] border-[#E2E5EC] hover:border-[#BFDBFE]",
    },
    {
      id: "uiux",
      label: `UI/UX (${counts.uiux})`,
      activeBg: "bg-[#DB2777]",
      idleClass:
        "bg-[#FDF2F8] text-[#9D174D] border-[#F9A8D4] hover:bg-[#FCE7F3]",
    },
  ];

  return (
    <section
      id="works"
      className="scroll-mt-20 py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[#E2E5EC]"
    >
      {/* Header & Morphing Filter Tabs */}
      <ShapeReveal
        variant="fade-up"
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div>
          <span className="font-mono text-xs font-bold tracking-[0.08em] text-[#2563EB] uppercase block mb-2">
            <TextScramble text="01 / SELECTED WORKS" />
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#111216]">
            <SplitTextReveal text="Featured Projects." />
          </h2>
          <p className="text-sm sm:text-[15px] text-[#5A6272] mt-2 max-w-xl">
            Built and deployed web applications, full-stack systems, and UI/UX
            prototypes.
          </p>
        </div>

        <div
          className="inline-flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter project categories"
        >
          {tabOptions.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onFilterChange(tab.id)}
                className={`relative min-h-[44px] px-4 rounded-full text-xs font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isSelected
                    ? "border-transparent text-white"
                    : tab.idleClass
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="works-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-full ${tab.activeBg}`}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </ShapeReveal>

      {/* Flagship Split Card (Shape-In / Shape-Out on Filter Switch) */}
      <ShapeReveal variant="curtain-up" className="mb-7">
        <AnimatePresence mode="wait">
          {flagship && (
            <motion.div
              key={flagship.id}
              initial={{
                opacity: 0,
                clipPath: "inset(8% 2% 8% 2% round 28px)",
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                clipPath: "inset(6% 4% 6% 4% round 28px)",
                scale: 0.98,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="overflow-hidden rounded-3xl shadow-[0_12px_32px_-8px_rgba(17,18,22,0.08)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                  <div className="lg:col-span-6 flex flex-col items-start">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant={flagship.category === "uiux" ? "pink" : "blue"}>
                        {flagship.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {flagship.category === "uiux" ? "UI/UX" : "WEB APP"}
                      </Badge>
                      {flagship.role && (
                        <Badge variant="secondary">
                          Role: {flagship.role}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111216] mb-3">
                      {flagship.title}
                    </h3>

                    <p className="text-sm text-[#272B35] leading-relaxed mb-5">
                      {flagship.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {flagship.tech.map((t) => (
                        <Badge key={t} variant="secondary">
                          #{t}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <MagneticWrap>
                        <Button
                          size="default"
                          onClick={() => onSelectProject(flagship)}
                        >
                          View Details
                        </Button>
                      </MagneticWrap>

                      {flagship.liveUrl && (
                        <MagneticWrap>
                          <a
                            href={flagship.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                              flagship.category === "uiux"
                                ? "bg-[#FCE7F3] text-[#9D174D] border border-[#F9A8D4] hover:bg-[#DB2777] hover:text-white"
                                : "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] hover:bg-[#2563EB] hover:text-white"
                            }`}
                          >
                            <span>
                              {flagship.category === "uiux"
                                ? "Figma Prototype"
                                : "Live Demo"}
                            </span>
                            <ExternalLink
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                          </a>
                        </MagneticWrap>
                      )}

                      {flagship.githubUrl && (
                        <MagneticWrap>
                          <a
                            href={flagship.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-full bg-[#F1F3F7] text-[#111216] border border-[#E2E5EC] hover:border-[#CBD2DF] text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                          >
                            <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>GitHub</span>
                          </a>
                        </MagneticWrap>
                      )}

                      <MagneticWrap>
                        <Link
                          href="/projects"
                          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full bg-[#FDF2F8] text-[#9D174D] border border-[#F9A8D4] hover:bg-[#FCE7F3] text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          <span>
                            Open Archive (<RollingNumber value={counts.all} />)
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </MagneticWrap>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <button
                      type="button"
                      data-cursor="View ↗"
                      onClick={() => onSelectProject(flagship)}
                      aria-label={`Open case study details for ${flagship.title}`}
                      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#F1F3F7] border border-[#E2E5EC] group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                    >
                      <Image
                        src={flagship.image}
                        alt={flagship.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 620px"
                        className={
                          flagship.portrait
                            ? "object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            : "object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        }
                      />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </ShapeReveal>

      {/* Supporting 3-Column Grid with Shape-In / Shape-Out, Uniform Chips & 3D Tilt Spotlight */}
      {supporting.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {supporting.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{
                  opacity: 0,
                  y: 26,
                  scale: 0.94,
                  clipPath: "inset(10% 0% 0% 0% round 24px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  clipPath: "inset(0% 0% 0% 0% round 16px)",
                }}
                viewport={{ once: true, amount: "some" }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  clipPath: "inset(8% 8% 8% 8% round 28px)",
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  variant="home"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
