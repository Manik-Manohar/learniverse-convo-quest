
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircleIcon, ExternalLinkIcon } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  difficultyLevel: number;
  onGetHint: () => void;
  gfgLink?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  difficultyLevel,
  onGetHint,
  gfgLink
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-500/10 text-green-600";
      case 2:
        return "bg-green-500/10 text-green-600";
      case 3:
        return "bg-yellow-500/10 text-yellow-600";
      case 4:
        return "bg-orange-500/10 text-orange-600";
      case 5:
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-green-500/10 text-green-600";
    }
  };
  
  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Easy";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "Beginner";
    }
  };

  return (
    <motion.div
      className="w-full glass-card rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficultyLevel)}`}>
          {getDifficultyLabel(difficultyLevel)}
        </div>
        
        {gfgLink && (
          <a 
            href={gfgLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-primary hover:underline"
          >
            GeeksforGeeks <ExternalLinkIcon className="w-3 h-3 ml-1" />
          </a>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Question {difficultyLevel}</h3>
        <motion.div
          className={`text-sm text-foreground/90 ${isExpanded ? '' : 'line-clamp-3'}`}
        >
          {question}
        </motion.div>
        
        {question.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary mt-2 hover:underline"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={onGetHint}
          className="flex items-center px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <HelpCircleIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">Get a hint</span>
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
