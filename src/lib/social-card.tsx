import { ImageResponse } from "next/og";

export const SOCIAL_CARD_SIZE = { width: 1200, height: 630 } as const;

export function createSocialCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f6f1e5",
          color: "#173c2b",
          padding: "72px 82px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ position: "absolute", width: 470, height: 470, borderRadius: 999, background: "#e7ad42", right: -115, top: -170, opacity: 0.9 }} />
        <div style={{ position: "absolute", width: 340, height: 340, borderRadius: 999, background: "#315c3b", right: 85, bottom: -190 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 36, fontWeight: 700 }}>
            Organic <span style={{ color: "#c78618", marginLeft: 10 }}>Jaipur</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 850 }}>
            <div style={{ display: "flex", color: "#8d6522", fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
              Farm to home · Jaipur
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 65, lineHeight: 1.08, fontWeight: 700 }}>
              Pure food, made with patience.
            </div>
            <div style={{ display: "flex", marginTop: 24, fontFamily: "Arial, sans-serif", fontSize: 25, lineHeight: 1.4, color: "#4f6659" }}>
              A2 Bilona Ghee · Cold-Pressed Oils · Raw Honey · Rajasthani Pickles
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 700, color: "#315c3b" }}>
            organicjaipur.store
          </div>
        </div>
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}
