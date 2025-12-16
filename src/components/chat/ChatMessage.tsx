
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export interface ChatMessageProps {
  content: string;
  timestamp: Date;
  sender: "user" | "admin";
  status?: "sending" | "sent" | "delivered" | "read" | "error";
}

const ChatMessage = ({ content, timestamp, sender, status = "sent" }: ChatMessageProps) => {
  const isUser = sender === "user";

  return (
    <div className={cn("flex w-full gap-2 mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/myPic.jpg" alt="Marklewis Mutugi" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("max-w-[80%] flex flex-col", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-3 py-2 rounded-lg",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <p className="text-sm">{content}</p>
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-muted-foreground">
            {format(timestamp, "h:mm a")}
          </span>
          {isUser && status === "error" && (
            <span className="text-xs text-destructive">Failed to send</span>
          )}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
