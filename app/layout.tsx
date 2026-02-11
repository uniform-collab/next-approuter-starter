import { Inter } from "next/font/google";
import "../styles/styles.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechWave - Transform Your Business",
  description:
    "Transform your business with cutting-edge solutions. Flexible pricing plans, enterprise features, and unmatched support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
