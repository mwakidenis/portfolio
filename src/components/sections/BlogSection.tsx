
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Clock, Calendar, User, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogData";

const BlogSection = () => {
  // Just show the first 3 blog posts in the home page section
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-secondary/10">
      <div className="container">
        <ScrollReveal>
          <SectionHeading 
            title="From My Blog"
            subtitle="Check out my latest articles and thoughts on design, development, and technology. 📝"
          />
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 100} direction="up">
              <article className="glass rounded-xl overflow-hidden hover-lift h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="relative">
                  <Link to={`/blog/${post.id}`} className="block overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <Badge className="absolute top-3 right-3 bg-primary/80 hover:bg-primary text-white">
                    {post.category}
                  </Badge>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/50"></div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.id}`} className="hover:underline underline-offset-4">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-muted-foreground mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-primary" />
                      <span className="text-sm">{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:text-primary flex items-center gap-1" asChild>
                      <Link to={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={400}>
          <div className="mt-14 text-center">
            <Button className="gap-2 px-6 py-6 group" asChild>
              <Link to="/blog">
                <span className="inline-flex items-center">
                  <Book size={16} className="mr-2" />
                  View All Articles
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Explore my complete collection of articles on design, development, and technology
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BlogSection;
