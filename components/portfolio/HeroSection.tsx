"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderGit2, Send, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  projectsCount: number;
  onScrollToSection: (id: string) => void;
  onOpenModal: () => void;
}

export function HeroSection({
  projectsCount,
  onScrollToSection,
  onOpenModal,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-8 pt-28 pb-16 z-10 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Editorial Identity & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <Badge variant="accent" className="mb-5 px-3 py-1">
            <Sparkles className="w-3 h-3 text-cyan-400" aria-hidden="true" />
            <span>FULL STACK DEVELOPER &bull; WEB DEVELOPER</span>
          </Badge>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            Dimas Brahmantya{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
              Aryasena
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-xl font-sans leading-relaxed">
            Lulusan Teknik Informatika Universitas Muhammadiyah Malang (IPK 3.80).
            Berfokus pada pembangunan aplikasi web berskala produksi, antarmuka
            modern yang aksesibel, dan arsitektur sistem yang tangguh.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Button
              size="lg"
              onClick={() => onScrollToSection("project")}
              aria-label="Menuju ke bagian proyek unggulan"
            >
              <FolderGit2 className="w-4 h-4" aria-hidden="true" />
              <span>LIHAT PROYEK</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onOpenModal}
              aria-label="Buka formulir untuk mengirim pesan langsung"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>HUBUNGI SAYA</span>
            </Button>

            <Link
              href="/projects"
              aria-label="Buka katalog arsip proyek lengkap"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono font-semibold text-cyan-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Arsip Lengkap</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Key Highlights Strip */}
          <div className="mt-10 pt-6 border-t border-border w-full max-w-lg grid grid-cols-3 gap-4 font-mono">
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-white">
                3.80
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                IPK Teknik Informatika
              </span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-cyan-300">
                {projectsCount}+
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                Proyek Terkurasi
              </span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-white">
                2026
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                Portfolio Edition
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: Framed Portrait Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative group">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-blue-600/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-2 bg-card/90 border border-border shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-colors duration-300 group-hover:border-cyan-400/40">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                <Image
                  src="/IMG_0035.JPG"
                  alt="Dimas Brahmantya Aryasena"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover object-top scale-105 group-hover:scale-[1.08] transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/10">
                  <span className="font-mono text-[11px] font-semibold text-slate-200">
                    Malang, Indonesia
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
