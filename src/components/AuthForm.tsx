import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext';

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'donor' | 'partner' | null>(null);
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., example@domain.com)');
      return;
    }

    setLoading(true);

    try {
      if (!selectedRole) {
        setError('Please select a role (Donor or Community Partner)');
        return;
      }

      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await userCredential.user.updateProfile({
          displayName: name
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      setUserRole(selectedRole);
      navigate(selectedRole === 'donor' ? '/donor-dashboard' : '/partner-dashboard');
    } catch (err) {
      if (err instanceof Error) {
        // Provide more user-friendly error messages
        const errorMessage = err.message.includes('auth/invalid-email')
          ? 'Please enter a valid email address'
          : err.message;
        setError(errorMessage);
      } else {
        setError('An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple to-purple-light p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple to-purple-light">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            {isSignUp ? 'Join Ahaar-Setu to make a difference' : 'Sign in to continue your journey'}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md text-sm text-red-700 animate-fade-in">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-lg border ${selectedRole === 'donor' ? 'bg-purple text-white' : 'border-gray-300'}`}
                onClick={() => setSelectedRole('donor')}
              >
                I'm a Donor
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-lg border ${selectedRole === 'partner' ? 'bg-purple text-white' : 'border-gray-300'}`}
                onClick={() => setSelectedRole('partner')}
              >
                Community Partner
              </button>
            </div>
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-purple to-purple-light hover:from-purple hover:to-purple-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple font-medium text-sm"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={async () => {
            setLoading(true);
            setError('');
            const { user, error } = await signInWithGoogle();
            setLoading(false);
            
            if (error) {
              setError(error);
              return;
            }

            if (user && selectedRole) {
              setUserRole(selectedRole);
              navigate(selectedRole === 'donor' ? '/donor-dashboard' : '/partner-dashboard');
            }
          }}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors duration-200"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};