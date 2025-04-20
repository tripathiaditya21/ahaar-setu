
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  image
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-purple-light/5 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-light/10 hover:transform hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow/5 rounded-full blur-xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-light/5 rounded-full blur-xl -ml-10 -mb-10"></div>
      
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 text-purple-light/30 w-10 h-10" />
        <p className="text-slate italic pt-6 mb-6 relative z-10 leading-relaxed">"{quote}"</p>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-purple-light shadow-sm">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="text-left">
          <h4 className="font-semibold text-purple text-lg">{name}</h4>
          <p className="text-sm text-slate/90">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
