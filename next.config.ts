import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Set the root to the directory where next.config.js is located
    // or a parent directory if Next.js is installed higher up.
    root: path.join(__dirname, '..'), 
  },
};

export default nextConfig;
