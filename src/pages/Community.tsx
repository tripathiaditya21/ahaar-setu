import React from 'react';
import Footer from '../components/layout/Footer';
import { SearchIcon, Calendar, MessageSquare, Utensils, Info, Users, BookOpen } from 'lucide-react';
import BridgeDivider from '../components/ui/BridgeDivider';

const Community = () => {
  const recipes = [
    {
      id: 'recipe1',
      title: 'Bread Upma from Surplus Bread',
      description: 'A delicious Indian breakfast made from leftover bread',
      tags: ['Quick', 'Vegetarian'],
      image: 'https://media.istockphoto.com/id/2091627558/photo/famous-south-indian-healthy-breakfast-suji-upma.jpg?s=2048x2048&w=is&k=20&c=ddUX0SOhZwS0uC-UAPIEBO6Wz3KOJOZziiNmIFiEIEc='
    },
    {
      id: 'recipe2',
      title: 'Mixed Vegetable Curry',
      description: 'Perfect way to use assorted vegetables before they spoil',
      tags: ['Vegan', 'Nutritious'],
      image: 'https://images.unsplash.com/photo-1716959669858-11d415bdead6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'recipe3',
      title: 'Fruit Smoothie Bowls',
      description: 'Creative way to use fruits that are slightly overripe',
      tags: ['Sweet', 'Refreshing'],
      image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=680&q=80'
    }
  ];
  
  const events = [
    {
      id: 'event1',
      title: 'Community Food Drive',
      date: 'May 15, 2025',
      location: 'Central Park, Indiranagar',
      description: 'Join us for a community food drive to collect surplus food from local markets.'
    },
    {
      id: 'event2',
      title: 'Food Waste Management Workshop',
      date: 'May 22, 2025',
      location: 'Hope Foundation Office',
      description: 'Learn effective techniques for food preservation and waste reduction.'
    }
  ];
  
  const discussions = [
    {
      id: 'disc1',
      title: 'Best practices for storing rice long-term?',
      author: 'Rahul Sharma',
      date: '2 days ago',
      replies: 12
    },
    {
      id: 'disc2',
      title: 'Seeking volunteers for weekend food distribution',
      author: 'Hope NGO',
      date: '4 days ago',
      replies: 8
    },
    {
      id: 'disc3',
      title: 'Creative recipes for using leftover vegetables?',
      author: 'Priya Patel',
      date: '1 week ago',
      replies: 20
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple">Community Hub</h1>
            <p className="text-slate mt-2">Join the movement to reduce food waste and combat hunger</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-purple">Find Resources</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={18} className="text-slate" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search the community" 
                    className="pl-10 pr-4 py-2 border border-purple-light/30 rounded-md w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-light"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Utensils size={20} className="text-teal mr-2" />
                    <h3 className="text-lg font-semibold text-teal">Surplus Food Recipes</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recipes.map(recipe => (
                      <div key={recipe.id} className="bg-mint/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-purple line-clamp-1">{recipe.title}</h4>
                          <p className="text-xs text-slate mt-1 line-clamp-2">{recipe.description}</p>
                          <div className="flex mt-2 gap-1">
                            {recipe.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-mint/20 text-slate rounded-full px-2 py-0.5">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <MessageSquare size={20} className="text-purple mr-2" />
                    <h3 className="text-lg font-semibold text-purple">Community Discussions</h3>
                  </div>
                  
                  <div className="bg-purple-light/10 rounded-lg p-4">
                    <div className="space-y-4">
                      {discussions.map(discussion => (
                        <div key={discussion.id} className="bg-white p-3 rounded-md hover:shadow-sm transition-shadow">
                          <h4 className="font-medium text-purple">{discussion.title}</h4>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-xs text-slate">
                              <span>By {discussion.author}</span>
                              <span className="mx-2">•</span>
                              <span>{discussion.date}</span>
                            </div>
                            <span className="text-xs bg-purple-light/20 text-purple rounded-full px-2 py-0.5">
                              {discussion.replies} replies
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="btn-primary py-2">
                        Start New Discussion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Calendar size={20} className="text-coral mr-2" />
                  <h3 className="text-lg font-semibold text-coral">Upcoming Events</h3>
                </div>
                
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border-b border-purple-light/20 pb-4 last:border-0">
                      <h4 className="font-medium text-purple">{event.title}</h4>
                      <div className="flex items-center text-sm text-slate mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <p className="text-sm text-slate mt-1">{event.location}</p>
                      <p className="text-xs text-slate mt-2">{event.description}</p>
                      <button className="text-teal hover:underline text-sm mt-2">
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-coral/10 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Users size={20} className="text-coral mr-2" />
                  <h3 className="text-lg font-semibold text-coral">Event Mode</h3>
                </div>
                
                <p className="text-slate text-sm mb-4">
                  Planning a wedding, corporate event, or large gathering? Donate surplus food to local communities.
                </p>
                
                <button className="w-full btn-secondary py-2 flex items-center justify-center">
                  Schedule Bulk Donation
                </button>
              </div>
              
              <div className="bg-yellow/20 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Info size={20} className="text-yellow mr-2" />
                  <h3 className="text-lg font-semibold text-purple">Food Storage Tips</h3>
                </div>
                
                <ul className="text-sm text-slate space-y-2">
                  <li className="flex items-start">
                    <span className="bg-yellow w-2 h-2 rounded-full mt-1.5 mr-2"></span>
                    Store rice in airtight containers away from moisture
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow w-2 h-2 rounded-full mt-1.5 mr-2"></span>
                    Keep fruits and vegetables separate to prevent over-ripening
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow w-2 h-2 rounded-full mt-1.5 mr-2"></span>
                    Refrigerate cooked food within two hours of preparation
                  </li>
                </ul>
                
                <div className="mt-4">
                  <button className="text-teal hover:underline text-sm flex items-center">
                    <BookOpen size={14} className="mr-1" /> Download Complete Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <BridgeDivider />
          
          <div className="bg-teal/10 rounded-xl p-6 mb-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-teal mb-4">Join Our Newsletter</h2>
              <p className="text-slate mb-6 max-w-2xl mx-auto">
                Stay updated with the latest recipes, events, and success stories from our community. 
                Together, we can make a difference.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 border border-teal/30 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                />
                <button className="btn-secondary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple mb-6 text-center">Our Impact Stories</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-purple-light/10 rounded-lg">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                      alt="Priya Sharma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-slate text-center italic mb-3">
                  "Thanks to Aahaar Setu, our restaurant has connected with local shelters, reducing our food waste by 90% and helping hundreds of people."
                </blockquote>
                <p className="text-purple font-medium text-center">Priya Sharma</p>
                <p className="text-sm text-slate text-center">Restaurant Owner</p>
              </div>
              
              <div className="p-4 bg-coral/10 rounded-lg">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                      alt="Rahul Patel" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-slate text-center italic mb-3">
                  "Our NGO now serves twice as many meals through consistent donations from the platform. The platform has been a game-changer."
                </blockquote>
                <p className="text-purple font-medium text-center">Rahul Patel</p>
                <p className="text-sm text-slate text-center">NGO Director</p>
              </div>
              
              <div className="p-4 bg-yellow/10 rounded-lg">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                      alt="Deepak Singh" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-slate text-center italic mb-3">
                  "The platform has helped our hotel reduce environmental impact while supporting local communities. A win-win for all involved."
                </blockquote>
                <p className="text-purple font-medium text-center">Deepak Singh</p>
                <p className="text-sm text-slate text-center">Hotel Manager</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
