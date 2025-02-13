 /** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                protocol: 'http',
                hostname: '**'
            },
            {
                protocol: 'https', 
                hostname: 'images.pexels.com'
            },
        ]
    }
};

export default nextConfig;
