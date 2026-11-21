"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShapeReveal } from "@/components/portfolio/MotionPrimitives";

const stackGroups = [
  {
    title: "FRONTEND & UI",
    boxClass: "bg-[#FAF8F4] border-[#E2E5EC]",
    titleClass: "text-[#1D4ED8]",
    items: [
      { label: "Next.js", highlighted: "blue" as const },
      { label: "React", highlighted: null },
      { label: "TypeScript", highlighted: "blue" as const },
      { label: "Tailwind CSS", highlighted: null },
      { label: "Vue.js", highlighted: null },
    ],
  },
  {
    title: "BACKEND & ARCHITECTURE",
    boxClass: "bg-[#FAF8F4] border-[#E2E5EC]",
    titleClass: "text-[#5A6272]",
    items: [
      { label: "Laravel", highlighted: null },
      { label: "NestJS", highlighted: null },
      { label: "Node.js", highlighted: null },
      { label: "REST API", highlighted: null },
      { label: "PostgreSQL RLS", highlighted: null },
    ],
  },
  {
    title: "DATABASE & PRODUCT DESIGN",
    boxClass: "bg-[#FDF2F8] border-[#F9A8D4]",
    titleClass: "text-[#9D174D]",
    items: [
      { label: "MySQL", highlighted: null },
      { label: "MongoDB", highlighted: null },
      { label: "Supabase", highlighted: null },
      { label: "Figma", highlighted: "pink" as const },
      { label: "Design Systems", highlighted: "pink" as const },
    ],
  },
];

export function ProfileSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <ShapeReveal variant="fade-up" className="mb-10">
        <span className="font-mono text-xs font-bold tracking-[0.08em] text-[#BE185D] uppercase block mb-2">
          02 / ABOUT &amp; CAPABILITIES
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#111216]">
          Background &amp; Technical Stack.
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
                  Informatics Engineering graduate from Universitas Muhammadiyah
                  Malang (GPA 3.80). Focused on building production web
                  applications, accessible UI systems, and clean full-stack
                  architectures.
                </p>

                <div className="my-6 border-t border-[#E2E5EC]" />

                <div className="space-y-6">
                  {/* Experience */}
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 360, damping: 20, delay: 0.1 }}
                      className="w-2.5 h-2.5 rounded-full bg-[#DB2777] mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#BE185D] uppercase tracking-wider block">
                        EX-INTERN AUG 2025 - SEP 2025
                      </span>
                      <p className="text-base font-bold text-[#111216] mt-0.5">
                        RSUD Grati Hospital, Pasuruan
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#5A6272] leading-relaxed mt-1">
                        Fullstack Web Developer: Built outpatient SIMRS
                        registration module using Laravel &amp; MySQL.
                      </p>
                    </div>
                  </motion.div>

                  {/* Education */}
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
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
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 360, damping: 20, delay: 0.18 }}
                      className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block">
                        B.SC. INFORMATICS | GPA 3.80
                      </span>
                      <p className="text-base font-bold text-[#111216] mt-0.5">
                        Universitas Muhammadiyah Malang
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#5A6272] mt-1">
                        Informatics Engineering Graduate | SMAN 2 Pasuruan
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2E5EC]">
                <span className="font-mono text-[11px] font-bold text-[#5A6272] uppercase tracking-wider block mb-1.5">
                  LANGUAGE PROFICIENCY
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#111216]">
                  Indonesian (Native) | English (Professional Working)
                </p>
              </div>
            </CardContent>
          </Card>
        </ShapeReveal>

        {/* Right Asymmetric Column: Diagonal Wipe Reveal + Interactive Tech Badges */}
        <ShapeReveal
          variant="diagonal-wipe"
          delay={0.08}
          className="lg:col-span-7 flex"
        >
          <Card className="w-full rounded-3xl">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-[#111216]">
                Core Technologies &amp; Engineering Tools
              </h3>
              <p className="text-sm text-[#5A6272] mt-1 mb-6">
                Production tools used across web apps, APIs, databases, and
                interface design.
              </p>

              <div className="space-y-4">
                {stackGroups.map((group, groupIdx) => (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: "some" }}
                    transition={{
                      duration: 0.45,
                      delay: groupIdx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border ${group.boxClass}`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-wider block mb-3 ${group.titleClass}`}
                    >
                      {group.title}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
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
                            viewport={{ once: false, amount: "some" }}
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
                              className="h-9 px-4 text-xs sm:text-[13px] font-sans font-semibold select-none"
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
