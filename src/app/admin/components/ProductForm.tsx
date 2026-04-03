"use client";

import { useState, useRef } from "react";
import type { Product } from "@/types";
import { createProduct, updateProduct, uploadProductImage } from "../actions";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

const CATEGORIES = [
  { value: "flower", label: "Flower" },
  { value: "edible", label: "Edible" },
  { value: "pre-roll", label: "Pre-Roll" },
  { value: "accessory", label: "Accessory" },
  { value: "concentrate", label: "Concentrate" },
];

const STRAINS = [
  { value: "", label: "None" },
  { value: "sativa", label: "Sativa" },
  { value: "indica", label: "Indica" },
  { value: "hybrid", label: "Hybrid" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [category, setCategory] = useState<Product["category"]>(product?.category ?? "flower");
  const [shortDesc, setShortDesc] = useState(product?.shortDescription ?? "");
  const [longDesc, setLongDesc] = useState(product?.longDescription ?? "");
  const [priceDisplay, setPriceDisplay] = useState(product?.priceDisplay ?? "");
  const [priceValue, setPriceValue] = useState(product?.priceValue ?? 0);
  const [image, setImage] = useState(product?.image ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [tags, setTags] = useState(product?.tags?.join(", ") ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [lineText, setLineText] = useState(product?.lineInquiryText ?? "");
  const [strain, setStrain] = useState(product?.strain ?? "");
  const [thcContent, setThcContent] = useState(product?.thcContent ?? "");
  const [weight, setWeight] = useState(product?.weight ?? "");
  const [effects, setEffects] = useState(product?.effects?.join(", ") ?? "");
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [seoTitle, setSeoTitle] = useState(product?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(product?.seoDescription ?? "");
  const [priceOptionsStr, setPriceOptionsStr] = useState(
    product?.priceOptions
      ? product.priceOptions.map((o) => `${o.label}:${o.price}`).join(", ")
      : ""
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleNameChange(value: string) {
    setName(value);
    if (mode === "create") {
      setSlug(slugify(value));
      setLineText(`Hi! I'd like to order ${value}.`);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadProductImage(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      setImage(result.url);
      setImages((prev) => [...prev, result.url!]);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const input = {
      name,
      slug,
      category,
      short_description: shortDesc,
      long_description: longDesc,
      price_display: priceDisplay,
      price_value: priceValue,
      image,
      images: images.filter(Boolean),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      in_stock: inStock,
      is_active: isActive,
      line_inquiry_text: lineText,
      strain: strain || null,
      thc_content: thcContent || null,
      weight: weight || null,
      effects: effects
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
      code: null,
      brand: brand || null,
      price_options: priceOptionsStr
        ? priceOptionsStr.split(",").map((opt) => {
            const [label, price] = opt.split(":").map((s) => s.trim());
            return { label, price: Number(price) || 0 };
          })
        : [],
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
    };

    let result;
    if (mode === "edit" && product) {
      result = await updateProduct(product.id, input);
    } else {
      result = await createProduct({ ...input, id: slug });
    }

    if (result?.error) {
      setError(result.error);
      setSubmitting(false);
    }
    // On success, the action redirects to /admin
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-brand-charcoal border border-brand-ash/20 text-brand-ivory text-sm placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-green/40 transition-colors";
  const labelClass = "block text-sm text-brand-cream/70 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Basic Info */}
      <fieldset className="space-y-4 rounded-xl border border-brand-ash/20 p-4">
        <legend className="text-sm font-medium text-brand-cream/70 px-2">
          Basic Info
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className={inputClass}
              placeholder="Cajan Mintz"
            />
          </div>
          <div>
            <label htmlFor="slug" className={labelClass}>Slug *</label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className={inputClass}
              placeholder="cajan-mintz"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className={labelClass}>Category *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Product["category"])}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand" className={labelClass}>Brand</label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={inputClass}
              placeholder="KANHA"
            />
          </div>
        </div>

        <div>
          <label htmlFor="shortDesc" className={labelClass}>Short Description *</label>
          <input
            id="shortDesc"
            type="text"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            required
            className={inputClass}
            placeholder="Minty hybrid — cool menthol finish"
          />
        </div>

        <div>
          <label htmlFor="longDesc" className={labelClass}>Long Description</label>
          <textarea
            id="longDesc"
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Detailed product description..."
          />
        </div>
      </fieldset>

      {/* Pricing */}
      <fieldset className="space-y-4 rounded-xl border border-brand-ash/20 p-4">
        <legend className="text-sm font-medium text-brand-cream/70 px-2">
          Pricing
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priceDisplay" className={labelClass}>Display Price *</label>
            <input
              id="priceDisplay"
              type="text"
              value={priceDisplay}
              onChange={(e) => setPriceDisplay(e.target.value)}
              required
              className={inputClass}
              placeholder="฿200 / 1g"
            />
          </div>
          <div>
            <label htmlFor="priceValue" className={labelClass}>Price Value (THB) *</label>
            <input
              id="priceValue"
              type="number"
              value={priceValue}
              onChange={(e) => setPriceValue(Number(e.target.value))}
              required
              min={0}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="priceOptions" className={labelClass}>
            Price Options (label:price, comma-separated)
          </label>
          <input
            id="priceOptions"
            type="text"
            value={priceOptionsStr}
            onChange={(e) => setPriceOptionsStr(e.target.value)}
            className={inputClass}
            placeholder="1 pack:165, 3 pack:450"
          />
        </div>
      </fieldset>

      {/* Images */}
      <fieldset className="space-y-4 rounded-xl border border-brand-ash/20 p-4">
        <legend className="text-sm font-medium text-brand-cream/70 px-2">
          Images
        </legend>

        <div>
          <label htmlFor="image" className={labelClass}>Main Image URL *</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className={inputClass}
            placeholder="/images/products/strains/example.jpeg"
          />
        </div>

        {image && (
          <div className="w-24 h-24 rounded-lg bg-brand-smoke overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <label htmlFor="imageUpload" className={labelClass}>Upload Image</label>
          <input
            id="imageUpload"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleImageUpload}
            disabled={uploading}
            className="text-sm text-brand-cream/50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-brand-smoke file:text-brand-cream/70 file:text-sm hover:file:bg-brand-ash/50 file:cursor-pointer file:transition-colors disabled:opacity-50"
          />
          {uploading && (
            <p className="text-brand-green text-xs mt-1">Uploading...</p>
          )}
        </div>

        <div>
          <label htmlFor="images" className={labelClass}>
            Additional Images (one URL per line)
          </label>
          <textarea
            id="images"
            value={images.join("\n")}
            onChange={(e) =>
              setImages(e.target.value.split("\n").filter(Boolean))
            }
            rows={3}
            className={inputClass}
            placeholder="/images/products/strains/example-alt.jpeg"
          />
        </div>
      </fieldset>

      {/* Cannabis Details */}
      <fieldset className="space-y-4 rounded-xl border border-brand-ash/20 p-4">
        <legend className="text-sm font-medium text-brand-cream/70 px-2">
          Cannabis Details (optional)
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="strain" className={labelClass}>Strain Type</label>
            <select
              id="strain"
              value={strain}
              onChange={(e) => setStrain(e.target.value)}
              className={inputClass}
            >
              {STRAINS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="thc" className={labelClass}>THC Content</label>
            <input
              id="thc"
              type="text"
              value={thcContent}
              onChange={(e) => setThcContent(e.target.value)}
              className={inputClass}
              placeholder="High"
            />
          </div>
          <div>
            <label htmlFor="weight" className={labelClass}>Weight</label>
            <input
              id="weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={inputClass}
              placeholder="1g / 10g"
            />
          </div>
        </div>

        <div>
          <label htmlFor="effects" className={labelClass}>
            Effects (comma-separated)
          </label>
          <input
            id="effects"
            type="text"
            value={effects}
            onChange={(e) => setEffects(e.target.value)}
            className={inputClass}
            placeholder="Relaxed, Euphoric, Happy"
          />
        </div>
      </fieldset>

      {/* Meta */}
      <fieldset className="space-y-4 rounded-xl border border-brand-ash/20 p-4">
        <legend className="text-sm font-medium text-brand-cream/70 px-2">
          Settings
        </legend>

        <div>
          <label htmlFor="tags" className={labelClass}>
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={inputClass}
            placeholder="hybrid, minty, potent, indoor"
          />
        </div>

        <div>
          <label htmlFor="lineText" className={labelClass}>LINE Inquiry Text</label>
          <input
            id="lineText"
            type="text"
            value={lineText}
            onChange={(e) => setLineText(e.target.value)}
            className={inputClass}
            placeholder="Hi! I'd like to order..."
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-green"
            />
            <span className="text-sm text-brand-cream/70">Active (visible on site)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-green"
            />
            <span className="text-sm text-brand-cream/70">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-gold"
            />
            <span className="text-sm text-brand-cream/70">Featured</span>
          </label>
        </div>
      </fieldset>

      {/* SEO */}
      <fieldset className="space-y-4 rounded-xl border border-brand-ash/20 p-4">
        <legend className="text-sm font-medium text-brand-cream/70 px-2">
          SEO (optional)
        </legend>

        <div>
          <label htmlFor="seoTitle" className={labelClass}>SEO Title</label>
          <input
            id="seoTitle"
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className={inputClass}
            placeholder="Custom page title for search engines"
          />
          <p className="text-xs text-brand-cream/30 mt-1">Leave blank to use product name</p>
        </div>

        <div>
          <label htmlFor="seoDescription" className={labelClass}>SEO Description</label>
          <textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={2}
            className={inputClass}
            placeholder="Custom meta description for search engines"
          />
          <p className="text-xs text-brand-cream/30 mt-1">Leave blank to use short description</p>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 rounded-xl bg-brand-green text-brand-black font-semibold text-sm hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? "Saving..."
            : mode === "create"
              ? "Create Product"
              : "Save Changes"}
        </button>
        <a
          href="/admin"
          className="px-6 py-2.5 rounded-xl bg-brand-smoke text-brand-cream/70 text-sm hover:bg-brand-ash/50 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
