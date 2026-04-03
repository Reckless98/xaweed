import { getAllProducts, getCategories } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { AdminProductList } from "./components/AdminProductList";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">🌿 Product Manager</h1>
          <p className="text-brand-cream/50 text-sm mt-1">
            {products.length} products · {categories.length} categories ·
            Logged in as {user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/admin/products/new"
            className="px-4 py-2 rounded-lg bg-brand-green text-brand-black font-medium text-sm hover:bg-brand-green/90 transition-colors"
          >
            + Add Product
          </a>
          <form action="/admin/logout" method="post">
            <button
              formAction={async () => {
                "use server";
                const { logout } = await import("./actions");
                await logout();
              }}
              className="px-4 py-2 rounded-lg bg-brand-smoke text-brand-cream/70 text-sm hover:bg-brand-ash/50 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <AdminProductList products={products} categories={categories} />
    </div>
  );
}
