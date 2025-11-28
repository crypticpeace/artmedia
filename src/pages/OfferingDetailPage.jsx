// src/pages/OfferingDetailPage.jsx - Offering Detail Page

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Award, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { iconMap } from '../utils/iconMapper';

const OfferingDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [offering, setOffering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    // Fetch offering details from API
    fetch(`http://localhost:5000/api/offerings/${slug}`)
      .then(res => res.json())
      .then(data => {
        setOffering(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching offering:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!offering) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Offering Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative h-96 bg-gradient-to-br ${offering.gradient} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </button>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {offering.hero?.title || offering.title}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {offering.hero?.subtitle || offering.shortDescription}
          </p>
          {offering.hero?.cta && (
            <a 
              href={offering.hero.cta.link}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              {offering.hero.cta.text}
            </a>
          )}
        </div>
      </section>

      {/* Overview Section */}
      {offering.overview && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {offering.overview.heading}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {offering.overview.description}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {offering.overview.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {offering.features && offering.features.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {offering.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Award;
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {offering.pricing && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
              <p className="text-xl text-gray-600">Starting from {offering.pricing.starting}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {offering.pricing.plans?.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${
                    index === 1 ? 'border-blue-600 transform scale-105' : 'border-gray-200'
                  }`}
                >
                  {index === 1 && (
                    <div className="bg-blue-600 text-white text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <Check className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    index === 1 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {offering.faqs && offering.faqs.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {offering.faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-blue-600 flex-shrink-0" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {offering.cta && (
        <section className={`py-20 bg-gradient-to-br ${offering.gradient}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {offering.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {offering.cta.description}
            </p>
            <a
              href={offering.cta.buttonLink}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors shadow-xl"
            >
              {offering.cta.buttonText}
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default OfferingDetailPage;