import type { NextConfig } from "next";

interface CustomNextConfig extends NextConfig {
  swcMinify: boolean;
}

const nextConfig: CustomNextConfig = {
  output: 'standalone',
    // ⚡ Minify JS
  swcMinify: true,
  /* config options here */
  images: { 
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      },{
        hostname: 'ggbook.s3.us-east-1.amazonaws.com'
      },
      {
        hostname: 'res.cloudinary.com'
      },
      {

        hostname: 'images.pexels.com'
      },
      {
        hostname: 'test.image.com'
      },
      {
        hostname: 'i.ibb.co'
      },
      {
        hostname: 'example.com'
      }
    ]
  },
   // 🧹 Clean production logs
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  reactStrictMode: true,
};

export default nextConfig;
