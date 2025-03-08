
import { useState, useEffect } from 'react';
import { 
  BrainCircuitIcon, 
  PiIcon, 
  NetworkIcon, 
  SigmaIcon, 
  BoxIcon, 
  BarChart3Icon,
  TreePineIcon,
  HashIcon,
  LayoutListIcon,
  ListFilterIcon,
  WandIcon,
  ReplaceIcon,
  TimerIcon,
  RotateCcwIcon,
  LineChartIcon,
  ScissorsIcon,
  HeartIcon,
  BinaryIcon,
  Cpu,
  DatabaseIcon,
  ArrowUpRightIcon,
  GanttChartSquareIcon
} from 'lucide-react';
import React from 'react';

// Mock function to simulate web scraping 
// In a real app, this would be an API call to a backend service that does the scraping
const fetchScrapedData = async (url: string) => {
  console.log(`Simulating scraping for ${url}`);
  
  // In a production app, this would be replaced with actual API calls
  // to a backend service that does the web scraping
  if (url.includes('dsa-tutorial')) {
    return {
      success: true,
      data: {
        title: "Data Structures and Algorithms",
        content: "A data structure is a particular way of organizing data in a computer so that it can be used effectively. The idea is to reduce the space and time complexities of different tasks. An algorithm is a step-by-step procedure, which defines a set of instructions to be executed in a certain order to get the desired output...",
        subtopics: [
          "Arrays",
          "Linked Lists",
          "Stacks",
          "Queues",
          "Trees",
          "Graphs",
          "Heap",
          "Sorting Algorithms",
          "Searching Algorithms",
          "Dynamic Programming",
          "Greedy Algorithms",
          "Backtracking",
          "Divide and Conquer"
        ]
      }
    };
  } else if (url.includes('math-calculus')) {
    return {
      success: true,
      data: {
        title: "Mathematics - Calculus",
        content: "Calculus is the mathematical study of continuous change. It has two major branches: differential calculus (concerning rates of change and slopes of curves) and integral calculus (concerning accumulation of quantities and the areas under and between curves)...",
        subtopics: [
          "Limits and Continuity",
          "Differentiation",
          "Integration",
          "Series and Sequences",
          "Multivariable Calculus",
          "Vector Calculus",
          "Differential Equations"
        ]
      }
    };
  }
  
  return {
    success: false,
    error: "Failed to scrape data"
  };
};

// Define a type for the topic structure
interface Topic {
  icon: React.ReactNode;
  title: string;
  description: string;
  questions: number;
  category: string;
  path: string;
}

