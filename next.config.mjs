/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/stories',
                destination: '/stories/index.html',
            },
            {
                source: '/stories/:path*',
                destination: '/stories/:path*',
            },
        ]
    },
}

export default nextConfig
