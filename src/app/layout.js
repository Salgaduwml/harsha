import { Outfit, Playfair_Display, Tangerine } from "next/font/google";
import "./globals.css";
import MusicToggle from "./components/MusicToggle";
import MobileOnlyNotice from "./components/MobileOnlyNotice";
import { HeroPhaseProvider } from "./components/HeroPhaseContext";

const cinzel = Tangerine({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Sachini & Harsha",
  description:
    "Join us for the wedding celebration of Sachini & Harsha. Two hearts united in love, celebrated in bloom. September 19, 2026.",
  openGraph: {
    title: "Sachini & Harsha — Wedding Invitation",
    description:
      "You are cordially invited to witness the union of two hearts, amid flowers, joy, and love.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sachini & Harsha Wedding Invitation",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${playfair.variable} antialiased`}
    >
      <body className="w-screen">
        <MobileOnlyNotice />
        <HeroPhaseProvider>{children}</HeroPhaseProvider>
        <MusicToggle musicSrc="/bg.mp3" />
      </body>
    </html>
  );
}
