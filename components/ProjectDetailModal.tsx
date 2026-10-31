"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import {
  X,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
  CheckCircle2,
  Sparkles,
  UserCheck
} from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose
}: ProjectDetailModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020610]/85 backdrop-blur-md -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#07111e]/95 border border-cyan-500/35 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden text-slate-100"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center justify-center cursor-pointer shadow-lg"
              title="Tutup (ESC)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* Project Image Display */}
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111e] via-transparent to-transparent pointer-events-none" />
                
                {/* Floating pill on image */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold backdrop-blur-md">
                    {project.type}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 font-mono text-[11px] font-bold backdrop-blur-md flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Title & Role Lockup */}
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PROJECT DETAIL ARCHIVE</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-heading tracking-tight">
                  {project.title}
                </h2>
                {project.role && (
                  <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-400 font-mono">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span>Peran: <strong className="text-slate-200">{project.role}</strong></span>
                  </div>
                )}
              </div>

              {/* Comprehensive Description */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Penjelasan Lengkap Proyek
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-line">
                  {project.fullDescription || project.desc}
                </p>
              </div>

              {/* Key Features List */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Fitur &amp; Kemampuan Utama
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Teknologi &amp; Tools Digunakan
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-cyan-200 font-mono text-xs font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: GitHub & Live Demo */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-102 cursor-pointer shadow-md"
                    >
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      Repository GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-102 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka Live Demo
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 font-mono text-xs font-medium cursor-pointer transition-colors"
                >
                  Tutup Jendela
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

