"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MagneticWrap,
  ShapeReveal,
  TiltSpotlightCard,
} from "@/components/portfolio/MotionPrimitives";

export type ProjectFilter = "all" | "webapp" | "uiux";

interface ProjectsSectionProps {
  projects: Project[];
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  onSelectProject: (project: Project) => void;
}

const portraitPreviewIds = new Set(["smart-laundry", "readly"]);

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
            01 / SELECTED WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#111216]">
            Featured Projects.
          </h2>
          <p className="text-sm sm:text-[15px] text-[#5A6272] mt-2 max-w-xl">
            Production web applications, multi-tenant SaaS architecture, and
            UI/UX prototypes.
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
                data-cursor="Filter"
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
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="overflow-hidden rounded-3xl shadow-[0_12px_32px_-8px_rgba(17,18,22,0.08)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                  <div className="lg:col-span-6 flex flex-col items-start">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant="blue">
                        {flagship.id === "loyalty-card"
                          ? "FLAGSHIP SAAS"
                          : flagship.type.toUpperCase()}
                      </Badge>
                      {flagship.id === "loyalty-card" ? (
                        <Badge variant="pink">PostgreSQL RLS</Badge>
                      ) : (
                        <Badge variant="outline">
                          {flagship.category === "uiux" ? "UI/UX" : "WEB APP"}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111216] mb-3">
                      {flagship.title}
                    </h3>

                    <p className="text-sm text-[#272B35] leading-relaxed mb-5">
                      {flagship.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {flagship.tech.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary">
                          #{t}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <MagneticWrap>
                        <Button
                          size="default"
                          data-cursor="Inspect"
                          onClick={() => onSelectProject(flagship)}
                        >
                          View Details
                        </Button>
                      </MagneticWrap>

                      <MagneticWrap>
                        <Link
                          href="/projects"
                          data-cursor="Archive"
                          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full bg-[#FDF2F8] text-[#9D174D] border border-[#F9A8D4] hover:bg-[#FCE7F3] text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          <span>Open Archive ({counts.all})</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </MagneticWrap>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <button
                      type="button"
                      data-cursor="Inspect"
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
                          portraitPreviewIds.has(flagship.id)
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

      {/* Supporting 3-Column Grid with Shape-In / Shape-Out & 3D Tilt Spotlight */}
      {supporting.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {supporting.map((project, index) => {
              const isUiux = project.category === "uiux";
              const isPortrait = portraitPreviewIds.has(project.id);

              return (
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
                  viewport={{ once: false, amount: 0.12 }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    clipPath: "inset(8% 8% 8% 8% round 28px)",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <TiltSpotlightCard
                    accent={isUiux ? "pink" : "blue"}
                    cursorLabel="View"
                  >
                    <Card
                      interactive
                      className={`h-full flex flex-col justify-between overflow-hidden ${
                        isUiux ? "border-[#F9A8D4]" : "border-[#E2E5EC]"
                      }`}
                    >
                      <div>
                        <div className="p-3 pb-0">
                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            aria-label={`Inspect ${project.title}`}
                            className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#F1F3F7] border border-[#E2E5EC] group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 400px"
                              className={
                                isPortrait
                                  ? "object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                  : "object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                              }
                            />
                          </button>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <Badge variant={isUiux ? "pink" : "blue"}>
                              {project.type.toUpperCase()}
                            </Badge>

                            <div className="flex items-center gap-2">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-cursor="Code"
                                  aria-label={`Open GitHub repository for ${project.title}`}
                                  className="w-11 h-11 rounded-full bg-[#F1F3F7] border border-[#E2E5EC] flex items-center justify-center text-[#475060] hover:text-[#111216] hover:border-[#CBD2DF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                                >
                                  <Code2 className="w-4 h-4" aria-hidden="true" />
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-cursor={isUiux ? "Figma" : "Live"}
                                  aria-label={`Open live preview for ${project.title}`}
                                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                                    isUiux
                                      ? "bg-[#FCE7F3] border-[#F9A8D4] text-[#9D174D] hover:bg-[#DB2777] hover:text-white"
                                      : "bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8] hover:bg-[#2563EB] hover:text-white"
                                  }`}
                                >
                                  <ExternalLink
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
                                </a>
                              )}
                            </div>
                          </div>

                          <CardTitle className="text-lg">
                            <button
                              type="button"
                              onClick={() => onSelectProject(project)}
                              className="min-h-[44px] py-1.5 flex items-center w-full text-left hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                            >
                              {project.title}
                            </button>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pb-4">
                          <p className="text-xs sm:text-[13px] text-[#5A6272] leading-relaxed line-clamp-2">
                            {project.desc}
                          </p>
                        </CardContent>
                      </div>

                      <CardFooter className="pt-3 pb-4">
                        <span className="font-mono text-[11px] font-semibold text-[#272B35] truncate">
                          {project.tech.slice(0, 3).join(" / ")}
                        </span>
                      </CardFooter>
                    </Card>
                  </TiltSpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
