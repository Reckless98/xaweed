"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteUrl, isAllowedAdminEmail } from "@/lib/env";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Auth Actions ─────────────────────────

export async function loginWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required" };

  if (!isAllowedAdminEmail(email)) {
    return { error: "Unauthorized email address" };
  }

  const supabase = await createClient();

  const siteUrl = getSiteUrl();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── Product Actions ──────────────────────

export interface ProductInput {
  id?: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  long_description: string;
  price_display: string;
  price_value: number;
  image: string;
  images: string[];
  tags: string[];
  featured: boolean;
  in_stock: boolean;
  is_active: boolean;
  line_inquiry_text: string;
  strain: string | null;
  thc_content: string | null;
  weight: string | null;
  effects: string[];
  code: string | null;
  brand: string | null;
  price_options: { label: string; price: number }[];
  seo_title: string | null;
  seo_description: string | null;
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Enforce admin email at the action level (defense in depth)
  if (!isAllowedAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }

  return user;
}

function revalidateProductPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function createProduct(input: ProductInput) {
  await requireAdmin();
  const admin = createAdminClient();

  const id = input.id || input.slug;

  const { error } = await admin.from("products").insert({
    id,
    name: input.name,
    slug: input.slug,
    category: input.category,
    short_description: input.short_description,
    long_description: input.long_description,
    price_display: input.price_display,
    price_value: input.price_value,
    image: input.image,
    images: input.images.length > 0 ? input.images : null,
    tags: input.tags,
    featured: input.featured,
    in_stock: input.in_stock,
    is_active: input.is_active,
    line_inquiry_text: input.line_inquiry_text,
    strain: input.strain,
    thc_content: input.thc_content,
    weight: input.weight,
    effects: input.effects.length > 0 ? input.effects : null,
    code: input.code,
    brand: input.brand,
    price_options: input.price_options.length > 0 ? input.price_options : null,
    seo_title: input.seo_title,
    seo_description: input.seo_description,
  });

  if (error) return { error: error.message };

  revalidateProductPaths(input.slug);
  redirect("/admin");
}

export async function updateProduct(id: string, input: ProductInput) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("products")
    .update({
      name: input.name,
      slug: input.slug,
      category: input.category,
      short_description: input.short_description,
      long_description: input.long_description,
      price_display: input.price_display,
      price_value: input.price_value,
      image: input.image,
      images: input.images.length > 0 ? input.images : null,
      tags: input.tags,
      featured: input.featured,
      in_stock: input.in_stock,
      is_active: input.is_active,
      line_inquiry_text: input.line_inquiry_text,
      strain: input.strain,
      thc_content: input.thc_content,
      weight: input.weight,
      effects: input.effects.length > 0 ? input.effects : null,
      code: input.code,
      brand: input.brand,
      price_options: input.price_options.length > 0 ? input.price_options : null,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths(input.slug);
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("products").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths();
  return { success: true };
}

export async function toggleProductStock(id: string, inStock: boolean) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("products")
    .update({ in_stock: inStock })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths();
  return { success: true };
}

export async function toggleProductFeatured(id: string, featured: boolean) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("products")
    .update({ featured })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths();
  return { success: true };
}

export async function toggleProductActive(id: string, isActive: boolean) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("products")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths();
  return { success: true };
}

// ─── Image Upload ─────────────────────────

export async function uploadProductImage(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const file = formData.get("file") as File;
  if (!file) return { error: "No file provided" };

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF" };
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File too large. Max 5MB" };
  }

  // Compress to WebP (quality 80, max 1200px wide) — ~70% smaller files
  const sharp = (await import("sharp")).default;
  const buffer = Buffer.from(await file.arrayBuffer());
  const compressed = await sharp(buffer)
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
  const filePath = `products/${fileName}`;

  const { error } = await admin.storage
    .from("product-images")
    .upload(filePath, compressed, {
      contentType: "image/webp",
    });

  if (error) return { error: error.message };

  const {
    data: { publicUrl },
  } = admin.storage.from("product-images").getPublicUrl(filePath);

  return { url: publicUrl };
}
