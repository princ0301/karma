/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/api/member-photo",
      },
    ],
  },
};

module.exports = nextConfig;
