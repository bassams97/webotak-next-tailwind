/** @type {import('next').NextConfig} */
const path = require("path")

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  }
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
    prependData: `@import "src/styles/globals/variables.scss";`
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true
  // },
  images: {
    domains: ["ritzy-do-spaces.nyc3.digitaloceanspaces.com", "via.placeholder.com"],
    // formats: ['image/avif','image/webp']
    minimumCacheTTL: 31536000
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "ritzy-do-spaces.nyc3.digitaloceanspaces.com"
    //     // via.placeholder.com
    //     // port: '',
    //     // pathname: '/account123/**',
    //   }
    // ]
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en"
  // },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders
      }
    ]
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    // workerThreads: false,
    // cpus: 1
    nextScriptWorkers: true,
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  ...nextConfig
})