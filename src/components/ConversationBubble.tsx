
import React from 'react';
import { motion } from 'framer-motion';
import { BrainIcon, HeartIcon, UserIcon } from 'lucide-react';

export type MessageType = 'teacher' | 'peer' | 'user';

interface ConversationBubbleProps {
  type: MessageType;
  content: string;
  delay?: number;
}

const ConversationBubble: React.FC<ConversationBubbleProps> = ({ 
  type, 
  content,
  delay = 0
}) => {
  const bubbleVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: delay
      }
    }
  };

  const getBubbleStyles = () => {
    switch (type) {
      case 'teacher':
        return "bg-primary/5 border border-primary/10";
      case 'peer':
        return "bg-accent/5 border border-accent/10";
      case 'user':
        return "bg-secondary dark:bg-secondary/70 ml-auto";
      default:
        return "bg-muted";
    }
  };

  const getIconContent = () => {
    switch (type) {
      case 'teacher':
        return (
          <div className="flex items-center mb-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <BrainIcon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs font-medium text-primary">Teacher AI</p>
          </div>
        );
      case 'peer':
        return (
          <div className="flex items-center mb-2">
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center mr-2">
              <HeartIcon className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs font-medium text-accent">Peer AI</p>
          </div>
        );
      case 'user':
        return (
          <div className="flex items-center justify-end mb-2">
            <p className="text-xs font-medium text-secondary-foreground mr-2">You</p>
            <div className="w-7 h-7 rounded-full bg-secondary/30 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-secondary-foreground" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const maxWidth = type === 'user' ? 'max-w-[80%] sm:max-w-[70%] md:max-w-[60%]' : 'max-w-[85%] sm:max-w-[75%] md:max-w-[65%]';

  return (
    <motion.div
      className={`${maxWidth} rounded-xl p-4 mb-4 ${getBubbleStyles()}`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      {getIconContent()}
      <p className="text-sm whitespace-pre-line">{content}</p>
    </motion.div>
  );
};

export default ConversationBubble;
