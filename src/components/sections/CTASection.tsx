
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonLink: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButtonLabel,
  primaryButtonLink,
  secondaryButtonLabel,
  secondaryButtonLink
}) => {
  return (
    <section className="cta-gradient section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-mint/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <HeartHandshake size={32} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to={primaryButtonLink} className="btn-donor bg-white text-teal flex items-center justify-center group shadow-lg">
              {primaryButtonLabel} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {secondaryButtonLabel && secondaryButtonLink && (
              <Link to={secondaryButtonLink} className="btn-outline border-white text-white flex items-center justify-center group hover:bg-white/10 transition-colors">
                {secondaryButtonLabel} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
