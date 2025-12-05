/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/personal-website',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
