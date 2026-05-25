"use client";

import * as Sentry from "@sentry/nextjs";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  Sentry.captureException(error);

  return (
    <html lang="tr">
      <body className="min-h-screen bg-[var(--surface)]">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="text-5xl">☕️</div>
          <h1 className="text-2xl font-semibold text-[var(--brown)]">
            Bir şeyler ters gitti.
          </h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Sayfayı yenileyebilir veya tekrar deneyebilirsin.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--brown)]"
          >
            Tekrar dene
          </button>
        </div>
      </body>
    </html>
  );
}
