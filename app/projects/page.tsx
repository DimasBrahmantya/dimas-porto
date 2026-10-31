"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { projectsData } from "@/data/projects";
import { Project, ProjectCategory } from "@/types/project";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Search,
  Sparkles,
  Info,
  Layers,
  RotateCcw
} from "lucide-react";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on active category and search term
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

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Deep blue atmospheric radial background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, #0e274a 0%, #08172e 50%, #030813 90%)",
        }}
      />

      {/* Atmospheric embers & floating star particles */}
      <FloatingShapes />

      {/* TOP FLOATING NAVIGATION */}
      <header className="sticky top-4 inset-x-0 z-40 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between mb-6">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#081220]/90 backdrop-blur-md border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>KEMBALI KE BERANDA</span>
        </Link>

        {/* Center Monogram Logo */}
        <Link
          href="/"
          className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/70 backdrop-blur-md flex items-center justify-center font-mono font-black text-base shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
        >
          <span className="bg-gradient-to-br from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            DB
          </span>
        </Link>

        {/* Project Counter Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>TOTAL: <strong className="text-white">{projectsData.length}</strong> PROYEK</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 z-10 relative">
        
        {/* Page Header Lockup */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold mb-3 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHIVE &amp; SHOWCASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading">
            KATALOG <span className="text-cyan-400">PROYEK</span>
          </h1>

          <p className="mt-3 text-slate-400 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl">
            Daftar lengkap karya web application, arsitektur microservice, dan desain antarmuka UI/UX. Klik tombol pada kartu untuk menuju repositori GitHub, mencoba Live Demo, atau membaca penjelasan arsitektur lengkapnya.
          </p>

          {/* Search & Filter Controls */}
          <div className="w-full mt-8 flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul, teknologi (cth: Next.js)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-xs font-mono text-white placeholder-slate-500 backdrop-blur-md shadow-inner transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-1.5 font-mono text-xs w-full">
              {(
                [
                  { id: "all", label: "SEMUA" },
                  { id: "webapp", label: "WEB APP" },
                  { id: "uiux", label: "UI/UX" },
                  { id: "academic", label: "AKADEMIK" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider cursor-pointer font-bold ${
                    activeCategory === cat.id
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat.label} (
                  {cat.id === "all"
                    ? projectsData.length
                    : projectsData.filter((p) => p.category === cat.id).length}
                  )
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-lg mx-auto">
            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white uppercase font-mono">
              Tidak Ada Proyek yang Cocok
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4 font-sans">
              Tidak ditemukan hasil untuk pencarian &quot;{searchQuery}&quot; pada kategori ini.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold inline-flex items-center gap-2 hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="game-panel game-panel-hover rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  {/* Top: 1 Preview Image Per Project */}
                  <div>
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="relative w-full aspect-video overflow-hidden bg-slate-950 cursor-pointer"
                      title="Klik untuk melihat penjelasan lengkap"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-transparent to-transparent opacity-80" />

                      {/* Floating Meta Pills */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider backdrop-blur-md">
                          {project.type}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-slate-300 border border-slate-700/80 backdrop-blur-md">
                        {project.year}
                      </div>

                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-400 font-mono text-xs font-bold shadow-lg flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          Lihat Detail
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-lg sm:text-xl font-bold uppercase text-white mb-2 font-heading group-hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="text-slate-300 font-sans text-xs leading-relaxed line-clamp-3 mb-4">
                        {project.desc}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-400">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono font-bold text-cyan-400 hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      Detail
                    </button>

                    {/* Quick External Links (GitHub & Live Demo) */}
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                          title="Buka Repositori GitHub"
                        >
                          <Code2 className="w-4 h-4" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                          title="Buka Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>KEMBALI KE HALAMAN UTAMA</span>
          </Link>
        </div>
      </main>

      {/* Detail Pop-up Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

