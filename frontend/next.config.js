/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["home-eats-strapi.onrender.com", "127.0.0.1", 
  "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;