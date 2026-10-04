import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/allorders",
        destination: "/orders",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
