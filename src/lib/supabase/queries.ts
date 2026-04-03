import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Product, Category } from "@/types";

// ─── DB row types ─────────────────────────

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  long_description: string;
  price_display: string;
  price_value: number;
  image: string;
  images: string[] | null;
  tags: string[] | null;
  featured: boolean;
  in_stock: boolean;
  is_active: boolean;
  line_inquiry_text: string;
  strain: string | null;
  thc_content: string | null;
  weight: string | null;
  effects: string[] | null;
  code: string | null;
  brand: string | null;
  price_options: { label: string; price: number }[] | null;
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sort_order: number;
}

// ─── Mapping ──────────────────────────────

function mapDbProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as Product["category"],
    shortDescription: row.short_description,
    longDescription: row.long_description,
    priceDisplay: row.price_display,
    priceValue: row.price_value,
    image: row.image,
    images: row.images ?? undefined,
    tags: row.tags ?? [],
    featured: row.featured,
    inStock: row.in_stock,
    isActive: row.is_active ?? true,
    lineInquiryText: row.line_inquiry_text,
    strain: row.strain as Product["strain"],
    thcContent: row.thc_content ?? undefined,
    weight: row.weight ?? undefined,
    effects: row.effects ?? undefined,
    code: row.code ?? undefined,
    brand: row.brand ?? undefined,
    priceOptions: row.price_options ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ─── Public queries (active products only) ─

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getProducts error:", error.message);
    return [];
  }
  return (data as DbProduct[]).map(mapDbProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getFeaturedProducts error:", error.message);
    return [];
  }
  return (data as DbProduct[]).map(mapDbProduct);
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const [catResult, countResult] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("products")
      .select("category")
      .eq("is_active", true),
  ]);

  if (catResult.error) {
    console.error("getCategories error:", catResult.error.message);
    return [];
  }

  const counts: Record<string, number> = {};
  if (!countResult.error) {
    for (const row of countResult.data) {
      counts[row.category] = (counts[row.category] || 0) + 1;
    }
  }

  return (catResult.data as DbCategory[]).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    image: row.image,
    productCount: counts[row.id] || 0,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return mapDbProduct(data as DbProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapDbProduct(data as DbProduct);
}

// ─── Admin queries (all products, including inactive) ─

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getAllProducts error:", error.message);
    return [];
  }
  return (data as DbProduct[]).map(mapDbProduct);
}

export async function getProductSlugs(): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);

  if (error) return [];
  return data.map((row: { slug: string }) => row.slug);
}
