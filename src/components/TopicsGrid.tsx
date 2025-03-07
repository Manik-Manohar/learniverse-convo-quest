
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopicCard from './TopicCard';
import { 
  BrainCircuitIcon, 
  PiIcon, 
  NetworkIcon, 
  SigmaIcon, 
  CubeIcon, 
  BarChart3Icon,
  TreePineIcon,
  HashIcon
} from 'lucide-react';

const TopicsGrid = () => {
  const navigate = useNavigate();

  const mathTopics = [
    {
      icon: <SigmaIcon className="w-6 h-6 text-primary" />,
      title: "Linear Algebra",
      description: "Master matrices, vectors, and linear transformations through interactive examples.",
      questions: 5,
      category: "Mathematics",
      path: "/learn/linear-algebra"
    },
    {
      icon: <PiIcon className="w-6 h-6 text-primary" />,
      title: "Calculus",
      description: "Explore derivatives, integrals, and limits with step-by-step explanations.",
      questions: 5,
      category: "Mathematics",
      path: "/learn/calculus"
    },
    {
      icon: <NetworkIcon className="w-6 h-6 text-primary" />,
      title: "Graph Theory",
      description: "Discover the principles of networks, paths, and connectivity through guided problems.",
      questions: 5,
      category: "Mathematics",
      path: "/learn/graph-theory"
    },
    {
      icon: <BarChart3Icon className="w-6 h-6 text-primary" />,
      title: "Statistics",
      description: "Learn probability, distributions, and hypothesis testing with real-world examples.",
      questions: 5,
      category: "Mathematics",
      path: "/learn/statistics"
    }
  ];

  const dsaTopics = [
    {
      icon: <TreePineIcon className="w-6 h-6 text-accent" />,
      title: "Binary Trees",
      description: "Understand tree traversals, balancing, and optimization techniques with practice problems.",
      questions: 5,
      category: "DSA",
      path: "/learn/binary-trees"
    },
    {
      icon: <HashIcon className="w-6 h-6 text-accent" />,
      title: "Hash Tables",
      description: "Master hashing algorithms, collision resolution, and efficient lookup operations.",
      questions: 5,
      category: "DSA",
      path: "/learn/hash-tables"
    },
    {
      icon: <CubeIcon className="w-6 h-6 text-accent" />,
      title: "Dynamic Programming",
      description: "Solve complex optimization problems using memoization and tabulation methods.",
      questions: 5,
      category: "DSA",
      path: "/learn/dynamic-programming"
    },
    {
      icon: <BrainCircuitIcon className="w-6 h-6 text-accent" />,
      title: "Graph Algorithms",
      description: "Explore BFS, DFS, shortest paths, and minimum spanning tree algorithms.",
      questions: 5,
      category: "DSA",
      path: "/learn/graph-algorithms"
    }
  ];

  const handleTopicClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <SigmaIcon className="w-6 h-6 text-primary" />
          <span>Mathematics</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mathTopics.map((topic, index) => (
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

      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <BrainCircuitIcon className="w-6 h-6 text-accent" />
          <span>Data Structures & Algorithms</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dsaTopics.map((topic, index) => (
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
    </div>
  );
};

export default TopicsGrid;
