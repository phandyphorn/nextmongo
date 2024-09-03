/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    reactStrickMode: false,
  },
};

export default nextConfig;
