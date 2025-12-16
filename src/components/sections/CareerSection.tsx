
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import Timeline, { TimelineItem } from "@/components/Timeline";
import { Briefcase, Code, GraduationCap, Layout } from "lucide-react";

const CareerSection = () => {
  return (
    <section id="career" className="py-20">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="Career Journey"
            subtitle="My educational path and aspirations in the tech world. 🚀"
          />
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <Timeline>
            <TimelineItem 
              year="2024 - Present"
              title="Computer Science Student"
              description="Currently pursuing a Bachelor's degree in Computer Science at Meru University of Science and Technology. As a second-year student, I'm building a strong foundation in algorithms, data structures, software engineering, and computer networks."
              icon={<GraduationCap size={18} />}
            />
            
            <TimelineItem 
              year="2023 - 2024"
              title="Freelance Web Developer"
              description="Working on freelance projects to build responsive and user-friendly websites for clients. Focusing on modern frameworks like React and Next.js to deliver exceptional user experiences."
              icon={<Code size={18} />}
            />
            
            <TimelineItem 
              year="2023"
              title="UI/UX Design Enthusiast"
              description="Self-taught UI/UX design principles and practices. Created mockups and prototypes for personal projects and collaborative work. Learning design tools like Figma and Adobe XD."
              icon={<Layout size={18} />}
            />
            
           
          </Timeline>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CareerSection;
