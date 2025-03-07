
import React from 'react';
import { LightbulbIcon, BookOpenIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center z-10 glass-card">
      <div className="flex items-center space-x-2">
        <div className="relative w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center animate-float">
          <LightbulbIcon className="w-6 h-6 text-primary" />
          <div className="absolute inset-0 bg-primary/10 rounded-lg blur-sm -z-10"></div>
        </div>
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          LearnIverse
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smooth-transition">
          Home
        </a>
        <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smooth-transition">
          Topics
        </a>
        <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smooth-transition">
          About
        </a>
      </nav>
      
      <div className="flex items-center space-x-4">
        <button className="rounded-full p-2 text-foreground/70 hover:text-primary hover:bg-primary/10 smooth-transition">
          <BookOpenIcon className="w-5 h-5" />
        </button>
        <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 smooth-transition">
          <span className="text-sm font-medium">Get Started</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
