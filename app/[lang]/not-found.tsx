import NotFoundContent from "@/components/not-found-content";

// Kept as a thin server wrapper: reading headers() or cookies() here would
// opt every [lang] route out of static prerendering, so locale detection
// happens client-side in NotFoundContent instead.
export default function NotFound() {
  return <NotFoundContent />;
}
