"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-6 py-2 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
    >
      Print Resume
    </button>
  );
}
