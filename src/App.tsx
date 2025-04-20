import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { FoodProvider } from './contexts/FoodContext';
import { PointsProvider } from './contexts/PointsContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import { AuthForm } from './components/AuthForm';
import { UserProfile } from './components/UserProfile';
import { useAuth } from './contexts/AuthContext';

// Import pages
import Home from './pages/Home';
import DonatePage from './pages/DonatePage';
import RequestPage from './pages/RequestPage';
import DonorDashboard from './pages/DonorDashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import Community from './pages/Community';
import AllDonationsPage from './pages/AllDonationsPage';
import AllClaimsPage from './pages/AllClaimsPage';
import About from './pages/About';
import RedeemRewards from './pages/RedeemRewards';
import Team from './pages/Team';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'donor' | 'partner';
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { user, userRole } = useAuth();
  
  if (!user) return <Navigate to="/auth" />;
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'donor' ? '/donor-dashboard' : '/partner-dashboard'} />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <PointsProvider>
        <FoodProvider>
          <Router basename="/Ahaar-Setu">
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/auth" element={<AuthForm />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/donor-dashboard" element={<PrivateRoute requiredRole="donor"><DonorDashboard /></PrivateRoute>} />
                <Route path="/partner-dashboard" element={<PrivateRoute requiredRole="partner"><PartnerDashboard /></PrivateRoute>} />
                <Route path="/community" element={<Community />} />
                <Route path="/all-donations" element={<AllDonationsPage />} />
                <Route path="/all-claims" element={<AllClaimsPage />} />
                <Route path="/rewards" element={<RedeemRewards />} />
                <Route path="/redeem-rewards" element={<RedeemRewards />} />
                <Route path="/team" element={<Team />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </FoodProvider>
      </PointsProvider>
    </AuthProvider>
  );
};

export default App;
