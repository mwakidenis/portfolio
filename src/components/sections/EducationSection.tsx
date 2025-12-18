
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import CertificateCard from "@/components/CertificateCard";
import { Award, Clipboard, GraduationCap, Medal } from "lucide-react";

const EducationSection = () => {
  const certificates = [
    { 
      title: "10ALYTICS GLOBAL HACKATHON", 
      issuer: "10Alytics", 
      date: "2025", 
      icon: <Medal />, 
      imageUrl: "/1458242025-12-16.png" 
    },
    { 
      title: "CISCO Get Connected", 
      issuer: "Cisco Networking Academy", 
      date: "2024", 
      icon: <Award />,
      imageUrl: "/cisco_2025-12-16 155548.png" 
    },
    { 
      title: "Responsive Web Design", 
      issuer: "freecodecamp", 
      date: "2025", 
      icon: <Medal />,
      imageUrl: "/freecodecamp.org_certification_fccfe0925ac-797f-454c-8125-91fa70610602_responsive-web-design.jpg" 
    },
    { 
      title: "Advanced JavaScript Certification", 
      issuer: "GreatStack", 
      date: "2025", 
      icon: <Award />,
      imageUrl: "/java_script_completion_cert(01).png" 
    },
    { 
      title: "Annual Engineering Students", 
      issuer: "AES-TUK", 
      date: "2019", 
      icon: <Award />,
      imageUrl: "/tuk- 2025-12-16 160557.png" 
    },
    { 
      title: "Software Engineering Job Simulation", 
      issuer: "Forage", 
      date: "2024", 
      icon: <Medal />,
      imageUrl: "/Screenshot 2025-12-16 155033.png"
    },
      { 
      title: "Career Boost with Power  BI and AI", 
      issuer: "Power BI", 
      date: "2025", 
      icon: <Award />,
      imageUrl: "/Screenshot 2025-12-19 000720.png"
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="Education & Certifications"
            subtitle="My academic journey and professional qualifications that validate my expertise. 🎓"
          />
        </ScrollReveal>
        
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="mr-2 text-primary" />
              Education🧾
            </h3>
          </ScrollReveal>
          
          <div className="space-y-8">
            <ScrollReveal direction="left">
              <div className="glass p-6 rounded-xl hover-lift">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h4 className="text-xl font-bold">Bachelor of Science in Computer Science💻</h4>
                    <p className="text-lg text-primary">Meru University of Science and Technology</p>
                    <p className="mt-2 text-muted-foreground">Currently pursuing a Bachelor's degree in Computer Science. As a second-year student, I'm building a strong foundation in algorithms, data structures, software engineering, and computer networks.</p>
                  </div>
                  <div className="text-right md:whitespace-nowrap">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">2024 - 2028</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="glass p-6 rounded-xl hover-lift">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h4 className="text-xl font-bold">High School🏫</h4>
                    <p className="text-lg text-primary">Chogoria Boys' High School</p>
                    <p className="mt-2 text-muted-foreground">Focused on Mathematics, Physics, and Computer Studies. Participated in national coding competitions.</p>
                  </div>
                  <div className="text-right md:whitespace-nowrap">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">2011 - 2014</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        <div>
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="mr-2 text-primary" />
              Certifications🧾
            </h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 100} direction={index % 2 === 0 ? 'up' : 'down'}>
                <CertificateCard 
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  icon={cert.icon}
                  imageUrl={cert.imageUrl}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
