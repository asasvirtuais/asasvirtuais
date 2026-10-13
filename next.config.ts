import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/guild-rpg', destination: '/never-broke-architecture', permanent: true },
    ]
  },
}

export default nextConfig
