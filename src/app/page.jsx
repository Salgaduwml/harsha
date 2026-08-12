import Navbar from "./components/Navbar";
import TimelineSection from "./components/TimelineSection";
import ScrollVideoHero from "./components/ScrollVideoHero";
import SmoothScroll from "./components/SmoothScroll";
import Countdown from "./components/Countdown";
import LocationSection from "./components/LocationSection";
import ScratchHeartSection from "./components/ScratchHeartSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <Navbar />

        <ScrollVideoHero />

        <div className="px-4 py-6">
          <TimelineSection />
        </div>

        {/* <WeddingPartySection /> */}

        <div className="px-4 py-6">
          <Countdown />
        </div>

        <div className="px-4 py-6">
          <LocationSection />
        </div>

        <div className="px-4 pt-6">
          <ScratchHeartSection />
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
