// data/seedDatabase.js - Initialize Database with Default Data

const mongoose = require('mongoose');
require('dotenv').config();

// IMPORTANT: Clear the model cache first
if (mongoose.models.WebsiteData) {
  delete mongoose.models.WebsiteData;
}

const WebsiteData = require('../models/WebsiteData');
const defaultData = require('./defaultData');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('✅ Connected to MongoDB');

  try {
    // Drop the entire collection to start fresh
    try {
      await mongoose.connection.db.dropCollection('websitedatas');
      console.log('🗑️  Dropped old collection');
    } catch (err) {
      console.log('ℹ️  No existing collection to drop');
    }

    // Insert default data
    const websiteData = new WebsiteData(defaultData);
    await websiteData.save();
    
    console.log('✅ Database seeded successfully!');
    console.log('📊 Website data created with ID:', websiteData._id);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});