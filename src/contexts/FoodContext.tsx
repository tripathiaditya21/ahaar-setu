import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface FoodDonation {
  id: string;
  foodType: string;
  description: string;
  donorID: string;
  donorName: string;
  pickupLocation: string;
  quantity: number;
  quantityUnit: string;
  nutritionTags: string[];
  expirationDate: string;
  expirationTime: string;
  status?: 'available' | 'claimed' | 'expired';
  claimedBy?: string;
  pickupDate?: string;
  pickupTime?: string;
  createdAt?: any; // Can be string or Timestamp
}

interface FoodContextType {
  donations: FoodDonation[];
  addDonation: (donation: Omit<FoodDonation, 'id' | 'status' | 'createdAt'>) => void;
  updateDonationStatus: (id: string, status: FoodDonation['status'], claimDetails?: { claimedBy: string; pickupDate: string; pickupTime: string }) => void;
  getAvailableDonations: () => FoodDonation[];
  getClaimedDonations: () => FoodDonation[];
  getRecentDonations: (limit?: number) => FoodDonation[];
  getUserDonations: (userId: string) => FoodDonation[];
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const { user } = useAuth();

  // Fetch donations from Firestore
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        console.log('Attempting to fetch donations...');
        const donationsRef = collection(db, 'donations');
        console.log('Got collection reference');
        
        // Fetch all donations
        const q = query(
          donationsRef,
          orderBy('createdAt', 'desc')
        );
        console.log('Created query');
        
        const querySnapshot = await getDocs(q);
        console.log('Got query snapshot, number of docs:', querySnapshot.size);
        
        const donationsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FoodDonation[];
        
        console.log('Processed donations:', donationsList);
        setDonations(donationsList);
      } catch (error) {
        console.error('Error fetching donations:', {
          error,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          errorStack: error instanceof Error ? error.stack : undefined
        });
      }
    };

    if (user?.uid) {
      fetchDonations();
    } else {
      setDonations([]);
    }
  }, [user]);

  const addDonation = async (donation: Omit<FoodDonation, 'id' | 'status' | 'createdAt'>) => {
    try {
      console.log('Starting addDonation with data:', donation);
      
      // Validate required fields
      if (!donation.foodType) {
        throw new Error('Food type is required');
      }
      if (!donation.pickupLocation) {
        throw new Error('Pickup location is required');
      }

      const donationsRef = collection(db, 'donations');
      console.log('Got collection reference');
      
      const newDonation = {
        ...donation,
        foodType: donation.foodType.trim(), // Ensure foodType is properly formatted
        status: 'available',
        createdAt: Timestamp.now()
      };
      console.log('Prepared new donation:', newDonation);
      
      const docRef = await addDoc(donationsRef, newDonation);
      console.log('Successfully added document with ID:', docRef.id);
      
      const createdDonation = {
        id: docRef.id,
        ...newDonation
      } as FoodDonation;
      
      setDonations(prev => [createdDonation, ...prev]);
      return createdDonation;
    } catch (error) {
      console.error('Detailed error in addDonation:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        donation
      });
      throw error;
    }
  };

  const updateDonationStatus = async (
    id: string, 
    status: FoodDonation['status'],
    claimDetails?: { claimedBy: string; pickupDate: string; pickupTime: string }
  ) => {
    try {
      const donationRef = doc(db, 'donations', id);
      const updateData = { status, ...claimDetails };
      await updateDoc(donationRef, updateData);
      
      setDonations(prev =>
        prev.map(donation =>
          donation.id === id
            ? { ...donation, ...updateData }
            : donation
        )
      );
    } catch (error) {
      console.error('Error updating donation:', error);
      throw error;
    }
  };

  const getAvailableDonations = () => {
    console.log('Getting available donations, total donations:', donations.length);
    const availableDonations = donations.filter(donation => {
      console.log('Checking donation:', {
        id: donation.id,
        status: donation.status,
        foodType: donation.foodType,
        createdAt: donation.createdAt
      });
      return donation.status === 'available';
    });
    console.log('Available donations:', availableDonations.length);
    return availableDonations;
  };

  const getClaimedDonations = () => {
    return donations.filter(donation => donation.status === 'claimed');
  };

  const getRecentDonations = (limit: number = 5) => {
    return [...donations]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  const getUserDonations = (userId: string) => {
    return donations.filter(donation => donation.donorID === userId);
  };

  return (
    <FoodContext.Provider value={{
      donations,
      addDonation,
      updateDonationStatus,
      getAvailableDonations,
      getClaimedDonations,
      getRecentDonations,
      getUserDonations
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};