"use client";

import Image from "next/image";
import {
  Check,
  ChevronUp,
  Copy,
  ExternalLink,
  MessageCircle,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    badge: "IG",
    badgeClass: "bg-pink-500/15 text-pink-400",
    hoverClass: "hover:border-pink-500/40",
    ariaLabel: "Kunjungi profil Instagram Dimas (@dimasbas_)",
  },
  {
    name: "GitHub",
    handle: "DimasBrahmantya",
    href: "https://github.com/DimasBrahmantya",
    badge: "GH",
    badgeClass: "bg-white/10 text-white",
    hoverClass: "hover:border-slate-400/50",
    ariaLabel: "Kunjungi profil GitHub Dimas (DimasBrahmantya)",
  },
  {
    name: "LinkedIn",
    handle: "dimas-brahmantya",
    href: "https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/",
    badge: "IN",
    badgeClass: "bg-blue-500/15 text-blue-400",
    hoverClass: "hover:border-blue-500/40",
    ariaLabel: "Kunjungi profil LinkedIn Dimas Brahmantya",
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
      className="relative py-24 px-4 sm:px-8 z-10 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Avatar & Social Channels */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <span className="font-mono text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-5">
            03 / CONTACT ME
          </span>

          <div className="relative mb-6">
            <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-card border-2 border-border shadow-xl">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
                <Image
                  src="/IMG_6847.JPG"
                  alt="Dimas Contact Avatar"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover object-top brightness-105 contrast-105"
                />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-mono text-xs font-bold text-white tracking-widest block uppercase">
                DIMAS BRAHMANTYA
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Malang, East Java &bull; Indonesia
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="w-full max-w-xs space-y-2 font-mono text-xs">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
                className={`p-3 rounded-xl bg-card/90 border border-border flex items-center justify-between text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${item.hoverClass}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${item.badgeClass}`}
                    aria-hidden="true"
                  >
                    {item.badge}
                  </span>
                  <span className="font-bold">{item.handle}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
            ))}

            <a
              href="https://wa.me/6281235829634"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kirim pesan WhatsApp ke Dimas (081235829634)"
              className="p-3 rounded-xl bg-card/90 border border-border flex items-center justify-between text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <span className="font-bold">081235829634</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Column: Headline, Direct Inbox & Highlights */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-4">
            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
              THANK YOU{" "}
              <span className="text-cyan-400 font-mono font-normal">2026</span>
            </h2>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg font-sans">
            Terima kasih telah menjelajahi portofolio ini. Terbuka lebar untuk
            diskusi proyek web, tawaran kerja, magang, maupun kolaborasi teknis
            lainnya.
          </p>

          {/* Direct Inbox Card */}
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-5">
              <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                DIRECT INBOX
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-white break-all">
                  dimasbrahmantyaaryasena@gmail.com
                </span>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onCopyEmail}
                  aria-label="Salin alamat email Dimas ke papan klip"
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>SALIN EMAIL</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              size="lg"
              onClick={onOpenModal}
              aria-label="Buka formulir untuk mengirim pesan langsung"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>KIRIM PESAN LANGSUNG</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onScrollToSection("home")}
              aria-label="Gulir kembali ke atas halaman"
            >
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
              <span>KEMBALI KE ATAS</span>
            </Button>
          </div>

          {/* Featured Highlights */}
          <div className="pt-5 border-t border-border">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block mb-3">
              FEATURED PORTFOLIO HIGHLIGHTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-card/80 border border-border">
                <span className="text-cyan-400 font-bold block">SIMRS 2026</span>
                <span className="text-slate-400 text-[11px]">Healthcare App</span>
              </div>
              <div className="p-3 rounded-xl bg-card/80 border border-border">
                <span className="text-rose-400 font-bold block">SECURE HUB</span>
                <span className="text-slate-400 text-[11px]">Anti-Phishing</span>
              </div>
              <div className="p-3 rounded-xl bg-card/80 border border-border">
                <span className="text-sky-400 font-bold block">SMART LAUNDRY</span>
                <span className="text-slate-400 text-[11px]">Figma UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
