
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopicCard from './TopicCard';
import { 
  BrainCircuitIcon, 
  SigmaIcon
} from 'lucide-react';
import { useTopicsData } from '../hooks/useTopicsData';

interface TopicsGridProps {
  searchTerm?: string;
  categoryFilter?: string | null;
}

const TopicsGrid: React.FC<TopicsGridProps> = ({ 
  searchTerm = '', 
  categoryFilter = null 
}) => {
  const navigate = useNavigate();
  const { mathTopics, dsaTopics, isLoading } = useTopicsData();
  const [filteredMathTopics, setFilteredMathTopics] = useState(mathTopics);
  const [filteredDsaTopics, setFilteredDsaTopics] = useState(dsaTopics);

  useEffect(() => {
    // Filter topics based on search term and category
    const filterTopics = (topics: any[]) => {
      return topics.filter(topic => 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredMathTopics(filterTopics(mathTopics));
    setFilteredDsaTopics(filterTopics(dsaTopics));
  }, [searchTerm, mathTopics, dsaTopics]);

  const handleTopicClick = (path: string) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="loader"></div>
      </div>
    );
  }

  const showMathSection = categoryFilter === null || categoryFilter === 'Mathematics';
  const showDsaSection = categoryFilter === null || categoryFilter === 'DSA';

  return (
    <div className="space-y-10">
      {showMathSection && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <SigmaIcon className="w-6 h-6 text-primary" />
            <span>Mathematics</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMathTopics.map((topic, index) => (
              <TopicCard
                key={`math-${index}`}
                icon={topic.icon}
                title={topic.title}
                description={topic.description}
                questions={topic.questions}
                category={topic.category}
                onClick={() => handleTopicClick(topic.path)}
              />
            ))}
          </div>
        </div>
      )}

      {showDsaSection && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <BrainCircuitIcon className="w-6 h-6 text-accent" />
            <span>Data Structures & Algorithms</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDsaTopics.map((topic, index) => (
              <TopicCard
                key={`dsa-${index}`}
                icon={topic.icon}
                title={topic.title}
                description={topic.description}
                questions={topic.questions}
                category={topic.category}
                onClick={() => handleTopicClick(topic.path)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicsGrid;
