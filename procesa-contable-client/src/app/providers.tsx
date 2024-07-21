"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
};

export default Providers;
