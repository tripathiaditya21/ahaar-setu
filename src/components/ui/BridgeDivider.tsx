
import React from 'react';
import { Heart } from 'lucide-react';

interface BridgeDividerProps {
  className?: string;
}

const BridgeDivider: React.FC<BridgeDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative h-32 my-12 overflow-hidden ${className}`}>
      <div className="absolute w-full h-64 bg-gradient-to-b from-purple-light/5 to-purple-light/40 rounded-t-full left-0 -bottom-24"></div>
      <div className="absolute w-3/4 h-64 bg-gradient-to-b from-purple-light/0 to-purple-light/30 rounded-t-full left-1/2 transform -translate-x-1/2 -bottom-32"></div>
      <div className="absolute w-1/2 h-64 bg-gradient-to-b from-purple-light/0 to-purple-light/20 rounded-t-full left-1/2 transform -translate-x-1/2 -bottom-36"></div>
      
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow/40 to-yellow/20 blur-xl"></div>
      <div className="absolute top-12 left-1/4 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-coral/30 to-coral/10 blur-lg"></div>
      <div className="absolute top-10 right-1/4 transform translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-teal/30 to-teal/10 blur-lg"></div>
      
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <Heart size={20} className="text-purple fill-purple-light/30" />
        </div>
        <div className="w-px h-10 bg-gradient-to-b from-purple-light to-purple-light/10 mt-1"></div>
      </div>
    </div>
  );
};

export default BridgeDivider;
