
import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  type: 'meals' | 'kg' | 'co2';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, type, icon }) => {
  const getTypeClass = () => {
    switch (type) {
      case 'meals':
        return 'stat-meals';
      case 'kg':
        return 'stat-kg';
      case 'co2':
        return 'stat-co2';
      default:
        return '';
    }
  };

  return (
    <div className={`card-stats ${getTypeClass()} animate-count-up`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate font-medium">{label}</h3>
        <div className="text-purple-light">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-slate">{value}</div>
    </div>
  );
};

export default StatCard;
