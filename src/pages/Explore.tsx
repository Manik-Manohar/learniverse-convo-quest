
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicsGrid from '../components/TopicsGrid';
import { SearchIcon, FilterIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Explore Learning Topics</h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse our curated collection of mathematics and computer science topics, each with interactive problems and expert explanations.
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-12 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-xl glass-card transition-all ${selectedCategory === null ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-xl glass-card transition-all ${selectedCategory === 'Mathematics' ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setSelectedCategory('Mathematics')}
              >
                Mathematics
              </button>
              <button
                className={`px-4 py-2 rounded-xl glass-card transition-all ${selectedCategory === 'DSA' ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setSelectedCategory('DSA')}
              >
                DSA
              </button>
            </div>
          </motion.div>
          
          <TopicsGrid searchTerm={searchTerm} categoryFilter={selectedCategory} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
