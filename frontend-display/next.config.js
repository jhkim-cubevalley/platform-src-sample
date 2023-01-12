/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");
const withPWA = require("next-pwa")({
  dest: 'public'
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["picsum.photos", "d22flz0ijor4to.cloudfront.net"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://test-api.cubeez.kr:8080/:path*",
      },
      {
        source: "/auth/social/:path*",
        destination: "http://test-api.cubeez.kr:8080/auth/social/:path*",
      },
      {
        source: "/.well-known/assetlinks.json",
        destination: 'https://test.cubeez.kr/assetlinks.json'
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextTranslate(withPWA(nextConfig));
