import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import LandingFormSection from "@/components/landing-form-section";
import Footer from "@/components/footer";
const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHero />

      <LandingContent />

      <LandingFormSection />

      <Footer />
    </>
  );
};

export default LandingPage;
