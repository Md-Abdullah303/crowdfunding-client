/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const isDev = process.env.NODE_ENV !== 'production';
    const fallback = isDev ? 'http://localhost:5000' : 'https://crowdfunding-server-navy.vercel.app';
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || fallback}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
