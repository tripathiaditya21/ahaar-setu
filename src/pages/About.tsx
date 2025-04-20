import React from 'react';
import Footer from '../components/layout/Footer';
import { Heart, Users, Leaf, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple to-purple-light text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Aahaar Setu</h1>
              <p className="text-lg text-white/90">
                Connecting surplus food to those in need, one donation at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-purple mb-6">Our Mission</h2>
                  <p className="text-slate mb-6">
                    Aahaar Setu is dedicated to reducing food waste and fighting hunger by creating a bridge between food donors and community partners. We believe that no one should go hungry while good food goes to waste.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-3 bg-purple-light/20 rounded-full mr-4">
                        <Heart className="text-purple" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-purple mb-1">Community Impact</h3>
                        <p className="text-slate text-sm">Creating positive change in communities through food donations</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-3 bg-teal/20 rounded-full mr-4">
                        <Leaf className="text-teal" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-teal mb-1">Sustainability</h3>
                        <p className="text-slate text-sm">Promoting sustainable practices by reducing food waste</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-5 -left-5 w-24 h-24 bg-yellow rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-purple rounded-full opacity-20 blur-xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Community volunteers" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-purple text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-cream p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-purple-light/20 rounded-full w-fit mb-4">
                    <Heart className="text-purple" size={24} />
                  </div>
                  <h3 className="font-semibold text-purple mb-2">Compassion</h3>
                  <p className="text-slate text-sm">We believe in treating everyone with dignity and respect</p>
                </div>
                <div className="bg-cream p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-teal/20 rounded-full w-fit mb-4">
                    <Users className="text-teal" size={24} />
                  </div>
                  <h3 className="font-semibold text-teal mb-2">Community</h3>
                  <p className="text-slate text-sm">Building strong connections between donors and recipients</p>
                </div>
                <div className="bg-cream p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-coral/20 rounded-full w-fit mb-4">
                    <Target className="text-coral" size={24} />
                  </div>
                  <h3 className="font-semibold text-coral mb-2">Impact</h3>
                  <p className="text-slate text-sm">Creating measurable change in food waste and hunger</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-purple mb-12">Our Team</h2>
              <p className="text-slate mb-8">
                We're a dedicated team of volunteers, developers, and community leaders working together to make a difference.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-purple-light/20 flex items-center justify-center">
                    <Users className="text-purple" size={40} />
                  </div>
                  <h3 className="font-semibold text-purple mb-1">Volunteers</h3>
                  <p className="text-slate text-sm">Dedicated community members</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-teal/20 flex items-center justify-center">
                    <Users className="text-teal" size={40} />
                  </div>
                  <h3 className="font-semibold text-teal mb-1">Partners</h3>
                  <p className="text-slate text-sm">Community organizations</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-coral/20 flex items-center justify-center">
                    <Users className="text-coral" size={40} />
                  </div>
                  <h3 className="font-semibold text-coral mb-1">Donors</h3>
                  <p className="text-slate text-sm">Generous food providers</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
