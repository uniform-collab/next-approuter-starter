
import "../styles/styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="main">
        {children}
      </body>
    </html>
  );
}
