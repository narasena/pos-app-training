import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mykoreankitchen.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.cucinabyelena.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.marionskitchen.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
