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

// Conversation steps (trimmed for brevity, include your full CONVERSATION_STEPS here)
const CONVERSATION_STEPS: Record<string, any> = { /* ...your full steps... */ };

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

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const step = CONVERSATION_STEPS[currentStep];
      if (step.messages) setMessages(step.messages);
      setShowOptions(!!step.options && !step.inputRequired);
      setShowGif(step.gif || null);
    }
  }, [isOpen, messages.length, currentStep]);

  // Scroll to bottom when messages or GIFs change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [messages, showGif, isOpen]);

  // Move to next step
  const goToNextStep = (nextStepId: string) => {
    const step = CONVERSATION_STEPS[nextStepId];
    if (!step) return;

    setCurrentStep(nextStepId);

    // Add user's choice message
    const option = CONVERSATION_STEPS[currentStep]?.options?.find(
      (opt: any) => opt.nextId === nextStepId
    );
    if (option) {
      setMessages(prev => [
        ...prev,
        { content: option.text, timestamp: new Date(), sender: "user", status: "delivered" }
      ]);
    }

    // Add bot messages
    if (step.messages?.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, ...step.messages]);
        setShowOptions(!!step.options && !step.inputRequired);
      }, 500);
    } else {
      setShowOptions(!!step.options && !step.inputRequired);
    }

    // Show GIF if exists
    setShowGif(step.gif || null);

    // Handle navigation for portfolio sections
    if (nextStepId === "goto-projects") {
      const el = document.getElementById("projects-section");
      if (el) setTimeout(() => { el.scrollIntoView({ behavior: "smooth" }); onClose(); }, 1000);
    } else if (nextStepId === "goto-skills") {
      const el = document.getElementById("skills-section");
      if (el) setTimeout(() => { el.scrollIntoView({ behavior: "smooth" }); onClose(); }, 1000);
    } else if (nextStepId === "goto-blog") {
      setTimeout(() => { window.location.href = "/blog"; }, 1000);
    } else if (nextStepId === "goto-contact") {
      const el = document.getElementById("contact-section");
      if (el) setTimeout(() => { el.scrollIntoView({ behavior: "smooth" }); onClose(); }, 1000);
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
      const currentStepData = CONVERSATION_STEPS[currentStep];

      // Store name if on start step
      if (currentStep === "start") {
        setUserName(newMessage);
        toast.success(`Welcome, ${newMessage}!`);
      }

      // Determine next step
      const nextStepId = currentStepData.onInput?.(newMessage);

      // Update message status
      setMessages(prev =>
        prev.map(msg => (msg === userMessage ? { ...msg, status: "delivered" } : msg))
      );

      // Move to next step if applicable
      if (nextStepId) setTimeout(() => goToNextStep(nextStepId), 500);
    } catch {
      setMessages(prev =>
        prev.map(msg => (msg === userMessage ? { ...msg, status: "error" } : msg))
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent
        className={cn(
          "h-[70vh] sm:h-[600px] max-w-md mx-auto rounded-t-xl",
          isMobile ? "w-full" : "w-[400px] fixed bottom-0 left-4 sm:left-6"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, idx) => <ChatMessage key={idx} {...msg} />)}

            {showGif && (
              <div className="flex justify-center my-4 animate-fade-in">
                <img src={showGif} alt="Chat Animation" className="rounded-lg max-w-full max-h-48 object-contain" />
              </div>
            )}

            {showOptions && CONVERSATION_STEPS[currentStep].options && (
              <div className="flex flex-col gap-2 mt-4 animate-fade-in">
                {CONVERSATION_STEPS[currentStep].options.map((opt: any, idx: number) => (
                  <Button
                    key={idx}
                    onClick={() => goToNextStep(opt.nextId)}
                    variant="outline"
                    className="justify-start hover:bg-primary/10 transition-all"
                  >
                    {opt.text} {!opt.text.includes("Go Back") && <ArrowRight className="ml-auto" />}
                  </Button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
                <Button type="submit" size="icon" disabled={isSending || !newMessage.trim()}>
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
