
import React from 'react';
import { ExternalLinkIcon, BookOpenIcon } from 'lucide-react';

interface ReferenceLink {
  title: string;
  url: string;
  source: string;
}

interface ReferenceLinksProps {
  links: ReferenceLink[];
}

const ReferenceLinks: React.FC<ReferenceLinksProps> = ({ links }) => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm">
      <div className="flex items-center mb-4">
        <BookOpenIcon className="w-5 h-5 text-primary mr-2" />
        <h3 className="text-sm font-medium">Reference Materials</h3>
      </div>
      
      {links.length > 0 ? (
        <div className="space-y-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className="flex-grow">
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{link.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{link.source}</p>
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-2">
          No reference materials available yet. References will appear as you progress.
        </p>
      )}
    </div>
  );
};

export default ReferenceLinks;
