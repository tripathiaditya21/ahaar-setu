
import React, { useState, useEffect, useRef } from 'react';

interface ImpactCounterProps {
  value: number;
  label: string;
  duration?: number;
}

const ImpactCounter: React.FC<ImpactCounterProps> = ({ 
  value, 
  label,
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.floor(start), value));
      
      if (start >= value) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, duration, isVisible]);

  return (
    <div ref={counterRef} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300 border border-purple-light/5">
      <div className="text-4xl font-bold text-teal mb-2">{count}</div>
      <div className="text-slate">{label}</div>
    </div>
  );
};

export default ImpactCounter;
