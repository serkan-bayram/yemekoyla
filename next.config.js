/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: { API_URL: "https://yemekhane-puanla.vercel.app" },

  // images: {
  //   domains: ["51.12.208.57"],
  // },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "51.12.208.57",
      },
    ],
  },
};

module.exports = nextConfig;
