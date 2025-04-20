import React, { useState } from 'react';
import { useFood } from '../contexts/FoodContext';

import Footer from '../components/layout/Footer';
import { Search, Filter, MapPin, Calendar, Clock, ChevronDown } from 'lucide-react';
import { formatDate } from '../lib/dateUtils';

const AllDonationsPage = () => {
  const { donations } = useFood();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      (donation.foodType?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (donation.pickupLocation?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-purple mb-8">All Donations</h1>
            
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate" size={20} />
                  <input
                    type="text"
                    placeholder="Search by food type or location..."
                    className="w-full pl-10 pr-4 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <select
                    className="appearance-none pl-4 pr-10 py-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20 bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="claimed">Claimed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate" size={20} />
                </div>
              </div>
            </div>

            {/* Donations List */}
            <div className="space-y-4">
              {filteredDonations.map((donation) => (
                <div key={donation.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <MapPin className="text-slate" size={16} /> {donation.pickupLocation}
                      <h3 className="text-xl font-semibold text-purple mb-2">{donation.foodType}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-teal" />
                          <span className="font-medium">{donation.foodType}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-coral" />
                          <span>Expires: {formatDate(donation.expirationDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-yellow" />
                          <span>{donation.quantity} kg</span>
                        </div>
                      </div>
                      {donation.nutritionTags && donation.nutritionTags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {donation.nutritionTags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-light/20 text-purple rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        donation.status === 'available' ? 'bg-mint/20 text-teal' :
                        donation.status === 'claimed' ? 'bg-yellow/20 text-slate' :
                        'bg-coral/20 text-coral'
                      }`}>
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllDonationsPage;