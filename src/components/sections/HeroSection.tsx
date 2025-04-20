
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple to-purple-light opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
            <div className="inline-block bg-yellow/30 px-5 py-2 rounded-full text-white font-medium mb-6 animate-fade-in backdrop-blur-sm">
              <span className="flex items-center">
                <Heart size={18} className="mr-2 text-white fill-yellow animate-pulse" />
                Building bridges, serving communities
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight drop-shadow-md">
              Connecting <span className="text-yellow">Surplus</span> to <span className="text-yellow">Smiles</span>
            </h1>
            <p className="text-white/90 mb-8 text-lg max-w-xl animate-fade-in leading-relaxed drop-shadow-sm" style={{ animationDelay: '0.2s' }}>
              Aahaar Setu is bridging the gap between food waste and hunger, 
              creating a sustainable cycle of nourishment and hope in our communities.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/donor-dashboard" className="btn-donor flex items-center justify-center group shadow-xl">
                Donate Food <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/partner-dashboard" className="btn-partner flex items-center justify-center group shadow-xl">
                Request Food <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-yellow/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-coral/30 rounded-full blur-xl"></div>
            
            <div className="relative bg-gradient-to-br from-white/90 to-white/80 p-3 rounded-xl shadow-2xl transform rotate-3 max-w-md mx-auto backdrop-blur-sm hover:rotate-0 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="People sharing food" 
                className="rounded-lg shadow-lg max-w-full mx-auto object-cover h-64 w-full"
              />
              <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-lg">
                <Heart size={24} className="text-coral fill-coral animate-pulse" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-purple-light/30 rounded-t-full blur-md"></div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-0 w-full h-12 bg-purple-light/20 rounded-t-full"></div>
    </section>
  );
};

export default HeroSection;
