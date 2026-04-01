const LINE_ID = "@688ndwgr";
const LINE_BASE_URL = "https://line.me/R/ti/p/";

function getLineProfileUrl(): string {
  return `${LINE_BASE_URL}${encodeURIComponent(LINE_ID)}`;
}

export function getProductInquiryUrl(productName: string): string {
  // LINE OA links don't support prefilled messages reliably
  void productName;
  return getLineProfileUrl();
}

export const lineConfig = {
  id: LINE_ID,
  displayId: LINE_ID,
  profileUrl: getLineProfileUrl(),
  ctaText: "Chat on LINE",
  ctaTextShort: "LINE",
} as const;
