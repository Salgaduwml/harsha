import { Outfit, Playfair_Display, Tangerine } from "next/font/google";
import "./globals.css";
import MusicToggle from "./components/MusicToggle";
import MobileOnlyNotice from "./components/MobileOnlyNotice";
import { HeroPhaseProvider } from "./components/HeroPhaseContext";
import FixedFrameLayer from "./components/FixedFrameLayer";

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
  title: "Harsha & Sachini — A Garden Wedding",
  description:
    "Join us for the wedding celebration of Harsha & Sachini. Two hearts united in love, celebrated in bloom. September 19, 2026.",
  openGraph: {
    title: "Harsha & Sachini — Wedding Invitation",
    description:
      "You are cordially invited to witness the union of two hearts, amid flowers, joy, and love.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${playfair.variable} antialiased`}
    >
      <body
        className="min-h-screen w-screen"
        style={{ background: "var(--garden-ivory)" }}
      >
        <MobileOnlyNotice />
        <HeroPhaseProvider>
          {children}
          <FixedFrameLayer />
        </HeroPhaseProvider>
        <MusicToggle musicSrc="/bg.mp3" />
      </body>
    </html>
  );
}
