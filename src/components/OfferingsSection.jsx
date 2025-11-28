// src/components/OfferingsSection.jsx - Updated with navigation

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { iconMap } from '../utils/iconMapper';

const OfferingsSection = ({ data }) => {
  // Function to create URL-friendly slug
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleOfferingClick = (offering) => {
    const slug = createSlug(offering.title);
    // Navigate to offering detail page
    window.location.href = `/offering/${slug}`;
  };

  return (
    <section id="offerings" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-lg mb-2 block">{data.badge}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.services.map((offering, index) => {
            const Icon = iconMap[offering.icon];
            return (
              <div 
                key={index} 
                onClick={() => handleOfferingClick(offering)}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${offering.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${offering.gradient} rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={40} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-white/90 transition-colors">
                    {offering.description}
                  </p>
                  
                  <button className="flex items-center text-blue-600 font-semibold group-hover:text-white transition-colors">
                    Explore More
                    <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;