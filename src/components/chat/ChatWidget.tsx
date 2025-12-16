import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

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

// -- your existing CONVERSATION_STEPS --

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentStep, setCurrentStep] = useState("start");
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const step = CONVERSATION_STEPS[currentStep];
      if (step.messages) setMessages(step.messages);
      setShowOptions(!!step.options && !step.inputRequired);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const goToNextStep = (nextId: string) => {
    const step = CONVERSATION_STEPS[nextId];
    if (!step) return;

    setCurrentStep(nextId);
    if (step.messages) {
      setMessages((prev) => [...prev, ...step.messages]);
    }
    setShowOptions(!!step.options && !step.inputRequired);
  };

  const handleInputSubmit = () => {
    const step = CONVERSATION_STEPS[currentStep];
    if (!step.inputRequired || !step.onInput) return;

    const nextId = step.onInput(newMessage);
    if (nextId) {
      setMessages((prev) => [
        ...prev,
        { content: newMessage, timestamp: new Date(), sender: "user" },
      ]);
      setNewMessage("");
      goToNextStep(nextId);
    } else {
      toast.error("Please enter a valid input");
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent
        className={cn(
          "h-[70vh] sm:h-[600px] max-w-md mx-auto",
          isMobile ? "w-full" : "w-[400px]"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <ChatMessage key={i} {...m} />
            ))}

            {/* Input for text steps */}
            {CONVERSATION_STEPS[currentStep].inputRequired && (
              <div className="mt-2 flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your answer..."
                />
                <Button onClick={handleInputSubmit}>Send</Button>
              </div>
            )}

            {/* Options buttons */}
            {showOptions &&
              CONVERSATION_STEPS[currentStep].options?.map((o, i) => (
                <Button
                  key={i}
                  onClick={() => goToNextStep(o.nextId)}
                  variant="outline"
                  className="w-full mt-2 justify-between"
                >
                  {o.text} <ArrowRight />
                </Button>
              ))}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatWidget;
