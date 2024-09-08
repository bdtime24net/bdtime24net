/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://bdtime24-net-api-6lh5.onrender.com/api/:path*',
          },
        ];
      },
};

export default nextConfig;
