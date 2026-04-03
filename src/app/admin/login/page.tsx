"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { loginWithMagicLink, loginWithPassword } from "../actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const { locale, setLocale, t } = useI18n();

  const URL_ERRORS: Record<string, string> = {
    auth_failed: t("admin.login.authFailed"),
    unauthorized: t("admin.login.unauthorized"),
  };

  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    urlError ? "error" : "idle"
  );
  const [errorMsg, setErrorMsg] = useState(
    urlError ? URL_ERRORS[urlError] ?? "An error occurred." : ""
  );

  async function handleMagicLink(e: React.FormEvent) {
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

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    const result = await loginWithPassword(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-2xl font-bold text-brand-ivory">
              {t("admin.login.title")}
            </h1>
            <button
              onClick={() => setLocale(locale === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-smoke/60 border border-brand-ash/20 hover:border-brand-green/30 transition-all text-sm"
              aria-label="Toggle language"
            >
              <span className={locale === "th" ? "text-brand-green font-semibold" : "text-brand-cream/40"}>
                TH
              </span>
              <span className="text-brand-ash/40">/</span>
              <span className={locale === "en" ? "text-brand-green font-semibold" : "text-brand-cream/40"}>
                EN
              </span>
            </button>
          </div>
          <p className="text-brand-cream/50 text-sm mt-2">
            {t("admin.login.subtitle")}
          </p>
        </div>

        {status === "sent" ? (
          <div className="rounded-xl bg-brand-green/10 border border-brand-green/20 p-6 text-center">
            <p className="text-brand-green font-medium">{t("admin.login.checkEmail")}</p>
            <p className="text-brand-cream/50 text-sm mt-2">
              {t("admin.login.magicLinkSent")} <strong className="text-brand-ivory">{email}</strong>.
              {" "}{t("admin.login.clickToSign")}
            </p>
          </div>
        ) : mode === "password" ? (
          <form onSubmit={handlePassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-brand-cream/70 mb-1.5">
                {t("admin.login.email")}
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

            <div>
              <label htmlFor="password" className="block text-sm text-brand-cream/70 mb-1.5">
                {t("admin.login.password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
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
              {status === "loading" ? t("admin.login.signingIn") : t("admin.login.signIn")}
            </button>

            <button
              type="button"
              onClick={() => { setMode("magic"); setStatus("idle"); setErrorMsg(""); }}
              className="w-full text-center text-brand-cream/40 text-sm hover:text-brand-green/70 transition-colors"
            >
              {t("admin.login.useMagicLink")}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label htmlFor="email-magic" className="block text-sm text-brand-cream/70 mb-1.5">
                {t("admin.login.email")}
              </label>
              <input
                id="email-magic"
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
              {status === "loading" ? t("admin.login.sending") : t("admin.login.sendLink")}
            </button>

            <button
              type="button"
              onClick={() => { setMode("password"); setStatus("idle"); setErrorMsg(""); }}
              className="w-full text-center text-brand-cream/40 text-sm hover:text-brand-green/70 transition-colors"
            >
              {t("admin.login.usePassword")}
            </button>
          </form>
        )}

        <p className="text-center text-brand-cream/30 text-xs mt-6">
          <Link href="/" className="hover:text-brand-cream/60 transition-colors">
            {t("admin.login.backToSite")}
          </Link>
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
