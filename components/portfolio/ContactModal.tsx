"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/dimasbrahmantyaaryasena@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject
              ? `[Portofolio] ${formData.subject}`
              : `Pesan Portofolio Baru dari ${formData.name}`,
            message: formData.message,
            _captcha: "false",
          }),
        }
      );

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setIsSubmitted(false);
          onOpenChange(false);
        }, 3000);
      } else {
        setErrorMessage("Gagal mengirim pesan. Silakan coba lagi nanti.");
      }
    } catch {
      setErrorMessage(
        "Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      ariaLabel="Formulir kirim pesan langsung"
      className="max-w-lg"
    >
      <div className="overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center gap-2 border-b border-border pb-4 mb-6 font-mono text-xs font-bold text-cyan-400">
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>DIRECT MESSAGE</span>
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs">
            {errorMessage}
          </div>
        )}

        {isSubmitted ? (
          <div className="p-6 text-center font-mono py-10">
            <Check
              className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-bounce"
              aria-hidden="true"
            />
            <h4 className="text-xl font-bold mb-2 uppercase text-white font-heading">
              PESAN TERKIRIM!
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-sans">
              Terima kasih! Pesan telah berhasil terkirim langsung ke inbox
              Dimas Brahmantya.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5"
              >
                Nama Lengkap <span className="text-cyan-400">*</span>
              </label>
              <Input
                id="contact-name"
                type="text"
                required
                disabled={isSubmitting}
                placeholder="Masukkan nama Anda..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5"
              >
                Email Anda <span className="text-cyan-400">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                required
                disabled={isSubmitting}
                placeholder="nama@domain.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5"
              >
                Subjek
              </label>
              <Input
                id="contact-subject"
                type="text"
                disabled={isSubmitting}
                placeholder="Tawaran Project / Kolaborasi / Diskusi"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs font-semibold text-slate-300 uppercase mb-1.5"
              >
                Pesan <span className="text-cyan-400">*</span>
              </label>
              <Textarea
                id="contact-message"
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Tuliskan pesan Anda di sini..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => onOpenChange(false)}
              >
                BATAL
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>MENGIRIM...</span>
                  </>
                ) : (
                  <>
                    <span>KIRIM PESAN</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
}
