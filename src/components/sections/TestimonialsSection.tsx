
import React, { useState, useEffect } from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Aahaar Setu has made it incredibly easy for our restaurant to donate excess food. We've reduced waste by 30% while helping our community.",
    name: "Priya Sharma",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    quote: "As a community kitchen, we've been able to feed twice as many people thanks to the consistent donations through Aahaar Setu's platform.",
    name: "Rahul Patel",
    role: "NGO Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    quote: "The platform seamlessly connects our hotel's surplus with local shelters. It's a win-win for sustainability and community support.",
    name: "Deepak Singh",
    role: "Hotel Manager",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gradient-to-b from-cream to-purple-light/5 section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Success Stories</h2>
        <p className="text-slate text-center max-w-2xl mx-auto mb-12">
          See how Aahaar Setu is making a difference in our communities, one meal at a time.
        </p>
        
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}
        </div>
        
        {/* Mobile Testimonial Slider */}
        <div className="md:hidden">
          <div className="relative">
            <div className="relative h-[320px] overflow-hidden rounded-xl bg-white/30 shadow-md p-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out p-4 ${
                    index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <TestimonialCard 
                    quote={testimonial.quote}
                    name={testimonial.name}
                    role={testimonial.role}
                    image={testimonial.image}
                  />
                </div>
              ))}
            </div>
            
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              <button 
                onClick={prevTestimonial}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-purple shadow-md hover:bg-purple hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <button 
                onClick={nextTestimonial}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-purple shadow-md hover:bg-purple hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-purple scale-125' : 'bg-purple-light'}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
