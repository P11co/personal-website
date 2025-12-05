/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Uncomment and set this if your repo name is not username.github.io
  // basePath: '/your-repo-name',
}

export default nextConfig
