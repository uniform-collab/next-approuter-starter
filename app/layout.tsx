import { Inter } from "next/font/google";
import "../styles/styles.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className={inter.className}>{children}</body>
    </>
  );
}
