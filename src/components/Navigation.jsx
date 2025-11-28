// src/components/Navigation.jsx

import React from 'react';
import { Menu, X } from 'lucide-react';
import logoFallback from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navigation = ({ branding, scrolled, mobileMenuOpen, setMobileMenuOpen }) => {

  const logoSrc = branding?.logo || logoFallback;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* LEFT — Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logoSrc}
                alt="Logo"
                onError={(e) => (e.target.src = logoFallback)}
                className="h-20 md:h-24 w-auto object-contain"
                draggable={false}
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/#about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
            <Link to="/#offerings" className="text-gray-700 hover:text-blue-600 font-medium transition">Offerings</Link>
            <Link to="/#clients" className="text-gray-700 hover:text-blue-600 font-medium transition">Clients</Link>
            <Link to="/#contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>

            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition font-semibold"
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">

            <Link to="/" className="block py-3 text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/#about" className="block py-3 text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/#offerings" className="block py-3 text-gray-700 hover:text-blue-600">Offerings</Link>
            <Link to="/#clients" className="block py-3 text-gray-700 hover:text-blue-600">Clients</Link>
            <Link to="/#contact" className="block py-3 text-gray-700 hover:text-blue-600">Contact</Link>

          </div>
        </div>
      )}

    </nav>
  );
};

export default Navigation;
