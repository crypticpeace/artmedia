// src/components/Footer.jsx

import React from 'react';
import { iconMap } from '../utils/iconMapper';

const Footer = ({ branding, data }) => {
  return (
    <footer className="bg-white border-t-2 border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">{branding.logo}</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block leading-tight">{branding.name} Ads</span>
                <span className="text-xs text-blue-600 font-semibold">{branding.tagline}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">{data.description}</p>
            <div className="flex space-x-3">
              {data.socialMedia.map((social, index) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} className="text-blue-600 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {data.quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={`#${link.toLowerCase().replace(/\s+/g, '')}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Our Services</h3>
            <ul className="space-y-2">
              {data.services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            {data.copyright} | Developed by <span className="text-blue-600 font-semibold">{data.developer}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;