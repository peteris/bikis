/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src'],
  },
  images: {
    domains: ['instagram.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  // Ensure old URLs continue to work
  async redirects() {
    return [
      {
        source: '/api/photos',
        destination: '/api/instagram',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
