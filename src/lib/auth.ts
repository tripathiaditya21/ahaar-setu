import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      user: result.user,
      error: null
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'An error occurred during sign in'
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An error occurred during sign out' };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
}; 