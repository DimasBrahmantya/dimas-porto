"use client";

import { useState, useEffect } from "react";
import { projectsData } from "@/data/projects";
import { Project } from "@/types/project";
import { Navbar, NavTab } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import {
  ProjectsSection,
  ProjectFilter,
} from "@/components/portfolio/ProjectsSection";
import { ProfileSection } from "@/components/portfolio/ProfileSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { ContactModal } from "@/components/portfolio/ContactModal";
import ProjectDetailModal from "@/components/ProjectDetailModal";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync active nav link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      const contactEl = document.getElementById("contact");
      const aboutEl = document.getElementById("about");
      const worksEl = document.getElementById("works");

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveTab("contact");
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveTab("about");
      } else if (worksEl && scrollPos >= worksEl.offsetTop) {
        setActiveTab("works");
      } else {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    const email = ["dimasbrahmantyaaryasena", "gmail.com"].join("@");
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#111216] font-sans relative overflow-x-clip">
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onScrollToSection={scrollToSection}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <main>
        <HeroSection
          projectsCount={projectsData.length}
          onScrollToSection={scrollToSection}
        />

        <ProjectsSection
          projects={projectsData}
          filter={filter}
          onFilterChange={setFilter}
          onSelectProject={setSelectedProject}
        />

        <ProfileSection />

        <ContactSection
          copied={copied}
          onCopyEmail={handleCopyEmail}
          onOpenModal={() => setIsModalOpen(true)}
          onScrollToSection={scrollToSection}
        />
      </main>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
