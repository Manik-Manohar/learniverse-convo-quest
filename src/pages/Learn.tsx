
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ConversationArea from '../components/ConversationArea';
import ProgressTracker from '../components/ProgressTracker';
import QuestionCard from '../components/QuestionCard';
import ReferenceLinks from '../components/ReferenceLinks';
import Footer from '../components/Footer';
import { ArrowLeftIcon, BookOpenIcon, RefreshCwIcon } from 'lucide-react';
import { MessageType } from '../components/ConversationBubble';

interface Message {
  id: string;
  type: MessageType;
  content: string;
}

interface Topic {
  title: string;
  description: string;
  category: 'Mathematics' | 'DSA';
  questions: Array<{
    question: string;
    difficulty: number;
    gfgLink?: string;
  }>;
  references: Array<{
    title: string;
    url: string;
    source: string;
  }>;
}

// Mock data for topics
const TOPICS_DATA: Record<string, Topic> = {
  'linear-algebra': {
    title: 'Linear Algebra',
    description: 'Master matrices, vectors, and linear transformations through interactive examples.',
    category: 'Mathematics',
    questions: [
      {
        question: 'Find the eigenvalues and eigenvectors of the matrix A = [[3, 1], [1, 3]].',
        difficulty: 1
      },
      {
        question: 'Determine if the set of vectors {(1,1,0), (1,0,1), (0,1,1)} forms a basis for R³.',
        difficulty: 2
      },
      {
        question: 'Diagonalize the matrix A = [[4, -3], [1, 0]] if possible.',
        difficulty: 3
      },
      {
        question: 'For the matrix A = [[2, -1, 0], [0, 2, -1], [0, 0, 2]], find the characteristic polynomial and compute A⁻¹.',
        difficulty: 4
      },
      {
        question: 'Prove that the rank of a matrix plus the dimension of its null space equals the number of columns in the matrix.',
        difficulty: 5
      }
    ],
    references: [
      {
        title: 'Eigenvalues and Eigenvectors: A Comprehensive Guide',
        url: 'https://example.com/eigenvalues',
        source: 'Mathematics Reference'
      },
      {
        title: 'Matrix Diagonalization Techniques',
        url: 'https://example.com/diagonalization',
        source: 'Linear Algebra Handbook'
      }
    ]
  },
  'binary-trees': {
    title: 'Binary Trees',
    description: 'Understand tree traversals, balancing, and optimization techniques with practice problems.',
    category: 'DSA',
    questions: [
      {
        question: 'Implement a function to find the height of a binary tree.',
        difficulty: 1,
        gfgLink: 'https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/'
      },
      {
        question: 'Implement inorder, preorder, and postorder traversals for a binary tree.',
        difficulty: 2,
        gfgLink: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/'
      },
      {
        question: 'Write a function to determine if a binary tree is balanced.',
        difficulty: 3,
        gfgLink: 'https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/'
      },
      {
        question: 'Implement a function to convert a binary tree to a doubly linked list in-place.',
        difficulty: 4,
        gfgLink: 'https://www.geeksforgeeks.org/convert-a-binary-tree-to-a-circular-doubly-link-list/'
      },
      {
        question: 'Implement a serialization and deserialization algorithm for binary trees.',
        difficulty: 5,
        gfgLink: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/'
      }
    ],
    references: [
      {
        title: 'Binary Tree Data Structure',
        url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
        source: 'GeeksForGeeks'
      },
      {
        title: 'Self-Balancing Binary Search Trees',
        url: 'https://www.geeksforgeeks.org/self-balancing-binary-search-trees-comparisons/',
        source: 'GeeksForGeeks'
      },
      {
        title: 'Tree Traversal Techniques',
        url: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/',
        source: 'GeeksForGeeks'
      }
    ]
  }
};

const INITIAL_MESSAGES: {[key: string]: Message[]} = {
  'linear-algebra': [
    {
      id: '1',
      type: 'teacher',
      content: "Welcome to Linear Algebra! I'll be your guide through this topic. We'll explore concepts like matrices, vectors, eigenvalues, and more through a series of increasingly challenging problems."
    },
    {
      id: '2',
      type: 'peer',
      content: "Linear algebra is actually used everywhere - from computer graphics to machine learning algorithms. It's super practical!"
    },
    {
      id: '3',
      type: 'teacher',
      content: "Let's start with our first question. It's about finding eigenvalues and eigenvectors, which are special values and directions associated with a matrix. Ready to begin?"
    }
  ],
  'binary-trees': [
    {
      id: '1',
      type: 'teacher',
      content: "Welcome to Binary Trees! This is a fundamental data structure in computer science. I'll guide you through traversal methods, balancing techniques, and common operations."
    },
    {
      id: '2',
      type: 'peer',
      content: "Binary trees show up in so many places - from file systems to decision algorithms. I'm excited to learn this with you!"
    },
    {
      id: '3',
      type: 'teacher',
      content: "Let's begin with our first question about finding the height of a binary tree. This is a classic recursive problem that helps build intuition for tree operations."
    }
  ]
};

const Learn = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (topicId && TOPICS_DATA[topicId]) {
      setTopic(TOPICS_DATA[topicId]);
      setMessages(INITIAL_MESSAGES[topicId] || []);
    } else {
      navigate('/');
    }
  }, [topicId, navigate]);

  const handleGetHint = () => {
    if (!topic) return;
    
    const hintMessage: Message = {
      id: Date.now().toString(),
      type: 'teacher',
      content: `Here's a hint for this question: Think about ${topic.category === 'Mathematics' ? 'the properties of matrices and their eigenvalues' : 'how you can traverse the tree recursively'}...`
    };
    
    setMessages(prev => [...prev, hintMessage]);
  };

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Topics
            </button>
            
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold">{topic.title}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {topic.category}
              </span>
            </div>
            
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {topic.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ConversationArea 
                topicTitle={topic.title}
                initialMessages={messages}
              />
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProgressTracker 
                  currentQuestion={currentQuestion}
                  totalQuestions={topic.questions.length}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <QuestionCard 
                  question={topic.questions[currentQuestion - 1].question}
                  difficultyLevel={topic.questions[currentQuestion - 1].difficulty}
                  onGetHint={handleGetHint}
                  gfgLink={topic.questions[currentQuestion - 1].gfgLink}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ReferenceLinks links={topic.references} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
