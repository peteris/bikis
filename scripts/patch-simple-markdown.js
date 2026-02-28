/**
 * Patch simple-markdown for React 19 compatibility.
 *
 * simple-markdown uses Symbol.for('react.element') to create React elements,
 * but React 19 changed the expected symbol to Symbol.for('react.transitional.element').
 * This patches both the source and minified files.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'node_modules', 'simple-markdown');
const files = ['simple-markdown.js', 'simple-markdown.min.js'];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('react.transitional.element')) {
    console.log(`${file}: already patched`);
    continue;
  }

  // Handle both single-quoted and double-quoted variants
  content = content
    .replace(/Symbol\.for\('react\.element'\)/g, "Symbol.for('react.transitional.element')")
    .replace(/Symbol\.for\("react\.element"\)/g, 'Symbol.for("react.transitional.element")');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${file}: patched for React 19`);
}
