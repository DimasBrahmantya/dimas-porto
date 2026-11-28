"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CV_HREF } from "@/lib/site";
import {
  MagneticWrap,
  RollingNumber,
  ShapeReveal,
  SplitTextReveal,
  TextScramble,
} from "@/components/portfolio/MotionPrimitives";

const stackGroups = [
  {
    title: "FRONTEND & UI ENGINEERING",
    caption: "Primary interface stack across deployed web apps and motion flows.",
    boxClass: "bg-[#FAF8F4] border-[#E2E5EC]",
    titleClass: "text-[#1D4ED8]",
    items: [
      { label: "Next.js", highlighted: "blue" as const },
      { label: "React", highlighted: null },
      { label: "TypeScript", highlighted: "blue" as const },
      { label: "Tailwind CSS", highlighted: null },
      { label: "Framer Motion", highlighted: null },
    ],
  },
  {
    title: "BACKEND & DATABASES",
    caption: "Server logic, REST APIs, authentication, and relational/NoSQL data.",
    boxClass: "bg-[#FAF8F4] border-[#E2E5EC]",
    titleClass: "text-[#5A6272]",
    items: [
      { label: "Laravel", highlighted: null },
      { label: "NestJS", highlighted: null },
      { label: "Node.js", highlighted: null },
      { label: "Python", highlighted: null },
      { label: "PostgreSQL RLS", highlighted: null },
      { label: "MySQL", highlighted: null },
      { label: "MongoDB", highlighted: null },
      { label: "Supabase", highlighted: null },
    ],
  },
  {
    title: "WORKFLOW, DEPLOYMENT & UI/UX",
    caption: "Version control, cloud deployment, and supporting Figma design systems.",
    boxClass: "bg-[#FDF2F8] border-[#F9A8D4]",
    titleClass: "text-[#9D174D]",
    items: [
      { label: "Git", highlighted: null },
      { label: "GitHub", highlighted: null },
      { label: "Vercel", highlighted: "blue" as const },
      { label: "Solo Scrum", highlighted: null },
      { label: "Figma", highlighted: "pink" as const },
      { label: "Design Systems", highlighted: "pink" as const },
    ],
  },
];

const internshipHighlights = [
  "Built and improved the hospital's outpatient registration module using Laravel, PHP, MySQL, and Bootstrap.",
  "Used by hospital registration staff and outpatient clinic teams to handle BPJS Kesehatan and general patient intake.",
  "Translated operational feedback from hospital staff into structured patient lookup and queue-slip workflows.",
];

export function ProfileSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <ShapeReveal variant="fade-up" className="mb-10">
        <span className="font-mono text-xs font-bold tracking-[0.08em] text-[#BE185D] uppercase block mb-2">
          <TextScramble text="02 / ABOUT & CAPABILITIES" />
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#111216]">
          <SplitTextReveal text="Background & Technologies." />
        </h2>
      </ShapeReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Asymmetric Column: Curtain Mask Reveal */}
        <ShapeReveal variant="curtain-up" className="lg:col-span-5 flex">
          <Card className="w-full rounded-3xl">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111216]">
                  Dimas Brahmantya Aryasena
                </h3>
                <p className="mt-3 text-sm text-[#272B35] leading-relaxed">
                  Based in Indonesia. Informatics
                  Engineering graduate from Universitas Muhammadiyah Malang
                  focused on building and deploying full-stack web applications,
                  clean APIs, and responsive interfaces.
                </p>

                <div className="my-6 border-t border-[#E2E5EC]" />

                <div className="space-y-6">
                  {/* Experience */}
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: "some" }}
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-[#DB2777] mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#BE185D] uppercase tracking-wider block">
                        FULLSTACK WEB DEVELOPER INTERN | AUG 2025 - SEP 2025
                      </span>
                      <p className="text-base font-bold text-[#111216] mt-0.5">
                        RSUD Grati Hospital, Pasuruan
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs sm:text-[13px] text-[#5A6272] leading-relaxed list-disc pl-4">
                        {internshipHighlights.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Education */}
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-3"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: "some" }}
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 20,
                        delay: 0.18,
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block">
                        B.SC. INFORMATICS | GPA{" "}
                        <RollingNumber value={3.8} decimals={2} /> / 4.00
                      </span>
                      <p className="text-base font-bold text-[#111216] mt-0.5">
                        Universitas Muhammadiyah Malang
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#5A6272] mt-1">
                        Final Thesis: Outpatient Registration System at RSUD
                        Grati Using Solo Scrum
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2E5EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#5A6272] uppercase tracking-wider block mb-1">
                    LANGUAGE PROFICIENCY
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#111216]">
                    Indonesian (Native) | English (Intermediate)
                  </p>
                </div>

                <MagneticWrap strength={0.16}>
                  <a
                    href={CV_HREF}
                    download="CV-Dimas-Brahmantya-Aryasena.pdf"
                    className="group inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-full bg-[#FAF8F4] border border-[#CBD2DF] hover:bg-[#F1F3F7] text-xs font-semibold text-[#111216] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <Download
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span>Download CV</span>
                  </a>
                </MagneticWrap>
              </div>
            </CardContent>
          </Card>
        </ShapeReveal>

        {/* Right Asymmetric Column: Wipe Reveal + Verified Tech Stack */}
        <ShapeReveal
          variant="diagonal-wipe"
          delay={0.08}
          className="lg:col-span-7 flex"
        >
          <Card className="w-full rounded-3xl">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-[#111216]">
                Technologies &amp; Tools
              </h3>
              <p className="text-sm text-[#5A6272] mt-1 mb-6">
                Technologies, frameworks, and tools I work with across web
                applications, backend APIs, databases, and UI/UX design.
              </p>

              <div className="space-y-4">
                {stackGroups.map((group, groupIdx) => (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{
                      duration: 0.45,
                      delay: groupIdx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border ${group.boxClass}`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-wider block ${group.titleClass}`}
                    >
                      {group.title}
                    </span>
                    <p className="text-xs text-[#5A6272] mt-0.5 mb-3">
                      {group.caption}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, itemIdx) => {
                        const variant =
                          item.highlighted === "blue"
                            ? "blue"
                            : item.highlighted === "pink"
                            ? "pink"
                            : "outline";
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: "some" }}
                            transition={{
                              type: "spring",
                              stiffness: 340,
                              damping: 22,
                              delay: groupIdx * 0.05 + itemIdx * 0.03,
                            }}
                            whileHover={{ y: -3, scale: 1.05 }}
                          >
                            <Badge
                              variant={variant}
                              className="h-9 px-3.5 text-xs sm:text-[13px] font-sans font-semibold select-none"
                            >
                              {item.label}
                            </Badge>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ShapeReveal>
      </div>
    </section>
  );
}
