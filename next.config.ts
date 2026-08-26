import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only applies explicitly allow-listed quality values.
    // These lower settings are used for large decorative and hero images,
    // while 75 remains available for product imagery and other defaults.
    qualities: [55, 65, 70, 75],
  },
};

export default nextConfig;
