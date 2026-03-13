"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ScanForm({ size = "large" }: { size?: "large" | "compact" }) {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    router.push(`/vysledky?url=${encodeURIComponent(trimmed)}`);
  }

  if (size === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="www.vas-eshop.cz"
          className="flex-1 h-12 px-4 rounded-lg border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none transition-colors text-base"
          required
        />
        <button
          type="submit"
          className="h-12 px-6 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 active:bg-indigo-900 transition-colors cursor-pointer whitespace-nowrap"
        >
          Skenovat
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Zadejte adresu e-shopu — např. www.vas-eshop.cz"
              className="w-full h-14 sm:h-16 pl-12 pr-4 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-lg placeholder:text-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all shadow-sm"
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="h-14 sm:h-16 px-8 rounded-xl bg-indigo-700 text-white text-lg font-bold tracking-wide hover:bg-indigo-800 active:bg-indigo-900 transition-all shadow-lg shadow-indigo-700/25 hover:shadow-indigo-700/40 cursor-pointer whitespace-nowrap"
          >
            Zkontrolovat zdarma
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-500 text-center sm:text-left">
          Sken trvá 5–15 sekund. Kontrolujeme podle standardu WCAG 2.1 AA.
        </p>
      </div>
    </form>
  );
}
