"use client";

import { useState, FormEvent } from "react";

interface ContactFormProps {
  websiteUrl?: string;
}

export default function ContactForm({ websiteUrl = "" }: ContactFormProps) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState(websiteUrl);
  const [serviceType, setServiceType] = useState("audit");
  const [note, setNote] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!gdprConsent) {
      setErrorMessage("Pro odeslání je nutný souhlas se zpracováním údajů.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          websiteUrl: url,
          serviceType,
          note,
          gdprConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Něco se pokazilo. Zkuste to znovu.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Nepodařilo se odeslat. Zkontrolujte připojení a zkuste znovu.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10 px-6 rounded-2xl bg-green-50 border-2 border-green-200">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-xl font-black text-green-800 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Poptávka odeslána
        </h3>
        <p className="text-green-700">
          Děkujeme! Ozveme se vám do 24 hodin na <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Váš e-mail *
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vas@email.cz"
          className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none transition-colors text-base"
        />
      </div>

      <div>
        <label htmlFor="contact-url" className="block text-sm font-semibold text-slate-700 mb-1.5">
          URL webu
        </label>
        <input
          id="contact-url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="www.vas-eshop.cz"
          className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none transition-colors text-base"
        />
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Co potřebujete *
        </label>
        <select
          id="contact-service"
          required
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:outline-none transition-colors text-base appearance-none cursor-pointer"
        >
          <option value="audit">Kompletní audit celého webu</option>
          <option value="monitoring">Pravidelný monitoring</option>
          <option value="other">Jiné</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-note" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Poznámka <span className="font-normal text-slate-400">(nepovinné)</span>
        </label>
        <textarea
          id="contact-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Např. kolik stránek má váš web, jak často chcete kontrolovat..."
          maxLength={500}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none transition-colors text-base resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="contact-gdpr"
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-2 border-slate-300 text-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
          required
        />
        <label htmlFor="contact-gdpr" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
          Souhlasím se zpracováním osobních údajů za účelem odpovědi na mou poptávku. *
        </label>
      </div>

      {status === "error" && errorMessage && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full h-12 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 active:bg-indigo-900 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Odesílám...
          </span>
        ) : (
          "Nezávazně poptat"
        )}
      </button>
    </form>
  );
}
