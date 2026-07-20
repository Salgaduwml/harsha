import Navbar from "./components/Navbar";
import TimelineSection from "./components/TimelineSection";
// import WeddingPartySection from "./components/WeddingPartySection";
// import EventDetailsSection from "./components/EventDetailsSection";
// import GallerySection from "./components/GallerySection";
// import RSVPSection from "./components/RSVPSection";
// import FooterSection from "./components/FooterSection";
import ScrollVideoHero from "./components/ScrollVideoHero";
import SmoothScroll from "./components/SmoothScroll";
import Countdown from "./components/Countdown";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <Navbar />

        <ScrollVideoHero />

        <div className="section-divider" />

        <div className="px-4 py-6">
          <TimelineSection />
        </div>

        <div className="section-divider" />

        {/* <WeddingPartySection /> */}

        {/* <div className="section-divider" /> */}

        <div className="px-4 py-6">
          <Countdown />
        </div>

        {/* <div className="section-divider" /> */}

        {/* <div className="p-4">
          <EventDetailsSection />
        </div> */}

        {/* <div className="section-divider" /> */}

        {/* <GallerySection /> */}

        {/* <div className="section-divider" /> */}

        {/* <RSVPSection /> */}

        {/* <div className="section-divider" /> */}

        {/* <FooterSection /> */}
      </main>
    </SmoothScroll>
  );
}
