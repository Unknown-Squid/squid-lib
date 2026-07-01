/**
 * Layout for authenticated sections. Prefer middleware + server checks here
 * (e.g. load user) rather than duplicating auth in every page.
 */
export default function RestrictedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
