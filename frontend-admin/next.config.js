/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['d22flz0ijor4to.cloudfront.net']
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/cubeez',
        destination: '/cubeez/dashboard',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://test-api.cubeez.kr:8080/:path*",
      },
    ];
  },
}

module.exports = nextTranslate(nextConfig)
