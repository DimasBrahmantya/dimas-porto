"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2, ExternalLink, Info, ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  return (
    <section
      id="project"
      className="relative py-24 px-4 sm:px-8 z-10 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-mono text-xs font-semibold tracking-widest text-cyan-400 uppercase block mb-2">
            02 / KARYA TERPILIH
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Recap Project{" "}
            <span className="text-cyan-400 font-mono font-bold">2026</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-2 max-w-lg">
            Showcase aplikasi web berskala produksi, arsitektur sistem, dan
            desain antarmuka UI/UX.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="inline-flex flex-wrap gap-1.5 p-1 rounded-full bg-card/90 border border-border self-start md:self-auto"
          role="tablist"
          aria-label="Filter kategori proyek"
        >
          {(
            [
              { id: "all", label: `All (${counts.all})` },
              { id: "webapp", label: `Web App (${counts.webapp})` },
              { id: "uiux", label: `UI/UX (${counts.uiux})` },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  active
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const isFlagship = idx === 0 && Boolean(project.highlight);

          return (
            <Card
              key={project.id || project.title}
              interactive
              className={`flex flex-col justify-between group overflow-hidden ${
                isFlagship
                  ? "md:col-span-2 lg:col-span-2 border-cyan-500/35 bg-[#091526]/90"
                  : ""
              }`}
            >
              <div>
                {/* Preview Image for Non-Flagship Cards */}
                {!isFlagship && project.image && (
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative w-full aspect-video overflow-hidden bg-slate-950 cursor-pointer border-b border-border"
                    title="Klik untuk melihat detail proyek"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute inset-0 bg-cyan-950/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <Badge
                        variant="accent"
                        className="px-3 py-1 bg-slate-900/95 border-cyan-400 shadow-lg"
                      >
                        <Info className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Lihat Detail</span>
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isFlagship && (
                        <Badge variant="default">FLAGSHIP WORK</Badge>
                      )}
                      <Badge variant="accent">
                        {project.type} &bull; {project.year}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Buka repositori GitHub untuk ${project.title}`}
                          title={`Buka Repositori GitHub ${project.title}`}
                          className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                      {(project.liveUrl || (!project.githubUrl && project.link)) && (
                        <a
                          href={project.liveUrl || project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Buka live demo proyek ${project.title}`}
                          title={`Buka Live Demo ${project.title}`}
                          className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300 hover:text-white hover:bg-cyan-500/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      isFlagship
                        ? "grid grid-cols-1 md:grid-cols-2 gap-5 items-start pt-1"
                        : "pt-1"
                    }
                  >
                    <div>
                      <CardTitle
                        onClick={() => onSelectProject(project)}
                        className="uppercase group-hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </CardTitle>

                      <p className="text-slate-300 font-sans text-xs leading-relaxed mt-2">
                        {project.desc}
                      </p>

                      {isFlagship && project.role && (
                        <p className="text-cyan-300/90 font-mono text-[11px] mt-3">
                          Peran: {project.role}
                        </p>
                      )}
                    </div>

                    {isFlagship && project.image && (
                      <div
                        onClick={() => onSelectProject(project)}
                        className="relative aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer"
                        title="Klik untuk melihat detail proyek"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[11px]">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-3 pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectProject(project)}
                  className="px-3 text-cyan-300 hover:text-white hover:bg-cyan-500/10 -ml-2"
                >
                  <Info className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Lihat Detail</span>
                </Button>

                <span className="font-mono text-[11px] text-slate-500">
                  {project.year}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Archive CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/90 hover:bg-slate-800/80 border border-border hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 font-mono text-xs font-semibold tracking-wider transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span>Buka Halaman Khusus Project (Preview Gambar &amp; Detail Lengkap)</span>
          <ArrowUpRight
            className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
