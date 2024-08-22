/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://noting.prlc.kr'
      : undefined,
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'images.prlc.kr' },
    ],
  },
}

export default nextConfig
