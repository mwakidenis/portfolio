
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Download } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="About Me"
            subtitle="Learn more about my journey, my passion, and what drives me to create outstanding digital experiences. 💪"
          />
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="glass rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" 
                alt="Developer coding on computer"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">My Journey <span className="ml-1">🧭</span></h3>
              <p className="text-muted-foreground">
                I'm a versatile UI/UX designer and software developer with a passion for creating digital experiences that are both beautiful and functional. With a background in computer science and years of experience in the industry, I've developed a holistic approach to product development.
              </p>
              <p className="text-muted-foreground">
                My expertise spans the entire product lifecycle, from user research and wireframing to front-end and back-end development. I believe in user-centered design principles and writing clean, maintainable code. <span className="text-primary">{"</>"}</span>
              </p>
              <p className="text-muted-foreground">
                When I'm not coding or designing, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. 🤓
              </p>
              
              <div className="pt-4">
  <Button className="gap-2 bg-green-500 hover:bg-green-800 text-white" asChild>
    <a href="/cv.pdf" download>
      <Download className="h-4 w-4" />
      Download CV
    </a>
  </Button>
</div>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
