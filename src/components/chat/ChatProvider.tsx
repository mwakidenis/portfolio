
import { createContext, useContext, useState, useEffect } from "react";
import ChatButton from "./ChatButton";
import ChatWidget from "./ChatWidget";

interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(prev => !prev);

  // Clear unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Simulate incoming message after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
      <ChatButton 
        onClick={toggleChat} 
        isOpen={isOpen}
        unreadCount={unreadCount}
      />
      <ChatWidget 
        isOpen={isOpen}
        onClose={closeChat}
      />
    </ChatContext.Provider>
  );
};
