"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "success" | "error";
const DEFAULT_ERROR_MESSAGE = "Nepodařilo se odeslat report. Zkus to prosím znovu.";

export default function BugReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("idle");
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      pageUrl: String(formData.get("pageUrl") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/bug-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: { message?: string; issueUrl?: string } = {};

      try {
        data = (await response.json()) as { message?: string; issueUrl?: string };
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message ?? DEFAULT_ERROR_MESSAGE);
      }

      setSubmitState("success");
      setMessage(
        data.issueUrl
          ? `Díky, report byl vytvořen: ${data.issueUrl}`
          : "Díky, report byl úspěšně odeslán.",
      );
      event.currentTarget.reset();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-white">
          Název chyby *
        </label>
        <input
          id="title"
          name="title"
          required
          maxLength={120}
          className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent"
          placeholder="Např. Tlačítko nefunguje na stránce roadmap"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold text-white">
          Popis chyby *
        </label>
        <textarea
          id="description"
          name="description"
          required
          maxLength={4000}
          rows={6}
          className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent"
          placeholder="Co se stalo, jak to reprodukovat, jaký byl očekávaný výsledek..."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-white">
            Kontakt (volitelné)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={200}
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent"
            placeholder="tvoje@email.cz"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pageUrl" className="text-sm font-semibold text-white">
            URL stránky (volitelné)
          </label>
          <input
            id="pageUrl"
            name="pageUrl"
            type="url"
            maxLength={500}
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent"
            placeholder="https://modulbit.eu/..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-bold text-[#181d24] transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? "Odesílám..." : "Nahlásit chybu"}
      </button>

      {message ? (
        <p className={submitState === "error" ? "text-red-300" : "text-accent"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
