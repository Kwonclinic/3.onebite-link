import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { FolderProvider } from "@/lib/folder-context";
import { LinkProvider } from "@/lib/link-context";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FolderProvider>
      <LinkProvider>
        <div className="flex flex-1 flex-col bg-[var(--background)] font-sans">
          <Header />

          <div className="flex flex-1">
            <Sidebar />

            <main className="flex-1 px-5 pt-9 pb-8">{children}</main>
          </div>
        </div>
      </LinkProvider>
    </FolderProvider>
  );
}
