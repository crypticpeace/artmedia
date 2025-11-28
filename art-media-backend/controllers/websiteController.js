// controllers/websiteController.js - Business Logic

const WebsiteData = require('../models/WebsiteData');
const defaultData = require('../data/defaultData');

// Get website data
exports.getWebsiteData = async (req, res) => {
  try {
    // Find the website data (we'll only have one document)
    let websiteData = await WebsiteData.findOne();

    // If no data exists, create it with default data
    if (!websiteData) {
      websiteData = new WebsiteData(defaultData);
      await websiteData.save();
      console.log('✅ Created initial website data');
    }

    // Send the data
    res.json(websiteData);
  } catch (error) {
    console.error('Error fetching website data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch website data',
      message: error.message 
    });
  }
};

// Update website data
exports.updateWebsiteData = async (req, res) => {
  try {
    const updates = req.body;

    // Find and update the website data
    let websiteData = await WebsiteData.findOne();

    if (!websiteData) {
      // If no data exists, create new with the updates
      websiteData = new WebsiteData(updates);
    } else {
      // Update existing data
      Object.keys(updates).forEach(key => {
        websiteData[key] = updates[key];
      });
    }

    await websiteData.save();

    res.json({ 
      success: true,
      message: 'Website data updated successfully',
      data: websiteData 
    });
  } catch (error) {
    console.error('Error updating website data:', error);
    res.status(500).json({ 
      error: 'Failed to update website data',
      message: error.message 
    });
  }
};

// Update specific section
exports.updateSection = async (req, res) => {
  try {
    const { section } = req.params; // e.g., 'hero', 'about', 'offerings'
    const updates = req.body;

    let websiteData = await WebsiteData.findOne();

    if (!websiteData) {
      return res.status(404).json({ 
        error: 'Website data not found. Please initialize first.' 
      });
    }

    // Update the specific section
    websiteData[section] = updates;
    await websiteData.save();

    res.json({ 
      success: true,
      message: `${section} section updated successfully`,
      data: websiteData[section]
    });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ 
      error: 'Failed to update section',
      message: error.message 
    });
  }
};

// Reset to default data
exports.resetWebsiteData = async (req, res) => {
  try {
    // Delete existing data
    await WebsiteData.deleteMany({});

    // Create new with default data
    const websiteData = new WebsiteData(defaultData);
    await websiteData.save();

    res.json({ 
      success: true,
      message: 'Website data reset to defaults',
      data: websiteData 
    });
  } catch (error) {
    console.error('Error resetting website data:', error);
    res.status(500).json({ 
      error: 'Failed to reset website data',
      message: error.message 
    });
  }
};

// Get specific section
exports.getSection = async (req, res) => {
  try {
    const { section } = req.params;
    
    const websiteData = await WebsiteData.findOne();

    if (!websiteData) {
      return res.status(404).json({ 
        error: 'Website data not found' 
      });
    }

    if (!websiteData[section]) {
      return res.status(404).json({ 
        error: `Section '${section}' not found` 
      });
    }

    res.json(websiteData[section]);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ 
      error: 'Failed to fetch section',
      message: error.message 
    });
  }
};