import { DocMobileNav, DocSidebar } from "@/site/doc-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:gap-12 lg:px-8 lg:py-12">
      <DocSidebar className="hidden md:block" />
      <div className="min-w-0 flex-1">
        <DocMobileNav />
        {children}
      </div>
    </div>
  );
}
