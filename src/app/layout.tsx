import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://latansa.id"),
  title: {
    default: "Latansa - Solusi Software untuk Bisnis & Pendidikan",
    template: "%s | Latansa",
  },
  description:
    "Jasa pengembangan software: aplikasi enterprise, aplikasi pendidikan, mobile app, dan website profesional. Konsultasi gratis.",
  keywords: [
    "software house",
    "jasa pembuatan aplikasi",
    "aplikasi enterprise",
    "aplikasi pendidikan",
    "jasa mobile app",
    "jasa website profesional",
    "company profile",
    "programmer",
  ],
  authors: [{ name: "Latansa" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={jakarta.variable}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-700 antialiased dark:bg-slate-950 dark:text-slate-400">
        {/* Penanda bahwa JS aktif - animasi reveal hanya menyembunyikan konten jika class ini ada */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
