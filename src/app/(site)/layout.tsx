import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import SubpageFaqSection from "@/components/SubpageFaqSection";
import RouteScrollReset from "@/components/RouteScrollReset";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteScrollReset />
      <Navbar />
      {children}
      <SubpageFaqSection />
      <Footer />
      <WhatsAppSticky />
    </>
  );
}
