"use client";

import Image from "next/image";
import { CheckCircle2, Code2, ExternalLink, Layers, UserCheck } from "lucide-react";
import { Project } from "@/types/project";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const portraitPreviewIds = new Set(["smart-laundry", "readly"]);

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  const isUiux = project.category === "uiux";
  const isPortrait = portraitPreviewIds.has(project.id);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      ariaLabel={`Case study details for ${project.title}`}
      className="max-w-3xl"
    >
      <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
        {/* Preview Frame */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#E2E5EC] bg-[#F1F3F7]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className={
              isPortrait
                ? "object-contain p-3"
                : "object-cover object-top"
            }
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            <Badge variant={isUiux ? "pink" : "blue"}>
              {project.type.toUpperCase()}
            </Badge>
            <Badge variant="outline">
              {isUiux ? "UI/UX" : "WEB APP"}
            </Badge>
          </div>
        </div>

        {/* Title & Role */}
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold tracking-wider uppercase text-[#2563EB]">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Project Case Study</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#111216]">
            {project.title}
          </h2>
          {project.role && (
            <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-[#5A6272] font-mono">
              <UserCheck className="w-4 h-4 text-[#BE185D]" aria-hidden="true" />
              <span>
                Role: <strong className="text-[#111216]">{project.role}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Full Description */}
        <div className="bg-[#FAF8F4] border border-[#E2E5EC] rounded-2xl p-5">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#272B35] mb-2.5">
            Project Overview &amp; Contribution
          </h3>
          <p className="text-[#272B35] text-sm leading-relaxed whitespace-pre-line">
            {project.fullDescription || project.desc}
          </p>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#272B35] mb-3 flex items-center gap-2">
              <CheckCircle2
                className="w-4 h-4 text-[#2563EB]"
                aria-hidden="true"
              />
              <span>Key Features &amp; Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E2E5EC] flex items-start gap-2.5 text-xs text-[#272B35]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#DB2777] mt-1.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#272B35] mb-2.5 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
            <span>Technologies &amp; Tools</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="px-3 py-1">
                #{t}
              </Badge>
            ))}
          </div>
        </div>

        {/* External Links & Close */}
        <div className="pt-4 border-t border-[#E2E5EC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#111216] hover:bg-[#272B35] text-white text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 h-11 px-5 rounded-full text-white text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isUiux
                    ? "bg-[#DB2777] hover:bg-[#BE185D]"
                    : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                }`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>{isUiux ? "Open Figma Prototype" : "Open Live Demo"}</span>
              </a>
            )}
          </div>

          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
