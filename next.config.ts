import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing configuration optionsfirebase
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Fix missing images in Firebase
  },
  // Add custom webpack configuration for handling PDF files
  webpack(config) {
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource', // Handle static file assets like PDFs
      generator: {
        filename: 'static/media/[name].[hash][ext]', // Specify the output directory and filename format
      },
    });
    return config;
  },
};
export default nextConfig;
