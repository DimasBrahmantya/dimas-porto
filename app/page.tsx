"use client";

import { useState, useEffect, useRef } from "react";
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
import { SITE_URL } from "@/lib/site";
import ProjectDetailModal from "@/components/ProjectDetailModal";

const jsonLdProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Creative & Engineering Portfolio: Dimas Brahmantya Aryasena",
  url: SITE_URL,
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

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

  const handleCopyEmail = async () => {
    if (!navigator.clipboard?.writeText) return;
    const email = ["dimasbrahmantyaaryasena", "gmail.com"].join("@");
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#111216] font-sans relative overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }}
      />
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
