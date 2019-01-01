module.exports = () => {
  const withCSS = require('@zeit/next-css');
  const withOptimizedImages = require('next-optimized-images');

  return withOptimizedImages(withCSS());
};
