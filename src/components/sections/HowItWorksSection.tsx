
import React from 'react';
import { ClipboardList, BarChart2, Truck, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <ClipboardList size={40} className="text-purple" />,
      title: "List Your Surplus",
      description: "Donors list their available food items with details on quantity, expiration, and pickup location.",
      delay: "0s"
    },
    {
      icon: <BarChart2 size={40} className="text-purple" />,
      title: "Smart Matching",
      description: "Our system matches food listings with nearby Community Partners based on needs and proximity.",
      delay: "0.2s"
    },
    {
      icon: <Truck size={40} className="text-purple" />,
      title: "Pickup & Distribute",
      description: "Community Partners arrange pickup and distribute the food to those who need it most.",
      delay: "0.4s"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-cream to-white section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-mint/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-teal/10 text-teal px-4 py-1 rounded-full text-sm font-medium mb-4">Our Process</span>
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-slate text-center max-w-2xl mx-auto mb-16">
            A simple three-step process to bridge the gap between surplus food and hunger
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-md text-center animate-fade-in hover:shadow-lg transition-all duration-300 border border-purple-light/5 relative group"
              style={{ animationDelay: step.delay }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-purple-light/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>
              <span className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 rounded-full bg-purple-light/10 text-purple font-bold text-lg">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-purple mb-4">
                {step.title}
              </h3>
              <p className="text-slate">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                  <ArrowRight size={24} className="text-teal" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
