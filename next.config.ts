import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
  
};

export default nextConfig;
