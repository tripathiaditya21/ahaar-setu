import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  type: 'donation' | 'claim';
  date: string;
  description: string;
}

export const UserProfile = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;

      try {
        const activitiesRef = collection(db, 'activities');
        const q = query(activitiesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const userActivities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Activity[];
        
        setActivities(userActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
            ) : (
              <span className="text-2xl text-gray-600">
                {user.displayName?.[0] || user.email?.[0] || '?'}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.displayName || 'User'}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Your Activities</h3>
        {loading ? (
          <p>Loading activities...</p>
        ) : activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border-b pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${
                    activity.type === 'donation' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </span>
                  <span className="text-gray-500">{activity.date}</span>
                </div>
                <p className="mt-2">{activity.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 