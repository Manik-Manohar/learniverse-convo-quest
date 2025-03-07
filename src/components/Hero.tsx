
import React from 'react';
import { motion } from 'framer-motion';
import { BookIcon, BrainIcon, HeartIcon } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Learn <span className="text-primary">Mathematics</span> and <span className="text-accent">DSA</span> through conversation
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              An interactive platform where AI teachers explain complex concepts step-by-step, 
              challenge your understanding, and guide your learning journey.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                Explore Topics
              </button>
              <button className="px-6 py-3 bg-white/90 dark:bg-gray-800/90 text-foreground rounded-full hover:bg-white dark:hover:bg-gray-700 border border-border shadow-lg transition-all duration-300">
                How It Works
              </button>
            </div>
            
            <div className="flex items-center gap-8 mt-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BookIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">20+ Topics</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <BrainIcon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-medium">AI Teachers</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                  <HeartIcon className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm font-medium">Step-by-Step</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl -z-10 transform rotate-3"></div>
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <BrainIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Teacher AI</h3>
                    <p className="text-xs text-muted-foreground">Explaining Concepts</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm">Let's start with linear algebra. How comfortable are you with matrices?</p>
                  </div>
                  
                  <div className="p-3 bg-secondary rounded-lg ml-8">
                    <p className="text-sm">I understand the basics, but I struggle with eigenvalues and eigenvectors.</p>
                  </div>
                  
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm">Perfect! Let's focus on that. An eigenvector of a matrix A is a non-zero vector v such that when A multiplies v, the result is a scalar multiple of v itself.</p>
                  </div>
                  
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-2">
                        <HeartIcon className="w-3 h-3 text-accent" />
                      </div>
                      <p className="text-xs font-medium text-accent">Peer AI</p>
                    </div>
                    <p className="text-sm">Think of it like finding special directions where the matrix only stretches or compresses, without changing direction!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
