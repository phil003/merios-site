// App Store links with campaign tracking, so App Store Connect (App Analytics > Campaigns)
// can tell how many installs each page of merios.life brings.
// pt = provider token of the Merios developer account; ct = campaign (max 40 characters).
export const APP_STORE_BASE = "https://apps.apple.com/us/app/merios/id6760352598";

export function appStoreUrl(ct: string): string {
  const c =
    ct
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "web";
  return `${APP_STORE_BASE}?pt=128637372&ct=${c}&mt=8`;
}

// Campaign for a page of this site: "/tools/lpa-unit-converter" -> "web-lpa-unit-converter", "/" -> "web-home".
export function campaignFromPath(path: string): string {
  const last = path.replace(/\/+$/, "").split("/").pop() || "";
  return last ? `web-${last}` : "web-home";
}
