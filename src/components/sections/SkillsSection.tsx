
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { 
  Code, 
  Database, 
  FileCode, 
  Figma, 
  Globe, 
  LayoutGrid, 
  PenTool, 
  Smartphone, 
  ServerIcon, 
  Cpu, 
  TerminalSquare,
  BrainCircuit,
  Palette,
  Command,
  Cloud,
  Layers,
  Shield,
  GitBranch,
  LineChart,
  BookOpen,
  CheckCircle,
  Boxes,
  Network,
  Binary,
  Workflow
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const SkillsSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("frontend");
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  
  // Define skill categories
  const skillCategories = [
    {
      id: "frontend",
      label: "Frontend",
      skills: [
        { name: "React", icon: <Code size={isMobile ? 24 : 32} /> },
        { name: "JavaScript", icon: <FileCode size={isMobile ? 24 : 32} /> },
        { name: "TypeScript", icon: <FileCode size={isMobile ? 24 : 32} /> },
        { name: "HTML/CSS", icon: <LayoutGrid size={isMobile ? 24 : 32} /> },
        { name: "Next.js", icon: <Layers size={isMobile ? 24 : 32} /> },
        { name: "Vue.js", icon: <Code size={isMobile ? 24 : 32} /> },
        { name: "Tailwind CSS", icon: <LayoutGrid size={isMobile ? 24 : 32} /> },
        { name: "SASS/SCSS", icon: <Palette size={isMobile ? 24 : 32} /> },
        { name: "Redux", icon: <Workflow size={isMobile ? 24 : 32} /> }
      ]
    },
    {
      id: "backend",
      label: "Backend",
      skills: [
        { name: "Node.js", icon: <ServerIcon size={isMobile ? 24 : 32} /> },
        { name: "Python", icon: <TerminalSquare size={isMobile ? 24 : 32} /> },
        { name: "Django", icon: <Globe size={isMobile ? 24 : 32} /> },
        { name: "Express.js", icon: <ServerIcon size={isMobile ? 24 : 32} /> },
        { name: "Flask", icon: <Globe size={isMobile ? 24 : 32} /> },
        { name: "GraphQL", icon: <Network size={isMobile ? 24 : 32} /> },
        { name: "REST APIs", icon: <Network size={isMobile ? 24 : 32} /> },
        { name: "Java", icon: <FileCode size={isMobile ? 24 : 32} /> },
        { name: "PHP", icon: <FileCode size={isMobile ? 24 : 32} /> }
      ]
    },
    {
      id: "mobile",
      label: "Mobile",
      skills: [
        { name: "React Native", icon: <Smartphone size={isMobile ? 24 : 32} /> },
        { name: "Flutter", icon: <Smartphone size={isMobile ? 24 : 32} /> },
        { name: "Swift", icon: <Smartphone size={isMobile ? 24 : 32} /> },
        { name: "Kotlin", icon: <Smartphone size={isMobile ? 24 : 32} /> },
        { name: "Ionic", icon: <Smartphone size={isMobile ? 24 : 32} /> },
        { name: "Firebase", icon: <ServerIcon size={isMobile ? 24 : 32} /> }
      ]
    },
    {
      id: "database",
      label: "Database",
      skills: [
        { name: "MongoDB", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "PostgreSQL", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "MySQL", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "Redis", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "Firebase", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "Supabase", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "DynamoDB", icon: <Database size={isMobile ? 24 : 32} /> },
        { name: "SQL Server", icon: <Database size={isMobile ? 24 : 32} /> }
      ]
    },
    {
      id: "devops",
      label: "DevOps & Cloud",
      skills: [
        { name: "AWS", icon: <Cloud size={isMobile ? 24 : 32} /> },
        { name: "Docker", icon: <Boxes size={isMobile ? 24 : 32} /> },
        { name: "Kubernetes", icon: <Boxes size={isMobile ? 24 : 32} /> },
        { name: "CI/CD", icon: <GitBranch size={isMobile ? 24 : 32} /> },
        { name: "GitHub Actions", icon: <GitBranch size={isMobile ? 24 : 32} /> },
        { name: "Azure", icon: <Cloud size={isMobile ? 24 : 32} /> },
        { name: "Google Cloud", icon: <Cloud size={isMobile ? 24 : 32} /> },
        { name: "Linux", icon: <TerminalSquare size={isMobile ? 24 : 32} /> }
      ]
    },
    {
      id: "design",
      label: "Design & UI/UX",
      skills: [
        { name: "UI/UX Design", icon: <Palette size={isMobile ? 24 : 32} /> },
        { name: "Figma", icon: <Figma size={isMobile ? 24 : 32} /> },
        { name: "Adobe XD", icon: <PenTool size={isMobile ? 24 : 32} /> },
        { name: "Sketch", icon: <PenTool size={isMobile ? 24 : 32} /> },
        { name: "Photoshop", icon: <PenTool size={isMobile ? 24 : 32} /> },
        { name: "Illustrator", icon: <PenTool size={isMobile ? 24 : 32} /> },
        { name: "Wireframing", icon: <LayoutGrid size={isMobile ? 24 : 32} /> }
      ]
    },
    {
      id: "other",
      label: "Other Skills",
      skills: [
        { name: "Git", icon: <GitBranch size={isMobile ? 24 : 32} /> },
        { name: "AI/ML", icon: <BrainCircuit size={isMobile ? 24 : 32} /> },
        { name: "Agile/Scrum", icon: <CheckCircle size={isMobile ? 24 : 32} /> },
        { name: "Testing", icon: <CheckCircle size={isMobile ? 24 : 32} /> },
        { name: "TDD", icon: <CheckCircle size={isMobile ? 24 : 32} /> },
        { name: "Data Analysis", icon: <LineChart size={isMobile ? 24 : 32} /> },
        { name: "SEO", icon: <Globe size={isMobile ? 24 : 32} /> },
        { name: "Security", icon: <Shield size={isMobile ? 24 : 32} /> },
        { name: "WebSockets", icon: <Network size={isMobile ? 24 : 32} /> },
        { name: "GraphQL", icon: <Binary size={isMobile ? 24 : 32} /> },
        { name: "PWA", icon: <Smartphone size={isMobile ? 24 : 32} /> },
        { name: "Technical Writing", icon: <BookOpen size={isMobile ? 24 : 32} /> }
      ]
    }
  ];

  // Handle mobile tab touches
  const handleTabChange = (value: string) => {
    if (isMobile) {
      // On mobile, briefly show indicator that the tab changed
      setShowMobileWarning(true);
      setTimeout(() => setShowMobileWarning(false), 1500);
    }
    setActiveTab(value);
  };

  // Preselect frontend tab on mobile
  useEffect(() => {
    setActiveTab("frontend");
  }, []);

  return (
    <section id="skills" className="py-16 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <ScrollReveal>
          <SectionHeading 
            title="Skills & Technologies"
            subtitle="My technical toolkit for building exceptional digital experiences 🛠️"
          />
        </ScrollReveal>
        
        <ScrollReveal delay={400}>
          <Tabs defaultValue="frontend" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 w-full mb-8 overflow-x-auto scrollbar-none">
                {skillCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id} 
                    className="text-xs sm:text-sm whitespace-nowrap"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {showMobileWarning && isMobile && (
                <div className="absolute top-12 left-0 right-0 bg-background/80 text-center py-2 text-xs text-primary animate-fade-in rounded-md backdrop-blur-sm">
                  Switched to {skillCategories.find(c => c.id === activeTab)?.label} skills
                </div>
              )}
            </div>
            
            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {category.skills.map((skill, idx) => (
                      <div 
                        key={`${category.id}-${idx}`} 
                        className="flex flex-col items-center p-3 sm:p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md"
                      >
                        <div className="text-primary mb-2">
                          {skill.icon}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-center">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </ScrollReveal>
        
        <ScrollReveal delay={500}>
          <div className="w-full mt-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto text-center">
              <span className="px-3 py-1 rounded-full bg-primary/10">React</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">TypeScript</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Next.js</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Node.js</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">MongoDB</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">AWS</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Docker</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Python</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Django</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">GraphQL</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Tailwind CSS</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Redux</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">React Native</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Flutter</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Figma</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">UI/UX</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">Git</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">CI/CD</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">PostgreSQL</span>
              <span className="px-3 py-1 rounded-full bg-primary/10">AI/ML</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
