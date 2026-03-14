// utilities/inventory-validation.js  (temporary stub)
module.exports = {
  inventoryRules() {
    // returns middleware (function) or array of middleware expected by your route
    return [
      (req, res, next) => {
        // basic checks: ensure body exists
        if (!req.body || typeof req.body !== 'object') {
          return res.status(400).json({ error: 'Invalid request body' });
        }
        next();
      }
    ];
  },

  checkInventoryPayload(req, res, next) {
    // very small payload check — adjust fields to match your app
    const { invName, invPrice, classification_id } = req.body || {};
    const errors = [];
    if (!invName || !invName.toString().trim()) errors.push('invName is required');
    if (!invPrice || Number.isNaN(Number(invPrice))) errors.push('invPrice must be a number');
    if (!classification_id) errors.push('classification_id is required');

    if (errors.length) {
      // if your app renders a page on error, change to res.render(...)
      return res.status(400).json({ errors });
    }
    next();
  }
};