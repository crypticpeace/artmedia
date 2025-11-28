// routes/websiteData.js
const express = require('express');
const router = express.Router();

let WebsiteData;
try {
  WebsiteData = require('../models/WebsiteData');
} catch (e) {
  // if model file missing, we'll still continue with fallback
  console.warn('WebsiteData model not found, continuing with local fallback.');
  WebsiteData = null;
}

let localOfferings = [];
try {
  localOfferings = require('../data/offeringsSeedData');
} catch (e) {
  localOfferings = [];
}

const defaultSite = {
  branding: {
    name: 'Art Media',
    logo: '/assets/logo.png'
  },
  hero: {
    badge: 'Trusted since 1997',
    title: 'Art Media Advertising',
    subtitle: 'Premium Outdoor & Indoor Advertising in Mumbai',
    description: 'We place brands where people actually see them.',
    cta: []
  },
  about: {
    heading: 'We make brands visible',
    description: 'Art Media has premium locations across Mumbai.'
  },
  offerings: localOfferings,
  clients: [],
  contact: {
    email: 'hi@artmedia.com',
    phone: '+91-XXXXXXXXXX'
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Art Media`
  }
};

/**
 * GET /api/website-data
 * Priority:
 *  1) Return WebsiteData doc from DB (first doc)
 *  2) If DB not available or no doc found, return defaultSite (with local offerings)
 */
router.get('/', async (req, res) => {
  if (!WebsiteData) {
    // no model available — fallback immediately
    return res.json(defaultSite);
  }

  try {
    const siteDoc = await WebsiteData.findOne().lean();
    if (siteDoc) {
      // normalize to expected shape: ensure offerings exists
      if (!siteDoc.offerings || (Array.isArray(siteDoc.offerings) && siteDoc.offerings.length === 0)) {
        siteDoc.offerings = localOfferings;
      }
      return res.json(siteDoc);
    }

    // no db doc found — respond with defaults
    return res.json(defaultSite);
  } catch (err) {
    console.warn('website-data: DB read failed — returning fallback data. Error:', err.message || err);
    return res.json(defaultSite);
  }
});

module.exports = router;
