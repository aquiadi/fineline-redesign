import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fine Line Auto Body | Premium Auto Body Shop in San Bruno, CA",
  description: "Fine Line Auto Body Shop offers top-notch auto body repair, collision repair, dent removal, auto painting, and restoration services in San Bruno, CA 94066. Free estimates available.",
  keywords: "auto body shop, San Bruno, collision repair, dent removal, auto painting, auto restoration, car repair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
