import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/global.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Templated Next App",
  description: "Created by enVId Tech(TM) 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Template NextJS Login</title>
        <meta name="description" content="Created by enVId Tech(TM) 2024" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
