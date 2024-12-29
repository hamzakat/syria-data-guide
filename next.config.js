/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/guide",
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
