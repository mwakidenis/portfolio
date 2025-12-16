
import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Clock, Calendar, User, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { blogPosts } from '@/data/blogData';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <div className="container mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <section className="py-8">
          <div className="container">
            <ScrollReveal>
              <SectionHeading 
                title="My Blog"
                subtitle="Thoughts, tutorials, and insights about design, development, and the tech industry."
              />
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
              {currentPosts.map((post, index) => (
                <ScrollReveal 
                  key={post.id} 
                  delay={index * 100}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <article className="glass rounded-xl overflow-hidden hover-lift h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                    <Link to={`/blog/${post.id}`} className="block overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{post.category}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`} className="hover:underline underline-offset-4">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
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
                          <Calendar size={14} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                          <Link to={`/blog/${post.id}`}>Read More</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <ScrollReveal delay={400}>
                <Pagination className="mt-12">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </ScrollReveal>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
