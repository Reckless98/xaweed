import { getAllProducts, getCategories } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "./components/AdminHeader";
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
      <AdminHeader
        productCount={products.length}
        categoryCount={categories.length}
        userEmail={user.email ?? ""}
      />
      <AdminProductList products={products} categories={categories} />
    </div>
  );
}
