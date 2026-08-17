import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const SOCIAL_CARD_SIZE = { width: 1200, height: 630 } as const;

export async function createSocialCard() {
  const logoData = await readFile(
    join(process.cwd(), "public/product/download.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f1e5",
          padding: "110px",
        }}
      >
        {/* next/og renders standard img elements rather than next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Organic Jaipur"
          width={900}
          height={237}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}
