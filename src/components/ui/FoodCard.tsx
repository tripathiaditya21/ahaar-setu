import React from 'react';
import { MapPin, Clock, Tag } from 'lucide-react';
import { foodImages } from '../../assets/foodImages';

interface FoodCardProps {
  title: string;
  quantity: string;
  expiration: string;
  location: string;
  nutritionTags: string[];
  isUrgent?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  donor?: string;
  image?: string;
  foodTypeId?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  title,
  quantity,
  expiration,
  location,
  nutritionTags,
  isUrgent = false,
  onAction,
  actionLabel = 'View Details',
  donor,
  image,
  foodTypeId
}) => {
  // Get the appropriate image based on food type
  const getFoodImage = () => {
    if (image) return image;
    if (foodTypeId) {
      return foodImages[foodTypeId as keyof typeof foodImages] || foodImages.packaged;
    }
    return foodImages.packaged;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={getFoodImage()}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isUrgent && (
          <div className="absolute top-2 right-2 bg-coral text-white text-xs px-2 py-1 rounded-full">
            Urgent
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-purple">{title}</h3>
          <span className="text-sm text-slate">{quantity}</span>
        </div>
        
        {donor && (
          <p className="text-sm text-slate/70 mb-2">From: {donor}</p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate">
            <Clock size={14} className="mr-1" />
            <span>Expires: {expiration}</span>
          </div>
          
          <div className="flex items-center text-sm text-slate">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
          </div>
          
          {nutritionTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {nutritionTags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-mint/20 text-slate rounded-full px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {onAction && (
          <button
            onClick={onAction}
            className="mt-4 w-full bg-teal text-white py-2 rounded-lg hover:bg-teal/90 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
