const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
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
