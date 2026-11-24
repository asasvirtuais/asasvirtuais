import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/guild-rpg', destination: '/never-broke-architecture', permanent: true },
    ]
  },
  async rewrites() {
    return {
      // asasvirtuais.dev keeps the old full site at its root; asasvirtuais.com gets the minimal landing.
      beforeFiles: [
        { source: '/', has: [{ type: 'host', value: '(www\\.)?asasvirtuais\\.dev' }], destination: '/servicos' },
      ],
    }
  },
}

export default nextConfig
