// data/offeringsSeedData.js - Default Detailed Offerings

module.exports = [
  {
    slug: 'outdoor-advertising',
    title: 'Outdoor Advertising',
    shortDescription: '40+ premium hoarding locations across Mumbai with high visibility and foot traffic',
    icon: 'Building2',
    gradient: 'from-blue-400 to-blue-600',
    
    hero: {
      title: 'Dominate the Outdoors',
      subtitle: 'Premium billboard and hoarding locations across Mumbai',
      backgroundImage: '/images/outdoor-hero.jpg',
      cta: {
        text: 'View Our Locations',
        link: '#locations'
      }
    },
    
    overview: {
      heading: 'Make Your Brand Unmissable',
      description: 'Our outdoor advertising solutions put your brand in front of thousands of potential customers daily. With 40+ strategic locations across Mumbai, we ensure maximum visibility and impact.',
      highlights: [
        'Prime locations with high footfall',
        'Large format billboards and hoardings',
        'Strategic placement near highways and commercial areas',
        'Professional installation and maintenance',
        'Flexible rental periods'
      ]
    },
    
    features: [
      {
        title: 'High Visibility Locations',
        description: 'Strategic placement at busy intersections, highways, and commercial districts',
        icon: 'MapPin'
      },
      {
        title: 'Premium Quality',
        description: 'Weather-resistant materials and professional printing for lasting impact',
        icon: 'Award'
      },
      {
        title: 'Flexible Durations',
        description: 'Choose from monthly, quarterly, or annual packages to suit your campaign',
        icon: 'Clock'
      },
      {
        title: 'End-to-End Service',
        description: 'From design to installation, we handle everything for you',
        icon: 'CheckCircle'
      }
    ],
    
    locations: [
      {
        name: 'Andheri Link Road',
        address: 'Andheri West, Mumbai',
        type: 'outdoor',
        images: ['/images/locations/andheri-1.jpg'],
        specifications: {
          size: '40ft x 20ft',
          visibility: 'High - Major highway',
          footTraffic: '100,000+ daily vehicles',
          duration: 'Monthly contracts available'
        }
      },
      {
        name: 'Bandra Worli Sea Link',
        address: 'Bandra West, Mumbai',
        type: 'outdoor',
        images: ['/images/locations/bandra-1.jpg'],
        specifications: {
          size: '50ft x 25ft',
          visibility: 'Premium - Iconic location',
          footTraffic: '150,000+ daily vehicles',
          duration: 'Monthly contracts available'
        }
      }
    ],
    
    pricing: {
      starting: '₹50,000/month',
      plans: [
        {
          name: 'Standard Billboard',
          price: '₹50,000 - ₹75,000',
          duration: 'Per month',
          features: [
            'Prime location',
            'Professional installation',
            'Maintenance included',
            'Illumination optional'
          ]
        },
        {
          name: 'Premium Hoarding',
          price: '₹1,00,000 - ₹2,50,000',
          duration: 'Per month',
          features: [
            'Ultra-premium location',
            'Large format display',
            'LED illumination',
            'Priority placement',
            'Dedicated account manager'
          ]
        }
      ]
    },
    
    gallery: [
      '/images/gallery/outdoor-1.jpg',
      '/images/gallery/outdoor-2.jpg',
      '/images/gallery/outdoor-3.jpg'
    ],
    
    caseStudies: [
      {
        clientName: 'Reliance Jio',
        description: 'Pan-Mumbai outdoor campaign for new product launch',
        results: '300% increase in brand awareness in target locations',
        image: '/images/cases/jio.jpg'
      }
    ],
    
    faqs: [
      {
        question: 'What is the minimum rental period?',
        answer: 'Our minimum rental period is one month, but we offer flexible packages for longer durations with better rates.'
      },
      {
        question: 'Do you handle design and printing?',
        answer: 'Yes! We provide end-to-end services including design, printing, installation, and maintenance.'
      },
      {
        question: 'How long does installation take?',
        answer: 'Typically 2-3 days after artwork approval, depending on location and size.'
      }
    ],
    
    cta: {
      title: 'Ready to Go Big?',
      description: 'Let\'s discuss the perfect outdoor advertising solution for your brand',
      buttonText: 'Get a Quote',
      buttonLink: '/contact'
    },
    
    seo: {
      metaTitle: 'Outdoor Advertising Mumbai | Premium Billboard & Hoarding Rentals',
      metaDescription: '40+ premium outdoor advertising locations across Mumbai. High-visibility billboards and hoardings for maximum brand impact.',
      keywords: ['outdoor advertising mumbai', 'billboard rental mumbai', 'hoarding advertising', 'outdoor media']
    }
  },
  
  {
    slug: 'indoor-advertising',
    title: 'Indoor Advertising',
    shortDescription: '20+ strategic indoor spaces in malls, hotels, and corporate buildings',
    icon: 'Building2',
    gradient: 'from-cyan-400 to-blue-500',
    
    hero: {
      title: 'Captivate Your Indoor Audience',
      subtitle: 'Strategic placements in malls, hotels, and corporate spaces',
      backgroundImage: '/images/indoor-hero.jpg',
      cta: {
        text: 'Explore Indoor Options',
        link: '#locations'
      }
    },
    
    overview: {
      heading: 'Engage Where It Matters',
      description: 'Reach your target audience in high-dwell time environments. Our indoor advertising placements in premium malls, hotels, and corporate buildings ensure your message resonates.',
      highlights: [
        '20+ premium indoor locations',
        'High-dwell time environments',
        'Digital and static options available',
        'Targeted audience reach',
        'Climate-controlled spaces'
      ]
    },
    
    features: [
      {
        title: 'Premium Venues',
        description: 'Top malls, hotels, and corporate buildings across Mumbai',
        icon: 'Building'
      },
      {
        title: 'Engaged Audience',
        description: 'Reach customers when they\'re relaxed and receptive to your message',
        icon: 'Users'
      },
      {
        title: 'Digital Screens',
        description: 'Dynamic content capabilities with our digital indoor displays',
        icon: 'Monitor'
      },
      {
        title: 'Perfect Conditions',
        description: 'Protected from weather, ensuring your ads always look perfect',
        icon: 'Shield'
      }
    ],
    
    pricing: {
      starting: '₹30,000/month',
      plans: [
        {
          name: 'Mall Advertising',
          price: '₹30,000 - ₹60,000',
          duration: 'Per month',
          features: [
            'High-traffic mall locations',
            'Static or digital options',
            'Professional installation',
            'Regular maintenance'
          ]
        },
        {
          name: 'Premium Digital',
          price: '₹75,000 - ₹1,50,000',
          duration: 'Per month',
          features: [
            'LED digital screens',
            'Dynamic content updates',
            'Multiple ad rotations',
            'Analytics & reporting',
            'Prime positioning'
          ]
        }
      ]
    },
    
    faqs: [
      {
        question: 'Can I change my ad content during the rental period?',
        answer: 'Yes! With our digital displays, you can update content as often as needed. Static displays can be changed at designated intervals.'
      },
      {
        question: 'What are the most popular indoor locations?',
        answer: 'Our most popular spots are in Inorbit Mall, Phoenix Marketcity, and select 5-star hotels in South Mumbai.'
      }
    ],
    
    cta: {
      title: 'Make an Indoor Impact',
      description: 'Connect with your audience in premium indoor environments',
      buttonText: 'Request Information',
      buttonLink: '/contact'
    },
    
    seo: {
      metaTitle: 'Indoor Advertising Mumbai | Mall & Hotel Advertising Solutions',
      metaDescription: 'Premium indoor advertising in Mumbai\'s top malls, hotels, and corporate spaces. Digital and static options available.',
      keywords: ['indoor advertising', 'mall advertising mumbai', 'hotel advertising', 'digital screens']
    }
  },
  
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Comprehensive digital solutions including social media, SEO, and online campaigns',
    icon: 'Smartphone',
    gradient: 'from-blue-500 to-indigo-600',
    
    hero: {
      title: 'Dominate the Digital Space',
      subtitle: 'Complete digital marketing solutions for modern brands',
      backgroundImage: '/images/digital-hero.jpg',
      cta: {
        text: 'Start Your Digital Journey',
        link: '#contact'
      }
    },
    
    overview: {
      heading: 'Your Digital Growth Partner',
      description: 'From social media management to SEO and paid advertising, we create comprehensive digital strategies that drive real results.',
      highlights: [
        'Social media management & growth',
        'Search engine optimization (SEO)',
        'Google & Facebook advertising',
        'Content creation & strategy',
        'Analytics & reporting'
      ]
    },
    
    features: [
      {
        title: 'Social Media Mastery',
        description: 'Build and engage your audience across all major platforms',
        icon: 'Share2'
      },
      {
        title: 'SEO Excellence',
        description: 'Rank higher on Google and drive organic traffic to your website',
        icon: 'TrendingUp'
      },
      {
        title: 'Paid Advertising',
        description: 'Targeted campaigns that maximize ROI on Google, Facebook, and Instagram',
        icon: 'Target'
      },
      {
        title: 'Content Creation',
        description: 'Professional graphics, videos, and copy that converts',
        icon: 'Edit'
      }
    ],
    
    pricing: {
      starting: '₹25,000/month',
      plans: [
        {
          name: 'Starter Package',
          price: '₹25,000',
          duration: 'Per month',
          features: [
            'Social media management (2 platforms)',
            '12 posts per month',
            'Basic SEO optimization',
            'Monthly performance report'
          ]
        },
        {
          name: 'Growth Package',
          price: '₹50,000',
          duration: 'Per month',
          features: [
            'Social media management (3 platforms)',
            '20 posts per month',
            'Advanced SEO & content strategy',
            'Google/Facebook ads management',
            'Weekly performance reports'
          ]
        },
        {
          name: 'Enterprise Package',
          price: 'Custom',
          duration: 'Per month',
          features: [
            'Complete digital marketing suite',
            'Unlimited social media management',
            'Advanced SEO & PPC campaigns',
            'Video content creation',
            'Dedicated account manager',
            'Real-time analytics dashboard'
          ]
        }
      ]
    },
    
    faqs: [
      {
        question: 'How long before I see results?',
        answer: 'Social media and paid ads show results within weeks. SEO typically takes 3-6 months for significant organic growth.'
      },
      {
        question: 'Do you create the content?',
        answer: 'Yes! Our team of designers, copywriters, and video editors create all content for your campaigns.'
      },
      {
        question: 'Can I see campaign performance?',
        answer: 'Absolutely! You\'ll get regular reports and access to a dashboard showing real-time campaign metrics.'
      }
    ],
    
    cta: {
      title: 'Ready to Go Digital?',
      description: 'Let\'s create a winning digital strategy for your brand',
      buttonText: 'Schedule Consultation',
      buttonLink: '/contact'
    },
    
    seo: {
      metaTitle: 'Digital Marketing Agency Mumbai | SEO, Social Media & PPC Experts',
      metaDescription: 'Full-service digital marketing in Mumbai. Social media management, SEO, Google Ads, and content creation that drives results.',
      keywords: ['digital marketing mumbai', 'social media management', 'seo services', 'google ads mumbai']
    }
  }
];
