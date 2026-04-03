import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Xaweed Shop",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-black text-brand-ivory">
      {children}
    </div>
  );
}
