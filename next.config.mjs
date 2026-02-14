/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three']
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'three': 'three',
      '@': './',
      // Spline: root "." is not exported (ESM-only); force use of Next entry
      '@splinetool/react-spline': '@splinetool/react-spline/next',
    }
    return config
  }
}

export default nextConfig
