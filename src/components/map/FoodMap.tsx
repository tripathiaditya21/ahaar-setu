import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet with React
// This is needed because Leaflet's default marker icons don't work properly with React
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Set default icon for all markers
L.Marker.prototype.options.icon = icon;

// Custom marker icon for food donations
const foodIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div class="bg-teal text-white rounded-full p-2 shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Custom marker icon for urgent food donations
const urgentFoodIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div class="bg-coral text-white rounded-full p-2 shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Component to handle map center updates
function MapCenterUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface FoodDonation {
  id: string;
  foodType: string;
  quantity: number;
  quantityUnit: string;
  expirationDate: string;
  expirationTime?: string;
  location: string;
  status: 'available' | 'claimed' | 'delivered';
  nutritionTags: string[];
  photo?: string;
  donor: string;
  claimedBy?: string;
  claimDate?: string;
  pickupDate?: string;
  pickupTime?: string;
  createdAt: string;
  coordinates?: [number, number]; // [latitude, longitude]
}

interface FoodMapProps {
  donations: FoodDonation[];
  onMarkerClick?: (donation: FoodDonation) => void;
  center?: [number, number];
  zoom?: number;
}

const FoodMap: React.FC<FoodMapProps> = ({ 
  donations, 
  onMarkerClick, 
  center = [20.5937, 78.9629], // Default center (India)
  zoom = 5 
}) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapReady, setMapReady] = useState(false);
  
  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);
  
  // Add CSS for custom markers and ensure Leaflet CSS is loaded
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .leaflet-container {
        height: 100%;
        width: 100%;
        min-height: 600px;
      }
      .custom-marker {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .leaflet-popup-content {
        margin: 0.75rem;
      }
      .leaflet-popup {
        z-index: 1000;
      }
      .leaflet-popup-close-button {
        padding: 8px !important;
      }
    `;
    document.head.appendChild(style);
    
    // Set map as ready after a short delay to ensure CSS is loaded
    setTimeout(() => setMapReady(true), 100);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Function to check if a donation is urgent (expires within 24 hours)
  const isUrgent = (donation: FoodDonation) => {
    const expirationDate = new Date(`${donation.expirationDate} ${donation.expirationTime || '23:59'}`);
    const now = new Date();
    const hoursDiff = Math.round((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    return hoursDiff <= 24;
  };
  
  // Function to handle marker click
  const handleMarkerClick = (donation: FoodDonation) => {
    if (onMarkerClick) {
      onMarkerClick(donation);
    }
  };
  
  if (!mapReady) {
    return <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-lg" />;
  }
  
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden relative">
      <MapContainer 
        center={userLocation || center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=Z98K9uocVu8gqgVFeeNW`}
        />
        
        {/* Update map center when user location changes */}
        {userLocation && <MapCenterUpdater center={userLocation} />}
        
        {/* User location marker */}
        {userLocation && (
          <Marker 
            position={userLocation} 
            icon={icon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-purple">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Food donation markers */}
        {donations.map((donation) => {
          // If donation doesn't have coordinates, skip it
          if (!donation.coordinates) return null;
          
          return (
            <Marker 
              key={donation.id}
              position={donation.coordinates}
              icon={isUrgent(donation) ? urgentFoodIcon : foodIcon}
              eventHandlers={{
                click: (e) => {
                  // Prevent the default popup from opening
                  e.target.closePopup();
                  // Call the click handler directly
                  handleMarkerClick(donation);
                }
              }}
            />

          );
        })}
      </MapContainer>
    </div>
  );
};

export default FoodMap;