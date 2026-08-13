import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import { getCurrentUser } from "@/lib/auth-customer";
import SubpageFaqSection from "@/components/SubpageFaqSection";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const navUser = user ? { name: user.name, email: user.email } : null;

  return (
    <>
      <Navbar user={navUser} />
      {children}
      <SubpageFaqSection />
      <Footer />
      <WhatsAppSticky />
    </>
  );
}
