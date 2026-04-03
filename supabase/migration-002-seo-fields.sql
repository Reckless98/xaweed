-- ============================================
-- Migration 002 — Add SEO & publishing fields
-- Run this in Supabase SQL Editor AFTER schema.sql + seed.sql
-- ============================================

-- Add SEO & publishing columns to products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Add index for active products
CREATE INDEX IF NOT EXISTS idx_products_active ON products (is_active) WHERE is_active = TRUE;

-- Backfill: all existing products should be active
UPDATE products SET is_active = TRUE WHERE is_active IS NULL;
