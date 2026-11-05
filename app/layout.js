import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { company } from "@/data/company";
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
export const metadata = {
  title: `${company.name} | Premium Property Development`,
  description: "Thoughtful architecture, lasting value and modern living.",
  openGraph: {
    title: company.name,
    description: "Spaces that inspire. Homes that endure.",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
