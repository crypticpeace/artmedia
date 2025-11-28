// data/seedOfferings.js (fixed - removed unsupported options)
require('dotenv').config();
const mongoose = require('mongoose');
const OfferingDetail = require('../models/OfferingDetail');
const offeringsSeedData = require('./offeringsSeedData');

function maskUri(uri) {
  if (!uri) return '(empty)';
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:*****@');
  } catch (e) {
    return uri;
  }
}

async function seed() {
  const envUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  const fallback = 'mongodb://127.0.0.1:27017/artmedia';
  const uri = envUri && envUri.trim().length ? envUri : fallback;

  console.log('Attempting MongoDB connection using URI:', maskUri(uri));

  try {
    // NOTE: do NOT pass useNewUrlParser or useUnifiedTopology here — newer drivers reject them.
    await mongoose.connect(uri, {
      // keep options minimal; mongoose will handle compatible defaults
      serverSelectionTimeoutMS: 5000
    });

    console.log('✅ Connected to MongoDB');

    if (!Array.isArray(offeringsSeedData)) {
      throw new Error('offeringsSeedData must export an array. Check data/offeringsSeedData.js');
    }

    console.log('Debug - first offering.locations isArray:', Array.isArray(offeringsSeedData[0].locations));
    console.log('Debug - first location type:', typeof offeringsSeedData[0].locations[0]);

    await OfferingDetail.deleteMany({});
    console.log('🗑️  Cleared existing offering details');

    const inserted = await OfferingDetail.insertMany(offeringsSeedData, { ordered: false });
    console.log(`✅ Offerings database seeded successfully! Created ${inserted.length} offerings.`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding offerings — full error:');
    console.error(err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);

    if (!envUri) {
      console.error('\nHint: MONGODB_URI not set. Create a .env file with:\n  MONGODB_URI=mongodb://127.0.0.1:27017/artmedia\nOr set your Atlas connection string in MONGODB_URI.\n');
    } else {
      console.error('\nHints to check:\n - Ensure the connection string is valid and credentials (if any) are URL-encoded.\n - If using MongoDB Atlas, make sure your IP is whitelisted in Atlas Network Access.\n - If using local MongoDB, ensure `mongod` is running and listening on 127.0.0.1:27017.\n - If your password contains @, :, or / characters, URL-encode it (encodeURIComponent).\n');
    }

    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

seed();
