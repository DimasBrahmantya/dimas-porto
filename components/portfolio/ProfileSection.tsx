"use client";

import { useState } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  UserCheck,
  ArrowRight,
  Globe,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SkillGroup = "all" | "frontend" | "backend" | "data-ui";

const softwareSkills: {
  name: string;
  category: string;
  group: Exclude<SkillGroup, "all">;
  icon: string;
}[] = [
  {
    name: "Next.js",
    category: "Framework",
    group: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "React",
    category: "Library",
    group: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    category: "Language",
    group: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    group: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Vue.js",
    category: "Framework",
    group: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Laravel",
    category: "Backend",
    group: "backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "NestJS",
    category: "Backend",
    group: "backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  },
  {
    name: "MySQL",
    category: "Database",
    group: "data-ui",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    name: "MongoDB",
    category: "Database",
    group: "data-ui",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Figma",
    category: "UI/UX",
    group: "data-ui",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
];

interface ProfileSectionProps {
  onScrollToSection: (id: string) => void;
}

export function ProfileSection({ onScrollToSection }: ProfileSectionProps) {
  const [skillGroup, setSkillGroup] = useState<SkillGroup>("all");

  const visibleSkills =
    skillGroup === "all"
      ? softwareSkills
      : softwareSkills.filter((s) => s.group === skillGroup);

  return (
    <section
      id="profil"
      className="relative py-24 px-4 sm:px-8 z-10 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="mb-12">
        <span className="font-mono text-xs font-semibold tracking-widest text-cyan-400 uppercase block mb-2">
          01 / PROFIL &amp; KAPABILITAS
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Tentang Saya &amp; Keahlian Teknis
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left / Top Identity Card */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <Card className="overflow-hidden">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border border-border bg-slate-950 mb-5">
                <Image
                  src="/IMG_4403.JPG"
                  alt="Dimas Brahmantya Portrait"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover object-top brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              </div>

              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                HELLO, I AM
              </span>
              <h3 className="font-heading text-xl font-extrabold text-white mt-1">
                Dimas Brahmantya A.
              </h3>
              <p className="font-mono text-xs text-cyan-300 mt-1">
                Informatics Engineering &bull; UMM
              </p>

              <Button
                className="w-full mt-5"
                onClick={() => onScrollToSection("project")}
                aria-label="Lihat proyek unggulan"
              >
                <span>LIHAT PROYEK</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Bento Grid */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* 1. About Me */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <UserCheck className="w-4 h-4" aria-hidden="true" />
                <span>About Me</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                Lulusan Teknik Informatika di Universitas Muhammadiyah Malang
                dengan IPK 3.80. Memiliki kemampuan kerja tim yang adaptif serta
                daya serap cepat terhadap perkembangan teknologi antarmuka web
                modern. Berfokus pada posisi{" "}
                <strong className="text-cyan-300 font-semibold">
                  Front-End Developer
                </strong>
                ,{" "}
                <strong className="text-white font-semibold">
                  Web Developer
                </strong>
                , dan{" "}
                <strong className="text-sky-300 font-semibold">
                  Full Stack Developer
                </strong>
                .
              </p>
            </CardContent>
          </Card>

          {/* 2. Software Skills */}
          <Card>
            <CardHeader className="pb-3 flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
              <CardTitle className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" aria-hidden="true" />
                <span>Tech Stack &amp; Tools</span>
              </CardTitle>

              <div
                className="inline-flex flex-wrap gap-1 p-0.5 rounded-full bg-slate-900/90 border border-slate-800"
                role="tablist"
                aria-label="Filter kategori keahlian"
              >
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "frontend", label: "Frontend" },
                    { id: "backend", label: "Backend" },
                    { id: "data-ui", label: "Data & UI" },
                  ] as const
                ).map((tab) => {
                  const active = skillGroup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSkillGroup(tab.id)}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        active
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {visibleSkills.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-2.5 rounded-xl bg-slate-900/75 border border-slate-800/90 hover:border-cyan-500/40 transition-colors flex items-center gap-2.5"
                  >
                    <div className="w-7 h-7 shrink-0 flex items-center justify-center p-1 rounded-lg bg-slate-950 border border-slate-800">
                      <Image
                        src={tech.icon}
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        aria-hidden="true"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className="block font-mono text-[11px] font-bold text-slate-100 truncate"
                        title={tech.name}
                      >
                        {tech.name}
                      </span>
                      <span className="block font-mono text-[10px] text-slate-400 truncate">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 3. Education & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                  <GraduationCap
                    className="w-4 h-4 text-cyan-400"
                    aria-hidden="true"
                  />
                  <span>Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative pl-4 border-l border-cyan-500/40">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 absolute -left-[4.5px] top-1.5" />
                  <span className="font-mono text-[11px] text-cyan-400 font-bold block">
                    2022 - 2026
                  </span>
                  <p className="text-white font-semibold text-sm">
                    Univ. Muhammadiyah Malang
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Teknik Informatika &bull; IPK 3.80
                  </p>
                </div>

                <div className="relative pl-4 border-l border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-slate-500 absolute -left-[4.5px] top-1.5" />
                  <span className="font-mono text-[11px] text-slate-400 font-bold block">
                    2019 - 2022
                  </span>
                  <p className="text-slate-200 font-semibold text-sm">
                    SMAN 2 Kota Pasuruan
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">Jurusan MIPA</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                  <Briefcase
                    className="w-4 h-4 text-cyan-400"
                    aria-hidden="true"
                  />
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4 border-l border-cyan-500/40">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 absolute -left-[4.5px] top-1.5" />
                  <span className="font-mono text-[11px] text-cyan-400 font-bold block">
                    EX-INTERN 2025
                  </span>
                  <p className="text-white font-semibold text-sm">
                    RSUD Grati Kab. Pasuruan
                  </p>
                  <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                    Fullstack Web Developer: Mengembangkan modul pendaftaran
                    rawat jalan SIMRS berbasis Laravel &amp; MySQL.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 4. Language & Communication */}
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
              <CardTitle className="font-mono text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Language &amp; Communication</span>
              </CardTitle>
              <Badge variant="outline">Proficiency</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-xs font-mono">
                    Bahasa Indonesia
                  </span>
                  <Badge variant="accent">Native</Badge>
                </div>
                <p className="text-slate-400 text-xs">
                  Komunikasi formal &amp; kolaborasi teknis
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-xs font-mono">
                    Bahasa Inggris
                  </span>
                  <Badge variant="secondary">Professional</Badge>
                </div>
                <p className="text-slate-400 text-xs">
                  Dokumentasi teknis, riset, dan kolaborasi tim
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
