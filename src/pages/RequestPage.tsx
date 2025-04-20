import React, { useState, useMemo } from 'react';
import Footer from '../components/layout/Footer';
import FoodCard from '../components/ui/FoodCard';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, List, Map as MapIcon, Clock, Calendar, Phone, X } from 'lucide-react';
import { formatDate, formatDateForInput } from '../lib/dateUtils';
import { useToast } from '../hooks/use-toast';
import BridgeDivider from '../components/ui/BridgeDivider';
import { useFood } from '../contexts/FoodContext';
import FoodMap from '../components/map/FoodMap';

const RequestPage = () => {
  const { toast } = useToast();
  const { getAvailableDonations, updateDonationStatus } = useFood();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    foodType: '',
    urgency: false,
    nutritionTags: [] as string[]
  });
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [claimForm, setClaimForm] = useState({
    pickupTime: '',
    pickupDate: '',
    volunteerNeeds: '',
    sendSMS: false
  });
  
  const donations = useMemo(() => getAvailableDonations(), [getAvailableDonations]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFilters({ ...filters, [name]: checkbox.checked });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };
  
  const handleNutritionTagToggle = (tag: string) => {
    setFilters(prev => {
      const currentTags = [...prev.nutritionTags];
      if (currentTags.includes(tag)) {
        return { ...prev, nutritionTags: currentTags.filter(t => t !== tag) };
      } else {
        return { ...prev, nutritionTags: [...currentTags, tag] };
      }
    });
  };
  
  const handleClaim = (donation: any) => {
    setSelectedDonation(donation);
    setShowClaimModal(true);
  };
  
  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDonation) {
      updateDonationStatus(selectedDonation.id, 'claimed', {
        claimedBy: 'Hope NGO', // This should come from the logged-in partner's info
        pickupDate: claimForm.pickupDate,
        pickupTime: claimForm.pickupTime
      });
      toast({
        title: "Food Claimed Successfully",
        description: "The donor will be notified of your claim.",
        variant: "default",
      });
      setShowClaimModal(false);
      setSelectedDonation(null);
    }
  };
  
  const handleClaimFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setClaimForm({ ...claimForm, [name]: checkbox.checked });
    } else {
      setClaimForm({ ...claimForm, [name]: value });
    }
  };

  const filteredDonations = useMemo(() => {
    return donations.filter(donation => {
      const matchesSearch = (donation.foodType?.toLowerCase() || '').includes(filters.foodType.toLowerCase());
      const matchesFoodType = !filters.foodType || donation.foodType === filters.foodType;
      const matchesUrgency = !filters.urgency || isUrgent(donation);
      const matchesNutritionTags = filters.nutritionTags.length === 0 || 
        filters.nutritionTags.some(tag => donation.nutritionTags.includes(tag));
      
      return matchesSearch && matchesFoodType && matchesUrgency && matchesNutritionTags;
    });
  }, [donations, filters]);

  const isUrgent = (donation: any) => {
    const expirationDate = new Date(`${donation.expirationDate} ${donation.expirationTime || '23:59'}`);
    const now = new Date();
    const hoursDiff = Math.round((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    return hoursDiff <= 24;
  };

  const handleMarkerClick = (donation: any) => {
    setSelectedDonation(donation);
    setShowClaimModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal">Find Food for Your Community</h1>
            <p className="text-slate mt-2">Browse available food donations near you</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="relative w-full md:w-auto mb-4 md:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by food type" 
                  className="pl-10 pr-4 py-2 border border-purple-light/30 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal"
                  name="foodType"
                  value={filters.foodType}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-teal text-white' : 'bg-gray-100 text-slate'}`}
                >
                  <List size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('map')} 
                  className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-teal text-white' : 'bg-gray-100 text-slate'}`}
                >
                  <MapIcon size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 bg-purple-light/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-purple">Filters</h2>
                  <Filter size={18} className="text-purple" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Food Type</label>
                    <select
                      value={filters.foodType}
                      onChange={(e) => setFilters(prev => ({ ...prev, foodType: e.target.value }))}
                      className="block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                    >
                      <option value="">All Types</option>
                      <option value="Cooked Food">Cooked Food</option>
                      <option value="Packaged Food">Packaged Food</option>
                      <option value="Fresh Produce">Fresh Produce</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Bakery">Bakery</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.urgency}
                        onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.checked }))}
                        className="rounded text-purple focus:ring-purple/20"
                      />
                      <span className="text-sm text-slate">Urgent (Expires within 24h)</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Nutrition Tags</label>
                    <div className="space-y-2">
                      {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'].map(tag => (
                        <label key={tag} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.nutritionTags.includes(tag)}
                            onChange={(e) => {
                              setFilters(prev => ({
                                ...prev,
                                nutritionTags: e.target.checked
                                  ? [...prev.nutritionTags, tag]
                                  : prev.nutritionTags.filter(t => t !== tag)
                              }));
                            }}
                            className="rounded text-purple focus:ring-purple/20"
                          />
                          <span className="text-sm text-slate">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setFilters({
                      foodType: '',
                      urgency: false,
                      nutritionTags: []
                    })}
                    className="text-teal hover:underline text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
              
              <div className="md:col-span-3">
                {viewMode === 'list' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDonations.map((donation) => (
                      <FoodCard
                        key={donation.id}
                        title={donation.foodType}
                        quantity={`${donation.quantity} ${donation.quantityUnit}`}
                        expiration={formatDate(donation.expirationDate)}
                        location={donation.pickupLocation}
                        nutritionTags={donation.nutritionTags}
                        isUrgent={isUrgent(donation)}
                        onAction={() => handleClaim(donation)}
                        actionLabel="Claim"
                        donor={donation.donorName}
                        foodTypeId={donation.foodType}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
                    <FoodMap 
                      donations={filteredDonations} 
                      onMarkerClick={handleMarkerClick}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <BridgeDivider />
          
          <div className="bg-teal/10 rounded-xl p-6 mb-8 text-center">
            <h2 className="text-xl font-semibold text-teal mb-4">Need Something Specific?</h2>
            <p className="text-slate mb-6 max-w-2xl mx-auto">
              If you're looking for specific food items or have urgent needs that aren't currently listed, 
              we can help you connect with potential donors.
            </p>
            <Link to="/community" className="btn-secondary inline-flex items-center">
              Post Request in Community Hub
            </Link>
          </div>
        </div>
      </main>
      
      {showClaimModal && selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-lg animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-purple">Claim Food</h2>
                <button 
                  onClick={() => setShowClaimModal(false)}
                  className="text-slate hover:text-purple"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-purple-light/10 p-3 rounded-lg mb-4">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                      <img 
                        src={selectedDonation.photo || 'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'}
                        alt={selectedDonation.foodType} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple">{selectedDonation.foodType}</h3>
                      <p className="text-sm text-slate">{selectedDonation.quantity} {selectedDonation.quantityUnit}</p>
                      <div className="flex items-center text-sm text-slate mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{selectedDonation.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleClaimSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupDate" className="block text-sm font-medium text-slate mb-1">
                          Pickup Date *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate">
                            <Calendar size={18} />
                          </div>
                          <input
                            type="date"
                            id="pickupDate"
                            name="pickupDate"
                            required
                            value={claimForm.pickupDate}
                            onChange={handleClaimFormChange}
                            min={formatDateForInput(new Date())}
                            className="pl-10 block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="pickupTime" className="block text-sm font-medium text-slate mb-1">
                          Pickup Time *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate">
                            <Clock size={18} />
                          </div>
                          <input
                            type="time"
                            id="pickupTime"
                            name="pickupTime"
                            required
                            value={claimForm.pickupTime}
                            onChange={handleClaimFormChange}
                            className="pl-10 block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="volunteerNeeds" className="block text-sm font-medium text-slate mb-1">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="volunteerNeeds"
                        name="volunteerNeeds"
                        value={claimForm.volunteerNeeds}
                        onChange={handleClaimFormChange}
                        rows={3}
                        placeholder="Any special instructions or requirements for pickup"
                        className="block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sendSMS" 
                        name="sendSMS" 
                        checked={claimForm.sendSMS}
                        onChange={handleClaimFormChange}
                        className="h-4 w-4 text-teal border-purple-light/30 rounded"
                      />
                      <div className="ml-2">
                        <label htmlFor="sendSMS" className="text-sm font-medium text-slate">
                          Receive SMS Updates
                        </label>
                        <p className="text-xs text-slate/70">
                          Get text notifications about this claim
                        </p>
                      </div>
                    </div>
                    
                    {claimForm.sendSMS && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate">
                            <Phone size={18} />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            placeholder="+91 XXXXX XXXXX"
                            className="pl-10 block w-full rounded-md border border-purple-light/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setShowClaimModal(false)}
                      className="btn-outline py-2"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-secondary py-2"
                    >
                      Confirm Claim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default RequestPage;
