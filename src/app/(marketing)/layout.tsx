export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  // Root layout now provides the shared marketing header/footer.
  // Keep this segment layout as a simple pass-through to avoid double-wrapping.
  return <>{children}</>;
}