import React, { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';
import { Calendar, Clock, MapPin, Camera, Tag, CheckCircle, AlertTriangle, Info, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { useFood } from '../contexts/FoodContext';
import { usePoints } from '../contexts/PointsContext';
import { useAuth } from '../contexts/AuthContext';
import { foodImages } from '../assets/foodImages';
import LocationPicker from '../components/map/LocationPicker';

const foodCategories = [
  { id: 'fruits', label: 'Fresh Produce', image: foodImages.fruits, description: 'Fresh fruits, vegetables, and herbs' },
  { id: 'dairy', label: 'Dairy', image: foodImages.dairy, description: 'Milk, cheese, yogurt, and other dairy products' },
  { id: 'bakery', label: 'Bakery', image: foodImages.bakery, description: 'Bread, pastries, and other baked goods' },
  { id: 'cooked', label: 'Cooked Food', image: foodImages.cooked, description: 'Prepared meals and cooked dishes' },
  { id: 'packaged', label: 'Packaged Food', image: foodImages.packaged, description: 'Canned, boxed, and packaged foods' }
];

const DonatePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addDonation, getRecentDonations } = useFood();
  const { addPoints } = usePoints();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to donate food',
        variant: 'destructive'
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    foodType: '',
    expirationDate: '',
    expirationTime: '',
    location: '',
    coordinates: null as [number, number] | null,
    nutritionTags: [],
    description: '',
    quantity: '',
    quantityUnit: 'kg', // Default unit
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  const nutritionTagOptions = [
    { value: 'high-protein', label: 'High Protein' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'dairy-free', label: 'Dairy Free' },
    { value: 'low-sugar', label: 'Low Sugar' }
  ];

  const recentDonations = getRecentDonations(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleNutritionTagChange = (tagValue: string) => {
    setFormData(prev => {
      const currentTags = [...prev.nutritionTags];
      if (currentTags.includes(tagValue)) {
        return { ...prev, nutritionTags: currentTags.filter(tag => tag !== tagValue) };
      } else {
        return { ...prev, nutritionTags: [...currentTags, tagValue] };
      }
    });
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.foodType) errors.foodType = 'Food type is required';
      if (!formData.expirationDate) errors.expirationDate = 'Expiration date is required';
      if (!formData.quantity) errors.quantity = 'Quantity is required';
    } else if (step === 2) {
      if (!formData.location) errors.location = 'Pickup location is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(formErrors).length === 0) {
      try {
        await addDonation({
          foodType: formData.foodType || '',
          description: formData.description || '',
          donorID: user?.uid || '',
          donorName: user?.displayName || 'Anonymous',
          pickupLocation: formData.location?.trim() || '',
          coordinates: formData.coordinates,
          quantity: Number(formData.quantity),
          quantityUnit: formData.quantityUnit,
          nutritionTags: formData.nutritionTags,
          expirationDate: formData.expirationDate,
          expirationTime: formData.expirationTime || '23:59'
        });
        
        addPoints(10); // Add 10 points for each donation
        toast({
          title: "Success!",
          description: "Your food donation has been listed successfully.",
        });
        navigate('/donor-dashboard');
      } catch (error) {
        console.error('Error adding donation:', error);
        // Log the data we're trying to send
        console.log('Attempted to add donation with data:', {
          foodType: formData.foodType || '',
          description: formData.description || '',
          donorID: user?.uid || '',
          donorName: user?.displayName || 'Anonymous',
          pickupLocation: formData.location?.trim() || '',
          quantity: Number(formData.quantity),
          quantityUnit: formData.quantityUnit,
          nutritionTags: formData.nutritionTags,
          expirationDate: formData.expirationDate,
          expirationTime: formData.expirationTime || '23:59'
        });
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to add donation. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const getSpoilageRisk = (): { level: 'low' | 'medium' | 'high' | 'unknown', text: string } => {
    if (!formData.expirationDate) return { level: 'unknown', text: 'Please add expiration date' };
    
    const expirationDate = new Date(`${formData.expirationDate} ${formData.expirationTime || '23:59'}`);
    const now = new Date();
    const hoursDiff = Math.round((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (hoursDiff <= 12) return { level: 'high', text: `High urgency: ${hoursDiff} hours left` };
    if (hoursDiff <= 48) return { level: 'medium', text: `Medium urgency: ${hoursDiff} hours left` };
    return { level: 'low', text: 'Low urgency: More than 48 hours left' };
  };

  const spoilageRisk = getSpoilageRisk();
  
  const getSpoilageRiskColor = () => {
    switch (spoilageRisk.level) {
      case 'high': return 'text-coral';
      case 'medium': return 'text-yellow';
      case 'low': return 'text-teal';
      default: return 'text-slate';
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFormData(prev => ({ ...prev, foodType: categoryId }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-purple">Share Your Surplus</h1>
              <p className="text-slate mt-2">List your surplus food to help those in need</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex mb-8">
                  {showLocationPicker && (
                    <LocationPicker
                      onLocationSelect={({ coordinates, address }) => {
                        setFormData(prev => ({
                          ...prev,
                          location: address,
                          coordinates: coordinates
                        }));
                        setShowLocationPicker(false);
                      }}
                      onClose={() => setShowLocationPicker(false)}
                    />
                  )}
                  <div className={`flex-1 border-b-2 pb-4 ${activeStep >= 1 ? 'border-coral' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-coral text-white' : 'bg-gray-200 text-slate'}`}>
                        1
                      </div>
                      <span className={`ml-2 ${activeStep >= 1 ? 'text-coral font-medium' : 'text-slate'}`}>Basics</span>
                    </div>
                  </div>
                  
                  <div className={`flex-1 border-b-2 pb-4 ${activeStep >= 2 ? 'border-coral' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-coral text-white' : 'bg-gray-200 text-slate'}`}>
                        2
                      </div>
                      <span className={`ml-2 ${activeStep >= 2 ? 'text-coral font-medium' : 'text-slate'}`}>Details</span>
                    </div>
                  </div>
                  
                  <div className={`flex-1 border-b-2 pb-4 ${activeStep >= 3 ? 'border-coral' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-coral text-white' : 'bg-gray-200 text-slate'}`}>
                        3
                      </div>
                      <span className={`ml-2 ${activeStep >= 3 ? 'text-coral font-medium' : 'text-slate'}`}>Review</span>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basics */}
                  {activeStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="block text-sm font-medium text-slate mb-2">Select Food Category</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {foodCategories.map(category => (
                            <div
                              key={category.id}
                              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                                selectedCategory === category.id ? 'ring-2 ring-teal' : 'hover:shadow-md'
                              }`}
                              onClick={() => handleCategorySelect(category.id)}
                            >
                              <img
                                src={category.image}
                                alt={category.label}
                                className="w-full h-32 object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                                <p className="text-white text-sm font-medium">{category.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {formErrors.foodType && <p className="text-coral text-sm mt-1">{formErrors.foodType}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-slate mb-1">Quantity</label>
                          <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                            className="w-full p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                            placeholder="Enter quantity"
                            min="0"
                            step="0.1"
                          />
                          {formErrors.quantity && <p className="text-coral text-sm mt-1">{formErrors.quantity}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate mb-1">Unit</label>
                          <select
                            value={formData.quantityUnit}
                            onChange={(e) => setFormData(prev => ({ ...prev, quantityUnit: e.target.value }))}
                            className="w-full p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                          >
                            <option value="kg">Kilograms (kg)</option>
                            <option value="g">Grams (g)</option>
                            <option value="l">Liters (l)</option>
                            <option value="ml">Milliliters (ml)</option>
                            <option value="pcs">Pieces (pcs)</option>
                            <option value="boxes">Boxes</option>
                            <option value="packets">Packets</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate mb-1">Expiration Date</label>
                          <input
                            type="date"
                            value={formData.expirationDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
                            className="w-full p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                          />
                          {formErrors.expirationDate && <p className="text-coral text-sm mt-1">{formErrors.expirationDate}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate mb-1">Expiration Time (Optional)</label>
                          <input
                            type="time"
                            value={formData.expirationTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, expirationTime: e.target.value }))}
                            className="w-full p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Details */}
                  {activeStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="block text-sm font-medium text-slate mb-1">Pickup Location</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.location}
                            className="w-full p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                            placeholder="Enter pickup address"
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={() => setShowLocationPicker(true)}
                            className="absolute right-3 top-2.5 text-slate hover:text-purple transition-colors"
                          >
                            <MapPin size={20} />
                          </button>
                        </div>
                        {formErrors.location && <p className="text-coral text-sm mt-1">{formErrors.location}</p>}
                        <p className="mt-2 text-sm text-slate">Click the map icon to select your location on the map</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate mb-1">Description (Optional)</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
                          rows={3}
                          placeholder="Add any additional details about the food donation"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate mb-1">Photo (Optional)</label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-slate/20 rounded-lg cursor-pointer hover:border-purple/20 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setFormData(prev => ({ ...prev, photo: file }));
                                }
                              }}
                              className="hidden"
                            />
                            <ImageIcon className="w-8 h-8 text-slate/40" />
                          </label>
                          {formData.photo && (
                            <div className="text-sm text-slate">
                              <p>Selected: {formData.photo.name}</p>
                              <p className="text-slate/60">{(formData.photo.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate mb-2">Nutrition Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'].map(tag => (
                            <label key={tag} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={formData.nutritionTags.includes(tag)}
                                onChange={(e) => {
                                  setFormData(prev => ({
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
                    </div>
                  )}
                  
                  {/* Step 3: Review */}
                  {activeStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-purple-light/10 p-4 rounded-lg flex items-start">
                        <div className="mr-3 mt-1">
                          <Info size={20} className="text-purple" />
                        </div>
                        <div>
                          <h3 className="font-medium text-purple">Review Your Donation</h3>
                          <p className="text-slate text-sm">
                            Please verify all details before submitting. Once submitted, Community Partners will be able to see and claim your listing.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-purple-light/20 rounded-lg p-4">
                          <h3 className="font-medium text-purple mb-3">Donation Details</h3>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate/70">Food Type:</span>
                              <span className="text-sm font-medium text-slate">
                                {formData.foodType ? formData.foodType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-slate/70">Expiration:</span>
                              <span className="text-sm font-medium text-slate">
                                {formData.expirationDate ? new Date(formData.expirationDate).toLocaleDateString() : '-'} 
                                {formData.expirationTime ? ` at ${formData.expirationTime}` : ''}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-slate/70">Location:</span>
                              <span className="text-sm font-medium text-slate">
                                {formData.location || '-'}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-slate/70">Nutrition Tags:</span>
                              <div className="flex flex-wrap justify-end gap-1 max-w-[180px]">
                                {formData.nutritionTags.length > 0 ? (
                                  formData.nutritionTags.map(tag => (
                                    <span key={tag} className="text-xs bg-mint/20 text-slate rounded-full px-2 py-0.5">
                                      {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm text-slate">-</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-purple-light/20 rounded-lg p-4">
                          <h3 className="font-medium text-purple mb-3">Spoilage Risk Assessment</h3>
                          
                          <div className="flex items-center mb-4">
                            <div className={`mr-3 ${getSpoilageRiskColor()}`}>
                              {spoilageRisk.level === 'high' && <AlertTriangle size={20} />}
                              {spoilageRisk.level === 'medium' && <Info size={20} />}
                              {spoilageRisk.level === 'low' && <CheckCircle size={20} />}
                              {spoilageRisk.level === 'unknown' && <Info size={20} />}
                            </div>
                            <span className={`font-medium ${getSpoilageRiskColor()}`}>
                              {spoilageRisk.text}
                            </span>
                          </div>
                          
                          <div className="bg-cream rounded-lg p-4">
                            <h4 className="font-medium text-purple mb-2 text-sm">Preview for Community Partners</h4>
                            <div className="border border-purple-light/30 rounded-md p-3 bg-white">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-purple">
                                    {formData.foodType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </h5>
                                  <p className="text-xs text-slate mt-1">
                                    From: {user?.displayName || 'Anonymous'}
                                  </p>
                                </div>
                                
                                {spoilageRisk.level === 'high' && (
                                  <span className="text-xs bg-coral text-white px-2 py-0.5 rounded-full">
                                    Urgent
                                  </span>
                                )}
                              </div>
                              
                              <div className="mt-2 flex items-center text-xs text-slate">
                                <MapPin size={14} className="mr-1" />
                                <span>{formData.location || 'Location not provided'}</span>
                                <span className="ml-2 bg-purple-light/20 rounded-full px-2 py-0.5">~3 km</span>
                              </div>
                              
                              {formData.nutritionTags.length > 0 && (
                                <div className="mt-2 flex items-center">
                                  <Tag size={14} className="mr-1 text-mint" />
                                  <div className="flex flex-wrap gap-1">
                                    {formData.nutritionTags.map(tag => (
                                      <span key={tag} className="text-xs bg-mint/20 text-slate rounded-full px-2 py-0.5">
                                        {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow/20 p-4 rounded-lg">
                        <h3 className="font-medium text-purple mb-2">Food Safety Reminder</h3>
                        <p className="text-slate text-sm">
                          Please ensure all food is properly stored and handled before pickup. Community Partners may contact you for additional information.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between">
                    {activeStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn-outline"
                      >
                        Back
                      </button>
                    ) : (
                      <Link to="/donor-dashboard" className="btn-outline">Cancel</Link>
                    )}
                    
                    {activeStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-secondary"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn-secondary"
                      >
                        Submit Listing
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Recent Donations Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-purple">Recent Donations</h2>
                <p className="text-slate text-sm">Your recent food donations</p>
              </div>
              <Link to="/all-donations" className="text-teal hover:underline text-sm">
                View All Donations
              </Link>
            </div>

            <div className="space-y-4">
              {recentDonations.map(donation => (
                <div key={donation.id} className="border-b border-purple-light/20 pb-3 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate">
                      {donation.foodType}
                    </span>
                    <span className="text-sm text-slate">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-slate/80">Location: {donation.location}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      donation.status === 'available' ? 'bg-teal/20 text-teal' :
                      donation.status === 'claimed' ? 'bg-yellow/20 text-yellow' :
                      'bg-purple-light/20 text-purple'
                    }`}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
              {recentDonations.length === 0 && (
                <p className="text-slate text-sm text-center py-4">No recent donations</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;
