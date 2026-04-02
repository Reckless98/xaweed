import DOMPurify from "dompurify";

export function sanitizeJSON(input: string): string {
  return input
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}

export function sanitizeHTML(dirty: string): string {
  if (typeof window === "undefined") return dirty;
  return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
}
