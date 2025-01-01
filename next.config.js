/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
