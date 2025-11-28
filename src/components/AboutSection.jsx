// src/components/AboutSection.jsx

import React from 'react';
import { Building2, Users, TrendingUp, Globe, ChevronRight } from 'lucide-react';
import { iconMap } from '../utils/iconMapper';
import AboutImageRotator from './AboutImageRotator'; // <-- new import

const AboutSection = ({ data, branding }) => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Image Collage (rotating one card every 3s) */}
       <div className="relative">
  <AboutImageRotator intervalMs={2000} className="max-w-[540px]" />
  <div className="absolute -bottom-6 -right-6 bg-white px-6 py-4 rounded-2xl shadow-2xl border-4 border-blue-100">
    <p className="text-4xl font-bold text-blue-600">{branding.yearsInBusiness}</p>
    <p className="text-sm text-gray-600 font-semibold">Years Strong</p>
  </div>
</div>

          {/* Right Side - Content */}
          <div>
            <span className="text-blue-600 font-semibold text-lg mb-2 block">{data.badge}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{data.title}</h2>
            {data.description.map((para, index) => (
              <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
                {para}
              </p>
            ))}
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center">
              Learn More About Us
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {data.highlights.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group hover:scale-105 transform border border-blue-50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Icon size={32} className="text-white" />
                </div>
                <p className="font-semibold text-gray-900">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
