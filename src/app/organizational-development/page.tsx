import { OrganizationalDevelopmentSection } from "@/components/sections/OrganizationalDevelopmentSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SectionTracker } from "@/components/tracking/SectionTracker";

export const metadata = {
  title: "Organizational Development - Eubrics AI",
  description: "Transform your organization with AI-driven insights for team building, performance optimization, and culture enhancement.",
};

export default function OrganizationalDevelopmentPage() {
  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <OrganizationalDevelopmentSection />
      </div>
      <SiteFooter />
      <SectionTracker />
    </>
  );
}
