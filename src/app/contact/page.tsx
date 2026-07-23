import { LeadCaptureSection } from "@/components/sections/LeadCaptureSection";
import { SectionTracker } from "@/components/tracking/SectionTracker";

export const metadata = {
  title: "Contact - Eubrics AI",
  description: "Get in touch with Eubrics AI. Share your business challenges and we'll connect you with the right solution.",
};

export default function ContactPage() {
  return (
    <>
      <div style={{ paddingTop: "5rem", minHeight: "100vh" }}>
        <LeadCaptureSection />
      </div>
      <SectionTracker />
    </>
  );
}
