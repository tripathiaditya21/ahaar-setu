import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

export const logActivity = async (type: 'donation' | 'claim', description: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be logged in to log activities');

  try {
    await addDoc(collection(db, 'activities'), {
      userId: user.uid,
      type,
      description,
      date: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
}; 