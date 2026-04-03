import { getProductById } from "@/lib/supabase/queries";
import { ProductForm } from "../../../components/ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <a
          href="/admin"
          className="text-brand-cream/50 text-sm hover:text-brand-cream/80 transition-colors"
        >
          ← Back to products
        </a>
        <h1 className="text-2xl font-bold mt-2">Edit: {product.name}</h1>
      </div>
      <ProductForm product={product} mode="edit" />
    </div>
  );
}
