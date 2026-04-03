"use client";

import { useState } from "react";
import type { Product, Category } from "@/types";
import { deleteProduct, toggleProductStock, toggleProductFeatured, toggleProductActive } from "../actions";

interface AdminProductListProps {
  products: Product[];
  categories: Category[];
}

export function AdminProductList({ products, categories }: AdminProductListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    if (filter !== "all" && p.category !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    const result = await deleteProduct(id);
    if (result?.error) {
      alert(`Error: ${result.error}`);
      setDeleting(null);
    }
  }

  async function handleToggleStock(id: string, current: boolean) {
    await toggleProductStock(id, !current);
  }

  async function handleToggleFeatured(id: string, current: boolean) {
    await toggleProductFeatured(id, !current);
  }

  async function handleToggleActive(id: string, current: boolean) {
    await toggleProductActive(id, !current);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 max-w-xs px-3 py-2 rounded-lg bg-brand-charcoal border border-brand-ash/20 text-brand-ivory text-sm placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-green/40"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-brand-green text-brand-black"
                : "bg-brand-smoke text-brand-cream/50 hover:text-brand-cream/80"
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === cat.id
                    ? "bg-brand-green text-brand-black"
                    : "bg-brand-smoke text-brand-cream/50 hover:text-brand-cream/80"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product table */}
      <div className="rounded-xl border border-brand-ash/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-smoke/50 text-brand-cream/60 text-left">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium text-center">Stock</th>
                <th className="px-4 py-3 font-medium text-center hidden sm:table-cell">Featured</th>
                <th className="px-4 py-3 font-medium text-center hidden sm:table-cell">Active</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-ash/10">
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-brand-smoke/30 transition-colors ${
                    deleting === product.id ? "opacity-50" : ""
                  } ${!product.isActive ? "opacity-60" : ""}`}
                >
                  {/* Product name + image */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-smoke overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-brand-ivory font-medium truncate">
                          {product.name}
                        </p>
                        <p className="text-brand-cream/40 text-xs truncate sm:hidden">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-brand-smoke text-brand-cream/60">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-brand-cream/80">
                    {product.priceDisplay}
                  </td>

                  {/* Stock toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleStock(product.id, product.inStock)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        product.inStock
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out"}
                    </button>
                  </td>

                  {/* Featured toggle */}
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <button
                      onClick={() => handleToggleFeatured(product.id, product.featured)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        product.featured
                          ? "bg-brand-gold/10 text-brand-gold"
                          : "bg-brand-smoke text-brand-cream/30"
                      }`}
                    >
                      {product.featured ? "★ Featured" : "☆"}
                    </button>
                  </td>

                  {/* Active toggle */}
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <button
                      onClick={() => handleToggleActive(product.id, product.isActive ?? true)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        product.isActive
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {product.isActive ? "Active" : "Hidden"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3 py-1 rounded-lg bg-brand-smoke text-brand-cream/70 text-xs hover:bg-brand-ash/50 transition-colors"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deleting === product.id}
                        className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-brand-cream/30">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
