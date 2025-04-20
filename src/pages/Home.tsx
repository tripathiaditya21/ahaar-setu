import React from 'react';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import BridgeDivider from '../components/ui/BridgeDivider';
import ImpactCounter from '../components/ui/ImpactCounter';
import { Heart, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        
        <StatsSection />
        
        <BridgeDivider />
        
        <HowItWorksSection />
        
        <section className="bg-gradient-to-b from-white to-purple-light/5 section-padding relative overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-yellow/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-mint/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-yellow/20 text-purple px-4 py-1 rounded-full text-sm font-medium mb-4">
                Growing Together
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Our Growing Impact</h2>
              <p className="text-slate max-w-2xl mx-auto">
                Every donation, every meal shared, every community served - together we're making a difference
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative hover-card">
                <div className="absolute -top-4 -right-4 bg-coral/10 w-12 h-12 rounded-full blur-xl"></div>
                <ImpactCounter value={50} label="Donors Onboarded" />
              </div>
              
              <div className="relative md:mt-8 hover-card">
                <div className="absolute -top-4 -right-4 bg-teal/10 w-12 h-12 rounded-full blur-xl"></div>
                <ImpactCounter value={30} label="Community Partners" />
              </div>
              
              <div className="relative hover-card">
                <div className="absolute -top-4 -right-4 bg-yellow/10 w-12 h-12 rounded-full blur-xl"></div>
                <ImpactCounter value={25} label="Locations Served" />
              </div>
            </div>
            
            <div className="mt-16 bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-purple-light/10 max-w-3xl mx-auto hover-card">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="p-4 bg-gradient-to-br from-purple/20 to-purple-light/20 rounded-full mr-4">
                    <Heart size={24} className="text-purple" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-purple text-xl">Ready to Join?</h3>
                    <p className="text-slate">Your contribution matters</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Link 
                    to="/donor-dashboard" 
                    className="px-5 py-2 bg-gradient-to-r from-coral to-coral/90 text-white rounded-lg font-medium hover:shadow-md transition-all hover:scale-105 flex items-center"
                  >
                    Start Donating <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        <section className="bg-white section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd59a0c3015c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] opacity-[0.03] bg-cover bg-center"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <span className="inline-block bg-mint/20 text-teal px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Community
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Making a Difference Together</h2>
                <p className="text-slate mb-8 text-lg">
                  Join our growing community of donors, volunteers, and partners working together to reduce food waste and fight hunger.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start hover-card p-4 rounded-lg">
                    <div className="mt-1 mr-4 p-3 bg-gradient-to-br from-yellow/20 to-yellow/10 rounded-full">
                      <Users size={20} className="text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-teal text-lg">Volunteer Opportunities</h3>
                      <p className="text-slate text-sm">Help with food collection, distribution, or community outreach.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover-card p-4 rounded-lg">
                    <div className="mt-1 mr-4 p-3 bg-gradient-to-br from-coral/20 to-coral/10 rounded-full">
                      <MapPin size={20} className="text-coral" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-coral text-lg">Local Impact</h3>
                      <p className="text-slate text-sm">Your contributions directly benefit your local community and neighbors in need.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/community" className="btn-secondary flex items-center justify-center w-fit mx-auto md:mx-0">
                    Explore Community <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 bg-yellow rounded-full opacity-30 blur-xl"></div>
                <div className="absolute -bottom-5 -right-5 w-12 h-12 bg-purple rounded-full opacity-30 blur-xl"></div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-6 border border-purple-light/10 transform rotate-2 hover:rotate-0 transition-transform hover-card">
                    <img 
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Community volunteers" 
                      className="rounded-lg mb-4 h-40 w-full object-cover shadow-md"
                    />
                    <h3 className="font-semibold text-purple">Volunteer Teams</h3>
                    <p className="text-slate text-sm">Join our dedicated volunteer network</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border border-purple-light/10 transform -rotate-2 hover:rotate-0 transition-transform mt-8 hover-card">
                    <img 
                      src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                      alt="Food donation" 
                      className="rounded-lg mb-4 h-40 w-full object-cover shadow-md"
                    />
                    <h3 className="font-semibold text-purple">Food Distribution</h3>
                    <p className="text-slate text-sm">Serving communities in need</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border border-purple-light/10 transform -rotate-1 hover:rotate-0 transition-transform hover-card">
                    <img 
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Restaurant donation" 
                      className="rounded-lg mb-4 h-40 w-full object-cover shadow-md"
                    />
                    <h3 className="font-semibold text-purple">Restaurant Partners</h3>
                    <p className="text-slate text-sm">Local businesses making a difference</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 border border-purple-light/10 transform rotate-1 hover:rotate-0 transition-transform mt-4 hover-card">
                    <img 
                      src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Community kitchen" 
                      className="rounded-lg mb-4 h-40 w-full object-cover shadow-md"
                    />
                    <h3 className="font-semibold text-purple">Community Kitchens</h3>
                    <p className="text-slate text-sm">Creating meals with donated food</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection
          title="Ready to Make a Difference?"
          description="Join Aahaar Setu today and become part of the movement to reduce food waste and fight hunger in our communities."
          primaryButtonLabel="Donate Food"
          primaryButtonLink="/donor-dashboard"
          secondaryButtonLabel="Request Food"
          secondaryButtonLink="/partner-dashboard"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
