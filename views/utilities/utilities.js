// utilities/index.js
const fs = require('fs');
const path = require('path');

const tryRequire = (name) => {
  const p = path.join(__dirname, name);
  if (fs.existsSync(p + '.js')) return require(p + '.js');
  return null;
};

// try a few common filenames
let exportsObj = tryRequire('utilities') || tryRequire('helpers') || tryRequire('functions');

if (!exportsObj) {
  // If nothing found, expose a clear failure helper (so startup fails with an informative message)
  console.error('utilities/index.js: no utilities file found. Expected one of: utilities.js, helpers.js, functions.js inside the utilities folder.');
  module.exports = {};
} else {
  module.exports = exportsObj;
}