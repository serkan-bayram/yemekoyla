/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { API_URL: "https://yemekhane-puanla.vercel.app" },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "51.12.208.57",
      },
      {
        protocol: "https",
        hostname: "**.giphy.com",
      },
    ],
  },
};

module.exports = nextConfig;
