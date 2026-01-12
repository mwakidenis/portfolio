
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define project type
type Project = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  year: string;
  type: string;
};

// Create projects data
const projects: Project[] = [
{
    id: "1",
    title: "Mpesa-Based Wi-Fi Hotspot Billing System 🧾",
    description: "A fast, automated Hotspot Billing system powered by M-Pesa STK Push for instant, secure user access. Built with Node.js, MySQL, Next.js, and React, with optional MikroTik integration.",
    imageSrc: "/JobPortal.png", 
    tags: ["React", "Node.js", "Next.js", "MySQL", "Prisma", "M-Pesa"],
    liveDemoUrl: "https://anotherone-production-dcdb.up.railway.app", // live demo URL
    githubUrl: "https://github.com/mwakidenis/Mpesa-Based_Wi-Fi-Hotspot_Billing_System", 
    year: "2026",
    type: "Web App"
}
  {
    id: "2",
    title: "Tembea Afrika 🌍✈️",
    description: "A modern tourism platform built with React, Node.js, and MongoDB. Features include destination search, category filtering, user authentication, itinerary planning, booking management, and M-Pesa payment integration.",
    imageSrc: "/Tourism.png",
    tags: ["React", "Firebase", "Redux", "Tailwind CSS", "TypeScript"],
    liveDemoUrl: "https://tembea-africa.pages.dev/",
    githubUrl: "https://github.com/mwakidenis/safaricom-hook-final-project-and-deployment-week-8-mwakidenis.git",
    year: "2023",
    type: "Web App"
  },
  {
    id: "3",
    title: "🌱 AI-Powered Plant Health Assistant",
    description: "An intelligent plant health assistant powered by AI for real-time crop diagnostics and care. Includes image-based disease detection, expert treatment recommendations, and interactive insights to help farmers make informed, data-driven decisions. 🌿📊",
    imageSrc: "/Agri.png",
    tags: ["React", "Supabase", "Material UI", "AI & ML", "PostgreSQL"],
    liveDemoUrl: "https://shamba-smart-scan.vercel.app/",
    githubUrl: "https://github.com/mwakidenis/shamba-smart-scan.git",
    year: "2023",
    type: "AI Tool"
  }
];

const ProjectsSection = () => {
  // Define filter states
  const [technologyFilter, setTechnologyFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  // Get unique technologies, types and years
  const technologies = Array.from(new Set(projects.flatMap(project => project.tags)));
  const types = Array.from(new Set(projects.map(project => project.type)));
  const years = Array.from(new Set(projects.map(project => project.year)));

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesTechnology = technologyFilter === "all" || project.tags.includes(technologyFilter);
    const matchesType = typeFilter === "all" || project.type === typeFilter;
    const matchesYear = yearFilter === "all" || project.year === yearFilter;

    return matchesTechnology && matchesType && matchesYear;
  });

  // Reset all filters
  const resetFilters = () => {
    setTechnologyFilter("all");
    setTypeFilter("all");
    setYearFilter("all");
  };

  return (
    <section id="projects" className="py-20 bg-secondary/50">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="Featured Projects😁"
            subtitle="Check out some of my recent work and the problems I've solved. 🚀"
          />
        </ScrollReveal>

        {/* Filter controls */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-3">
              {/* Technology filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Technology: {technologyFilter === "all" ? "All" : technologyFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[200px]">
                  <DropdownMenuLabel>Filter by Technology</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={technologyFilter} onValueChange={setTechnologyFilter}>
                    <DropdownMenuRadioItem value="all">All Technologies</DropdownMenuRadioItem>
                    {technologies.map(tech => (
                      <DropdownMenuRadioItem key={tech} value={tech}>{tech}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Project type filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Type: {typeFilter === "all" ? "All" : typeFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[200px]">
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                    <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
                    {types.map(type => (
                      <DropdownMenuRadioItem key={type} value={type}>{type}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Year filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Year: {yearFilter === "all" ? "All" : yearFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[200px]">
                  <DropdownMenuLabel>Filter by Year</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={yearFilter} onValueChange={setYearFilter}>
                    <DropdownMenuRadioItem value="all">All Years</DropdownMenuRadioItem>
                    {years.map(year => (
                      <DropdownMenuRadioItem key={year} value={year}>{year}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Reset filters button */}
            {(technologyFilter !== "all" || typeFilter !== "all" || yearFilter !== "all") && (
              <Button variant="secondary" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}
          </div>
        </ScrollReveal>
        
        {/* Projects display */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-20">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id}>
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  imageSrc={project.imageSrc}
                  tags={project.tags}
                  liveDemoUrl={project.liveDemoUrl}
                  githubUrl={project.githubUrl}
                  reversed={index % 2 !== 0}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects match your current filters.</p>
            <Button variant="default" onClick={resetFilters} className="mt-4">
              Reset Filters
            </Button>
          </div>
        )}
        
        <ScrollReveal delay={300}>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <a href="https://github.com/mwakidenis?tab=repositories" target="_blank" rel="noopener noreferrer">
                View All Projects🧾 <span className="ml-1">🔍</span>
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
