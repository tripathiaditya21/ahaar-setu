import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Search, Filter, MapPin, Calendar, Tag } from 'lucide-react';
import { useFood } from '../contexts/FoodContext';
import { formatDate } from '../lib/dateUtils';

const AllClaimsPage = () => {
  const { getClaimedDonations } = useFood();
  const [filters, setFilters] = useState({
    foodType: '',
    dateRange: 'all',
    status: 'all'
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const claimedDonations = getClaimedDonations();
  const filteredClaims = claimedDonations.filter(donation => {
    if (filters.foodType && !donation.foodType.toLowerCase().includes(filters.foodType.toLowerCase())) {
      return false;
    }
    if (filters.dateRange !== 'all') {
      const claimDate = new Date(donation.claimDate || '');
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - claimDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (filters.dateRange === 'today' && daysDiff > 0) return false;
      if (filters.dateRange === 'week' && daysDiff > 7) return false;
      if (filters.dateRange === 'month' && daysDiff > 30) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal">All Claims</h1>
            <p className="text-slate mt-2">View and manage your food claims</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="bg-purple-light/10 p-4 rounded-lg">
                  <h2 className="font-semibold text-purple mb-4">Filters</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate mb-1">Food Type</label>
                      <input
                        type="text"
                        name="foodType"
                        value={filters.foodType}
                        onChange={handleFilterChange}
                        placeholder="Search by food type"
                        className="block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate mb-1">Date Range</label>
                      <select
                        name="dateRange"
                        value={filters.dateRange}
                        onChange={handleFilterChange}
                        className="block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="space-y-4">
                  {filteredClaims.map(donation => (
                    <div key={donation.id} className="bg-white border border-purple-light/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-purple">
                            {donation.quantity} {donation.quantityUnit} {(donation.foodType || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <div className="flex items-center text-sm text-slate mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{donation.pickupLocation}</span>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow/20 text-yellow px-2 py-1 rounded-full">
                          Claimed
                        </span>
                      </div>

                      <div className="mt-2 flex items-center text-sm text-slate">
                        <Calendar size={14} className="mr-1" />
                        <span>Pickup: {formatDate(donation.pickupDate)} at {donation.pickupTime}</span>
                      </div>

                      {donation.nutritionTags.length > 0 && (
                        <div className="mt-2 flex items-center">
                          <Tag size={14} className="mr-1 text-mint" />
                          <div className="flex flex-wrap gap-1">
                            {donation.nutritionTags.map(tag => (
                              <span key={tag} className="text-xs bg-mint/20 text-slate rounded-full px-2 py-0.5">
                                {tag.replace(/-/g, ' ').replace(/w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-2 text-sm text-slate">
                        <p className="flex items-center gap-1">From: <span className="font-medium">{donation.donorName || donation.donor}</span></p>
                        <p>Claimed on: {donation.pickupDate ? formatDate(donation.pickupDate) : 'Not available'}</p>
                      </div>
                    </div>
                  ))}
                  {filteredClaims.length === 0 && (
                    <p className="text-center text-slate py-8">No claims found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllClaimsPage;