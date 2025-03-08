
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, RefreshCwIcon, LightbulbIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import ConversationBubble, { MessageType } from './ConversationBubble';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  isAnswer?: boolean;
  isCorrect?: boolean;
}

interface ConversationAreaProps {
  topicTitle: string;
  initialMessages?: Message[];
  correctAnswers?: string[];
}

const ConversationArea: React.FC<ConversationAreaProps> = ({ 
  topicTitle,
  initialMessages = [],
  correctAnswers = [
    "x = 5",
    "O(n log n)",
    "The derivative of x^2 is 2x",
    "A balanced binary tree",
    "Dynamic programming"
  ]
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkAnswer = (userAnswer: string): boolean => {
    if (currentQuestionIndex >= correctAnswers.length) {
      return false;
    }
    
    // Enhanced answer checking with multiple possible correct variations
    const correctAnswerVariations = getCorrectAnswerVariations(currentQuestionIndex);
    
    return correctAnswerVariations.some(variant => 
      userAnswer.toLowerCase().includes(variant.toLowerCase())
    );
  };
  
  const getCorrectAnswerVariations = (index: number): string[] => {
    // For each correct answer, define multiple acceptable variations
    const answerVariations = [
      ["x = 5", "x=5", "x equals 5", "5", "the value of x is 5"],
      ["O(n log n)", "O(nlogn)", "n log n", "nlogn", "order n log n"],
      ["2x", "the derivative of x^2 is 2x", "derivative is 2x", "d/dx(x^2) = 2x"],
      ["balanced binary tree", "avl tree", "red-black tree", "height-balanced binary tree"],
      ["dynamic programming", "dp", "memoization", "bottom-up approach"]
    ];
    
    return index < answerVariations.length ? answerVariations[index] : [correctAnswers[index]];
  };

  const analyzeAnswer = (userAnswer: string): string => {
    if (currentQuestionIndex >= correctAnswers.length) {
      return "I can't analyze this answer as we've completed all the prepared questions.";
    }
    
    const isCorrect = checkAnswer(userAnswer);
    
    if (isCorrect) {
      const responses = [
        "That's correct! Your understanding of this concept is solid.",
        "Excellent work! You've got the right answer.",
        "Perfect! You've mastered this concept.",
        "That's right! Your approach is spot on.",
        "Correct! Great job working through this problem."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      const hints = [
        "Not quite. Try focusing on the key properties of the problem.",
        "That's not correct. Consider reviewing the definition of the concept.",
        "Your answer isn't right. Think about the approach we discussed earlier.",
        "That's not the answer we're looking for. Try a different approach.",
        "Not correct. Remember the fundamental principle we're applying here."
      ];
      return hints[Math.floor(Math.random() * hints.length)];
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const isAnswer = true;
    const isCorrect = checkAnswer(inputValue);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      isAnswer,
      isCorrect
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Show feedback toast
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! Your answer is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or ask for a hint.",
        variant: "destructive",
      });
    }

    // Analyze the answer and provide detailed feedback
    const analysisResult = analyzeAnswer(inputValue);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let teacherResponse: Message;
      
      if (isCorrect) {
        teacherResponse = {
          id: (Date.now() + 1).toString(),
          type: 'teacher',
          content: `${analysisResult} Let me explain why "${inputValue}" is the right answer. ${getDetailedExplanation(currentQuestionIndex)}`
        };
        
        // Move to next question for the next interaction
        setCurrentQuestionIndex(prev => Math.min(prev + 1, correctAnswers.length - 1));
      } else {
        teacherResponse = {
          id: (Date.now() + 1).toString(),
          type: 'teacher',
          content: `${analysisResult} Your answer "${inputValue}" is not quite right. ${getIncorrectAnalysis(currentQuestionIndex, inputValue)}`
        };
      }
      
      setMessages(prev => [...prev, teacherResponse]);
      
      // Simulate peer AI adding additional perspective
      setTimeout(() => {
        const peerResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'peer',
          content: isCorrect 
            ? `Excellent work! I found this topic challenging at first too. ${getPeerExplanation(currentQuestionIndex, true)}`
            : `Don't worry if you didn't get it right away. ${getPeerExplanation(currentQuestionIndex, false)}`
        };
        
        setMessages(prev => [...prev, peerResponse]);
        setIsProcessing(false);
      }, 1500);
    }, 1000);
  };

  const getDetailedExplanation = (index: number): string => {
    const explanations = [
      "When solving the equation 2x + 10 = 20, we first subtract 10 from both sides to get 2x = 10, then divide both sides by 2 to get x = 5.",
      "Merge sort and quicksort both have an average time complexity of O(n log n), which is optimal for comparison-based sorting algorithms.",
      "To find the derivative of x², we use the power rule which states that the derivative of x^n is n*x^(n-1). So the derivative of x^2 is 2x^(2-1) = 2x.",
      "A balanced binary tree is a binary tree structure in which the left and right subtrees of every node differ in height by no more than 1. This balance property ensures that operations like insertion, deletion, and search remain efficient with O(log n) time complexity.",
      "Dynamic programming is an algorithmic technique for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations. It's particularly useful for optimization problems with overlapping subproblems and optimal substructure."
    ];
    
    return index < explanations.length ? explanations[index] : "Let me explain why this is correct...";
  };
  
  const getIncorrectAnalysis = (index: number, userAnswer: string): string => {
    const analyses = [
      "Looking at the equation 2x + 10 = 20, we need to isolate x. First subtract 10 from both sides, then divide by 2.",
      "When analyzing sorting algorithms, we need to consider their time complexity. The most efficient comparison-based sorting algorithms achieve O(n log n) time complexity.",
      "Remember that the derivative of x^n is n*x^(n-1). So for x^2, we need to apply this rule.",
      "Think about what makes a binary tree 'balanced' - it's about the difference in height between subtrees.",
      "Consider what technique allows us to solve complex problems by breaking them into overlapping subproblems and storing results to avoid redundant calculations."
    ];
    
    return index < analyses.length ? analyses[index] : "Let me guide you towards the correct answer...";
  };
  
  const getPeerExplanation = (index: number, isCorrect: boolean): string => {
    if (isCorrect) {
      const explanations = [
        "I remember getting confused with solving equations at first, but once you practice the steps (subtract, then divide) it becomes second nature!",
        "The O(n log n) complexity makes sense when you visualize how merge sort divides the array in half each time, which is where the log n comes from.",
        "The power rule for derivatives is super useful. I like to think of it as 'bring the power down, then reduce the power by one' - it makes it easy to remember!",
        "Balanced trees clicked for me when I visualized them. They're like real trees that don't tip over because the weight is distributed evenly.",
        "Dynamic programming was tough for me until I started thinking of it as 'remember what you've already calculated'. The memoization technique is a game-changer!"
      ];
      
      return index < explanations.length ? explanations[index] : "I found this concept challenging at first too, but with practice it becomes clearer!";
    } else {
      const hints = [
        "Try working through the equation step by step. First get all the x terms on one side, then the constants on the other.",
        "Think about dividing and conquering the array. What's the most efficient way to sort when we can compare elements?",
        "The power rule is your friend here! For x^n, the derivative is n*x^(n-1).",
        "Picture a tree that doesn't tip over. What property would ensure that?",
        "Think about breaking down the problem and reusing results. What approach lets us avoid recalculating the same subproblems?"
      ];
      
      return index < hints.length ? hints[index] : "Here's another way to think about it that might help...";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    toast({
      title: "Conversation Reset",
      description: "Starting a new learning session.",
    });
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden glass-card shadow-lg border border-white/10">
      <div className="p-4 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <LightbulbIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{topicTitle}</h3>
            <p className="text-xs text-muted-foreground">Interactive learning session</p>
          </div>
        </div>
        
        <button 
          className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
          title="Reset conversation"
          onClick={resetConversation}
        >
          <RefreshCwIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 bg-gray-50/50 dark:bg-gray-900/20">
        {messages.map((message, index) => (
          <ConversationBubble
            key={message.id}
            type={message.type}
            content={message.content}
            delay={0.1 * index}
            isAnswer={message.isAnswer}
            isCorrect={message.isCorrect}
          />
        ))}
        {isProcessing && (
          <div className="flex space-x-2 p-4 max-w-[50%]">
            <div className="w-3 h-3 rounded-full bg-primary/50 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-grow p-3 rounded-xl glass-input resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Type your answer or ask a question..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
          />
          <motion.button
            className="p-3 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={inputValue.trim() === '' || isProcessing}
          >
            <SendIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ConversationArea;
