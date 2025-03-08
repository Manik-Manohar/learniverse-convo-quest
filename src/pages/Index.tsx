
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TopicsGrid from '../components/TopicsGrid';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <TopicsGrid />
          </div>
        </section>
        
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
