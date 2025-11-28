// src/components/ClientsSection.jsx

import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

const ClientsSection = ({ data }) => {
  const [currentClient, setCurrentClient] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClient((prev) => (prev + 1) % data.list.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.list.length]);

  return (
    <section id="clients" className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-lg mb-2 block">{data.badge}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-xl text-gray-600">{data.description}</p>
        </div>

        {/* Animated Client Carousel */}
        <div className="relative h-64 mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            {data.list.map((client, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-700 ${
                  index === currentClient
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-75'
                }`}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-blue-100 min-w-[300px]">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Award size={48} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 text-center">{client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.list.map((client, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border border-gray-100 hover:border-blue-200 transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Award size={32} className="text-white" />
              </div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                {client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;