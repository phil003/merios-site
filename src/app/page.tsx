import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Pillars from "@/components/Pillars";
import AppPreview from "@/components/AppPreview";
import HowItWorks from "@/components/HowItWorks";
import Numbers from "@/components/Numbers";
import Science from "@/components/Science";
import BlogPreview from "@/components/BlogPreview";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export default function Home() {
  return (
    <>
      <ScrollAnimator />
      <main>
        <Hero />
        <Statement />
        <Pillars />
        <AppPreview />
        <HowItWorks />
        <Numbers />
        <Science />
        <BlogPreview />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
