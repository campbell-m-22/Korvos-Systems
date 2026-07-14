import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import Audience from "../components/Audience.jsx";
import Capabilities from "../components/Capabilities.jsx";
import BuildAnything from "../components/BuildAnything.jsx";
import Approach from "../components/Approach.jsx";
import Pricing from "../components/Pricing.jsx";
import FinalCta from "../components/FinalCta.jsx";
import Footer from "../components/Footer.jsx";
import ScrollThread from "../components/ScrollThread.jsx";

export default function Home() {
  return (
    <div className="relative isolate min-h-[100dvh] bg-surface">
      <ScrollThread />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Audience />
        <Capabilities />
        <BuildAnything />
        <Approach />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
