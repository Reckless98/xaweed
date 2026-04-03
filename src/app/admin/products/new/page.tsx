import { ProductForm } from "../../components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <a
          href="/admin"
          className="text-brand-cream/50 text-sm hover:text-brand-cream/80 transition-colors"
        >
          ← Back to products
        </a>
        <h1 className="text-2xl font-bold mt-2">Add New Product</h1>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
