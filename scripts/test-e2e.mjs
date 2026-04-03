#!/usr/bin/env node
/**
 * End-to-end test for admin CRUD operations against the live Supabase DB.
 * Uses the service role key (admin client) to bypass RLS.
 *
 * Usage: node scripts/test-e2e.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qpsmyhpjbibnodmhexbi.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "sb_publishable_fBd9Wq0-uSDXUnWYcVU7bA_cE6VipHB";

if (!SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY not set");
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TEST_PRODUCT_ID = "__e2e_test_product__";
const TEST_SLUG = "e2e-test-product";

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    console.log(`  ✅ ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${msg}`);
    failed++;
  }
}

async function cleanup() {
  await admin.from("products").delete().eq("id", TEST_PRODUCT_ID);
}

// ─── Test 1: CREATE ───────────────────────
async function testCreate() {
  console.log("\n🧪 Test 1: CREATE product");

  const { error } = await admin.from("products").insert({
    id: TEST_PRODUCT_ID,
    name: "E2E Test Product",
    slug: TEST_SLUG,
    category: "flower",
    short_description: "Test product for E2E",
    long_description: "Detailed test description",
    price_display: "฿999 / test",
    price_value: 999,
    image: "/images/test.jpg",
    images: ["/images/test.jpg", "/images/test2.jpg"],
    tags: ["test", "e2e"],
    featured: false,
    in_stock: true,
    is_active: true,
    line_inquiry_text: "Test inquiry",
    strain: "sativa",
    thc_content: "High",
    weight: "1g",
    effects: ["Relaxed", "Happy"],
    code: "TEST001",
    brand: "TestBrand",
    price_options: [{ label: "1g", price: 999 }, { label: "3.5g", price: 2500 }],
    seo_title: "E2E Test SEO Title",
    seo_description: "E2E Test SEO Description",
  });

  assert(!error, `Insert product (${error?.message || "ok"})`);

  // Verify it exists
  const { data, error: readErr } = await admin
    .from("products")
    .select("*")
    .eq("id", TEST_PRODUCT_ID)
    .single();

  assert(!readErr, `Read back product (${readErr?.message || "ok"})`);
  assert(data?.name === "E2E Test Product", `Name matches: ${data?.name}`);
  assert(data?.slug === TEST_SLUG, `Slug matches: ${data?.slug}`);
  assert(data?.category === "flower", `Category matches: ${data?.category}`);
  assert(data?.price_value === 999, `Price value matches: ${data?.price_value}`);
  assert(data?.is_active === true, `is_active is true`);
  assert(data?.seo_title === "E2E Test SEO Title", `seo_title matches: ${data?.seo_title}`);
  assert(data?.seo_description === "E2E Test SEO Description", `seo_description matches`);
  assert(Array.isArray(data?.images) && data.images.length === 2, `Images array: ${data?.images?.length} items`);
  assert(Array.isArray(data?.effects) && data.effects.length === 2, `Effects array: ${data?.effects?.length} items`);
  assert(Array.isArray(data?.price_options) && data.price_options.length === 2, `Price options: ${data?.price_options?.length} items`);
  assert(data?.strain === "sativa", `Strain: ${data?.strain}`);
  assert(data?.featured === false, `Not featured`);
  assert(data?.in_stock === true, `In stock`);
}

// ─── Test 2: UPDATE ───────────────────────
async function testUpdate() {
  console.log("\n🧪 Test 2: UPDATE product");

  const { error } = await admin
    .from("products")
    .update({
      name: "E2E Updated Product",
      short_description: "Updated description",
      price_value: 1500,
      featured: true,
      seo_title: "Updated SEO Title",
      seo_description: null,
    })
    .eq("id", TEST_PRODUCT_ID);

  assert(!error, `Update product (${error?.message || "ok"})`);

  const { data } = await admin
    .from("products")
    .select("*")
    .eq("id", TEST_PRODUCT_ID)
    .single();

  assert(data?.name === "E2E Updated Product", `Name updated: ${data?.name}`);
  assert(data?.short_description === "Updated description", `Description updated`);
  assert(data?.price_value === 1500, `Price updated: ${data?.price_value}`);
  assert(data?.featured === true, `Featured toggled to true`);
  assert(data?.seo_title === "Updated SEO Title", `SEO title updated`);
  assert(data?.seo_description === null, `SEO description cleared`);
  // Fields we didn't update should be preserved
  assert(data?.slug === TEST_SLUG, `Slug preserved: ${data?.slug}`);
  assert(data?.strain === "sativa", `Strain preserved: ${data?.strain}`);
  assert(data?.updated_at !== data?.created_at, `updated_at changed`);
}

// ─── Test 3: TOGGLE stock ─────────────────
async function testToggleStock() {
  console.log("\n🧪 Test 3: TOGGLE stock");

  const { error } = await admin
    .from("products")
    .update({ in_stock: false })
    .eq("id", TEST_PRODUCT_ID);

  assert(!error, `Set out of stock (${error?.message || "ok"})`);

  const { data } = await admin
    .from("products")
    .select("in_stock")
    .eq("id", TEST_PRODUCT_ID)
    .single();

  assert(data?.in_stock === false, `Stock is false`);

  // Toggle back
  await admin
    .from("products")
    .update({ in_stock: true })
    .eq("id", TEST_PRODUCT_ID);

  const { data: data2 } = await admin
    .from("products")
    .select("in_stock")
    .eq("id", TEST_PRODUCT_ID)
    .single();

  assert(data2?.in_stock === true, `Stock toggled back to true`);
}

// ─── Test 4: TOGGLE featured ──────────────
async function testToggleFeatured() {
  console.log("\n🧪 Test 4: TOGGLE featured");

  const { error } = await admin
    .from("products")
    .update({ featured: false })
    .eq("id", TEST_PRODUCT_ID);

  assert(!error, `Set not featured (${error?.message || "ok"})`);

  const { data } = await admin
    .from("products")
    .select("featured")
    .eq("id", TEST_PRODUCT_ID)
    .single();

  assert(data?.featured === false, `Featured is false`);
}

// ─── Test 5: TOGGLE active ────────────────
async function testToggleActive() {
  console.log("\n🧪 Test 5: TOGGLE active (is_active)");

  const { error } = await admin
    .from("products")
    .update({ is_active: false })
    .eq("id", TEST_PRODUCT_ID);

  assert(!error, `Set inactive (${error?.message || "ok"})`);

  const { data } = await admin
    .from("products")
    .select("is_active")
    .eq("id", TEST_PRODUCT_ID)
    .single();

  assert(data?.is_active === false, `is_active is false`);

  // Verify inactive product is hidden from public query (using RLS anon key)
  const publicClient = createClient(
    SUPABASE_URL,
    ANON_KEY
  );
  const { data: publicData } = await publicClient
    .from("products")
    .select("id")
    .eq("slug", TEST_SLUG)
    .eq("is_active", true);

  assert(
    !publicData || publicData.length === 0,
    `Inactive product hidden from public queries`
  );

  // Toggle back
  await admin
    .from("products")
    .update({ is_active: true })
    .eq("id", TEST_PRODUCT_ID);
}

// ─── Test 6: Public queries ───────────────
async function testPublicQueries() {
  console.log("\n🧪 Test 6: PUBLIC queries");

  const publicClient = createClient(
    SUPABASE_URL,
    ANON_KEY
  );

  // All active products
  const { data: allProducts, error: err1 } = await publicClient
    .from("products")
    .select("id, name, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  assert(!err1, `Fetch all active products (${err1?.message || "ok"})`);
  assert(allProducts && allProducts.length > 0, `Got ${allProducts?.length} active products`);
  assert(
    allProducts?.every((p) => p.is_active === true),
    `All returned products are active`
  );

  // Featured products
  const { data: featured, error: err2 } = await publicClient
    .from("products")
    .select("id, featured, is_active")
    .eq("featured", true)
    .eq("is_active", true);

  assert(!err2, `Fetch featured products (${err2?.message || "ok"})`);
  assert(featured && featured.length > 0, `Got ${featured?.length} featured products`);

  // Categories
  const { data: cats, error: err3 } = await publicClient
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  assert(!err3, `Fetch categories (${err3?.message || "ok"})`);
  assert(cats && cats.length === 4, `Got ${cats?.length} categories`);

  // Single product by slug
  const { data: single, error: err4 } = await publicClient
    .from("products")
    .select("*")
    .eq("slug", "cajan-mintz")
    .eq("is_active", true)
    .single();

  assert(!err4, `Fetch single product by slug (${err4?.message || "ok"})`);
  assert(single?.name === "Cajan Mintz", `Single product name: ${single?.name}`);
}

// ─── Test 7: DELETE ───────────────────────
async function testDelete() {
  console.log("\n🧪 Test 7: DELETE product");

  const { error } = await admin
    .from("products")
    .delete()
    .eq("id", TEST_PRODUCT_ID);

  assert(!error, `Delete product (${error?.message || "ok"})`);

  // Verify it's gone
  const { data, error: readErr } = await admin
    .from("products")
    .select("id")
    .eq("id", TEST_PRODUCT_ID);

  assert(!readErr, `Read after delete (${readErr?.message || "ok"})`);
  assert(!data || data.length === 0, `Product is gone`);
}

// ─── Test 8: Schema integrity ─────────────
async function testSchemaIntegrity() {
  console.log("\n🧪 Test 8: SCHEMA integrity checks");

  // Test category enum constraint
  const { error: enumErr } = await admin.from("products").insert({
    id: "__e2e_bad_category__",
    name: "Bad Category",
    slug: "bad-category",
    category: "invalid_category",
    price_display: "test",
    price_value: 0,
    image: "",
    line_inquiry_text: "",
  });

  assert(
    !!enumErr,
    `Invalid category rejected: ${enumErr?.message?.substring(0, 60) || "NOT REJECTED!"}`
  );

  // Test duplicate slug constraint
  const { error: dupeErr } = await admin.from("products").insert({
    id: "__e2e_dupe_slug__",
    name: "Dupe Slug",
    slug: "cajan-mintz", // already exists
    category: "flower",
    price_display: "test",
    price_value: 0,
    image: "",
    line_inquiry_text: "",
  });

  assert(
    !!dupeErr,
    `Duplicate slug rejected: ${dupeErr?.message?.substring(0, 60) || "NOT REJECTED!"}`
  );

  // Cleanup any accidental inserts
  await admin.from("products").delete().eq("id", "__e2e_bad_category__");
  await admin.from("products").delete().eq("id", "__e2e_dupe_slug__");
}

// ─── Test 9: Storage bucket ───────────────
async function testStorageBucket() {
  console.log("\n🧪 Test 9: STORAGE bucket");

  const { data: buckets, error } = await admin.storage.listBuckets();
  assert(!error, `List buckets (${error?.message || "ok"})`);

  const imgBucket = buckets?.find((b) => b.id === "product-images");
  assert(!!imgBucket, `product-images bucket exists`);
  assert(imgBucket?.public === true, `Bucket is public`);
}

// ─── Run all tests ────────────────────────
async function main() {
  console.log("🚀 Xaweed E2E Test Suite — Live Supabase DB");
  console.log("============================================");

  // Clean up any leftover test data
  await cleanup();

  try {
    await testCreate();
    await testUpdate();
    await testToggleStock();
    await testToggleFeatured();
    await testToggleActive();
    await testPublicQueries();
    await testDelete();
    await testSchemaIntegrity();
    await testStorageBucket();
  } catch (err) {
    console.error("\n💥 Unexpected error:", err);
    failed++;
  } finally {
    // Always cleanup
    await cleanup();
  }

  console.log("\n============================================");
  console.log(`📊 Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("🎉 All tests passed!");
  }
}

main();
