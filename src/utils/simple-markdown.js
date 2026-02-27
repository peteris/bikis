import SimpleMarkdown from 'simple-markdown';

// simple-markdown is patched at build time via string-replace-loader in
// next.config.js to use Symbol.for('react.transitional.element') instead
// of the old Symbol.for('react.element'), required for React 19 compatibility.

export default SimpleMarkdown;
