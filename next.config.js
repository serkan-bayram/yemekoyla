/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: { API_URL: "https://yemekhane-puanla.vercel.app" },
};

module.exports = nextConfig;
