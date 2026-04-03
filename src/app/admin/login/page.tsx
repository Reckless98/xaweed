"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginWithMagicLink } from "../actions";

const URL_ERRORS: Record<string, string> = {
  auth_failed: "Authentication failed. Please try again.",
  unauthorized: "This email is not authorized for admin access.",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    urlError ? "error" : "idle"
  );
  const [errorMsg, setErrorMsg] = useState(
    urlError ? URL_ERRORS[urlError] ?? "An error occurred." : ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData();
    formData.set("email", email);

    const result = await loginWithMagicLink(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMsg(result.error);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-ivory">
            🌿 Xaweed Admin
          </h1>
          <p className="text-brand-cream/50 text-sm mt-2">
            Sign in with your email to manage products
          </p>
        </div>

        {status === "sent" ? (
          <div className="rounded-xl bg-brand-green/10 border border-brand-green/20 p-6 text-center">
            <p className="text-brand-green font-medium">Check your email!</p>
            <p className="text-brand-cream/50 text-sm mt-2">
              We sent a magic link to <strong className="text-brand-ivory">{email}</strong>.
              Click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-brand-cream/70 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@xaweed.com"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-brand-charcoal border border-brand-ash/20 text-brand-ivory placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-green/40 transition-colors"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl bg-brand-green text-brand-black font-semibold hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        )}

        <p className="text-center text-brand-cream/30 text-xs mt-6">
          <a href="/" className="hover:text-brand-cream/60 transition-colors">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
