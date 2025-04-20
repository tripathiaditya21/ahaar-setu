
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream relative">
      <div className="bridge-divider"></div>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="h-10 w-10 mr-2 bg-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-purple font-bold text-xl">Aahaar Setu</span>
            </Link>
            <p className="text-slate mb-4">
              Connecting surplus food to those in need, building bridges of nourishment and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-teal hover:text-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-teal hover:text-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-teal hover:text-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-purple">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate hover:text-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate hover:text-purple transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/donate" className="text-slate hover:text-purple transition-colors">Donate Food</Link>
              </li>
              <li>
                <Link to="/request" className="text-slate hover:text-purple transition-colors">Request Food</Link>
              </li>
              <li>
                <Link to="/community" className="text-slate hover:text-purple transition-colors">Community Hub</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-purple">Contact Us</h3>
            <p className="text-slate mb-2">Have questions or feedback?</p>
            <Link to="/team" className="text-teal hover:text-purple transition-colors underline">
              Reach out to our team
            </Link>
            <div className="mt-6">
              <div className="inline-flex items-center px-3 py-1 bg-purple-light/30 rounded-full">
                <span className="text-sm text-purple flex items-center">
                  Made with <Heart size={14} className="mx-1 text-coral" /> in India
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-light/30 mt-8 pt-6 text-center">
          <p className="text-slate text-sm">
            &copy; {new Date().getFullYear()} Aahaar Setu. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link to="/privacy" className="text-sm text-teal hover:text-purple transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-teal hover:text-purple transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
