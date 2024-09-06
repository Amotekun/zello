import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/footer";
import { AppInitializer } from "@/components/app-initializer";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AppInitializer />
          <ModalProvider />
          <Toaster />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}