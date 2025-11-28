// routes/offerings.js
const express = require('express');
const router = express.Router();
const OfferingDetail = require('../models/OfferingDetail'); // adjust path if needed

// GET /api/offerings  -> list
router.get('/', async (req, res) => {
  try {
    const docs = await OfferingDetail.find().lean();
    return res.json(docs);
  } catch (err) {
    console.error('GET /api/offerings error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/offerings/:slug -> single offering by slug
router.get('/:slug', async (req, res) => {
  try {
    const doc = await OfferingDetail.findOne({ slug: req.params.slug }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    return res.json(doc);
  } catch (err) {
    console.error('GET /api/offerings/:slug error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
