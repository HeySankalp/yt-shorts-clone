/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com','filmfare.wwmindia.com','i.giphy.com','upload.wikimedia.org','cdn1.vectorstock.com'],
  },
}

module.exports = nextConfig
