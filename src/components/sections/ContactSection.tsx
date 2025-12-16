
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";
import { Mail, Globe } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="Get In Touch"
            subtitle="Have a project in mind or want to chat? Feel free to reach out! 📬"
          />
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect <span className="ml-1">🤝</span></h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Messages sent through this form will be delivered directly to my inbox. Feel free to contact me using the form or reach out directly via email.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail size={18} />
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">Email📧</p>
                      <a 
                        href="mailto:mwakidenice@gmail.com" 
                        className="text-sm text-primary hover:underline"
                        aria-label="Send email to mwakidenice@gmail.com"
                      >
                        mwakidenice@gmail.com
                      </a>
                    </div>
                    <CopyEmailButton email="mwakidenice@gmail.com" />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Nairobi, Kenya <span className="ml-1">📍</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
