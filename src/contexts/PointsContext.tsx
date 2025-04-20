import React, { createContext, useContext, useState } from 'react';

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  deductPoints: (amount: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const deductPoints = (amount: number) => {
    setPoints(prev => Math.max(0, prev - amount));
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, deductPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
}; 