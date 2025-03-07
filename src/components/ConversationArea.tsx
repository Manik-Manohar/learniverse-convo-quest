
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, RefreshCwIcon, LightbulbIcon } from 'lucide-react';
import ConversationBubble, { MessageType } from './ConversationBubble';

interface Message {
  id: string;
  type: MessageType;
  content: string;
}

interface ConversationAreaProps {
  topicTitle: string;
  initialMessages?: Message[];
}

const ConversationArea: React.FC<ConversationAreaProps> = ({ 
  topicTitle,
  initialMessages = [] 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const teacherResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'teacher',
        content: `I understand your question about ${inputValue}. Let me explain this concept in detail...`
      };
      
      setMessages(prev => [...prev, teacherResponse]);
      
      // Simulate peer AI adding additional perspective
      setTimeout(() => {
        const peerResponse: Message = {
          id: (Date.now() + 2).toString(),
          type: 'peer',
          content: "That's a great explanation! I'd also add that you can think of this concept like..."
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
            placeholder="Ask a question or respond..."
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
