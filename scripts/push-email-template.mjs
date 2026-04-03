#!/usr/bin/env node
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = join(__dirname, "..", "supabase", "templates", "magic-link.html");
const template = readFileSync(templatePath, "utf-8");

const PROJECT_REF = "qpsmyhpjbibnodmhexbi";
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error("❌ SUPABASE_ACCESS_TOKEN not set in environment");
  process.exit(1);
}

const res = await fetch(
  `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`,
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      MAILER_TEMPLATES_MAGIC_LINK_CONTENT: template,
      MAILER_TEMPLATES_MAGIC_LINK_SUBJECT: "🌿 Xaweed Admin — Your Login Link",
    }),
  }
);

const data = await res.json();
if (res.ok) {
  console.log("✅ Magic link email template updated successfully!");
  console.log("Subject:", data.MAILER_TEMPLATES_MAGIC_LINK_SUBJECT || "Updated");
} else {
  console.error("❌ Failed:", res.status, data);
  process.exit(1);
}
