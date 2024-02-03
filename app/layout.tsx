import type { Metadata } from "next";
import { Darker_Grotesque, Red_Hat_Display, Nunito } from "next/font/google";
import Header from "./_components/header";
import Footer from "./_components/footer";
import "./globals.css";

const darker = Darker_Grotesque({ 
  variable: '--font-darker-grotesque',
  subsets: ['latin'],
  weight: ['700'],
});

const red_hat = Red_Hat_Display({ 
  variable: '--font-red-hat',
  subsets: ['latin'],
  weight: ['700'],
});

const nunito = Nunito({ 
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});



export const metadata: Metadata = {
  title: "Gerador de Cartão de Visita",
  description: "Crie grátis seu cartão de visita em passos rápidos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${darker.variable} ${red_hat.variable} ${nunito.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
