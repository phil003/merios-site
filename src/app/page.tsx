import "@/components/home/home.css";
import HomeStage from "@/components/home/HomeStage";
import Hero from "@/components/home/Hero";
import Overture from "@/components/home/Overture";
import Translator from "@/components/home/Translator";
import Scan from "@/components/home/Scan";
import Year from "@/components/home/Year";
import Daily from "@/components/home/Daily";
import LinkSection from "@/components/home/Link";
import Plans from "@/components/home/Plans";
import Private from "@/components/home/Private";
import Learn from "@/components/home/Learn";
import Finale from "@/components/home/Finale";
import Footer from "@/components/Footer";
import { WebApplicationSchema, WebSiteSchema } from "@/components/StructuredData";

// Homepage v3 — "Your health, finally readable." Metadata for "/" is the root
// layout's default. JSON-LD: Organization comes from the layout; the WebSite
// entity (site name) and the MobileApplication entity are rendered here.
export default function Home() {
  return (
    <>
      <WebSiteSchema />
      <WebApplicationSchema />
      <HomeStage />
      <main className="hv3">
        <Hero />
        <Overture />
        <Translator />
        <Scan />
        <Year />
        <Daily />
        <LinkSection />
        <Plans />
        <Private />
        <Learn />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
