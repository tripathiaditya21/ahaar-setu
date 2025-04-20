
import React from 'react';
import StatCard from '../ui/StatCard';
import { Utensils, Scale, Leaf } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="bg-white section-padding relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] opacity-[0.03] bg-cover bg-center"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-coral/10 text-coral px-4 py-1 rounded-full text-sm font-medium mb-4">Making A Difference</span>
          <h2 className="text-3xl font-bold text-center mb-4">Our Impact So Far</h2>
          <p className="text-slate max-w-2xl mx-auto mb-12">
            Together, we're reducing food waste and fighting hunger in our communities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            value="1,500" 
            label="Meals Provided" 
            type="meals" 
            icon={<Utensils size={24} className="text-teal" />} 
          />
          <StatCard 
            value="750 kg" 
            label="Food Redistributed" 
            type="kg" 
            icon={<Scale size={24} className="text-coral" />} 
          />
          <StatCard 
            value="900 kg" 
            label="CO2 Emissions Saved" 
            type="co2" 
            icon={<Leaf size={24} className="text-yellow" />} 
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
