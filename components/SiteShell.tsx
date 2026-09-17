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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:text-white"
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
