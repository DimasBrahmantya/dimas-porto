"use client";

import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TiltSpotlightCard } from "@/components/portfolio/MotionPrimitives";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  variant?: "home" | "archive";
}

export function ProjectCard({
  project,
  onSelect,
  variant = "home",
}: ProjectCardProps) {
  const isUiux = project.category === "uiux";
  const isArchive = variant === "archive";

  return (
    <TiltSpotlightCard
      accent={isUiux ? "pink" : "blue"}
      cursorLabel={isArchive ? "Inspect" : "View ↗"}
    >
      <Card
        interactive
        className={`h-full flex flex-col justify-between overflow-hidden ${
          isUiux ? "border-[#F9A8D4]" : "border-[#E2E5EC]"
        }`}
      >
        <div>
          <div className="p-3 pb-0">
            <button
              type="button"
              onClick={() => onSelect(project)}
              aria-label={
                isArchive
                  ? `Open case study details for ${project.title}`
                  : `Inspect ${project.title}`
              }
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#F1F3F7] border border-[#E2E5EC] group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes={
                  isArchive
                    ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    : "(max-width: 768px) 100vw, 400px"
                }
                className={
                  project.portrait
                    ? "object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    : "object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                }
              />
            </button>
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge variant={isUiux ? "pink" : "blue"}>
                {project.type.toUpperCase()}
              </Badge>

              {isArchive ? (
                <Badge variant="outline">{isUiux ? "UI/UX" : "WEB APP"}</Badge>
              ) : (
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open GitHub repository for ${project.title}`}
                      className="w-11 h-11 rounded-full bg-[#F1F3F7] border border-[#E2E5EC] flex items-center justify-center text-[#475060] hover:text-[#111216] hover:border-[#CBD2DF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                    >
                      <Code2 className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live preview for ${project.title}`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                        isUiux
                          ? "bg-[#FCE7F3] border-[#F9A8D4] text-[#9D174D] hover:bg-[#DB2777] hover:text-white"
                          : "bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8] hover:bg-[#2563EB] hover:text-white"
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <CardTitle className="text-lg">
              <button
                type="button"
                onClick={() => onSelect(project)}
                className="min-h-[44px] py-1.5 flex items-center w-full text-left hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
              >
                {project.title}
              </button>
            </CardTitle>
            {project.role && (
              <p className="font-mono text-[11px] font-semibold text-[#2563EB]">
                Role: {project.role}
              </p>
            )}
          </CardHeader>

          <CardContent className="pb-4">
            <p className="text-xs sm:text-[13px] text-[#5A6272] leading-relaxed line-clamp-3">
              {project.desc}
            </p>
          </CardContent>
        </div>

        <CardFooter
          className={isArchive ? "pt-3 pb-4 gap-3 flex-wrap" : "pt-3 pb-4"}
        >
          <div
            className={
              isArchive ? "flex flex-wrap gap-1.5 min-w-0" : "flex flex-wrap gap-1.5"
            }
          >
            {project.tech.slice(0, 3).map((t) => (
              <Badge key={t} variant="secondary">
                #{t}
              </Badge>
            ))}
          </div>

          {isArchive && (
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open GitHub repository for ${project.title}`}
                  className="w-11 h-11 rounded-full bg-[#F1F3F7] border border-[#E2E5EC] flex items-center justify-center text-[#272B35] hover:bg-[#E2E5EC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <Code2 className="w-4 h-4" aria-hidden="true" />
                </a>
              )}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 h-11 px-4 rounded-full text-xs font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isUiux
                      ? "bg-[#DB2777] hover:bg-[#BE185D]"
                      : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                  }`}
                >
                  <span>{isUiux ? "Figma" : "Demo"}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-[#111216] hover:bg-[#272B35] text-white text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <span>Details</span>
                </button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </TiltSpotlightCard>
  );
}
