
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  questions: number;
  category: string;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  icon,
  title,
  description,
  questions,
  category,
  onClick
}) => {
  return (
    <motion.div
      className="glass-card rounded-2xl overflow-hidden hover-scale"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground">
            {questions} questions
          </span>
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground smooth-transition"
            aria-label="Start learning"
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
