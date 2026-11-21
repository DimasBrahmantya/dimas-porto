"use client";

import { motion } from "framer-motion";
import { Check, ChevronUp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MagneticWrap,
  ShapeReveal,
} from "@/components/portfolio/MotionPrimitives";

interface ContactSectionProps {
  copied: boolean;
  onCopyEmail: () => void;
  onOpenModal: () => void;
  onScrollToSection: (id: string) => void;
}

const socialLinks = [
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
  {
    name: "WhatsApp",
    handle: "088980457191",
    href: "https://wa.me/6288980457191",
    code: "WH",
    badgeClass: "bg-[#F1F3F7] text-[#111216]",
    borderClass: "border-[#E2E5EC] hover:border-[#CBD2DF]",
  },
];

export function ContactSection({
  copied,
  onCopyEmail,
  onOpenModal,
  onScrollToSection,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-20 pt-8 pb-12 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Contact Banner Card (Pill-Expand Shape-In / Shape-Out) */}
      <ShapeReveal variant="pill-expand" duration={0.7}>
        <div className="relative overflow-hidden rounded-[28px] bg-white border border-[#E2E5EC] shadow-[0_16px_40px_-10px_rgba(17,18,22,0.08)] p-6 sm:p-10 lg:p-12">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Headline, Copyable Email & CTA */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold tracking-[0.08em] text-[#BE185D] uppercase block mb-3">
                03 / GET IN TOUCH
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-[#111216] leading-none tracking-tight">
                Let&apos;s build
                <span className="block font-serif italic font-normal text-[#BE185D] mt-1">
                  something real.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-[15px] text-[#272B35] leading-relaxed max-w-lg">
                Open for Full-Stack Developer, Front-End Engineer, and freelance
                UI/UX collaborations.
              </p>

              {/* Copyable Email + Send Message CTA */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between gap-3 min-h-[60px] py-1.5 px-4 rounded-2xl bg-[#F1F3F7] border border-[#E2E5EC] min-w-0 flex-1 max-w-lg">
                  <span className="font-mono text-xs sm:text-[13px] font-bold text-[#111216] truncate">
                    dimasbrahmantyaaryasena@gmail.com
                  </span>
                  <MagneticWrap strength={0.18}>
                    <Button
                      variant="outline"
                      size="sm"
                      data-cursor={copied ? "Done" : "Copy"}
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
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </MagneticWrap>
                </div>

                <MagneticWrap>
                  <Button
                    variant="pink"
                    size="lg"
                    data-cursor="Send"
                    onClick={onOpenModal}
                    className="h-14 px-7 shrink-0 w-full sm:w-auto"
                  >
                    Send Message
                  </Button>
                </MagneticWrap>
              </div>
            </div>

            {/* Right Social Channels */}
            <div className="lg:col-span-5 space-y-3">
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  aria-label={`Open ${item.name} profile (${item.handle})`}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
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
            </div>
          </div>
        </div>
      </ShapeReveal>

      {/* Clean Footer */}
      <footer className="mt-10 pt-6 border-t border-[#E2E5EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-[#5A6272]">
        <p>Dimas Brahmantya Aryasena | Creative &amp; Engineering Portfolio</p>
        <div className="flex items-center gap-4">
          <span>Malang, East Java</span>
          <MagneticWrap strength={0.16}>
            <button
              type="button"
              data-cursor="Top"
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
