import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Countdown from "../components/Countdown/Countdown";
import Story from "../components/Story/Story";
import WeddingDetails from "../components/WeddingDetails/WeddingDetails";
import Entourage from "../components/Entourage/Entourage";
import Gallery from "../components/Gallery/Gallery";
import GiftRegistry from "../components/GiftRegistry/GiftRegistry";
import RSVP from "../components/RSVP/RSVP";
import Map from "../components/Map/Map";
import Footer from "../components/Footer/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Story />
        <WeddingDetails />
        <Entourage />
        <Gallery />
        <GiftRegistry />
        <RSVP />
        <Map />
      </main>
      <Footer />
    </>
  );
}
