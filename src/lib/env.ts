export function getConfiguredAdminEmails(): string[] {
  const raw = [process.env.ADMIN_EMAILS, process.env.ADMIN_EMAIL]
    .filter(Boolean)
    .join(",");

  return raw
    .split(/[\n,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email?: string | null): boolean {
  const allowedEmails = getConfiguredAdminEmails();

  if (allowedEmails.length === 0) {
    return true;
  }

  return !!email && allowedEmails.includes(email.trim().toLowerCase());
}

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    const normalizedHost = vercelUrl
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    return `https://${normalizedHost}`;
  }

  return "http://localhost:3000";
}