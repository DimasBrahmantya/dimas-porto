"use client";

import { motion, Variants } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Monitor, 
  Database, 
  Users, 
  MessageSquare,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  UserCheck,
  Mail,
  MessageCircle
} from "lucide-react";

export default function Portfolio() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden pt-24 pb-32">
      {/* Abstract Background */}
      <div className="fixed inset-0 -z-10 bg-neutral-950">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="min-h-[80vh] flex flex-col justify-center relative"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Mahasiswa & UI/UX Designer
            </span>
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-500"
          >
            Dimas Brahmantya Aryasena
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10"
          >
            Fokus pada <span className="text-indigo-300 font-medium">Front End Development</span> dan <span className="text-indigo-300 font-medium">UI/UX Design</span>. Memiliki semangat untuk mempelajari hal baru dan dapat beradaptasi dengan teknologi modern.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex gap-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors">
              Lihat Portfolio
            </a>
            <a href="#about" className="px-6 py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 transition-colors font-medium">
              Tentang Saya
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-0 text-neutral-500 flex items-center gap-2 animate-bounce cursor-pointer"
          >
            
          </motion.div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about" 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-20 border-t border-neutral-800/50"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-indigo-400" />
            Tentang Saya
          </motion.h2>
          <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm">
            <p className="text-neutral-300 leading-relaxed text-lg">
              Saya adalah seorang Mahasiswa Teknik Informatika yang aktif di Universitas Muhammadiyah Malang, memiliki kemampuan kerja dalam tim dengan semangat untuk mempelajari hal baru. Dapat beradaptasi dengan keterampilan bahasa pemrogaman baru sesuai kebutuhan dengan cepat. Memiliki fokus pada bagian Front End Development dan UI/UX Design.
            </p>
          </motion.div>
        </motion.section>

        {/* EXPERIENCE & EDUCATION */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-neutral-800/50">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-indigo-400" />
              Pengalaman
            </motion.h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
              <motion.div variants={fadeInUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-800 bg-neutral-900 group-[.is-active]:bg-indigo-500/20 group-[.is-active]:border-indigo-500/50 group-[.is-active]:text-indigo-400 text-neutral-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm shadow-sm">
                  <h3 className="font-semibold text-lg text-neutral-100">Magang, Fullstack Web Developer</h3>
                  <p className="text-sm text-indigo-400 mb-3">RSUD Grati Kabupaten Pasuruan</p>
                  <p className="text-neutral-400 text-sm">
                    Berkontribusi dalam pengembangan dan perbaikan Sistem Pendaftaran Rawat Jalan di lingkungan rumah sakit. Mengimplementasikan fitur baru untuk mempermudah pendaftaran pasien menggunakan framework Laravel.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
              Pendidikan
            </motion.h2>
            <div className="space-y-6">
              <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-neutral-100">Universitas Muhammadiyah Malang</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">2022 - Sekarang</span>
                </div>
                <p className="text-indigo-400 mb-2">Teknik Informatika (IPK 3.63)</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-neutral-100">SMAN 2 Kota Pasuruan</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-neutral-800 text-neutral-400">2019 - 2022</span>
                </div>
                <p className="text-neutral-400">Jurusan MIPA</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-20 border-t border-neutral-800/50"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Monitor className="w-8 h-8 text-indigo-400" />
            Kemampuan & Keterampilan
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-xl font-medium text-neutral-300 flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
                  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
                  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invertDark: true },
                  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
                  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
                  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" }
                ].map((skill) => (
                  <motion.div 
                    key={skill.name}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-indigo-500/50 hover:bg-neutral-800 transition-colors shadow-sm cursor-default"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={skill.icon} alt={skill.name} className={`w-5 h-5 object-contain ${skill.invertDark ? 'dark:invert' : ''}`} />
                    <span className="font-medium text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-xl font-medium text-neutral-300 flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5" /> Soft & Hard Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Design UI/UX", icon: Monitor },
                  { name: "Pengembangan Website", icon: Code2 },
                  { name: "Problem Solving", icon: Lightbulb },
                  { name: "Teamwork", icon: Users },
                  { name: "Communication", icon: MessageSquare },
                ].map((skill) => (
                  <span key={skill.name} className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-neutral-500" /> {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-20 border-t border-neutral-800/50"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-400" />
            Pengalaman & Kegiatan Project
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                title: "SIMRS Rawat Jalan",
                type: "Tugas Akhir",
                year: "2024",
                desc: "Sistem untuk pendaftaran rawat jalan di rumah sakit, dengan fitur tambahan seperti manajemen jadwal dokter, data dokter, dan monitoring.",
                tech: ["Next.js", "MongoDB"]
              },
              {
                title: "Secure Hub",
                type: "Tugas Kuliah",
                year: "2024",
                desc: "Sistem deteksi tautan (link) aman untuk menghindari phishing. Dibangun menggunakan arsitektur modern.",
                tech: ["Next.js", "NestJS", "MongoDB"]
              },
              {
                title: "Website Pemilihan Umum",
                type: "University Project",
                year: "2023",
                desc: "Sistem e-voting menggunakan framework Vue.js dan Laravel.",
                tech: ["Laravel", "Vue.js"]
              },
              {
                title: "Sistem Pendaftaran Rawat Jalan",
                type: "Tugas Magang",
                year: "2023",
                desc: "Membuat Sistem pendaftaran rawat jalan pada rumah sakit (RSUD Grati).",
                tech: ["Laravel", "MySQL"]
              },
              {
                title: "Design UI/UX Smart Laundry",
                type: "Academic",
                year: "2025",
                desc: "Developed the UI/UX conceptual design for a seamless laundry booking application.",
                tech: ["Figma", "UI/UX"]
              },
              {
                title: "Design UI/UX Sale Pisang",
                type: "E-Commerce",
                year: "2024",
                desc: "Designed a UI/UX concept for a local e-commerce platform selling banana-based products.",
                tech: ["Figma", "UI/UX"]
              },
              {
                title: "Design UI/UX Readly",
                type: "Academic",
                year: "2024",
                desc: "Created UI/UX for an online library application.",
                tech: ["Figma", "UI/UX"]
              }
            ].map((project, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="group relative p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 hover:border-indigo-500/50 transition-colors backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                    <p className="text-sm text-indigo-400 mt-1">{project.type} &bull; {project.year}</p>
                  </div>
                  <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-indigo-400" />
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* CONTACT SECTION */}
        <motion.section 
          id="contact" 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-20 border-t border-neutral-800/50"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Mail className="w-8 h-8 text-indigo-400" />
            Hubungi Saya
          </motion.h2>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <a href="https://instagram.com/dimasbas_" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-pink-500/50 hover:bg-neutral-800 transition-colors backdrop-blur-sm group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-neutral-400 group-hover:text-pink-500 mb-3 transition-colors"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span className="font-medium text-neutral-200">Instagram</span>
              <span className="text-xs text-neutral-500 mt-1">dimasbas_</span>
            </a>

            <a href="https://github.com/DimasBrahmantya" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-white/20 hover:bg-neutral-800 transition-colors backdrop-blur-sm group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-neutral-400 group-hover:text-white mb-3 transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2V22"/><path d="M9 18c-4.5 1.6-5-2.5-7-3"/></svg>
              <span className="font-medium text-neutral-200">GitHub</span>
              <span className="text-xs text-neutral-500 mt-1">DimasBrahmantya</span>
            </a>

            <a href="https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-blue-500/50 hover:bg-neutral-800 transition-colors backdrop-blur-sm group col-span-2 lg:col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-neutral-400 group-hover:text-blue-500 mb-3 transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span className="font-medium text-neutral-200">LinkedIn</span>
              <span className="text-xs text-neutral-500 mt-1 text-center">dimas-brahmantya-<br/>aryasena</span>
            </a>

            <a href="https://wa.me/6281235829634" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-green-500/50 hover:bg-neutral-800 transition-colors backdrop-blur-sm group">
              <MessageCircle className="w-8 h-8 text-neutral-400 group-hover:text-green-500 mb-3 transition-colors" />
              <span className="font-medium text-neutral-200">WhatsApp</span>
              <span className="text-xs text-neutral-500 mt-1">081235829634</span>
            </a>

            <a href="mailto:dimasbrahmantyaaryasena@gmail.com" className="flex flex-col items-center p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-red-400/50 hover:bg-neutral-800 transition-colors backdrop-blur-sm group">
              <Mail className="w-8 h-8 text-neutral-400 group-hover:text-red-400 mb-3 transition-colors" />
              <span className="font-medium text-neutral-200">Email</span>
              <span className="text-xs text-neutral-500 mt-1 text-center break-all">dimasbrahmantyaaryasena<br/>@gmail.com</span>
            </a>
          </motion.div>
        </motion.section>
        
        {/* FOOTER */}
        <footer className="py-8 border-t border-neutral-800/50 text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Dimas Brahmantya Aryasena. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
