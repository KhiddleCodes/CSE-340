// utilities/inventory-validation.js
// Simple implementation that provides inventoryRules() and checkInventoryPayload()
// Adjust field names to match your form fields (invName, invDescription, invPrice, classification_id)

const { body, validationResult } = require('express-validator');

function inventoryRules() {
  // returns an array of middleware validators (uses express-validator)
  return [
    body('invName')
      .trim()
      .notEmpty()
      .withMessage('Inventory name is required'),
    body('invDescription')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('invPrice')
      .trim()
      .notEmpty()
      .withMessage('Price is required')
      .bail()
      .isFloat({ gt: 0 })
      .withMessage('Price must be a number greater than 0'),
    body('classification_id')
      .trim()
      .notEmpty()
      .withMessage('Please select a classification')
      .bail()
      .isInt({ min: 1 })
      .withMessage('Invalid classification')
  ];
}

function checkInventoryPayload(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If your app renders a view on validation failure, render with errors.
    // Otherwise return JSON error. Adjust to your app's behavior.
    const extracted = errors.array().map(err => ({ param: err.param, msg: err.msg }));
    // Example: if your route expects to render 'inventory/add' on error:
    if (req.accepts('html')) {
      return res.status(400).render('inventory/add', {
        title: 'Add Inventory',
        errors: extracted,
        formData: req.body
      });
    }
    return res.status(400).json({ errors: extracted });
  }
  next();
}

module.exports = {
  inventoryRules,
  checkInventoryPayload
};