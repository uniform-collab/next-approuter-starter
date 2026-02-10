import { Inter } from "next/font/google";
import "../styles/styles.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-dvh flex flex-col">
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="py-6 text-center text-xs text-neutral-400 tracking-wide">
            Built with Uniform &middot; Next.js
          </footer>
        </div>
      </body>
    </html>
  );
}
