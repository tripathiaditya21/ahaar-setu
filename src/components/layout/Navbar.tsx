import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  userRole?: 'donor' | 'partner' | null;
}

const Navbar: React.FC<NavbarProps> = ({ userRole: initialUserRole = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, userRole } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 mr-3 bg-gradient-to-br from-purple to-purple-light rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all duration-300">
              <Heart size={20} className="text-white fill-white/80" />
            </div>
            <div>
              <span className="text-purple font-bold text-xl">Aahaar Setu</span>
              <span className="hidden md:block text-xs text-slate ml-1 font-medium">Bridge of Nourishment</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-slate hover:text-purple font-medium transition-colors relative py-2 group ${
                location.pathname === '/' ? 'text-purple' : ''
              }`}
            >
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple to-purple-light transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                location.pathname === '/' ? 'scale-x-100' : ''
              }`}></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`text-slate hover:text-purple font-medium transition-colors relative py-2 group ${
                location.pathname === '/about' ? 'text-purple' : ''
              }`}
            >
              <span>About</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple to-purple-light transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                location.pathname === '/about' ? 'scale-x-100' : ''
              }`}></span>
            </Link>
            
            <Link 
              to="/community" 
              className={`text-slate hover:text-purple font-medium transition-colors relative py-2 group ${
                location.pathname === '/community' ? 'text-purple' : ''
              }`}
            >
              <span>Community</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple to-purple-light transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                location.pathname === '/community' ? 'scale-x-100' : ''
              }`}></span>
            </Link>
            
            <div className="flex items-center space-x-3">
              {user && (
                userRole === 'donor' ? (
                  <Link 
                    to="/donor-dashboard" 
                    className="btn-donor px-5 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <Heart size={16} className="mr-1 fill-white/50" /> Donor Dashboard
                  </Link>
                ) : userRole === 'partner' ? (
                  <Link 
                    to="/partner-dashboard" 
                    className="btn-partner px-5 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <Heart size={16} className="mr-1 fill-white/50" /> Partner Dashboard
                  </Link>
                ) : null
              )}
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 bg-purple-light/10 px-4 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-sm text-white">
                        {user.displayName?.[0] || user.email?.[0] || '?'}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{user.displayName || 'Profile'}</span>
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="bg-purple text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-dark transition-colors duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-purple hover:text-slate transition-colors p-2 rounded-full hover:bg-purple-light/10">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-5 border-t mt-3 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-slate hover:text-purple transition-colors py-3 px-2 rounded-lg ${
                  location.pathname === '/' ? 'text-purple font-medium bg-purple-light/10' : ''
                }`} 
                onClick={toggleMenu}
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                className={`text-slate hover:text-purple transition-colors py-3 px-2 rounded-lg ${
                  location.pathname === '/about' ? 'text-purple font-medium bg-purple-light/10' : ''
                }`} 
                onClick={toggleMenu}
              >
                About
              </Link>
              
              <Link 
                to="/community" 
                className={`text-slate hover:text-purple transition-colors py-3 px-2 rounded-lg ${
                  location.pathname === '/community' ? 'text-purple font-medium bg-purple-light/10' : ''
                }`} 
                onClick={toggleMenu}
              >
                Community
              </Link>
              
              <div className="flex flex-col space-y-3 pt-2">
                {user && (
                  userRole === 'donor' ? (
                    <Link 
                      to="/donor-dashboard" 
                      className="btn-donor py-3 text-center shadow-md flex items-center justify-center"
                      onClick={toggleMenu}
                    >
                      <Heart size={16} className="mr-1 fill-white/50" /> Donor Dashboard
                    </Link>
                  ) : userRole === 'partner' ? (
                    <Link 
                      to="/partner-dashboard" 
                      className="btn-partner py-3 text-center shadow-md flex items-center justify-center"
                      onClick={toggleMenu}
                    >
                      <Heart size={16} className="mr-1 fill-white/50" /> Partner Dashboard
                    </Link>
                  ) : null
                )}
                {user ? (
                  <Link
                    to="/profile"
                    className="flex items-center justify-center space-x-2 bg-purple-light/10 py-3 rounded-lg"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-sm text-white">
                          {user.displayName?.[0] || user.email?.[0] || '?'}
                        </span>
                      )}
                    </div>
                    <span className="font-medium">{user.displayName || 'Profile'}</span>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="bg-purple text-white py-3 rounded-lg font-medium hover:bg-purple-dark transition-colors duration-200 shadow-md text-center"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
