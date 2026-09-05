import type { Metadata } from "next";
import "./globals.css";

// Loaded via a <link> tag (runtime, in the visitor's browser) instead of
// next/font/google, so the Vercel build never depends on reaching Google
// Fonts at build time.
export const metadata: Metadata = {
  title: "RenovaH | Psicanálise, Fé e Mentoria para Homens",
  description:
    "Atendimento individual, apoio e mentoria para homens que desejam restaurar a identidade, fortalecer a família e voltar a caminhar com clareza diante de Deus e de si mesmos. Com Pr. Rafael Melo — pastor, psicanalista e mentor de homens.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-parchment">{children}</body>
    </html>
  );
}
