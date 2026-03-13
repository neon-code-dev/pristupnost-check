"use client";

export default function LoadingState({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
      {/* Scanner visualization */}
      <div className="relative w-64 h-40 rounded-xl border-2 border-slate-300 bg-white overflow-hidden mb-8 shadow-lg">
        {/* Fake browser chrome */}
        <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="ml-2 flex-1 h-4 rounded bg-slate-200 max-w-[140px]" />
        </div>
        {/* Fake content lines */}
        <div className="p-3 space-y-2">
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-2 bg-slate-100 rounded w-full" />
          <div className="h-2 bg-slate-100 rounded w-5/6" />
          <div className="h-2 bg-slate-100 rounded w-2/3" />
          <div className="flex gap-2 mt-3">
            <div className="h-6 bg-slate-100 rounded w-16" />
            <div className="h-6 bg-slate-100 rounded w-20" />
          </div>
        </div>
        {/* Scanning line */}
        <div className="absolute inset-x-0 top-8 h-full">
          <div className="animate-scan-line w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-lg shadow-indigo-500/50" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Skenování probíhá…
      </h2>
      <p className="text-slate-500 text-center max-w-md">
        Kontrolujeme přístupnost stránky{" "}
        <span className="font-semibold text-slate-700 break-all">{url}</span>
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {["Načítání stránky", "Analýza DOM", "Kontrola WCAG"].map((step, i) => (
          <span
            key={step}
            className="text-xs text-slate-400 animate-pulse-slow"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
