import Providers from "@/app/providers";
import { roboto } from "@/lib/fonts";
import type { Metadata } from "next";
import { Toaster } from "sonner";
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
          <main className="h-full">
            {children}
            <Toaster expand={false} visibleToasts={5} position="top-right" richColors closeButton />
          </main>
        </Providers>
      </body>
    </html>
  );
}
