import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LineFloatingButton } from "@/components/ui/LineFloatingButton";
import { getProductBySlug, getProductSlugs } from "@/lib/supabase/queries";
import { siteMetadata } from "@/data/site";
import { ProductDetail } from "./ProductDetail";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = product.seoTitle || `${product.name} — Xaweed Shop`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `${product.name} — ${product.priceDisplay}. Premium cannabis product available at Xaweed Shop, Nonthaburi.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteMetadata.url}/products/${product.slug}`,
      siteName: "Xaweed Shop",
      type: "website",
      images: product.image
        ? [
            {
              url: product.image.startsWith("http")
                ? product.image
                : `${siteMetadata.url}${product.image}`,
              width: 800,
              height: 800,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription || product.shortDescription,
    image: product.image.startsWith("http")
      ? product.image
      : `${siteMetadata.url}${product.image}`,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : { "@type": "Brand", name: "Xaweed Shop" },
    offers: {
      "@type": "Offer",
      price: product.priceValue,
      priceCurrency: "THB",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Xaweed Shop",
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-brand-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductDetail product={product} />
      </main>
      <Footer />
      <LineFloatingButton />
    </>
  );
}
