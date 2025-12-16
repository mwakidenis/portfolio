import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowRight } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Conversation flow and persona structure
type ConversationStep = {
  id: string;
  messages?: ChatMessageProps[];
  options?: {
    text: string;
    nextId: string;
  }[];
  inputRequired?: boolean;
  onInput?: (input: string) => string | null;
  gif?: string;
};

const CONVERSATION_STEPS: Record<string, ConversationStep> = {
  "start": {
    id: "start",
    messages: [
      {
        content: "Hello there! 👋",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "I'm Marklogic, Marklewis's personal AI assistant. Good to see you... uhmm",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What's your name? 😅",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    inputRequired: true,
    onInput: (name) => {
      if (name.trim()) {
        return "profile-created";
      }
      return null;
    }
  },
  "profile-created": {
    id: "profile-created",
    messages: [
      {
        content: "Great to meet you! I hope you feel right at home. 🤗",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "So which mode shall we explore?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Story Mode", nextId: "story-mode" },
      { text: "Sandbox Mode", nextId: "sandbox-mode" },
      { text: "Action Mode", nextId: "action-mode" },
      { text: "Website Pricing", nextId: "pricing-mode" },
      { text: "End Conversation", nextId: "end-conversation" },
    ]
  },
  "story-mode": {
    id: "story-mode",
    messages: [
      {
        content: "What side of Marklewis's life would you like us to discuss?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "General Life ♻", nextId: "general-life" },
      { text: "Professional Life ⬆", nextId: "professional-life" },
      { text: "Romantic Life ❤", nextId: "romantic-life" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ]
  },
  "romantic-life": {
    id: "romantic-life",
    messages: [],
    gif: "/RomanticLaugh.gif",
    options: [
      { text: "Nice Try! 😄", nextId: "try-again" },
    ]
  },
  "try-again": {
    id: "try-again",
    messages: [
      {
        content: "Okay you've had your fun, be serious now. 🧍🏿‍♀️",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What side of Marklewis's life would you like us to discuss?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "General Life ♻", nextId: "general-life" },
      { text: "Professional Life ⬆", nextId: "professional-life" },
      { text: "Romantic Life ❤", nextId: "romantic-life" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ]
  },
  "general-life": {
    id: "general-life",
    messages: [
      {
        content: "Marklewis Mutugi is passionate about technology and innovation. Outside of work, he enjoys exploring new tech trends, contributing to open source projects, and sharing knowledge with the tech community.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Would you like to know more?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Yes absolutely!", nextId: "general-life-more" },
      { text: "No, That's enough", nextId: "story-mode" },
    ]
  },
  "general-life-more": {
    id: "general-life-more",
    messages: [
      {
        content: "That's the spirit!! 😎",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Marklewis believes in continuous learning and personal growth. He balances his technical pursuits with interests in design thinking and user experience. His approach to problem-solving combines analytical thinking with creative solutions.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What else would you like to know about him?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "His Hobbies", nextId: "hobbies" },
      { text: "His Aspirations", nextId: "aspirations" },
      { text: "Go Back ↩", nextId: "story-mode" },
    ]
  },
  "hobbies": {
    id: "hobbies",
    messages: [
      {
        content: "Outside of coding and design, Marklewis enjoys photography, reading tech blogs, and experimenting with new gadgets. He's also passionate about fitness and occasionally goes hiking to disconnect and recharge.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Tell me more", nextId: "hobbies-more" },
      { text: "Go Back ↩", nextId: "general-life-more" },
    ]
  },
  "hobbies-more": {
    id: "hobbies-more",
    messages: [
      {
        content: "Marklewis is also interested in digital minimalism and finding ways technology can enhance rather than distract from meaningful experiences. He enjoys attending tech meetups and conferences to network with like-minded professionals.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "general-life-more" },
    ]
  },
  "aspirations": {
    id: "aspirations",
    messages: [
      {
        content: "Marklewis aspires to create technology that makes a positive impact on people's lives. He's passionate about building accessible, user-friendly applications that solve real problems.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Long term, he hopes to mentor upcoming developers and contribute to open-source projects that benefit the wider tech community.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "general-life-more" },
    ]
  },
  "professional-life": {
    id: "professional-life",
    messages: [
      {
        content: "Marklewis Mutugi is a passionate front-end developer with expertise in building responsive web applications. He practices various IT disciplines including UI/UX design, web development, and software development lifecycle management. He seeks to grow through encountering problems then constructing solid solutions.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Would you like to know more?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Yes absolutely!", nextId: "choose-tech" },
      { text: "No, That's enough", nextId: "story-mode" },
    ]
  },
  "choose-tech": {
    id: "choose-tech",
    messages: [
      {
        content: "That's the spirit!! 😎",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What field would you like me to elaborate on?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "UI/UX Design", nextId: "uiux-design" },
      { text: "Web Development", nextId: "web-development" },
      { text: "SDLC Management", nextId: "sdlc-management" },
      { text: "Go Back ↩", nextId: "story-mode" },
    ]
  },
  "uiux-design": {
    id: "uiux-design",
    messages: [
      {
        content: "Marklewis has expertise in UI/UX design, focusing on creating intuitive and engaging user interfaces. His design philosophy centers around user-centric approaches that enhance usability while maintaining aesthetic appeal. He uses tools like Figma and Adobe XD to prototype and iterate designs before implementation.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What specific aspect of UI/UX design interests you most?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Design Process", nextId: "design-process" },
      { text: "Tools & Technologies", nextId: "design-tools" },
      { text: "Go Back ↩", nextId: "choose-tech" },
    ]
  },
  "design-process": {
    id: "design-process",
    messages: [
      {
        content: "Marklewis follows a user-centered design process that begins with research and understanding user needs. He creates personas, user flows, and wireframes before moving to high-fidelity designs. He believes in iterative design with regular user testing to refine the experience.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "uiux-design" },
    ]
  },
  "design-tools": {
    id: "design-tools",
    messages: [
      {
        content: "For UI/UX design, Marklewis primarily uses Figma for collaborative design work. He's also proficient with Adobe XD, Sketch, and prototyping tools like ProtoPie. For user research and testing, he works with tools like Hotjar and UserTesting.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "uiux-design" },
    ]
  },
  "web-development": {
    id: "web-development",
    messages: [
      {
        content: "Marklewis excels in web development with proficiency in React, TypeScript, and modern front-end frameworks. He builds responsive, accessible, and performant web applications with clean, maintainable code. His development approach emphasizes component-based architecture and efficient state management.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What aspect of web development would you like to know more about?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Frontend Technologies", nextId: "frontend-tech" },
      { text: "Development Philosophy", nextId: "dev-philosophy" },
      { text: "Go Back ↩", nextId: "choose-tech" },
    ]
  },
  "frontend-tech": {
    id: "frontend-tech",
    messages: [
      {
        content: "Marklewis specializes in React.js ecosystem with TypeScript for type safety. He's experienced with state management solutions like Redux and Zustand, and styling approaches including Styled Components and Tailwind CSS. He stays current with modern build tools and performance optimization techniques.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "web-development" },
    ]
  },
  "dev-philosophy": {
    id: "dev-philosophy",
    messages: [
      {
        content: "Marklewis believes in writing clean, maintainable code that solves real problems. He values accessibility and performance as core aspects of development, not afterthoughts. He approaches projects iteratively, focusing on delivering working software that can be continuously improved.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "web-development" },
    ]
  },
  "sdlc-management": {
    id: "sdlc-management",
    messages: [
      {
        content: "Marklewis understands the full software development lifecycle, from initial requirements gathering through deployment and maintenance. He's experienced with agile methodologies and version control systems like Git, ensuring efficient collaboration on projects of all sizes.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What would you like to know more about?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Project Management", nextId: "project-management" },
      { text: "CI/CD Practices", nextId: "cicd-practices" },
      { text: "Go Back ↩", nextId: "choose-tech" },
    ]
  },
  "project-management": {
    id: "project-management",
    messages: [
      {
        content: "Marklewis has experience with agile project management, particularly Scrum and Kanban methodologies. He's comfortable working with tools like Jira and Trello for task tracking and appreciates the importance of clear communication in team settings.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "sdlc-management" },
    ]
  },
  "cicd-practices": {
    id: "cicd-practices",
    messages: [
      {
        content: "Marklewis implements continuous integration and deployment practices using tools like GitHub Actions and Jenkins. He values automated testing and believes in building robust pipelines that maintain code quality while enabling fast, reliable deployments.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Go Back ↩", nextId: "sdlc-management" },
    ]
  },
  "sandbox-mode": {
    id: "sandbox-mode",
    messages: [
      {
        content: "In Sandbox mode, you can ask me anything about Marklewis's portfolio, skills, or projects. What would you like to know?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    inputRequired: true,
    onInput: () => "sandbox-response"
  },
  "sandbox-response": {
    id: "sandbox-response",
    messages: [
      {
        content: "Thanks for your question! Marklewis has expertise in React, TypeScript, Tailwind CSS, and UI/UX design. You can see examples of his work in the projects section of this portfolio. For more specific details, feel free to reach out directly via the contact form.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What else would you like to know about his work or skills?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Ask About Projects", nextId: "ask-projects" },
      { text: "Ask About Skills", nextId: "ask-skills" },
      { text: "Return to Menu", nextId: "profile-created" },
    ]
  },
  "ask-projects": {
    id: "ask-projects",
    messages: [
      {
        content: "Marklewis has worked on various projects including responsive web applications, UI/UX redesigns, and interactive dashboards. His portfolio showcases his ability to combine aesthetic design with functional implementation.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "His most recent project involved creating an e-commerce platform with React, implementing state management with Redux, and integrating payment processing APIs.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Return to Menu", nextId: "profile-created" },
      { text: "Ask Another Question", nextId: "sandbox-mode" },
    ]
  },
  "ask-skills": {
    id: "ask-skills",
    messages: [
      {
        content: "Marklewis's technical skills include React.js, TypeScript, CSS/SCSS, Tailwind CSS, and various UI component libraries. He's proficient in version control with Git and familiar with CI/CD pipelines.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "In addition to technical skills, he possesses strong communication abilities, creative problem-solving, and an eye for design that helps him create intuitive user experiences.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Return to Menu", nextId: "profile-created" },
      { text: "Ask Another Question", nextId: "sandbox-mode" },
    ]
  },
  "action-mode": {
    id: "action-mode",
    messages: [
      {
        content: "In Action mode, you can directly navigate to different sections of Marklewis's portfolio. Where would you like to go?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Projects", nextId: "goto-projects" },
      { text: "Skills", nextId: "goto-skills" },
      { text: "Blog", nextId: "goto-blog" },
      { text: "Contact", nextId: "goto-contact" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ]
  },
  "goto-projects": {
    id: "goto-projects",
    messages: [
      {
        content: "Taking you to the projects section...",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Return to Menu", nextId: "profile-created" },
    ]
  },
  "goto-skills": {
    id: "goto-skills",
    messages: [
      {
        content: "Taking you to the skills section...",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Return to Menu", nextId: "profile-created" },
    ]
  },
  "goto-blog": {
    id: "goto-blog",
    messages: [
      {
        content: "Taking you to the blog section...",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Return to Menu", nextId: "profile-created" },
    ]
  },
  "goto-contact": {
    id: "goto-contact",
    messages: [
      {
        content: "Taking you to the contact section...",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Return to Menu", nextId: "profile-created" },
    ]
  },
  "pricing-mode": {
    id: "pricing-mode",
    messages: [
      {
        content: "You're interested in website pricing? Great! Marklewis offers various website solutions at competitive rates in Kenyan Shillings (KES).",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "What type of website are you looking for?",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Personal Portfolio", nextId: "price-portfolio" },
      { text: "Business Website", nextId: "price-business" },
      { text: "E-commerce Store", nextId: "price-ecommerce" },
      { text: "Custom Web Application", nextId: "price-webapp" },
      { text: "Go Back ↩", nextId: "profile-created" },
    ]
  },
  "price-portfolio": {
    id: "price-portfolio",
    messages: [
      {
        content: "For a professional personal portfolio website:",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "• Basic Portfolio: KES 20,000 - 35,000\n• Advanced Portfolio (with blog): KES 40,000 - 60,000\n• Premium Portfolio (with advanced features): KES 65,000 - 90,000",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "All portfolio packages include responsive design, SEO optimization, and 3 months of free maintenance.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "View Other Pricing", nextId: "pricing-mode" },
      { text: "Contact About This", nextId: "contact-pricing" },
      { text: "Main Menu", nextId: "profile-created" },
    ]
  },
  "price-business": {
    id: "price-business",
    messages: [
      {
        content: "For business websites:",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "• Starter Business Site: KES 45,000 - 70,000\n• Professional Business Site: KES 75,000 - 120,000\n• Enterprise Business Solution: KES 130,000 - 200,000+",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Business websites include multiple pages, contact forms, Google Maps integration, analytics, and responsive design optimized for all devices.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "View Other Pricing", nextId: "pricing-mode" },
      { text: "Contact About This", nextId: "contact-pricing" },
      { text: "Main Menu", nextId: "profile-created" },
    ]
  },
  "price-ecommerce": {
    id: "price-ecommerce",
    messages: [
      {
        content: "For e-commerce websites:",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "• Basic Online Store (up to 50 products): KES 80,000 - 120,000\n• Standard Online Store (up to 500 products): KES 130,000 - 180,000\n• Advanced E-commerce Platform: KES 200,000 - 350,000+",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "E-commerce sites include product management, shopping cart, secure payment gateways (including M-Pesa integration), inventory management, and order tracking.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "View Other Pricing", nextId: "pricing-mode" },
      { text: "Contact About This", nextId: "contact-pricing" },
      { text: "Main Menu", nextId: "profile-created" },
    ]
  },
  "price-webapp": {
    id: "price-webapp",
    messages: [
      {
        content: "For custom web applications:",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "• Basic Web App: KES 150,000 - 250,000\n• Advanced Web Application: KES 300,000 - 500,000\n• Enterprise Solutions: KES 600,000+",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Custom web applications are priced based on complexity, features required, and timeline. All include thorough requirements analysis, custom development, testing, and deployment.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "View Other Pricing", nextId: "pricing-mode" },
      { text: "Contact About This", nextId: "contact-pricing" },
      { text: "Main Menu", nextId: "profile-created" },
    ]
  },
  "contact-pricing": {
    id: "contact-pricing",
    messages: [
      {
        content: "Interested in discussing pricing further? Great choice!",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "Marklewis offers personalized quotes based on your specific requirements. Each project is unique and may require different features and timelines.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
      {
        content: "I can help you get in touch directly to discuss your project needs in detail.",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      },
    ],
    options: [
      { text: "Contact Now", nextId: "goto-contact" },
      { text: "Return to Pricing", nextId: "pricing-mode" },
      { text: "Main Menu", nextId: "profile-created" },
    ]
  },
  "end-conversation": {
    id: "end-conversation",
    messages: [
      {
        content: "Thank you for chatting! Feel free to reach out again if you have any questions about Marklewis's work, skills or pricing. Have a great day!",
        timestamp: new Date(),
        sender: "admin",
        status: "read",
      }
    ],
    options: [
      { text: "Start New Chat", nextId: "start" },
    ]
  }
};

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [currentStep, setCurrentStep] = useState("start");
  const [showOptions, setShowOptions] = useState(false);
  const [userName, setUserName] = useState("");
  const [showGif, setShowGif] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Initialize chat with the first step's messages when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialStep = CONVERSATION_STEPS[currentStep];
      if (initialStep.messages) {
        setMessages(initialStep.messages);
      }
      setShowOptions(!!initialStep.options && !initialStep.inputRequired);
      if (initialStep.gif) {
        setShowGif(initialStep.gif);
      }
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change or when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen, showOptions, showGif]);

  // Move to next step in conversation
  const goToNextStep = (nextStepId: string) => {
    const step = CONVERSATION_STEPS[nextStepId];
    if (!step) return;

    setCurrentStep(nextStepId);
    
    // Add user's option selection as a message
    const option = CONVERSATION_STEPS[currentStep]?.options?.find(opt => opt.nextId === nextStepId);
    if (option) {
      const userMessage: ChatMessageProps = {
        content: option.text,
        timestamp: new Date(),
        sender: "user",
        status: "delivered"
      };
      setMessages(prev => [...prev, userMessage]);
    }

    // Add the next step's messages
    if (step.messages && step.messages.length > 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, ...step.messages!]);
        setShowOptions(!!step.options && !step.inputRequired);
      }, 500);
    } else {
      setShowOptions(!!step.options && !step.inputRequired);
    }

    // Handle special navigation cases
    if (nextStepId === "goto-projects") {
      const projectsElement = document.getElementById("projects-section");
      if (projectsElement) {
        setTimeout(() => {
          projectsElement.scrollIntoView({ behavior: "smooth" });
          onClose(); // Close the chat after navigation
        }, 1000);
      }
    } else if (nextStepId === "goto-skills") {
      const skillsElement = document.getElementById("skills-section");
      if (skillsElement) {
        setTimeout(() => {
          skillsElement.scrollIntoView({ behavior: "smooth" });
          onClose(); // Close the chat after navigation
        }, 1000);
      }
    } else if (nextStepId === "goto-blog") {
      setTimeout(() => {
        window.location.href = "/blog";
      }, 1000);
    } else if (nextStepId === "goto-contact") {
      const contactElement = document.getElementById("contact-section");
      if (contactElement) {
        setTimeout(() => {
          contactElement.scrollIntoView({ behavior: "smooth" });
          onClose(); // Close the chat after navigation
        }, 1000);
      }
    }

    // Show GIF if present in the next step
    if (step.gif) {
      setShowGif(step.gif);
    } else {
      setShowGif(null);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!newMessage.trim() && !CONVERSATION_STEPS[currentStep].inputRequired) return;
    
    const userMessage: ChatMessageProps = {
      content: newMessage,
      timestamp: new Date(),
      sender: "user",
      status: "sending"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsSending(true);
    
    try {
      // Process user input based on current step
      const currentStepData = CONVERSATION_STEPS[currentStep];
      
      // Store name if needed
      if (currentStep === "start") {
        setUserName(newMessage);
        toast.success(`Welcome, ${newMessage}!`);
      }
      
      // Get next step based on user input
      let nextStepId = null;
      if (currentStepData.onInput) {
        nextStepId = currentStepData.onInput(newMessage);
      }
      
      // Update message status
      setMessages(prev =>
        prev.map(msg =>
          msg === userMessage ? { ...msg, status: "delivered" } : msg
        )
      );
      
      // Go to next step if determined
      if (nextStepId) {
        setTimeout(() => {
          goToNextStep(nextStepId!);
        }, 500);
      }
      
    } catch (error) {
      // Handle error
      setMessages(prev =>
        prev.map(msg =>
          msg === userMessage ? { ...msg, status: "error" } : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className={cn(
        "h-[70vh] sm:h-[600px] max-w-md mx-auto rounded-t-xl",
        isMobile ? "w-full" : "w-[400px] fixed bottom-0 left-4 sm:left-6"
      )}>
        <div className="flex flex-col h-full">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img src="/myPic.jpg" alt="Marklewis Mutugi" className="h-full w-full object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
              </div>
              <div>
                <h3 className="font-medium">Marklogic</h3>
                <p className="text-xs text-muted-foreground">Marklewis's personal assistant</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            
            {/* GIF display */}
            {showGif && (
              <div className="flex justify-center my-4 animate-fade-in">
                <img 
                  src={showGif} 
                  alt="Chat Animation" 
                  className="rounded-lg max-w-full max-h-48 object-contain" 
                />
              </div>
            )}
            
            {/* Chat options */}
            {showOptions && CONVERSATION_STEPS[currentStep].options && (
              <div className="flex flex-col gap-2 mt-4 animate-fade-in">
                {CONVERSATION_STEPS[currentStep].options!.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => goToNextStep(option.nextId)}
                    variant="outline"
                    className="justify-start hover:bg-primary/10 transition-all"
                  >
                    {option.text} 
                    {!option.text.includes("Go Back") && <ArrowRight className="ml-auto" />}
                  </Button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input - only show if current step requires input */}
          {CONVERSATION_STEPS[currentStep].inputRequired && (
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isSending}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isSending || !newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatWidget;
