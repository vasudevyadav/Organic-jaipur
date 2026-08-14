import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import SubpageFaqSection from "@/components/SubpageFaqSection";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <SubpageFaqSection />
      <Footer />
      <WhatsAppSticky />
    </>
  );
}
