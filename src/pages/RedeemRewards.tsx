import React, { useState } from 'react';
import { useToast } from '../components/ui/use-toast';
import Footer from '../components/layout/Footer';
import { Gift, Star, Trophy, Award, CheckCircle, ShoppingBag, Coffee, Ticket } from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  isRedeemed: boolean;
}

const RedeemRewards = () => {
  const { toast } = useToast();
  const { points, deductPoints } = usePoints();
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Bronze Donor Badge',
      description: 'Earn this badge for your first successful donation',
      points: 100,
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      isRedeemed: false
    },
    {
      id: '2',
      title: 'Silver Donor Badge',
      description: 'Achieve this badge after 5 successful donations',
      points: 500,
      icon: <Award className="w-6 h-6 text-gray-400" />,
      isRedeemed: false
    },
    {
      id: '3',
      title: 'Gold Donor Badge',
      description: 'Earn this prestigious badge after 10 successful donations',
      points: 1000,
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      isRedeemed: false
    },
    {
      id: '4',
      title: 'Community Champion',
      description: 'Special recognition for consistent community contribution',
      points: 2000,
      icon: <Gift className="w-6 h-6 text-purple-500" />,
      isRedeemed: false
    },
    {
      id: '5',
      title: '₹500 Shopping Voucher',
      description: 'Redeem at major retail stores including Amazon, Flipkart, and more',
      points: 1500,
      icon: <ShoppingBag className="w-6 h-6 text-blue-500" />,
      isRedeemed: false
    },
    {
      id: '6',
      title: 'Restaurant Dining Coupon',
      description: '30% off at selected premium restaurants in your city',
      points: 800,
      icon: <Coffee className="w-6 h-6 text-orange-500" />,
      isRedeemed: false
    },
    {
      id: '7',
      title: 'Movie Tickets',
      description: 'Get 2 free movie tickets at PVR Cinemas',
      points: 1200,
      icon: <Ticket className="w-6 h-6 text-red-500" />,
      isRedeemed: false
    },
    {
      id: '8',
      title: '₹200 Food Delivery Coupon',
      description: 'Valid on Swiggy and Zomato orders above ₹500',
      points: 600,
      icon: <Gift className="w-6 h-6 text-green-500" />,
      isRedeemed: false
    }
  ]);

  const handleRedeem = (reward: Reward) => {
    if (points >= reward.points) {
      deductPoints(reward.points);
      toast({
        title: "Success!",
        description: `You've redeemed ${reward.title} for ${reward.points} points!`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points to redeem this reward.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Redeem Your Rewards</h1>
            <p className="text-lg text-gray-600">Turn your donation points into exciting rewards!</p>
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{points}</div>
                <div className="text-gray-600">Total Points Earned</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{Math.floor(points / 10)}</div>
                <div className="text-gray-600">Successful Donations</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{Math.floor(points / 50)}</div>
                <div className="text-gray-600">Badges Earned</div>
              </div>
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      {reward.icon}
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {reward.points} points
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{reward.title}</h3>
                  <p className="text-gray-600 mb-4">{reward.description}</p>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={points < reward.points}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                      points >= reward.points
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {points >= reward.points ? 'Redeem Now' : 'Not Enough Points'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RedeemRewards;