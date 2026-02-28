const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle simple-markdown through webpack (not externalized) so the
  // string-replace-loader can patch it for React 19 on both client and server
  serverExternalPackages: [],
  transpilePackages: ['simple-markdown'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Patch simple-markdown for React 19: replace the old react.element symbol
    // with react.transitional.element so elements are recognized by React 19
    config.module.rules.push({
      test: /node_modules\/simple-markdown\/.*\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: "Symbol.for('react.element')",
        replace: "Symbol.for('react.transitional.element')",
      },
    });

    // Force a single copy of React to prevent "older version of React" errors
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };

    return config;
  },
};

module.exports = nextConfig;
