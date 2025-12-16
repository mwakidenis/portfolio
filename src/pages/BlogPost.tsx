
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading from an API
    setIsLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundPost = blogPosts.find(post => post.id.toString() === id);
        setPost(foundPost);
      }
      setIsLoading(false);
    }, 300);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-32 container">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-secondary/40 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-secondary/40 rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-secondary/40 rounded-lg"></div>
            <div className="space-y-3">
              <div className="h-4 bg-secondary/40 rounded"></div>
              <div className="h-4 bg-secondary/40 rounded"></div>
              <div className="h-4 bg-secondary/40 rounded w-5/6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-32 container flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">Back to All Posts</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft size={16} />
              Back to All Posts
            </Button>
          </Link>
        </div>
        
        <article className="container max-w-4xl">
          <ScrollReveal>
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{post.author}</span>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead">{post.excerpt}</p>
              
              <p>
                This is a full blog post content. In a real application, this would be loaded from a CMS or database.
                The content can include rich text formatting, images, code snippets, and more.
              </p>
              
              <h2>Why This Topic Matters</h2>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <blockquote>
                Important insights and takeaways from this article that are worth highlighting for emphasis and to break up the content.
              </blockquote>
              
              <h2>Key Points to Consider</h2>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <ul>
                <li>First important consideration for this topic</li>
                <li>Second point that expands on the main ideas</li>
                <li>Third element that provides additional context</li>
                <li>Final point that wraps up this section</li>
              </ul>
              
              <h2>Practical Applications</h2>
              
              <p>
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat 
                facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
              
              <h2>Conclusion</h2>
              
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque 
                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="mt-10 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
