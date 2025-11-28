// src/components/HeroSection.jsx

import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

const HeroSection = ({ data }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 animate-gradient">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Video Overlay Effect */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">
            {data.badge}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fadeIn">
          {data.title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < data.title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">{data.subtitle}</p>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">{data.description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {data.cta.map((button, index) => (
            button.type === 'primary' ? (
              <button key={index} className="group bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all font-semibold flex items-center shadow-2xl transform hover:scale-105">
                {button.text}
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            ) : (
              <button key={index} className="group border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all font-semibold flex items-center backdrop-blur-sm transform hover:scale-105">
                <Play className="mr-2" size={20} />
                {button.text}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;