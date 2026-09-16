import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

/** Keep each canonical page's social preview aligned with its search metadata. */
export function pageMetadata(metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string"
    ? metadata.title
    : metadata.title && "absolute" in metadata.title
      ? metadata.title.absolute
      : metadata.title && "default" in metadata.title
        ? metadata.title.default
        : SITE_NAME;
  const canonical = metadata.alternates?.canonical;
  return {
    ...metadata,
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description: metadata.description ?? undefined,
      ...(typeof canonical === "string" ? { url: canonical } : {}),
      ...metadata.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metadata.description ?? undefined,
      ...metadata.twitter,
    },
  };
}
