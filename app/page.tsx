"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import { 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Monitor, 
  Database, 
  Users, 
  MessageSquare,
  Lightbulb,
  UserCheck,
  Mail,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Layers,
  Copy,
  Check,
  ChevronUp,
  FolderGit2,
  X,
  Send,
  Loader2,
  MessageCircle
} from "lucide-react";

interface Project {
  title: string;
  type: string;
  category: "webapp" | "uiux" | "academic";
  year: string;
  desc: string;
  tech: string[];
  link: string;
}

const projectsData: Project[] = [
  {
    title: "SIMRS Rawat Jalan",
    type: "Final Tasks",
    category: "webapp",
    year: "2026",
    desc: "Sistem pendaftaran rawat jalan rumah sakit dengan manajemen jadwal dokter, rekapitulasi data pasien, dan monitoring antrean.",
    tech: ["Next.js", "MongoDB", "TailwindCSS"],
    link: "https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git"
  },
  {
    title: "Secure Hub",
    type: "Tugas Kuliah",
    category: "webapp",
    year: "2025",
    desc: "Platform pendeteksi tautan berbahaya dan anti-phishing dengan integrasi microservice arsitektur modern.",
    tech: ["Next.js", "NestJS", "MongoDB"],
    link: "https://github.com/DimasBrahmantya/Secure-Hub.git"
  },
  {
    title: "Website Pemilihan Umum",
    type: "University Project",
    category: "academic",
    year: "2023",
    desc: "Sistem e-voting kampus terenkripsi untuk proses pemilu mahasiswa yang cepat, efisien, dan transparan.",
    tech: ["Laravel", "Vue.js", "MySQL"],
    link: "https://github.com/DimasBrahmantya"
  },
  {
    title: "Sistem Pendaftaran RSUD Grati",
    type: "Intern Tasks",
    category: "webapp",
    year: "2025",
    desc: "Pengembangan modul pendaftaran pasien rawat jalan langsung di RSUD Grati Kabupaten Pasuruan.",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    link: "https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git"
  },
  {
    title: "Design UI/UX Smart Laundry",
    type: "Academic Design",
    category: "uiux",
    year: "2025",
    desc: "Desain konseptual aplikasi pemesanan dan pelacakan layanan laundry online berbasis mobile.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    link: "https://figma.com"
  },
  {
    title: "Design UI/UX Sale Pisang",
    type: "E-Commerce Design",
    category: "uiux",
    year: "2024",
    desc: "Niche e-commerce mobile app experience design untuk penjualan produk oleh-oleh khas olahan pisang.",
    tech: ["Figma", "Design System", "Wireframing"],
    link: "https://figma.com"
  },
  {
    title: "Design UI/UX Readly",
    type: "Academic Design",
    category: "uiux",
    year: "2024",
    desc: "Antarmuka perpustakaan digital interaktif dengan pembaca e-book terintegrasi.",
    tech: ["Figma", "UI/UX Design"],
    link: "https://figma.com"
  },
  {
    title: "Remadja.Inc Landing Page",
    type: "E-Commerce",
    category: "webapp",
    year: "2026",
    desc: "High-fashion landing page showcase untuk brand pakaian lokal Remadja.Inc.",
    tech: ["Next.js", "Framer Motion", "TailwindCSS"],
    link: "https://remadja-inc.vercel.app/"
  },
  {
    title: "Portfolio Rismansyah",
    type: "Personal Project",
    category: "academic",
    year: "2026",
    desc: "Website portofolio interaktif yang disesuaikan untuk showcase karya profesional.",
    tech: ["Next.js", "React"],
    link: "https://rismansyah-portofolio.vercel.app/"
  },
  {
    title: "Portfolio Dimas",
    type: "Personal Site",
    category: "academic",
    year: "2026",
    desc: "Website portofolio pribadi versi monochrome neo-brutalism.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    link: "https://dimas-portfolio-smoky.vercel.app/"
  }
];

