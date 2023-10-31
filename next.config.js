/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: { API_URL: "https://yemek-oyla.vercel.app" },
};

module.exports = nextConfig;
