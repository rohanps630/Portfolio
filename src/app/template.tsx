// No page-level transition here — per-section FadeIn components handle all entrance animations.
// A wrapping motion.div here would double-animate content and compound with section FadeIn on navigation.
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
