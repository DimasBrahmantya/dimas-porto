"use client";

import { motion } from "framer-motion";
import { Check, ChevronUp, Copy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LiveMalangClock,
  MagneticWrap,
  ShapeReveal,
  SplitTextReveal,
  TextScramble,
} from "@/components/portfolio/MotionPrimitives";

interface ContactSectionProps {
  copied: boolean;
  onCopyEmail: () => void;
  onOpenModal: () => void;
  onScrollToSection: (id: string) => void;
}

const externalSocialLinks = [
  {
    name: "Instagram",
    handle: "@dimasbas_",
    href: "https://instagram.com/dimasbas_",
    code: "IN",
    badgeClass: "bg-[#FCE7F3] text-[#9D174D]",
    borderClass: "border-[#F9A8D4] hover:border-[#DB2777]",
  },
  {
    name: "GitHub",
    handle: "DimasBrahmantya",
    href: "https://github.com/DimasBrahmantya",
    code: "GH",
    badgeClass: "bg-[#F1F3F7] text-[#111216]",
    borderClass: "border-[#E2E5EC] hover:border-[#CBD2DF]",
  },
  {
    name: "LinkedIn",
    handle: "dimas-brahmantya-aryasena",
    href: "https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/",
    code: "LI",
    badgeClass: "bg-[#EFF6FF] text-[#1D4ED8]",
    borderClass: "border-[#BFDBFE] hover:border-[#2563EB]",
  },
];

export function ContactSection({
  copied,
  onCopyEmail,
  onOpenModal,
  onScrollToSection,
}: ContactSectionProps) {
  const handleOpenWhatsApp = () => {
    const number = ["62", "889", "8045", "7191"].join("");
    window.open(
      `https://wa.me/${number}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 pt-8 pb-12 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Contact Banner Card (Pill-Expand Shape-In / Shape-Out) */}
      <ShapeReveal variant="pill-expand" duration={0.7}>
        <div className="relative overflow-hidden rounded-[28px] bg-white border border-[#E2E5EC] shadow-[0_16px_40px_-10px_rgba(17,18,22,0.08)] p-6 sm:p-10 lg:p-12">
          {/* Subtle Architectural Grid Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 editorial-grid-bg opacity-75 z-0"
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Headline, Spam-Protected Email Action & Direct Form CTA */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold tracking-[0.08em] text-[#BE185D] uppercase block mb-3">
                <TextScramble text="03 / GET IN TOUCH" />
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-[#111216] leading-none tracking-tight">
                <SplitTextReveal text="Let's build" />
                <span className="block font-serif italic font-normal text-[#BE185D] mt-1">
                  <SplitTextReveal text="something real." delay={0.14} />
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-[15px] text-[#272B35] leading-relaxed max-w-lg">
                Based in South Jakarta and open for Full Stack Developer &amp;
                Web Developer roles (on-site Jakarta, remote, or freelance),
                with UI/UX prototyping as a supporting skill.
              </p>

              {/* Spam-Protected Email Copy + Direct Message CTA */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div
                  data-cursor={copied ? "Copied ✓" : "Copy"}
                  className="flex items-center justify-between gap-3 min-h-[60px] py-1.5 px-4 rounded-2xl bg-[#F1F3F7] border border-[#E2E5EC] min-w-0 flex-1 max-w-lg"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ShieldCheck
                      className="w-4 h-4 text-[#2563EB] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs sm:text-[13px] font-bold text-[#111216] truncate">
                      {copied
                        ? "Email copied to clipboard"
                        : "Direct Email"}
                    </span>
                  </div>
                  <MagneticWrap strength={0.18}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onCopyEmail}
                      aria-label="Copy Dimas email address"
                      className="shrink-0 px-4"
                    >
                      {copied ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5 text-[#2563EB]"
                            aria-hidden="true"
                          />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </Button>
                  </MagneticWrap>
                </div>

                <MagneticWrap>
                  <Button
                    variant="pink"
                    size="lg"
                    onClick={onOpenModal}
                    className="h-14 px-7 shrink-0 w-full sm:w-auto"
                  >
                    Send Message
                  </Button>
                </MagneticWrap>
              </div>
            </div>

            {/* Right Social Channels (WhatsApp Number Obfuscated Against Scraping) */}
            <div className="lg:col-span-5 space-y-3">
              {externalSocialLinks.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.name} profile (${item.handle})`}
                  data-cursor="Open ↗"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.42,
                    delay: idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ x: 5 }}
                  className={`group flex items-center justify-between gap-3 min-h-[64px] p-3.5 rounded-2xl bg-white border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${item.borderClass}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-transform duration-200 group-hover:scale-105 ${item.badgeClass}`}
                      aria-hidden="true"
                    >
                      {item.code}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs text-[#5A6272]">
                        {item.name}
                      </span>
                      <span className="block font-mono text-xs sm:text-sm font-bold text-[#111216] truncate">
                        {item.handle}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#2563EB] shrink-0 pr-1 transition-transform duration-200 group-hover:translate-x-0.5">
                    Open
                  </span>
                </motion.a>
              ))}

              {/* WhatsApp Action Button (No Plaintext Phone Number in DOM) */}
              <motion.button
                type="button"
                onClick={handleOpenWhatsApp}
                aria-label="Start WhatsApp chat with Dimas"
                data-cursor="Chat ↗"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.42,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: 5 }}
                className="group w-full text-left flex items-center justify-between gap-3 min-h-[64px] p-3.5 rounded-2xl bg-white border border-[#E2E5EC] hover:border-[#CBD2DF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className="w-10 h-10 rounded-xl bg-[#F1F3F7] text-[#111216] flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-transform duration-200 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    WH
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs text-[#5A6272]">
                      WhatsApp
                    </span>
                    <span className="block font-mono text-xs sm:text-sm font-bold text-[#111216] truncate">
                      Chat via WhatsApp
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2563EB] shrink-0 pr-1 transition-transform duration-200 group-hover:translate-x-0.5">
                  Chat
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </ShapeReveal>

      {/* Clean Footer */}
      <footer className="mt-10 pt-6 border-t border-[#E2E5EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-[#5A6272]">
        <p>Dimas Brahmantya Aryasena | Full Stack Developer &amp; Web Developer</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LiveMalangClock className="text-[#111216]" />
          <span className="hidden sm:inline text-[#CBD2DF]" aria-hidden="true">
            |
          </span>
          <span>Open to On-Site Jakarta &amp; Remote</span>
          <MagneticWrap strength={0.16}>
            <button
              type="button"
              onClick={() => onScrollToSection("home")}
              className="inline-flex items-center gap-1 min-h-[44px] font-semibold text-[#111216] hover:text-[#2563EB] transition-colors rounded-lg px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </MagneticWrap>
        </div>
      </footer>
    </section>
  );
}
