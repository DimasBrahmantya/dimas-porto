"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import { projectsData } from "@/data/projects";
import {
  GraduationCap,
  Briefcase,
  ExternalLink,
  Copy,
  Check,
  X,
  Send,
  Loader2,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ChevronUp,
  Play,FolderGit2} from "lucide-react";

// Projects data is loaded from @/data/projects.ts (supports Supabase & detailed views)

// Official colorful icons for software skills
const softwareSkills = [
  {
    name: "Next.js",
    category: "Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    bg: "bg-slate-900 border-slate-700/80"
  },
  {
    name: "React",
    category: "Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    bg: "bg-cyan-950/40 border-cyan-800/60"
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    bg: "bg-blue-950/40 border-blue-800/60"
  },
  {
    name: "Laravel",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    bg: "bg-red-950/40 border-red-800/60"
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    bg: "bg-sky-950/40 border-sky-800/60"
  },
  {
    name: "Figma",
    category: "UI/UX",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    bg: "bg-purple-950/40 border-purple-800/60"
  },
  {
    name: "NestJS",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    bg: "bg-rose-950/40 border-rose-800/60"
  },
  {
    name: "Vue.js",
    category: "Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    bg: "bg-emerald-950/40 border-emerald-800/60"
  },
  {
    name: "MySQL",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    bg: "bg-amber-950/40 border-amber-800/60"
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    bg: "bg-green-950/40 border-green-800/60"
  }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"profil" | "project" | "contact">("profil");
  const [filter, setFilter] = useState<"all" | "webapp" | "uiux" | "academic">("all");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Track active section automatically on vertical scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      const contactEl = document.getElementById("contact");
      const projectEl = document.getElementById("project");
      const profilEl = document.getElementById("profil");

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveTab("contact");
      } else if (projectEl && scrollPos >= projectEl.offsetTop) {
        setActiveTab("project");
      } else if (profilEl && scrollPos >= profilEl.offsetTop) {
        setActiveTab("profil");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredProjects = projectsData.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dimasbrahmantyaaryasena@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/dimasbrahmantyaaryasena@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject ? `[Portofolio] ${formData.subject}` : `Pesan Portofolio Baru dari ${formData.name}`,
          message: formData.message,
          _captcha: "false"
        })
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
        }, 3000);
      } else {
        setErrorMessage("Gagal mengirim pesan. Silakan coba lagi nanti.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black scroll-smooth">
      {/* Deep blue atmospheric radial background */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle at 50% 35%, #0e274a 0%, #08172e 50%, #030813 90%)"
        }}
      />

      {/* Atmospheric embers & star particles */}
      <FloatingShapes />

      {/* TOP FLOATING CAPSULE NAVIGATION (Matches reference image header) */}
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        
        {/* Top-Left Monogram Logo (DB Crest) */}
        <motion.button
          onClick={() => scrollToSection("home")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto flex items-center gap-2 group cursor-pointer focus:outline-none"
          title="Ke Layar Awal"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/70 backdrop-blur-md flex items-center justify-center font-mono font-black text-base shadow-[0_0_20px_rgba(255,255,255,0.08)] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
            <span className="bg-gradient-to-br from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              DB
            </span>
          </div>
        </motion.button>

        {/* Center Pill Capsule Navigation (Ref: [PROFIL] [PROJECT] [CONTACT PERSON]) */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-[#081220]/85 backdrop-blur-md border border-cyan-500/25 shadow-[0_0_30px_rgba(6,182,212,0.18)] font-mono text-[11px] sm:text-xs font-bold tracking-wider"
        >
          <button
            onClick={() => {
              setActiveTab("profil");
              scrollToSection("profil");
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 uppercase cursor-pointer ${
              activeTab === "profil"
                ? "bg-white text-black font-extrabold shadow-[0_0_18px_rgba(255,255,255,0.6)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            PROFIL
          </button>

          <button
            onClick={() => {
              setActiveTab("project");
              scrollToSection("project");
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 uppercase cursor-pointer ${
              activeTab === "project"
                ? "bg-white text-black font-extrabold shadow-[0_0_18px_rgba(255,255,255,0.6)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            PROJECT
          </button>

          <button
            onClick={() => {
              setActiveTab("contact");
              scrollToSection("contact");
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 uppercase cursor-pointer ${
              activeTab === "contact"
                ? "bg-white text-black font-extrabold shadow-[0_0_18px_rgba(255,255,255,0.6)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            CONTACT PERSON
          </button>
        </motion.nav>

        {/* Right Corner: Connect Button */}
        <div className="pointer-events-auto">
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-semibold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CONNECT</span>
          </motion.button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO / GAME MENU TITLE SCREEN                                 */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 pt-24 pb-16 z-10 max-w-6xl mx-auto"
      >
        <div className="w-full flex flex-col items-center text-center my-auto">
          
          {/* Main Title Lockup with CLEAR Photo Arch (NO RED OVERLAY) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10 w-full">
            
            {/* Left: Sleek Card Arch with Dimas photo - Clear, vivid, natural lighting */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="w-48 h-52 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-3xl md:rounded-l-[4.5rem] md:rounded-r-2xl p-2.5 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-[#0c182c] border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.18)] transition-all duration-500 group-hover:shadow-[0_0_55px_rgba(6,182,212,0.35)] group-hover:border-cyan-400/60">
                <div className="relative w-full h-full rounded-2xl md:rounded-l-[4rem] md:rounded-r-xl overflow-hidden bg-slate-950">
                  <Image
                    src="/IMG_0035.JPG"
                    alt="Dimas Brahmantya Aryasena"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 brightness-105 contrast-105"
                    priority
                  />
                  {/* Subtle clean cinematic vignette only at bottom edge (no red overlay) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Right: Typography PORTFOLIO 2026 + Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="flex items-baseline gap-3">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] font-heading">
                  PORTFOLIO
                </h1>
                <span className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-400 font-mono">
                  2026
                </span>
              </div>

              {/* Subtitle Badge: ■ FRONT-END DEVELOPER */}
              <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-700/60 font-mono text-xs sm:text-sm text-slate-300 font-bold tracking-wider">
                <span className="inline-block w-2 h-2 rounded-xs bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                <span className="uppercase text-cyan-200">FULL STACK DEVELOPER, WEB DEVELOPER & FRONT-END DEVELOPER </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-md font-sans leading-relaxed">
                Dimas Brahmantya Aryasena &bull; Lulusan Teknik Informatika UMM (IPK 3.80).
              </p>
            </motion.div>
          </div>

          {/* Game Menu List (START / PROJECTS / CONTACT / OPTIONS) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-2.5 font-mono font-bold tracking-widest text-xs sm:text-sm select-none"
          >
            <motion.button
              onClick={() => scrollToSection("profil")}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 text-slate-200 hover:text-cyan-300 transition-colors py-1.5 px-6 rounded-full hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 fill-cyan-400" />
              <span>START</span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("project")}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1.5 px-6 rounded-full hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              <span>PROJECTS</span>
            </motion.button>

            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.05, x: 3 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-1.5 text-cyan-400/90 hover:text-cyan-300 transition-colors py-1 px-4 rounded-full hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/40 cursor-pointer font-mono text-[11px] sm:text-xs tracking-wider"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>PROJECT ARCHIVE (PAGE)</span>
              </motion.div>
            </Link>

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1.5 px-6 rounded-full hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              <span>CONTACT PERSON</span>
            </motion.button>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors py-1 px-4 cursor-pointer"
            >
              <span>OPTIONS</span>
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PROFIL / CHARACTER SHEET (Screen 2 from reference)            */}
      {/* ========================================================================= */}
      <section
        id="profil"
        className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 z-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Greeting, Glowing Halo Avatar, & Floating Embers */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-4">
              <span className="font-mono text-xs tracking-widest text-slate-400 uppercase block mb-1">
                HELLO, I AM
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight glow-text-cyan font-heading">
                DIMAS
                <span className="block text-slate-300 text-2xl sm:text-3xl font-bold font-mono mt-0.5">
                  BRAHMANTYA ARYASENA
                </span>
              </h2>
            </div>

            {/* Atmospheric Halo Glow Avatar with Embers */}
            <div className="relative mt-2 mb-6 group">
              {/* Cyan halo aura */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/25 filter blur-3xl scale-125 -z-10 animate-pulse pointer-events-none" />
              
              {/* Fiery ember particles */}
              <div className="ember-particle w-2 h-2 top-1/4 left-2" style={{ animationDelay: "0.2s" }} />
              <div className="ember-particle w-1.5 h-1.5 top-2/3 right-3" style={{ animationDelay: "1.1s" }} />
              <div className="ember-particle w-2 h-2 bottom-6 left-1/3" style={{ animationDelay: "2.4s" }} />

              <div className="w-56 h-68 sm:w-64 sm:h-80 rounded-3xl overflow-hidden border border-cyan-500/35 bg-[#091322] shadow-[0_0_35px_rgba(6,182,212,0.3)] relative">
                <Image
                  src="/IMG_4403.JPG"
                  alt="Dimas Portrait"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover object-top brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-80" />
              </div>
            </div>

            {/* Action button to scroll to projects */}
            <motion.button
              onClick={() => scrollToSection("project")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all cursor-pointer"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right Column: About, Software Skills (Colored Icons), Education & Experience */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* 1. ABOUT ME */}
            <div className="game-panel p-5 rounded-2xl">
              <h3 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ABOUT ME</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                Lulusan Teknik Informatika di Universitas Muhammadiyah Malang dengan IPK 3.80. Memiliki kemampuan kerja tim yang adaptif serta daya serap cepat terhadap perkembangan teknologi antarmuka web modern. Berfokus pada posisi <strong className="text-cyan-300">Front-End Developer</strong>, <strong className="text-white">Web Developer</strong>, dan <strong className="text-rose-300">Full Stack Developer</strong>.
              </p>
            </div>

            {/* 2. SOFTWARE SKILLS (Featuring colorful official app icons like reference) */}
            <div className="game-panel p-5 rounded-2xl">
              <h3 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>SOFTWARE SKILLS &amp; TECH STACK</span>
                <span className="text-[10px] text-slate-500 font-normal">OFFICIAL TOOLS</span>
              </h3>

              {/* App icon grid matching reference visual style */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {softwareSkills.map((tech) => (
                  <div
                    key={tech.name}
                    className={`p-2.5 rounded-xl border ${tech.bg} backdrop-blur-md flex items-center gap-2.5 hover:scale-105 hover:border-cyan-400/80 transition-all cursor-default shadow-sm group`}
                  >
                    <div className="w-7 h-7 shrink-0 flex items-center justify-center p-0.5 rounded-lg bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] font-bold text-slate-200 truncate group-hover:text-white">
                        {tech.name}
                      </span>
                      <span className="block font-mono text-[9px] text-slate-500 truncate">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. EDUCATION & EXPERIENCE (Side by side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education */}
              <div className="game-panel p-4 rounded-2xl">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>EDUCATION</span>
                </h4>
                <div className="space-y-2.5 font-mono text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold text-[10px] block">&bull; 2022 - 2026</span>
                    <p className="text-white font-bold text-xs">Univ. Muhammadiyah Malang</p>
                    <p className="text-slate-400 text-[11px] font-sans">Teknik Informatika &bull; IPK 3.80</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold text-[10px] block">&bull; 2019 - 2022</span>
                    <p className="text-slate-200 font-bold text-xs">SMAN 2 Kota Pasuruan</p>
                    <p className="text-slate-400 text-[11px] font-sans">Jurusan MIPA</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="game-panel p-4 rounded-2xl">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-rose-400" />
                  <span>EXPERIENCE</span>
                </h4>
                <div className="font-mono text-xs">
                  <span className="text-rose-400 font-bold text-[10px] block">&bull; EX-INTERN 2025</span>
                  <p className="text-white font-bold text-xs">RSUD Grati Kab. Pasuruan</p>
                  <p className="text-slate-300 text-[11px] mt-1 font-sans leading-snug">
                    Fullstack Web Developer: Mengembangkan modul pendaftaran rawat jalan SIMRS berbasis Laravel &amp; MySQL.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. LANGUAGE [COMMUNICATION] & METRICS */}
            <div className="game-panel p-4 rounded-2xl">
              <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>LANGUAGE [COMMUNICATION]</span>
                <span className="text-[10px] text-cyan-400">PROFICIENCY</span>
              </h4>
              <div className="space-y-2 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300">INDONESIA (NATIVE)</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300">ENGLISH (COMMUNICATION)</span>
                    <span className="text-cyan-400 font-bold">80%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "80%" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: RECAP PROJECT (Screen 3 from reference)                       */}
      {/* ========================================================================= */}
      <section
        id="project"
        className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            RECAP PROJECT <span className="text-cyan-400">2026</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            SHOWCASE WEB APPLICATION &bull; UI/UX DESIGN &bull; ACADEMIC
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-5 font-mono text-xs">
            {(["all", "webapp", "uiux", "academic"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full transition-all uppercase tracking-wider cursor-pointer ${
                  filter === cat
                    ? "bg-cyan-500 text-black font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat === "all"
                  ? `ALL (${projectsData.length})`
                  : cat === "webapp"
                  ? `WEB APP (${projectsData.filter((p) => p.category === "webapp").length})`
                  : cat === "uiux"
                  ? `UI/UX (${projectsData.filter((p) => p.category === "uiux").length})`
                  : `ACADEMIC (${projectsData.filter((p) => p.category === "academic").length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (Bento/Poster Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id || project.title}
              className="game-panel game-panel-hover rounded-2xl p-5 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800/80 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    {project.type} &bull; {project.year}
                  </span>

                  {(project.link || project.githubUrl || project.liveUrl) && (
                    <a
                      href={project.link || project.githubUrl || project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 border border-slate-700 transition-all cursor-pointer"
                      title="Buka Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold uppercase text-white mb-2 font-heading group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-300 font-sans text-xs leading-relaxed mb-4">
                  {project.desc}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800 font-mono text-[10px] text-slate-400">
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
          ))}
        </div>

        {/* Link to Dedicated Projects Page */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-700/80 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 font-mono text-xs font-semibold tracking-wider transition-all group"
          >
            <span>Buka Halaman Khusus Project (Preview Gambar &amp; Detail Lengkap)</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CONTACT PERSON & OUTRO (Screen 4 from reference)              */}
      {/* ========================================================================= */}
      <section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 py-24 z-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Circular Photo Frame with Social List (Ref image screen 4) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4">
              CONTACT ME
            </span>

            {/* Circular Avatar with Glowing Ring */}
            <div className="relative mb-5">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-cyan-500 via-rose-500 to-blue-500 shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
                  <Image
                    src="/dsc_6847.JPG"
                    alt="Dimas Contact Avatar"
                    fill
                    sizes="(max-width: 768px) 192px, 256px"
                    className="object-cover object-top brightness-105 contrast-105"
                  />
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="font-mono text-xs font-bold text-white tracking-widest block uppercase">
                  DIMAS BRAHMANTYA
                </span>
                <span className="font-mono text-[10px] text-slate-400">2026 EDITION</span>
              </div>
            </div>

            {/* Social Channels List with Leader Line style */}
            <div className="w-full max-w-xs space-y-2 font-mono text-xs">
              <a
                href="https://instagram.com/dimasbas_"
                target="_blank"
                rel="noopener noreferrer"
                className="game-panel p-2.5 rounded-xl flex items-center justify-between hover:border-pink-500/50 hover:bg-pink-950/20 transition-all text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-[10px] font-bold">
                    IG
                  </span>
                  <span className="font-bold">@dimasbas_</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://github.com/DimasBrahmantya"
                target="_blank"
                rel="noopener noreferrer"
                className="game-panel p-2.5 rounded-xl flex items-center justify-between hover:border-slate-400/50 hover:bg-slate-800/40 transition-all text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
                    GH
                  </span>
                  <span className="font-bold">DimasBrahmantya</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/"
                target="_blank"
                rel="noopener noreferrer"
                className="game-panel p-2.5 rounded-xl flex items-center justify-between hover:border-blue-500/50 hover:bg-blue-950/20 transition-all text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                    IN
                  </span>
                  <span className="font-bold truncate max-w-[150px]">dimas-brahmantya</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://wa.me/6281235829634"
                target="_blank"
                rel="noopener noreferrer"
                className="game-panel p-2.5 rounded-xl flex items-center justify-between hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">081235829634</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Right Column: THANK YOU 2026 Typography + CTA Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none font-heading">
                THANK YOU
              </h2>
              <span className="text-3xl sm:text-5xl lg:text-6xl font-light text-cyan-400 font-mono block mt-1">
                2026
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg font-sans">
              Terima kasih telah menjelajahi portofolio ini. Terbuka lebar untuk diskusi proyek web, tawaran kerja, magang, maupun proyek kolaboratif lainnya.
            </p>

            {/* Direct Inbox Card with Copy Feature */}
            <div className="game-panel p-4 rounded-2xl mb-5">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                DIRECT INBOX
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-white break-all">
                  dimasbrahmantyaaryasena@gmail.com
                </span>

                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 border border-slate-700 hover:border-cyan-400 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>SALIN EMAIL</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 font-mono text-xs font-bold mb-6">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-cyan-500 text-black font-extrabold tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>KIRIM PESAN LANGSUNG</span>
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("home")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>KEMBALI KE ATAS</span>
              </motion.button>
            </div>

            {/* Bottom Preview Cards (Featured works from screen 4) */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-2.5">
                FEATURED PORTFOLIO HIGHLIGHTS
              </span>
              <div className="grid grid-cols-3 gap-2.5 font-mono text-[11px]">
                <div className="game-panel p-2.5 rounded-xl border-cyan-500/20">
                  <span className="text-cyan-400 font-bold block">SIMRS 2026</span>
                  <span className="text-slate-400 text-[10px]">Healthcare App</span>
                </div>
                <div className="game-panel p-2.5 rounded-xl border-rose-500/20">
                  <span className="text-rose-400 font-bold block">SECURE HUB</span>
                  <span className="text-slate-400 text-[10px]">Anti-Phishing</span>
                </div>
                <div className="game-panel p-2.5 rounded-xl border-blue-500/20">
                  <span className="text-blue-400 font-bold block">SMART LAUNDRY</span>
                  <span className="text-slate-400 text-[10px]">Figma UI/UX</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center font-mono text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} DIMAS BRAHMANTYA ARYASENA &bull; PORTFOLIO 2026</p>
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            <span>KEMBALI KE AWAL</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* POP-UP DIRECT MESSAGE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg game-panel rounded-3xl p-6 sm:p-8 z-10 font-sans border-cyan-500/40 shadow-[0_0_45px_rgba(6,182,212,0.25)] max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400">
                  <Send className="w-4 h-4" />
                  <span>INTEREST MESSAGE ME</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs">
                  ⚠️ {errorMessage}
                </div>
              )}

              {isSubmitted ? (
                <div className="p-8 text-center font-mono py-10">
                  <Check className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-xl font-bold mb-2 uppercase text-white">PESAN TERKIRIM!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Terima kasih! Pesan telah berhasil terkirim langsung ke inbox Dimas Brahmantya.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      NAMA LENGKAP <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="Masukkan nama Anda..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-3 text-sm font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      EMAIL ANDA <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      placeholder="nama@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-3 text-sm font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      SUBJEK
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Tawaran Project / Kolaborasi / Diskusi"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-3 text-sm font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5">
                      PESAN <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Tuliskan pesan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-3 text-sm font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3 font-mono text-xs">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      BATAL
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>MENGIRIM...</span>
                        </>
                      ) : (
                        <>
                          <span>KIRIM PESAN</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
