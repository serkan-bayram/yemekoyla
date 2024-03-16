/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { API_URL: "https://yemekhane-puanla.vercel.app" },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "89.47.113.115",
      },
      {
        protocol: "https",
        hostname: "**.giphy.com",
      },
    ],
  },
};

module.exports = nextConfig;
