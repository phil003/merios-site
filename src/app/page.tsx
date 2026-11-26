import "@/components/home/home.css";
import Hero from "@/components/home/Hero";
import Numbers from "@/components/home/Numbers";
import Translator from "@/components/home/Translator";
import Scan from "@/components/home/Scan";
import Days from "@/components/home/Days";
import Band from "@/components/home/Band";
import LinkSection from "@/components/home/Link";
import Plans from "@/components/home/Plans";
import WhoFor from "@/components/home/WhoFor";
import Private from "@/components/home/Private";
import Learn from "@/components/home/Learn";
import Faq from "@/components/home/Faq";
import Finale from "@/components/home/Finale";
import Footer from "@/components/Footer";
import { WebApplicationSchema, WebSiteSchema } from "@/components/StructuredData";

// Homepage v2 "Open Sky" — "Your health, finally readable." (Home2 mockup v24,
// 25/11/2026). Metadata for "/" is the root layout's default. JSON-LD:
// Organization comes from the layout; the WebSite entity (site name) and the
// MobileApplication entity are rendered here, the FAQPage entity by <Faq />.
export default function Home() {
  return (
    <>
      <WebSiteSchema />
      <WebApplicationSchema />
      <main className="hv2">
        <Hero />
        <Numbers />
        <Translator />
        <Scan />
        <Days />
        <Band />
        <LinkSection />
        <Plans />
        <WhoFor />
        <Private />
        <Learn />
        <Faq />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
