// routes/api.js  (replace your current file with this)
const express = require('express');
const router = express.Router();

function tryRequire(path) {
  try {
    return require(path);
  } catch (err) {
    console.warn(`⚠️  Optional module not available: ${path} - ${err.message}`);
    return null;
  }
}

// Try to load controllers / routers (safe)
const websiteController = tryRequire('../controllers/websiteController');
const contactRoutes = tryRequire('./contactRoutes');
const offeringRoutes = tryRequire('./offerings');
const websiteDataRouter = tryRequire('./websiteData'); // if you have a router file
// Note: websiteDataRouter is optional; routes below will prefer that if present

// If you have an independent websiteData router file, mount it
if (websiteDataRouter) {
  router.use('/website-data', websiteDataRouter);
}

// If you have a controller (older pattern) mount its handlers safely
if (websiteController && websiteController.getWebsiteData) {
  router.get('/website-data', async (req, res, next) => {
    try {
      return websiteController.getWebsiteData(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  // if update/reset methods present, mount them too
  if (websiteController.updateWebsiteData) {
    router.put('/website-data', async (req, res, next) => {
      try { return websiteController.updateWebsiteData(req, res, next); } catch (e) { next(e); }
    });
  }
  if (websiteController.resetWebsiteData) {
    router.post('/website-data/reset', async (req, res, next) => {
      try { return websiteController.resetWebsiteData(req, res, next); } catch (e) { next(e); }
    });
  }
  if (websiteController.getSection) {
    router.get('/sections/:section', async (req, res, next) => {
      try { return websiteController.getSection(req, res, next); } catch (e) { next(e); }
    });
  }
  if (websiteController.updateSection) {
    router.put('/sections/:section', async (req, res, next) => {
      try { return websiteController.updateSection(req, res, next); } catch (e) { next(e); }
    });
  }
}

// Mount contact routes if present
if (contactRoutes) {
  router.use('/', contactRoutes);
}

// Mount offerings router if present
if (offeringRoutes) {
  router.use('/offerings', offeringRoutes);
} else {
  console.warn('⚠️  offerings router not found at ./offerings — /api/offerings will 404 until added.');
}

// Minimal health route
router.get('/health', (req, res) => res.json({ ok: true, time: Date.now() }));

module.exports = router;
