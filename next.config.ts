import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['asasvirtuais', 'asasvirtuais-firebase', 'asasvirtuais-airtable'],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
