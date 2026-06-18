import { Wine } from "lucide-react";

/** Subtle decorative divider to give section transitions a sense of cohesion. */
const SectionDivider = () => (
  <div className="bg-wine-dark py-6" aria-hidden="true">
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-wine-primary/25 to-transparent" />
      <Wine className="h-4 w-4 shrink-0 text-wine-primary/50" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-wine-primary/25 to-transparent" />
    </div>
  </div>
);

export default SectionDivider;
