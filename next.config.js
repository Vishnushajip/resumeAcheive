/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Ensure public files are copied
  distDir: "out",
};

module.exports = nextConfig;
