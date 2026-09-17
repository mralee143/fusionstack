/** The template's CTA arrow. Sized by the parent's font-size (see .btn-border). */
export default function Arrow() {
  return (
    <svg viewBox="0 0 18 20" fill="none" aria-hidden>
      <path
        d="M1 10h14.22M8.11 1.11 17 10l-8.89 8.89"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
