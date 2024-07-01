import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { roboto } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procesa Contable",
  description: "ProcesaContable is a streamlined accounting software designed to simplify your company's financial management. Built with React for the frontend and Spring Boot for the backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased h-full`}>
        <Providers>
          <main className="h-full">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
