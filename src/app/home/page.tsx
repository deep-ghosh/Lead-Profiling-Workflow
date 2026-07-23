import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { OrganizationalDevelopmentSection } from "@/components/sections/OrganizationalDevelopmentSection";
import { SalesBotsSection } from "@/components/sections/SalesBotsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SectionTracker } from "@/components/tracking/SectionTracker";

export const metadata = {
  title: "Eubrics AI — Intelligent Business Solutions",
  description: "Share your business challenge and connect with the right team for organizational development or AI-powered sales automation.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <div id="solutions">
        <OrganizationalDevelopmentSection />
        <SalesBotsSection />
      </div>
      <HowItWorksSection />
      <LeadCaptureSection />
      <SiteFooter />
      <SectionTracker />
    </>
  );
}
