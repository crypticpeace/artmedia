// routes/contactRoutes.js - Contact Form API Endpoints
const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');

// optional quick log to ensure file is loaded
console.log('⚙️  contactRoutes loaded');

// POST - Submit contact form -> POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    console.log('POST /api/contact body:', req.body);
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new submission
    const submission = new ContactSubmission({
      name,
      email,
      phone,
      message
    });

    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: submission
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form. Please try again.',
      error: error.message
    });
  }
});

// GET - Get all contact submissions (for admin) -> GET /api/contact/submissions
router.get('/contact/submissions', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ submittedAt: -1 });
    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, message: 'Error fetching submissions', error: error.message });
  }
});

// PATCH / DELETE routes remain same as your version (optional)...

module.exports = router;
