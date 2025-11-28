// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import OfferingsSection from './components/OfferingsSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import OfferingDetailPage from './pages/OfferingDetailPage';

import { siteData } from './data/siteData';
import './styles/animations.css';

// Backend API URL (fallback to localhost)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function HomePage({ data }) {
  return (
    <>
      <HeroSection data={data.hero} />
      <AboutSection data={data.about} branding={data.branding} />
      <OfferingsSection data={data.offerings} />
      <ClientsSection data={data.clients} />
      <ContactSection data={data.contact} />
    </>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState(siteData); // fallback local data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // header scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // fetch site data from backend (graceful fallback to local)
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching data from:', `${API_URL}/website-data`);
        const res = await fetch(`${API_URL}/website-data`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const fetched = await res.json();
        if (!cancelled) {
          setData(fetched);
          setError(null);
          console.log('✅ Data fetched successfully from backend');
        }
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        if (!cancelled) {
          setError(err.message || 'Unknown error');
          setData(siteData); // fallback
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // global loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Art Media...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        {/* error banner if backend failed but site still runs */}
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 text-center">
            <p className="text-sm">
              ⚠️ Backend unavailable — using fallback data. Error: {error}
            </p>
          </div>
        )}

        <Navigation
          branding={data.branding}
          scrolled={scrolled}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <Routes>
          {/* Home route uses the (possibly fetched) data */}
          <Route path="/" element={<HomePage data={data} />} />

          {/* Offering detail route
              - We pass entire offerings array as prop (helpful if OfferingDetailPage expects it).
              - OfferingDetailPage can still read the slug param and fetch its own data if implemented that way.
          */}
          <Route
            path="/offering/:slug"
            element={<OfferingDetailPage offerings={data.offerings} />}
          />

          {/* Optional: a catch-all route could be added here */}
        </Routes>

        <Footer branding={data.branding} data={data.footer} />
      </div>
    </Router>
  );
}

export default App;
