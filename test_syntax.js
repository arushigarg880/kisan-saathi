// Syntax validation test
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const files = [
  'prototype/state.js',
  'prototype/intelligence.js',
  'prototype/screens_data.js',
  'prototype/screens.js',
  'prototype/demo_presets.js',
  'prototype/app.js'
];

let allPassed = true;

// Mock browser globals for node execution check
const context = {
  window: {},
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval,
  Date: Date,
  Math: Math,
  parseFloat: parseFloat,
  parseInt: parseInt
};
context.window = context;

for (const f of files) {
  try {
    const code = fs.readFileSync(path.join(__dirname, f), 'utf8');
    const script = new vm.Script(code, { filename: f });
    script.runInNewContext(context);
    console.log(`✓ Syntax & Load OK: ${f}`);
  } catch (err) {
    console.error(`✗ Error in ${f}:`, err.message);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('ALL FILES PASSED SYNTAX & EXECUTION CHECKS!');
} else {
  process.exit(1);
}
