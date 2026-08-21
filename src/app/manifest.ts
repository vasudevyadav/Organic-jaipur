import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Organic Jaipur",
    short_name: "Organic Jaipur",
    description:
      "Own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani food products from Jaipur.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e5",
    theme_color: "#0f281c",
    icons: [
      {
        src: "/product/download.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
