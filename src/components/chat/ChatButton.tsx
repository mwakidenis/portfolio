
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

const ChatButton = ({ onClick, isOpen, unreadCount = 0 }: ChatButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            size="lg"
            className={cn(
              "fixed left-4 sm:left-6 bottom-32 sm:bottom-36 z-40 h-12 w-12 rounded-full p-2 shadow-lg",
              isOpen ? "bg-muted hover:bg-muted/90" : "bg-primary hover:bg-primary/90"
            )}
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="relative">
                <MessageSquare className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isOpen ? "Close chat" : "Chat with me"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatButton;
