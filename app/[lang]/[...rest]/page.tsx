import { notFound } from "next/navigation";

// Catch-all so unmatched URLs render the localized not-found page inside the
// [lang] layout instead of Next's bare default 404.
export default function CatchAll() {
  notFound();
}
