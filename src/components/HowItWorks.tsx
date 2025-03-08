
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainIcon, 
  MessageCircleIcon, 
  GraduationCapIcon, 
  LightbulbIcon,
  BarChartIcon
} from 'lucide-react';

const features = [
  {
    icon: <BrainIcon className="w-6 h-6 text-primary" />,
    title: "AI Teaching Assistant",
    description: "Learn from our advanced AI teacher that adapts to your learning style and provides personalized guidance."
  },
  {
    icon: <MessageCircleIcon className="w-6 h-6 text-primary" />,
    title: "Peer Learning",
    description: "Engage in conversations with our AI peer that helps explain concepts from a student's perspective."
  },
  {
    icon: <LightbulbIcon className="w-6 h-6 text-primary" />,
    title: "Smart Hints",
    description: "Get contextual hints when you're stuck, designed to guide you toward the solution without giving it away."
  },
  {
    icon: <BarChartIcon className="w-6 h-6 text-primary" />,
    title: "Progressive Difficulty",
    description: "Start with simpler problems and gradually work your way up to more challenging ones as you build confidence."
  },
  {
    icon: <GraduationCapIcon className="w-6 h-6 text-primary" />,
    title: "Comprehensive Topics",
    description: "From mathematics to data structures and algorithms, cover all the essential concepts for academic and technical interviews."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How LearnIverse Works
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our platform combines cutting-edge AI with proven learning methodologies to help you master complex topics.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card p-6 rounded-xl hover-scale"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
