import Header from "./Header";
import Hero from "./Hero";
import MarqueeBanner from "./MarqueeBanner";
import About from "./About";
import Work from "./Work";
import Services from "./Services";
import Stats from "./Stats";
import LogoMarquee from "./LogoMarquee";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import BackToTop from "./BackToTop";
import SearchDialog from "./SearchDialog";
import SmoothScroll from "./SmoothScroll";

export default function SiteShell() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[200] focus-visible:rounded-full focus-visible:bg-accent focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:text-white"
      >
        Skip to main content
      </a>

      <Header />

      {/* Fixed UI (header, chat, dialogs) stays outside the smooth-scroll wrapper. */}
      <SmoothScroll>
        <main id="main">
          <Hero />
          <MarqueeBanner />
          <About />
          <Work />
          <Services />
          <Stats />
          <LogoMarquee />
          <Testimonials />
          <Faq />
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>

      <FloatingActions />
      <BackToTop />
      {/* Mounted for the ⌘K shortcut — the header stays minimal, so no button. */}
      <SearchDialog showTrigger={false} />
    </>
  );
}
