import Nav from "./Nav";
import Hero from "./Hero";
import LogoMarquee from "./LogoMarquee";
import Services from "./Services";
import Work from "./Work";
import Faq from "./Faq";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

export default function SiteShell() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <LogoMarquee />
        <Services />
        <Work />
        <Faq />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
