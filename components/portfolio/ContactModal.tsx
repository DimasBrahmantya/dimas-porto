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

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSender, setSubmittedSender] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFieldErrors({});
      setErrorMessage("");
      setSubmittedSender(null);
    }
    onOpenChange(nextOpen);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FieldErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!emailPattern.test(formData.email.trim())) {
      errors.email = "Please enter a valid email format (e.g. name@domain.com).";
    }
    if (!formData.message.trim()) {
      errors.message = "Please write a brief message or project summary.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please review the highlighted fields below before sending.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          website: formData.website,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok !== false) {
        setSubmittedSender(formData.name.trim());
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        setErrorMessage(
          data.error ||
            "Could not send your message right now. Please try again shortly."
        );
      }
    } catch {
      setErrorMessage(
        "Network error while sending. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      ariaLabel="Direct contact message form"
      className="max-w-lg"
    >
      <div className="overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center gap-2 border-b border-[#E2E5EC] pb-4 mb-6 font-mono text-xs font-bold text-[#BE185D] uppercase tracking-wider">
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>Direct Message</span>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 mb-5 rounded-xl bg-[#FDF2F8] border border-[#F9A8D4] text-[#9D174D] text-xs font-medium"
          >
            {errorMessage}
          </div>
        )}

        {submittedSender ? (
          <div role="status" aria-live="polite" className="py-8 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" aria-hidden="true" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#111216] mb-2">
              Message Sent Successfully.
            </h4>
            <p className="text-sm text-[#5A6272] leading-relaxed max-w-sm mx-auto mb-6">
              Thank you, {submittedSender}. Your inquiry has been delivered to
              Dimas Brahmantya&apos;s inbox and will be answered promptly.
            </p>
            <Button variant="primary" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
            {/* Hidden anti-spam honeypot field */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs font-bold text-[#272B35] uppercase mb-1.5"
              >
                Full Name <span className="text-[#BE185D]">*</span>
              </label>
              <Input
                id="contact-name"
                type="text"
                required
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                disabled={isSubmitting}
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name) {
                    setFieldErrors({ ...fieldErrors, name: undefined });
                  }
                }}
                className={fieldErrors.name ? "border-[#BE185D]" : undefined}
              />
              {fieldErrors.name && (
                <p
                  id="contact-name-error"
                  className="mt-1.5 text-xs font-medium text-[#9D174D]"
                >
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs font-bold text-[#272B35] uppercase mb-1.5"
              >
                Email Address <span className="text-[#BE185D]">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                disabled={isSubmitting}
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) {
                    setFieldErrors({ ...fieldErrors, email: undefined });
                  }
                }}
                className={fieldErrors.email ? "border-[#BE185D]" : undefined}
              />
              {fieldErrors.email && (
                <p
                  id="contact-email-error"
                  className="mt-1.5 text-xs font-medium text-[#9D174D]"
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block font-mono text-xs font-bold text-[#272B35] uppercase mb-1.5"
              >
                Subject
              </label>
              <Input
                id="contact-subject"
                type="text"
                disabled={isSubmitting}
                placeholder="Full-Stack role, on-site/remote opportunity, or freelance"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs font-bold text-[#272B35] uppercase mb-1.5"
              >
                Message <span className="text-[#BE185D]">*</span>
              </label>
              <Textarea
                id="contact-message"
                required
                rows={4}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={
                  fieldErrors.message ? "contact-message-error" : undefined
                }
                disabled={isSubmitting}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (fieldErrors.message) {
                    setFieldErrors({ ...fieldErrors, message: undefined });
                  }
                }}
                className={fieldErrors.message ? "border-[#BE185D]" : undefined}
              />
              {fieldErrors.message && (
                <p
                  id="contact-message-error"
                  className="mt-1.5 text-xs font-medium text-[#9D174D]"
                >
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="pink" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
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
