/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: { API_URL: "https://yemekhane-puanla.vercel.app" },

  // images: {
  //   domains: ["51.12.208.57"],
  // },

  async headers() {
    return [
      {
        source: "51.12.208.57",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
        ],
      },
    ];
  },

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