const techStack = [
  { name: "HTML5", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Next.js", category: "Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React", category: "Library", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Laravel", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "NestJS", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
  { name: "Vue.js", category: "Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "PHP", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Java", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" }
];

export default function Portfolio() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-black selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Subtle Background Grid & Snowy Motion */}
      <div className="fixed inset-0 bg-neo-grid opacity-70 pointer-events-none -z-10"></div>
      <div className="fixed inset-0 bg-neo-dots opacity-40 pointer-events-none -z-10"></div>
      <FloatingShapes />

      {/* TOP MONOCHROME NAVBAR */}
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-black px-4 lg:px-8 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Badge */}
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 group"
          >
            <div className="bg-black text-white font-extrabold text-lg tracking-wider px-3.5 py-1 border-2 border-black neo-shadow group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              DimasBas
            </div>
          </motion.a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-sm font-extrabold">
            {["about", "experience", "skills", "projects", "contact"].map((link) => (
              <motion.a 
                key={link}
                href={`#${link}`}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-3 py-1.5 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black uppercase"
              >
                {link === "about" ? "TENTANG" : link === "experience" ? "PENGALAMAN" : link.toUpperCase()}
              </motion.a>
            ))}
          </nav>

          {/* Status Badge & CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="neo-btn bg-black text-white font-mono font-bold text-xs sm:text-sm px-4 py-2 border-2 border-black neo-shadow flex items-center gap-1.5"
            >
              <span>HUBUNGI SAYA</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main>
        {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-20 px-4 lg:px-8 max-w-6xl mx-auto">
        
        {/* Floating Sticker Badges */}
        <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs font-extrabold">
          <motion.span 
            initial={{ opacity: 0, y: -20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="bg-black text-white border-2 border-black px-3 py-1.5 neo-shadow flex items-center gap-1.5 cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Full Stack Developer
          </motion.span>

          <motion.span 
            initial={{ opacity: 0, y: -20, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="bg-white text-black border-2 border-black px-3 py-1.5 neo-shadow flex items-center gap-1.5 cursor-default"
          >
            <Monitor className="w-3.5 h-3.5" />
            Web Developer
          </motion.span>

          <motion.span 
            initial={{ opacity: 0, y: -20, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="bg-black text-white border-2 border-black px-3 py-1.5 neo-shadow flex items-center gap-1.5 cursor-default"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            UMM INFORMATICS (IPK 3.80)
          </motion.span>
        </div>

        {/* Big Brutalist Title Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="bg-white border-4 border-black p-6 sm:p-10 neo-shadow-lg relative overflow-hidden mb-10 transition-shadow"
        >
          {/* Top Window Header */}
          <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-black border border-black"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 border border-black"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-white border border-black"></span>
              <span className="font-mono text-xs font-bold text-neutral-700 ml-2">DIMAS PORTFOLIO</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-black leading-none mb-6">
            Dimas <br className="hidden sm:inline" />
            <motion.span 
              whileHover={{ scale: 1.03 }}
              className="bg-black text-white px-2 sm:px-3 border-2 border-black inline-block mt-1 sm:mt-0 neo-shadow"
            >
              Brahmantya
            </motion.span>{" "}
            Aryasena
          </h1>

          <p className="text-base sm:text-xl text-neutral-800 font-sans leading-relaxed max-w-3xl mb-8">
            Lulusan Teknik Informatika UMM dengan passion tinggi dalam menyusun antarmuka digital yang presisi & responsif. Berfokus pada <strong className="bg-black text-white px-1.5 font-bold">Full Stack Developer</strong> serta <strong className="border-b-2 border-black font-bold">Web Developer</strong> .
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 font-mono font-bold">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="neo-btn bg-black text-white border-3 border-black text-sm sm:text-base px-6 py-3.5 neo-shadow flex items-center gap-2"
            >
              <FolderGit2 className="w-5 h-5" />
              LIHAT PORTFOLIO
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="neo-btn bg-white text-black border-3 border-black text-sm sm:text-base px-6 py-3.5 neo-shadow flex items-center gap-2"
            >
              <UserCheck className="w-5 h-5" />
              TENTANG SAYA
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          {[
            { value: "10+", label: "Project Selesai" },
            { value: "10+", label: "Tech Stack" },
            { value: "3.80", label: "IPK" },
            { value: "RSUD", label: "Grati (Ex Intern)" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white border-3 border-black p-4 neo-shadow transition-transform cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-black">{stat.value}</div>
              <div className="text-xs sm:text-sm font-extrabold text-neutral-700 mt-1 uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* CONTINUOUS B&W MARQUEE RIBBON */}
      <div className="w-full bg-black text-white border-y-4 border-black py-3.5 overflow-hidden font-mono font-extrabold text-sm uppercase tracking-widest select-none my-6">
        <div className="animate-marquee">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0 mr-6">
              <span>★ HTML5 & CSS3</span>
              <span>★ JAVASCRIPT & TS</span>
              <span>★ LARAVEL FRAMEWORK</span>
              <span>★ NEXT.JS 16</span>
              <span>★ REACT.JS</span>
              <span>★ VUE.JS</span>
              <span>★ NESTJS</span>
              <span>★ FIGMA UI/UX</span>
              <span>★ TAILWIND CSS</span>
              <span>★ MONGODB</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-black text-white p-2.5 border-2 border-black neo-shadow">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Tentang <span className="bg-black text-white px-2 border-2 border-black">Saya</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Bio Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="lg:col-span-2 bg-white border-4 border-black p-6 sm:p-8 neo-shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4 font-mono text-xs font-bold text-black border-b-2 border-black pb-2">
              <Terminal className="w-4 h-4" />
              <span>BIO_PROFILE.TXT</span>
            </div>
            
            <p className="text-neutral-900 text-base sm:text-lg leading-relaxed mb-6 font-sans">
              Saya adalah seorang Lulusan Teknik Informatika di Universitas Muhammadiyah Malang, memiliki kemampuan kerja dalam tim dengan semangat untuk mempelajari hal baru. Dapat beradaptasi dengan keterampilan bahasa pemrogaman baru sesuai kebutuhan dengan cepat. Memiliki fokus pada bagian <span className="bg-black text-white font-bold px-1.5">Full Stack Developer</span> dan <span className="border-b-2 border-black font-bold">Web Developer</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {[
                { num: "01", title: "Cepat Beradaptasi", desc: "Memahami framework & tools baru dalam waktu singkat." },
                { num: "02", title: "Kerja Sama Tim", desc: "Pengalaman kolaborasi proyek akademik & industri." },
                { num: "03", title: "Problem Solving", desc: "Analisis kebutuhan pengguna & solusi kode bersih." },
                { num: "04", title: "UI/UX Mindset", desc: "Desain intuitif berorientasi pada kemudahan user." },
              ].map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="bg-[#fafafa] border-2 border-black p-3.5 flex items-start gap-3 neo-shadow-sm cursor-default"
                >
                  <span className="bg-black text-white text-xs font-extrabold px-1.5 py-0.5">{item.num}</span>
                  <div>
                    <div className="font-extrabold text-black uppercase">{item.title}</div>
                    <div className="text-neutral-700 mt-0.5 font-sans">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Details Dossier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3 }}
            className="bg-black text-white border-4 border-black p-6 neo-shadow flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs font-bold border-b-2 border-white pb-2 mb-4 uppercase tracking-wider text-neutral-300">
                [ DOSSIER DATA ]
              </div>
              
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-neutral-400 block font-bold">NAMA LENGKAP:</span>
                  <span className="font-extrabold text-sm text-white">Dimas Brahmantya Aryasena</span>
                </div>
                <div>
                  <span className="text-neutral-400 block font-bold">STATUS:</span>
                  <span className="font-bold text-sm bg-white text-black px-2 py-0.5 inline-block border border-white">
                    Freshgraduate Informatics
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block font-bold">JURUSAN:</span>
                  <span className="font-extrabold text-sm text-white">Teknik Informatika</span>
                </div>
                <div>
                  <span className="text-neutral-400 block font-bold">DOMISILI:</span>
                  <span className="font-extrabold text-sm text-white">Pasuruan / Malang, Jawa Timur</span>
                </div>
                <div>
                  <span className="text-neutral-400 block font-bold">IPK:</span>
                  <span className="font-extrabold text-sm bg-white text-black px-2 py-0.5 inline-block border border-white">
                    3.80 / 4.00
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t-2 border-neutral-700 pt-4">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="neo-btn w-full bg-white text-black text-center font-mono font-extrabold text-xs py-3 border-2 border-white block neo-shadow-white uppercase"
              >
                HUBUNGI SAYA VIA EMAIL
              </motion.button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* EXPERIENCE & EDUCATION SECTION */}
      <section id="experience" className="relative z-10 py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Work Experience */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="bg-black text-white p-2.5 border-2 border-black neo-shadow">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
                Pengalaman <span className="bg-black text-white px-2 border-2 border-black">Kerja</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white border-4 border-black p-6 neo-shadow-lg relative"
            >
              <div className="flex justify-between items-start gap-4 mb-3 pb-3 border-b-2 border-black">
                <div>
                  <h3 className="font-extrabold text-lg text-black">Fullstack Web Developer</h3>
                  <p className="font-mono text-sm font-extrabold text-neutral-700">RSUD Grati Kabupaten Pasuruan</p>
                </div>
                <span className="bg-black text-white font-mono text-xs font-bold px-2.5 py-1 border-2 border-black shrink-0">
                  Ex-Intern
                </span>
              </div>

              <p className="text-neutral-800 text-sm leading-relaxed font-sans mb-4">
                Berkontribusi langsung dalam pengembangan dan perbaikan Sistem Pendaftaran Rawat Jalan di lingkungan rumah sakit. Mengimplementasikan fitur baru untuk mempermudah pendaftaran pasien menggunakan framework Laravel dan integrasi database MySQL.
              </p>

              <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
                {["Laravel", "PHP", "MySQL", "SIMRS"].map((tech) => (
                  <motion.span 
                    key={tech}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="bg-neutral-100 border-2 border-black text-black px-2 py-1 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="bg-black text-white p-2.5 border-2 border-black neo-shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
                Riwayat <span className="bg-black text-white px-2 border-2 border-black">Pendidikan</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white border-4 border-black p-6 neo-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-lg text-black">Universitas Muhammadiyah Malang</h3>
                  <span className="bg-black text-white font-mono text-xs font-bold px-2 py-0.5 border border-black">
                    2022 - 2026
                  </span>
                </div>
                <p className="font-mono text-sm text-neutral-800 font-extrabold mb-2">Teknik Informatika (IPK 3.80)</p>
                <p className="text-neutral-700 text-xs font-sans">
                  Fokus akademik pada Rekayasa Perangkat Lunak, Full Stack Developer, Pengembangan Web, dan UI/UX Design.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -4 }}
                className="bg-white border-4 border-black p-6 neo-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-lg text-black">SMAN 2 Kota Pasuruan</h3>
                  <span className="bg-neutral-200 text-black font-mono text-xs font-bold px-2 py-0.5 border border-black">
                    2019 - 2022
                  </span>
                </div>
                <p className="font-mono text-sm text-neutral-800 font-extrabold">Jurusan MIPA</p>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative z-10 py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-black text-white p-2.5 border-2 border-black neo-shadow">
            <Code2 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Skill & <span className="bg-black text-white px-2 border-2 border-black">Tech Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tech Stack Cards Grid */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-sm font-extrabold text-neutral-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              TECHNICAL STACK MASTERED
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -6, rotate: 2 }}
                  className="bg-white border-3 border-black p-3 flex flex-col items-center justify-center text-center neo-shadow cursor-default transition-all"
                >
                  <div className="w-10 h-10 mb-2 flex items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="font-mono text-xs font-extrabold text-black">{tech.name}</span>
                  <span className="font-mono text-[10px] text-neutral-600 font-bold mt-0.5">{tech.category}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft & Hard Skills */}
          <div>
            <h3 className="font-mono text-sm font-extrabold text-neutral-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              CORE COMPETENCIES
            </h3>

            <div className="bg-white border-4 border-black p-6 neo-shadow space-y-3">
              {[
                { name: "Full Stack Developer", icon: Monitor },
                { name: "Web Developer", icon: Code2 },
                { name: "Problem Solving & Analytical", icon: Lightbulb },
                { name: "Team Collaboration & Agile", icon: Users },
                { name: "Technical Communication", icon: MessageSquare }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="flex items-center gap-3 bg-[#fafafa] border-2 border-black p-3 font-mono text-xs font-extrabold text-black neo-shadow-sm cursor-default"
                >
                  <div className="p-1.5 border border-black bg-black text-white">
                    <skill.icon className="w-4 h-4" />
                  </div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS SECTION WITH FILTER TABS */}
      <section id="projects" className="relative z-10 py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="bg-black text-white p-2.5 border-2 border-black neo-shadow">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Koleksi <span className="bg-black text-white px-2 border-2 border-black">Project</span>
            </h2>
          </motion.div>

          {/* Neo Filter Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs font-extrabold">
            {(["all", "webapp", "uiux", "academic"] as const).map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className={`px-3.5 py-1.5 border-2 border-black transition-all ${
                  filter === cat
                    ? "bg-black text-white neo-shadow -translate-y-0.5"
                    : "bg-white text-black hover:bg-neutral-100"
                }`}
              >
                {cat === "all"
                  ? `SEMUA (${projectsData.length})`
                  : cat === "webapp"
                  ? `WEB APP (${projectsData.filter((p) => p.category === "webapp").length})`
                  : cat === "uiux"
                  ? `UI/UX DESIGN (${projectsData.filter((p) => p.category === "uiux").length})`
                  : `AKADEMIK (${projectsData.filter((p) => p.category === "academic").length})`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white border-4 border-black p-6 neo-shadow flex flex-col justify-between relative group transition-all"
              >
                <div>
                  {/* Top Type & Year Tag */}
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 border border-black uppercase bg-black text-white">
                      {project.type} &bull; {project.year}
                    </span>

                    {project.link ? (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-black p-2 border-2 border-black hover:bg-black hover:text-white transition-colors neo-shadow-sm"
                        title="Buka Project"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.a>
                    ) : null}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-black mb-2 group-hover:underline underline-offset-4 decoration-2">
                    {project.title}
                  </h3>

                  <p className="text-neutral-700 font-sans text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                {/* Tech Pill List */}
                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-black font-mono text-xs font-extrabold">
                  {project.tech.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.08, rotate: -2 }}
                      className="bg-neutral-100 border border-black text-black px-2 py-0.5 cursor-default"
                    >
                      #{t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="bg-black text-white p-2.5 border-2 border-black neo-shadow">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Hubungi <span className="bg-black text-white px-2 border-2 border-black">Saya</span>
          </h2>
        </motion.div>

        {/* Copy Email Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -3 }}
          className="bg-white border-4 border-black p-6 sm:p-8 neo-shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider block mb-1 text-neutral-600">
              ⚡️ INTERESTED IN WORKING TOGETHER?
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold uppercase text-black break-all">
              dimasbrahmantyaaryasena@gmail.com
            </h3>
          </div>

          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn bg-black text-white font-mono font-extrabold text-xs sm:text-sm px-5 py-3 border-2 border-black neo-shadow flex items-center gap-2 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>EMAIL TERKOPY!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>SALIN EMAIL</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Social Links Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono font-extrabold text-xs">
          
          {/* Instagram */}
          <motion.a
            href="https://instagram.com/dimasbas_"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn bg-white border-3 border-black p-5 neo-shadow flex flex-col items-center text-center group"
          >
            <div className="bg-black text-white p-3 border-2 border-black mb-3 group-hover:rotate-6 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <span className="text-black text-sm">INSTAGRAM</span>
            <span className="text-neutral-600 mt-1 font-bold">@dimasbas_</span>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/DimasBrahmantya"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn bg-white border-3 border-black p-5 neo-shadow flex flex-col items-center text-center group"
          >
            <div className="bg-black text-white p-3 border-2 border-black mb-3 group-hover:-rotate-6 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2V22"/><path d="M9 18c-4.5 1.6-5-2.5-7-3"/></svg>
            </div>
            <span className="text-black text-sm">GITHUB</span>
            <span className="text-neutral-600 mt-1 font-bold">DimasBrahmantya</span>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn bg-white border-3 border-black p-5 neo-shadow flex flex-col items-center text-center group"
          >
            <div className="bg-black text-white p-3 border-2 border-black mb-3 group-hover:rotate-6 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <span className="text-black text-sm">LINKEDIN</span>
            <span className="text-neutral-600 mt-1 truncate max-w-full font-bold">dimas-brahmantya</span>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/6281235829634"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn bg-white border-3 border-black p-5 neo-shadow flex flex-col items-center text-center group"
          >
            <div className="bg-black text-white p-3 border-2 border-black mb-3 group-hover:-rotate-6 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-black text-sm">WHATSAPP</span>
            <span className="text-neutral-600 mt-1 font-bold">081235829634</span>
          </motion.a>

          {/* Direct Email Pop-up Button */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32 }}
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn bg-white border-3 border-black p-5 neo-shadow flex flex-col items-center text-center group col-span-2 sm:col-span-1 text-left"
          >
            <div className="bg-black text-white p-3 border-2 border-black mb-3 group-hover:rotate-6 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-black text-sm">DIRECT EMAIL</span>
            <span className="text-neutral-600 mt-1 truncate max-w-full font-bold">Buka Form Email</span>
          </motion.button>

        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-4 border-black bg-white py-8 px-4 font-mono text-xs text-center text-neutral-800 mt-12 font-bold relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-black">DIMAS BRAHMANTYA ARYASENA</strong>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="neo-btn bg-black text-white font-extrabold px-3.5 py-2 border-2 border-black flex items-center gap-1 neo-shadow-sm"
          >
            <span>KEMBALI KE ATAS</span>
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        </div>
      </footer>

      {/* POP-UP CONTACT EMAIL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white border-4 border-black p-6 sm:p-8 neo-shadow-lg z-10 font-sans max-h-[90vh] overflow-y-auto"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-black">
                  <Mail className="w-4 h-4" />
                  <span>KIRIM_PESAN.FORM</span>
                </div>
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-black text-white p-1 border border-black hover:bg-neutral-800 transition-colors neo-btn"
                  title="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Destination Banner */}
              <div className="bg-neutral-100 border-2 border-black p-3 mb-6 font-mono text-xs font-extrabold flex items-center justify-between">
                <span className="text-neutral-600">KE EMAIL:</span>
                <span className="text-black bg-white px-2 py-0.5 border border-black truncate max-w-[200px] sm:max-w-none">
                  dimasbrahmantyaaryasena@gmail.com
                </span>
              </div>

              {errorMessage && (
                <div className="bg-red-500 text-white border-2 border-black p-3 mb-4 font-mono text-xs font-bold neo-shadow-sm">
                  ⚠️ {errorMessage}
                </div>
              )}

              {isSubmitted ? (
                <div className="bg-black text-white border-3 border-black p-6 text-center font-mono py-10 neo-shadow">
                  <Check className="w-12 h-12 text-white mx-auto mb-3 animate-bounce" />
                  <h4 className="text-xl font-extrabold mb-2 uppercase">PESAN TERKIRIM!</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                    Terima kasih! Pesan Anda telah berhasil terkirim secara langsung ke <span className="text-white font-bold underline">dimasbrahmantyaaryasena@gmail.com</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Sender Name */}
                  <div>
                    <label className="block font-mono text-xs font-extrabold text-black uppercase mb-1.5">
                      NAMA LENGKAP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="Masukkan nama Anda..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#fafafa] border-2 border-black p-3 text-sm font-sans font-medium text-black focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_#000000] transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Sender Email */}
                  <div>
                    <label className="block font-mono text-xs font-extrabold text-black uppercase mb-1.5">
                      EMAIL ANDA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      placeholder="nama@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#fafafa] border-2 border-black p-3 text-sm font-sans font-medium text-black focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_#000000] transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-mono text-xs font-extrabold text-black uppercase mb-1.5">
                      SUBJEK PESAN
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Tawaran Project / Diskusi UI/UX / etc."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#fafafa] border-2 border-black p-3 text-sm font-sans font-medium text-black focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_#000000] transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-xs font-extrabold text-black uppercase mb-1.5">
                      ISI PESAN <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Tuliskan pesan atau detail penawaran Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#fafafa] border-2 border-black p-3 text-sm font-sans font-medium text-black focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_#000000] transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Form Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3 font-mono font-extrabold text-xs">
                    <motion.button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setIsModalOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 border-2 border-black bg-white text-black hover:bg-neutral-100 transition-colors neo-btn disabled:opacity-50"
                    >
                      BATAL
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-neutral-800 transition-colors neo-btn neo-shadow flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>MENGIRIM...</span>
                        </>
                      ) : (
                        <>
                          <span>KIRIM PESAN</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
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
