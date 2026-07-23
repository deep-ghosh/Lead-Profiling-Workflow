import { SalesBotsSection } from "@/components/sections/SalesBotsSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SectionTracker } from "@/components/tracking/SectionTracker";

export const metadata = {
  title: "AI Sales Bots - Eubrics AI",
  description: "Intelligent sales automation that qualifies leads, answers questions, and supports your team to close more deals.",
};

export default function SalesBotsPage() {
  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <SalesBotsSection />
      </div>
      <SiteFooter />
      <SectionTracker />
    </>
  );
}
