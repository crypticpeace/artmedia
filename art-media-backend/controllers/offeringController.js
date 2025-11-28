// controllers/offeringController.js - Offering Business Logic

const OfferingDetail = require('../models/OfferingDetail');

// Get all offerings
exports.getAllOfferings = async (req, res) => {
  try {
    const offerings = await OfferingDetail.find({ isActive: true });
    res.json(offerings);
  } catch (error) {
    console.error('Error fetching offerings:', error);
    res.status(500).json({ 
      error: 'Failed to fetch offerings',
      message: error.message 
    });
  }
};

// Get single offering by slug
exports.getOfferingBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const offering = await OfferingDetail.findOne({ slug, isActive: true });

    if (!offering) {
      return res.status(404).json({ 
        error: 'Offering not found',
        slug: slug
      });
    }

    res.json(offering);
  } catch (error) {
    console.error('Error fetching offering:', error);
    res.status(500).json({ 
      error: 'Failed to fetch offering',
      message: error.message 
    });
  }
};

// Create new offering
exports.createOffering = async (req, res) => {
  try {
    const offeringData = req.body;
    
    // Create slug from title if not provided
    if (!offeringData.slug && offeringData.title) {
      offeringData.slug = offeringData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const offering = new OfferingDetail(offeringData);
    await offering.save();

    res.status(201).json({ 
      success: true,
      message: 'Offering created successfully',
      data: offering 
    });
  } catch (error) {
    console.error('Error creating offering:', error);
    res.status(500).json({ 
      error: 'Failed to create offering',
      message: error.message 
    });
  }
};

// Update offering
exports.updateOffering = async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    const offering = await OfferingDetail.findOneAndUpdate(
      { slug },
      updates,
      { new: true, runValidators: true }
    );

    if (!offering) {
      return res.status(404).json({ 
        error: 'Offering not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Offering updated successfully',
      data: offering 
    });
  } catch (error) {
    console.error('Error updating offering:', error);
    res.status(500).json({ 
      error: 'Failed to update offering',
      message: error.message 
    });
  }
};

// Delete offering (soft delete by setting isActive to false)
exports.deleteOffering = async (req, res) => {
  try {
    const { slug } = req.params;

    const offering = await OfferingDetail.findOneAndUpdate(
      { slug },
      { isActive: false },
      { new: true }
    );

    if (!offering) {
      return res.status(404).json({ 
        error: 'Offering not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Offering deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting offering:', error);
    res.status(500).json({ 
      error: 'Failed to delete offering',
      message: error.message 
    });
  }
};