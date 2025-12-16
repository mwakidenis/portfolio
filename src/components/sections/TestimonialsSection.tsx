
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Working with Mwaki Denis was a game-changer for our startup. His technical skills combined with his eye for design helped us create a product that our users love. Can't recommend him enough! 🚀",
      author: "Sarah Kimani",
      role: "CEO, TechStart"
    },
    {
      content: "Mwaki Denisis has a rare ability to translate complex technical requirements into beautiful, intuitive interfaces. He's a true professional who delivers exceptional results. A joy to work with! ✨",
      author: "David Kaje",
      role: "Product Manager, InnovateCorp"
    },
    {
      content: "I've worked with many developers over the years, but few have impressed me as much as Mwaki Denis. His attention to detail and commitment to quality are unmatched. Absolutely incredible! 💯",
      author: "Eric Muriithi",
      role: "Design Director, CreativeWorks"
    },
    {
      content: "Mwaki Denis exceeded all our expectations with his creative approach to problem-solving. He not only delivered what we asked for but improved upon our initial ideas. Simply brilliant! 👏",
      author: "Alex Njeru",
      role: "CTO, FutureTech"
    },
    {
      content: "Working with Mwaki Denis felt like having a teammate who was just as invested in our success as we were. His communication skills and technical expertise made our project a huge success! 🏆",
      author: "Wilson Muchangi",
      role: "Founder, StartupLaunch"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary/50">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="Client Testimonials"
            subtitle="What people are saying about working with me. Check out these amazing feedback! 💬"
          />
        </ScrollReveal>
        
        <ScrollReveal>
          <div className="mx-auto max-w-5xl px-8">
            <Carousel 
              className="w-full" 
              opts={{
                align: "center",
                loop: true
              }}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4 pl-6">
                    <div className="p-1">
                      <TestimonialCard 
                        content={testimonial.content}
                        author={testimonial.author}
                        role={testimonial.role}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
              </div>
            </Carousel>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
