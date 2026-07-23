import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection as CredibilityBand } from "@/components/sections/TrustSection";
import { OrganizationalDevelopmentSection } from "@/components/sections/OrganizationalDevelopmentSection";
import { SalesBotsSection } from "@/components/sections/SalesBotsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SectionTracker } from "@/components/tracking/SectionTracker";

export default function HomePage() {
  return (
    <>
      <main id="main-content" role="main" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <HeroSection />
        <CredibilityBand />
        <div id="solutions" style={{ display: "flex", flexDirection: "column" }}>
          <OrganizationalDevelopmentSection />
          <SalesBotsSection />
        </div>
        <HowItWorksSection />
        <LeadCaptureSection />
      </main>
      <SiteFooter />
      <SectionTracker />
    </>
  );
}
