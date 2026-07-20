import { Cinzel_Decorative, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import MusicToggle from "./components/MusicToggle";
import MobileOnlyNotice from "./components/MobileOnlyNotice";
import Image from "next/image";

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
  title: "Harsha & Sachini - A Love Beyond the Walls",
  description:
    "Join us for the wedding celebration of Harsha & Sachini. Two hearts that broke through every wall. Shinzou wo Sasageyo!",
  openGraph: {
    title: "Harsha & Sachini - Wedding Invitation",
    description:
      "You are cordially invited to witness two hearts unite beyond the walls.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen w-screen">
        <MobileOnlyNotice />
        {children}
        <MusicToggle musicSrc="/bg.mp3" />
        <div className="fixed top-0 left-0 h-screen w-screen z-[-1]">
          <Image src="/hero-last.png" loading="lazy" alt="Hero" fill className="object-cover" />
        </div>
      </body>
    </html>
  );
}