export const useTopicsData = () => {
  const [mathTopics, setMathTopics] = useState<Topic[]>([]);
  const [dsaTopics, setDsaTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // Simulate fetching scraped data
        const dsaData = await fetchScrapedData('https://www.geeksforgeeks.org/dsa-tutorial-learn-data-structures-and-algorithms/');
        const mathData = await fetchScrapedData('https://www.geeksforgeeks.org/math-calculus/');
        
        // Initialize base topics
        const mathTopicsData: Topic[] = [
          {
            icon: React.createElement(SigmaIcon, { className: "w-6 h-6 text-primary" }),
            title: "Linear Algebra",
            description: "Master matrices, vectors, and linear transformations through interactive examples.",
            questions: 5,
            category: "Mathematics",
            path: "/learn/linear-algebra"
          },
          {
            icon: React.createElement(PiIcon, { className: "w-6 h-6 text-primary" }),
            title: "Calculus",
            description: "Explore derivatives, integrals, and limits with step-by-step explanations.",
            questions: 5,
            category: "Mathematics",
            path: "/learn/calculus"
          },
          {
            icon: React.createElement(NetworkIcon, { className: "w-6 h-6 text-primary" }),
            title: "Graph Theory",
            description: "Discover the principles of networks, paths, and connectivity through guided problems.",
            questions: 5,
            category: "Mathematics",
            path: "/learn/graph-theory"
          },
          {
            icon: React.createElement(BarChart3Icon, { className: "w-6 h-6 text-primary" }),
            title: "Statistics",
            description: "Learn probability, distributions, and hypothesis testing with real-world examples.",
            questions: 5,
            category: "Mathematics",
            path: "/learn/statistics"
          },
          {
            icon: React.createElement(LineChartIcon, { className: "w-6 h-6 text-primary" }),
            title: "Differential Equations",
            description: "Learn to model and solve real-world problems using differential equations.",
            questions: 5,
            category: "Mathematics",
            path: "/learn/differential-equations"
          },
          {
            icon: React.createElement(GanttChartSquareIcon, { className: "w-6 h-6 text-primary" }),
            title: "Number Theory",
            description: "Explore properties and relationships of numbers and their applications.",
            questions: 5,
            category: "Mathematics",
            path: "/learn/number-theory"
          }
        ];

        const dsaTopicsData: Topic[] = [
          {
            icon: React.createElement(TreePineIcon, { className: "w-6 h-6 text-accent" }),
            title: "Binary Trees",
            description: "Understand tree traversals, balancing, and optimization techniques with practice problems.",
            questions: 5,
            category: "DSA",
            path: "/learn/binary-trees"
          },
          {
            icon: React.createElement(HashIcon, { className: "w-6 h-6 text-accent" }),
            title: "Hash Tables",
            description: "Master hashing algorithms, collision resolution, and efficient lookup operations.",
            questions: 5,
            category: "DSA",
            path: "/learn/hash-tables"
          },
          {
            icon: React.createElement(BoxIcon, { className: "w-6 h-6 text-accent" }),
            title: "Dynamic Programming",
            description: "Solve complex optimization problems using memoization and tabulation methods.",
            questions: 5,
            category: "DSA",
            path: "/learn/dynamic-programming"
          },
          {
            icon: React.createElement(BrainCircuitIcon, { className: "w-6 h-6 text-accent" }),
            title: "Graph Algorithms",
            description: "Explore BFS, DFS, shortest paths, and minimum spanning tree algorithms.",
            questions: 5,
            category: "DSA",
            path: "/learn/graph-algorithms"
          },
          {
            icon: React.createElement(LayoutListIcon, { className: "w-6 h-6 text-accent" }),
            title: "Sorting Algorithms",
            description: "Compare and implement various sorting techniques with time and space complexity analysis.",
            questions: 5,
            category: "DSA",
            path: "/learn/sorting-algorithms"
          },
          {
            icon: React.createElement(ListFilterIcon, { className: "w-6 h-6 text-accent" }),
            title: "Searching Algorithms",
            description: "Master linear search, binary search, and hash-based searching methods.",
            questions: 5,
            category: "DSA",
            path: "/learn/searching-algorithms"
          },
          {
            icon: React.createElement(WandIcon, { className: "w-6 h-6 text-accent" }),
            title: "Greedy Algorithms",
            description: "Learn to make locally optimal choices to solve global optimization problems.",
            questions: 5,
            category: "DSA",
            path: "/learn/greedy-algorithms"
          },
          {
            icon: React.createElement(RotateCcwIcon, { className: "w-6 h-6 text-accent" }),
            title: "Recursion",
            description: "Build problem-solving skills using functions that call themselves.",
            questions: 5,
            category: "DSA",
            path: "/learn/recursion"
          },
          {
            icon: React.createElement(DatabaseIcon, { className: "w-6 h-6 text-accent" }),
            title: "Array Data Structure",
            description: "Master the fundamentals of arrays and their applications in algorithm design.",
            questions: 5,
            category: "DSA",
            path: "/learn/arrays"
          },
          {
            icon: React.createElement(ArrowUpRightIcon, { className: "w-6 h-6 text-accent" }),
            title: "Linked Lists",
            description: "Understand singly linked, doubly linked, and circular linked list implementations.",
            questions: 5,
            category: "DSA",
            path: "/learn/linked-lists"
          },
          {
            icon: React.createElement(Cpu, { className: "w-6 h-6 text-accent" }),
            title: "Bit Manipulation",
            description: "Explore bit-level operations to optimize algorithms and solve unique problems.",
            questions: 5,
            category: "DSA",
            path: "/learn/bit-manipulation"
          },
          {
            icon: React.createElement(BinaryIcon, { className: "w-6 h-6 text-accent" }),
            title: "String Algorithms",
            description: "Dive into pattern matching, string manipulation, and text processing techniques.",
            questions: 5,
            category: "DSA",
            path: "/learn/string-algorithms"
          }
        ];

        setMathTopics(mathTopicsData);
        setDsaTopics(dsaTopicsData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics data");
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { mathTopics, dsaTopics, isLoading, error };
};
