
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, CircleIcon } from 'lucide-react';

interface ProgressTrackerProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentQuestion,
  totalQuestions
}) => {
  return (
    <div className="w-full glass-card rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Your Progress</h3>
        <span className="text-xs text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      
      <div className="relative pt-4">
        {/* Progress bar background */}
        <div className="w-full h-1 bg-secondary rounded-full"></div>
        
        {/* Progress bar fill */}
        <motion.div 
          className="absolute top-4 left-0 h-1 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        ></motion.div>
        
        {/* Progress points */}
        <div className="flex justify-between mt-1">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div 
              key={i} 
              className="relative flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                {i < currentQuestion ? (
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                ) : i === currentQuestion ? (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1] 
                    }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2
                    }}
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  </motion.div>
                ) : (
                  <CircleIcon className="w-6 h-6 text-muted-foreground/40" />
                )}
              </motion.div>
              
              <span className="text-xs mt-1 font-medium">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
