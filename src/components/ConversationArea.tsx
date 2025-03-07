
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
  // Sample correct answers for demo purposes
  correctAnswers?: string[];
}

const ConversationArea: React.FC<ConversationAreaProps> = ({ 
  topicTitle,
  initialMessages = [],
  // These are sample answers for demonstration
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
    
    // Simple string matching (case insensitive)
    // In a real app, you'd have more sophisticated answer validation
    const isCorrect = userAnswer.toLowerCase().includes(correctAnswers[currentQuestionIndex].toLowerCase());
    return isCorrect;
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

    // Simulate AI response after a delay
    setTimeout(() => {
      let teacherResponse: Message;
      
      if (isCorrect) {
        teacherResponse = {
          id: (Date.now() + 1).toString(),
          type: 'teacher',
          content: `That's correct! ${inputValue} is the right answer. Let me explain why...`
        };
        
        // Move to next question for the next interaction
        setCurrentQuestionIndex(prev => Math.min(prev + 1, correctAnswers.length - 1));
      } else {
        teacherResponse = {
          id: (Date.now() + 1).toString(),
          type: 'teacher',
          content: `Your answer "${inputValue}" is not quite right. Let me provide some guidance...`
        };
      }
      
      setMessages(prev => [...prev, teacherResponse]);
      
      // Simulate peer AI adding additional perspective
      setTimeout(() => {
        const peerResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'peer',
          content: isCorrect 
            ? "Excellent work! I'd also like to add that this concept connects to..."
            : "Don't worry if you didn't get it right away. Here's another way to think about it..."
        };
        
        setMessages(prev => [...prev, peerResponse]);
        setIsProcessing(false);
      }, 1500);
    }, 1000);
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
