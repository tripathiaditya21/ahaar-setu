import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import { Search, History, Users, ChevronRight, AlertTriangle, Bell } from 'lucide-react';
import { useFood } from '../contexts/FoodContext';

const PartnerDashboard = () => {
  const { getClaimedDonations } = useFood();
  const claimedDonations = getClaimedDonations();

  const mockRequests = [
    {
      id: 'req1',
      food: '10 kg Rice',
      donor: 'Cafe Green',
      date: 'April 5, 2023',
      status: 'Picked up'
    },
    {
      id: 'req2',
      food: '15 kg Vegetables',
      donor: 'Fresh Market',
      date: 'April 3, 2023',
      status: 'Distributed'
    },
    {
      id: 'req3',
      food: '25 Bread Loaves',
      donor: 'Bakery Plus',
      date: 'March 30, 2023',
      status: 'Delivered'
    }
  ];
  
  const mockNotifications = [
    {
      id: 'not1',
      message: 'New listing: 10 kg vegetables available 3 km away',
      time: '30 mins ago',
      type: 'info'
    },
    {
      id: 'not2',
      message: 'Urgent: 20 meals from Hotel Grand expiring in 6 hours',
      time: '2 hours ago',
      type: 'urgent'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-8 px-4">
          <div className="bg-teal rounded-xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, Hope NGO!</h1>
                <p className="text-white/80 mt-2">Find and distribute food to your community</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  to="/request" 
                  className="btn-partner flex items-center"
                >
                  <Search size={18} className="mr-2" /> Find Food
                </Link>
              </div>
            </div>
          </div>
          
          <div className="urgent-flare p-4 flex items-center justify-between mb-8 rounded-xl">
            <div className="flex items-center">
              <AlertTriangle size={24} className="mr-3" />
              <div>
                <h3 className="font-semibold">Urgent Need Alert</h3>
                <p className="text-sm">Shelter needs 20 meals by 6 PM today!</p>
              </div>
            </div>
            <Link to="/request" className="bg-white text-coral px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
              Respond Now
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-purple mb-1">Impact Summary</h2>
                  <p className="text-slate text-sm mb-4">Food distributed so far</p>
                </div>
                <div className="bg-teal/10 p-2 rounded-full">
                  <Users size={24} className="text-teal" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-slate text-sm">People Fed</span>
                  <span className="text-slate font-medium">100/500</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between mb-1 mt-4">
                  <span className="text-slate text-sm">Food Distributed</span>
                  <span className="text-slate font-medium">75 kg</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex justify-between mb-1 mt-4">
                  <span className="text-slate text-sm">Communities Served</span>
                  <span className="text-slate font-medium">3</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '30%' }}></div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-slate">Monthly Goal: <span className="text-teal font-bold">500 people</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-purple mb-1">Recent Claims</h2>
                  <p className="text-slate text-sm">Food you've recently claimed</p>
                </div>
                <div className="bg-purple-light/10 p-2 rounded-full">
                  <History size={24} className="text-purple" />
                </div>
              </div>
              
              <div className="space-y-4">
                {claimedDonations.map(donation => (
                  <div key={donation.id} className="border-b border-purple-light/20 pb-3 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate">
                        {donation.quantity} {donation.foodtype && donation.foodtype.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className="text-sm text-slate">
                        {donation.pickupDate || 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-slate/80">From: {donation.donorName || 'Anonymous'}</span>
                      <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full">
                        Pickup Time: {donation.pickupTime || 'Not set'}
                      </span>
                    </div>
                  </div>
                ))}
                {claimedDonations.length === 0 && (
                  <p className="text-slate text-sm text-center py-4">No recent claims</p>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/all-claims" className="text-teal hover:underline text-sm flex items-center justify-center">
                  View All Claims <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-purple mb-1">Notifications</h2>
                  <p className="text-slate text-sm">Stay updated on available food</p>
                </div>
                <div className="bg-coral/10 p-2 rounded-full">
                  <Bell size={24} className="text-coral" />
                </div>
              </div>
              
              <div className="space-y-4">
                {mockNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${
                      notification.type === 'urgent' ? 'bg-coral/20' : 'bg-purple-light/20'
                    }`}
                  >
                    <p className={`${notification.type === 'urgent' ? 'font-medium' : ''} text-slate`}>
                      {notification.message}
                    </p>
                    <p className="text-slate/60 text-xs mt-1">{notification.time}</p>
                  </div>
                ))}
                
                {mockNotifications.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-slate">No new notifications</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <div className="bg-mint/20 p-4 rounded-lg">
                  <h3 className="font-medium text-purple mb-2">Nutrition Match</h3>
                  <p className="text-slate text-sm">
                    New high-protein meal listing available that matches your community's needs.
                  </p>
                  <Link to="/request" className="text-teal hover:underline text-sm block mt-2">
                    View Listing →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-light/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-purple mb-4 text-center">Community Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                to="/community" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-purple mb-1">Recipe Ideas</h3>
                <p className="text-slate text-sm">
                  Creative ways to prepare and serve donated food
                </p>
              </Link>
              <Link 
                to="/community" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-purple mb-1">Distribution Tips</h3>
                <p className="text-slate text-sm">
                  Best practices for food distribution from other partners
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PartnerDashboard;
