// utilities/index.js
// Exports common utility helpers used by routes/controllers.
// Adds a handleErrors wrapper used to catch async errors.

const fs = require('fs');
const path = require('path');

// Try to load inventory-validation or other helpers if present.
// These are optional — we still export handleErrors even if helpers are missing.
let inventoryValidation = {};
const invPath = path.join(__dirname, 'inventory-validation.js');
if (fs.existsSync(invPath)) {
  inventoryValidation = require(invPath);
}

// Generic async error wrapper for Express route handlers/controllers.
// Usage: router.get('/x', utilities.handleErrors(controller.someAsync));
function handleErrors(fn) {
  return function (req, res, next) {
    // If fn returns a promise, attach catch -> next
    try {
      const maybePromise = fn(req, res, next);
      if (maybePromise && typeof maybePromise.catch === 'function') {
        maybePromise.catch(next);
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  handleErrors,
  // re-export whatever is in inventoryValidation (add more modules here as needed)
  ...inventoryValidation
};