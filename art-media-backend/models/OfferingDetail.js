// models/OfferingDetail.js
const mongoose = require('mongoose');

// Sub-schemas
const specSchema = new mongoose.Schema({
  size: String,
  visibility: String,
  footTraffic: String,
  duration: String
}, { _id: false });

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  type: String,
  images: [String],
  specifications: specSchema
}, { _id: false });

const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String
}, { _id: false });

const planSchema = new mongoose.Schema({
  name: String,
  price: String,
  duration: String,
  features: [String]
}, { _id: false });

const caseStudySchema = new mongoose.Schema({
  clientName: String,
  description: String,
  results: String,
  image: String
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
}, { _id: false });

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  backgroundImage: String,
  cta: { text: String, link: String }
}, { _id: false });

const overviewSchema = new mongoose.Schema({
  heading: String,
  description: String,
  highlights: [String]
}, { _id: false });

const ctaSchema = new mongoose.Schema({
  title: String,
  description: String,
  buttonText: String,
  buttonLink: String
}, { _id: false });

const seoSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,
  keywords: [String]
}, { _id: false });

// Main schema
const offeringDetailSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  shortDescription: String,
  icon: String,
  gradient: String,
  hero: heroSchema,
  overview: overviewSchema,
  features: [featureSchema],
  locations: [locationSchema], // <-- supports array of objects
  pricing: {
    starting: String,
    plans: [planSchema]
  },
  gallery: [String],
  caseStudies: [caseStudySchema],
  faqs: [faqSchema],
  cta: ctaSchema,
  seo: seoSchema
}, { timestamps: true });

module.exports = mongoose.model('OfferingDetail', offeringDetailSchema);
