"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  LiveMalangClock,
  MagneticWrap,
  RollingNumber,
  SplitTextReveal,
  TextScramble,
} from "@/components/portfolio/MotionPrimitives";

import { CV_HREF } from "@/lib/site";

interface HeroSectionProps {
  projectsCount: number;
  onScrollToSection: (id: string) => void;
}

export function HeroSection({
  projectsCount,
  onScrollToSection,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll-linked parallax across hero depth layers
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const watermarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const creativeScrollX = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const portfolioScrollX = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  // Subtle pointer-reactive parallax for ambient aura behind portrait
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const auraX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const auraY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const invAuraX = useTransform(auraX, (v) => -v * 0.85);
  const invAuraY = useTransform(auraY, (v) => -v * 0.85);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx * 28);
    pointerY.set(ny * 20);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="scroll-mt-20 relative overflow-x-clip bg-[#FAF8F4] border-b border-[#E2E5EC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-12 lg:pb-14 relative">
        {/* Subtle Architectural Grid Backdrop with Radial Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 editorial-grid-bg z-0"
        />

        {/* Desktop Layered Composition / Mobile Clean Visual Top + Stacked Content */}
        <div className="relative min-h-[400px] sm:min-h-[520px] lg:min-h-[670px] flex flex-col justify-end">
          {/* Dual Soft Blue & Rose Pink Ambient Aura behind Portrait (Cursor-Reactive) */}
          <div
            className="pointer-events-none absolute inset-x-0 top-6 sm:top-8 flex justify-center z-0"
            aria-hidden="true"
          >
            <div className="relative w-[340px] sm:w-[560px] lg:w-[760px] h-[340px] sm:h-[460px] lg:h-[540px]">
              <motion.div
                style={prefersReduced ? undefined : { x: auraX, y: auraY }}
                className="absolute left-0 top-6 w-[62%] h-[82%] rounded-full blur-[70px] sm:blur-[100px]"
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(96,165,250,0.52) 0%, rgba(96,165,250,0.18) 55%, transparent 78%)",
                  }}
                />
              </motion.div>
              <motion.div
                style={prefersReduced ? undefined : { x: invAuraX, y: invAuraY }}
                className="absolute right-0 top-2 w-[64%] h-[86%] rounded-full blur-[70px] sm:blur-[100px]"
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(244,114,182,0.58) 0%, rgba(244,114,182,0.22) 55%, transparent 78%)",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Background Watermark: PORTFOLIO behind shoulders (Scroll Parallax) */}
          <motion.div
            style={
              prefersReduced
                ? undefined
                : { y: watermarkY, scale: watermarkScale }
            }
            className="pointer-events-none select-none absolute inset-x-0 top-[148px] sm:top-[185px] lg:top-[190px] flex justify-center z-0"
            aria-hidden="true"
          >
            <span className="font-display font-extrabold uppercase tracking-[0.08em] text-[82px] sm:text-[148px] lg:text-[210px] leading-none text-[#111216]/[0.075]">
              PORTFOLIO
            </span>
          </motion.div>

          {/* Behind-Head Editorial Italic Serif: "Creative"  [Portrait]  "Portfolio" */}
          <div
            className="pointer-events-none select-none absolute inset-x-0 top-[82px] sm:top-[108px] lg:top-[116px] flex items-center justify-between lg:justify-center lg:gap-[320px] xl:gap-[380px] px-1 sm:px-6 z-10"
            aria-hidden="true"
          >
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={prefersReduced ? undefined : { x: creativeScrollX }}
              className="font-serif italic font-normal text-[36px] sm:text-[68px] lg:text-[96px] leading-none text-[#111216]"
            >
              Creative
            </motion.span>
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={prefersReduced ? undefined : { x: portfolioScrollX }}
              className="font-serif italic font-normal text-[36px] sm:text-[68px] lg:text-[96px] leading-none text-[#111216]"
            >
              Portfolio
            </motion.span>
          </div>

          {/* Center Cutout Portrait Layer (Immediate opacity for LCP + subtle spring lift & scroll glide) */}
          <motion.div
            initial={prefersReduced ? false : { y: 18, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReduced ? undefined : { y: portraitScrollY }}
            className="relative mx-auto w-[236px] sm:w-[330px] lg:w-[410px] xl:w-[430px] z-20 mt-4 sm:mt-6 lg:mt-0 lg:mb-0"
          >
            <Image
              src="/dimas-hero-cutout.png"
              alt="Dimas Brahmantya Aryasena wearing maroon graduation blazer"
              width={698}
              height={1094}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 640px) 236px, (max-width: 1024px) 330px, 430px"
              className="w-full h-auto object-contain select-none"
            />
          </motion.div>

          {/* Desktop Quadrant Overlay / Mobile Stacked Below Portrait */}
          <div className="relative z-30 mt-5 lg:mt-0 lg:absolute lg:inset-0 lg:pointer-events-none flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
            {/* Left Anchor: Relocation/Work Availability Pill + I AM DIMAS BAS + Primary CTAs */}
            <div className="lg:pointer-events-auto flex flex-col items-start lg:max-w-[440px] lg:pb-6">
              <motion.div
                initial={
                  prefersReduced
                    ? false
                    : { opacity: 0, y: 12, scale: 0.94 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 min-h-[40px] py-1.5 px-4 rounded-full bg-white border border-[#F9A8D4] shadow-[0_6px_18px_rgba(17,18,22,0.06)] mb-4 sm:mb-6"
              >
                <span className="relative flex items-center justify-center w-3 h-3 rounded-full bg-[#DB2777]/20 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777]" />
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#111216]">
                  Open to On-Site, Remote &amp; Freelance
                </span>
              </motion.div>

              <h1 className="font-display font-extrabold uppercase text-[#111216] text-[52px] sm:text-[74px] lg:text-[94px] leading-[0.92] tracking-[-0.015em]">
                <span className="sr-only">Dimas Brahmantya Aryasena, </span>
                <SplitTextReveal text="I AM" immediate delay={0.12} stagger={0.07} />
                <br />
                <SplitTextReveal text="DIMAS BAS" immediate delay={0.22} stagger={0.07} />
              </h1>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 flex flex-wrap items-center gap-2.5"
              >
                <MagneticWrap>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => onScrollToSection("works")}
                    aria-label="Scroll to selected works"
                  >
                    View Works
                  </Button>
                </MagneticWrap>

                <MagneticWrap>
                  <a
                    href={CV_HREF}
                    download="CV-Dimas-Brahmantya-Aryasena.pdf"
                    className="group inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-white text-[#111216] border border-[#CBD2DF] hover:bg-[#F1F3F7] hover:border-[#94A3B8] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <Download
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span>Download CV</span>
                  </a>
                </MagneticWrap>

                <MagneticWrap>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center h-12 px-5 rounded-full bg-[#FDF2F8] text-[#9D174D] border border-[#F9A8D4] hover:bg-[#FCE7F3] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    Archive (<RollingNumber value={projectsCount} />)
                  </Link>
                </MagneticWrap>
              </motion.div>
            </div>

            {/* Right Anchor: Focused Primary Role (Full Stack) + Supporting UI/UX + Location */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:pointer-events-auto flex flex-col items-start lg:items-end text-left lg:text-right lg:max-w-[360px] lg:pb-6"
            >
              <p className="text-sm sm:text-[15px] text-[#272B35] leading-relaxed max-w-sm">
                Full Stack Developer &amp; Web Developer focused on Next.js,
                TypeScript, and Laravel, with UI/UX prototyping as a supporting
                skill.
              </p>

              <p
                className="mt-4 lg:mt-6 font-display font-extrabold uppercase text-[#111216] text-[38px] sm:text-[50px] lg:text-[62px] leading-[0.95] tracking-tight"
                aria-label="Full Stack and Web Developer"
              >
                FULL STACK
                <br />
                &amp; WEB
                <br />
                DEVELOPER
              </p>

              <span className="mt-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FCE7F3] text-[#9D174D] border border-[#F9A8D4] font-mono text-[11px] font-bold tracking-wider uppercase">
                <TextScramble text="INDONESIA | ON-SITE & REMOTE" />
              </span>

              <LiveMalangClock className="mt-2.5 text-[#5A6272]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
