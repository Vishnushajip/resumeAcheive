import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <AppBar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
