// utilities/inventory-validation.js
// Minimal stub for inventory validation utilities.
// Replace with your real validation logic later.

module.exports = {
  // Example middleware used by inventory routes
  addClassificationRules: (req, res, next) => {
    // simple placeholder — assume valid
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    // attach parsed/normalized data if needed
    req.validated = req.body;
    next();
  },

  checkInventoryPayload: (req, res, next) => {
    // Very small validation example — customize as needed
    const { invName, invDescription } = req.body || {};
    if (!invName || invName.trim() === '') {
      return res.status(400).json({ error: 'invName is required' });
    }
    // pass through
    next();
  },

  // If your code expects named exports, keep this object shape
  validateInventoryId: (req, res, next) => {
    const id = req.params.id || req.body.id;
    if (id && !Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'Invalid inventory id' });
    }
    next();
  }
};