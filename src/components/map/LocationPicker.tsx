import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
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

// Component to handle map center updates
function MapCenterUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface LocationPickerProps {
  onLocationSelect: (location: { coordinates: [number, number]; address: string }) => void;
  onClose: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, onClose }) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([20.5937, 78.9629]); // Default to India's center
  const [mapReady, setMapReady] = useState(false);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ display_name: string; lat: number; lon: number }>>([]);

  // Function to search for locations
  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search result selection
  const handleSearchResultClick = (result: { lat: number; lon: number; display_name: string }) => {
    const newPosition: [number, number] = [parseFloat(result.lat), parseFloat(result.lon)];
    setMarkerPosition(newPosition);
    setUserLocation(newPosition); // This will trigger MapCenterUpdater to update the map view
    setAddress(result.display_name);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          setMarkerPosition(newLocation);
          // Get initial address
          fetchAddress(newLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  // Add CSS for map container
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .location-picker-map {
        height: 400px;
        width: 100%;
        border-radius: 0.5rem;
      }
    `;
    document.head.appendChild(style);
    setMapReady(true);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Function to fetch address from coordinates using OpenStreetMap Nominatim
  const fetchAddress = async (coordinates: [number, number]) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Address not found');
    }
  };

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
    setMarkerPosition(newPosition);
    fetchAddress(newPosition);
  };

  const handleConfirmLocation = () => {
    if (markerPosition) {
      onLocationSelect({
        coordinates: markerPosition,
        address: address
      });
      onClose();
    }
  };

  if (!mapReady) {
    return <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple mb-4">Select Location</h2>
          <div className="relative mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchLocation(searchQuery)}
                placeholder="Search for a location..."
                className="flex-1 p-2 border border-slate/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/20"
              />
              <button
                onClick={() => searchLocation(searchQuery)}
                className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple/90 transition-colors"
              >
                Search
              </button>
            </div>
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-purple border-t-transparent rounded-full"></div>
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="absolute z-[1000] w-full mt-1 bg-white border border-slate/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full text-left px-4 py-2 hover:bg-purple/5 focus:outline-none focus:bg-purple/5 text-sm text-slate"
                  >
                    {result.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="location-picker-map mb-4">
            <MapContainer
              center={userLocation}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              onClick={handleMapClick}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=Z98K9uocVu8gqgVFeeNW`}
              />
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => {
                      const marker = e.target;
                      const position = marker.getLatLng();
                      const newPosition: [number, number] = [position.lat, position.lng];
                      setMarkerPosition(newPosition);
                      fetchAddress(newPosition);
                    },
                  }}
                />
              )}
              <MapCenterUpdater center={userLocation} />
            </MapContainer>
          </div>
          <div className="mb-4">
            <p className="text-sm text-slate mb-2">Selected Location:</p>
            <p className="text-sm font-medium text-purple">{address || 'Click on the map to select a location'}</p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate hover:text-purple transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLocation}
              disabled={!markerPosition}
              className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;