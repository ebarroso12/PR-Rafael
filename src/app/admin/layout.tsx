export const metadata = {
  title: "Central RenovaH â Acesso administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink text-parchment-soft">{children}</div>;
}
