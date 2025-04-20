import React from 'react';
import Footer from '../components/layout/Footer';
import { Mail, Linkedin } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Bhumi Prasad',

      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>.hair{animation:wave 2s ease-in-out infinite;}@keyframes wave{0%,100%{d:path("M20 30 Q50 10 80 30")}50%{d:path("M20 25 Q50 5 80 25")}}</style><circle cx="50" cy="40" r="25" fill="%23FFB6C1"/><path d="M50 70 Q50 85 50 100 T50 85" stroke="%23333" fill="none"/><circle cx="40" cy="35" r="5" fill="%23333"/><circle cx="60" cy="35" r="5" fill="%23333"/><path d="M40 50 Q50 60 60 50" stroke="%23333" fill="none"/><path class="hair" d="M20 30 Q50 10 80 30" stroke="%23333" fill="none"/><path d="M35 25 Q50 35 65 25" stroke="%23333" fill="none"/></svg>',
      bio: 'Passionate about reducing food waste and creating sustainable solutions for food security.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'priya@ahaarsetu.org'
    },
    {
      name: 'Aditya Tripathi',

      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>.glasses{animation:adjust 3s ease-in-out infinite;}@keyframes adjust{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}</style><circle cx="50" cy="40" r="25" fill="%23A0D8EF"/><path d="M50 70 Q50 85 50 100 T50 85" stroke="%23333" fill="none"/><circle cx="40" cy="35" r="5" fill="%23333"/><circle cx="60" cy="35" r="5" fill="%23333"/><path d="M40 50 Q50 55 60 50" stroke="%23333" fill="none"/><path d="M30 25 Q50 15 70 25" stroke="%23333" fill="none"/><g class="glasses"><path d="M35 35 L65 35" stroke="%23333" fill="none"/><rect x="33" y="32" width="14" height="6" rx="3" stroke="%23333" fill="none"/><rect x="53" y="32" width="14" height="6" rx="3" stroke="%23333" fill="none"/></g></svg>',
      bio: 'Technology enthusiast working to bridge the gap between surplus food and those in need.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'rahul@ahaarsetu.org'
    },
    {
      name: 'Chitrasen Singh',

      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>.smile{animation:beam 2s ease-in-out infinite;}@keyframes beam{0%,100%{d:path("M40 50 Q50 55 60 50")}50%{d:path("M40 50 Q50 60 60 50")}}</style><circle cx="50" cy="40" r="25" fill="%23B19CD9"/><path d="M50 70 Q50 85 50 100 T50 85" stroke="%23333" fill="none"/><circle cx="40" cy="35" r="5" fill="%23333"/><circle cx="60" cy="35" r="5" fill="%23333"/><path class="smile" d="M40 50 Q50 55 60 50" stroke="%23333" fill="none"/><path d="M25 30 Q50 20 75 30" stroke="%23333" fill="none"/><path d="M30 28 L45 23 M55 23 L70 28" stroke="%23333" fill="none"/></svg>',
      bio: 'Building and nurturing relationships with NGOs, restaurants, and community partners.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'anita@ahaarsetu.org'
    },
    {
      name: 'Sajal Dwivedi',

      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>.wink{animation:blink 4s ease-in-out infinite;}@keyframes blink{0%,90%,100%{ry:5;rx:5}95%{ry:1;rx:5}}</style><circle cx="50" cy="40" r="25" fill="%2390EE90"/><path d="M50 70 Q50 85 50 100 T50 85" stroke="%23333" fill="none"/><ellipse class="wink" cx="40" cy="35" rx="5" ry="5" fill="%23333"/><circle cx="60" cy="35" r="5" fill="%23333"/><path d="M40 50 Q50 55 60 50" stroke="%23333" fill="none"/><path d="M20 25 Q50 15 80 25" stroke="%23333" fill="none"/><path d="M25 20 L45 25 M55 25 L75 20" stroke="%23333" fill="none"/></svg>',
      bio: 'Ensuring smooth operations and efficient food distribution across the network.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'vikram@ahaarsetu.org'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-purple mb-4">Meet Our Team</h1>
            <p className="text-slate max-w-2xl mx-auto">
              We are a dedicated team of professionals working together to reduce food waste 
              and ensure that surplus food reaches those who need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple">{member.name}</h3>

                  <p className="text-slate mt-3 text-sm">{member.bio}</p>
                  
                  <div className="mt-4 flex space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple hover:text-purple-dark transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="text-purple hover:text-purple-dark transition-colors"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-teal/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-teal mb-4">Join Our Mission</h2>
            <p className="text-slate max-w-2xl mx-auto mb-6">
              We're always looking for passionate individuals who want to make a difference 
              in reducing food waste and fighting hunger. Get in touch if you'd like to 
              contribute to our cause.
            </p>
            <a
              href="mailto:careers@ahaarsetu.org"
              className="inline-flex items-center bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-dark transition-colors"
            >
              <Mail size={20} className="mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;