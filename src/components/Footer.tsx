
import React from 'react';
import { HeartIcon, GithubIcon, TwitterIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <HeartIcon className="w-4 h-4 text-red-500 mx-1" /> for learners everywhere
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a 
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Help
            </a>
            <div className="flex space-x-3">
              <a 
                href="#"
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="#"
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LearnIverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
