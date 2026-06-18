import Navbar from "@/components/blocks/navbar";
import ScrollProgress from "@/components/blocks/scroll-progress";
import WineTastingHero from "@/components/blocks/wine-tasting-hero";
import VenueGallery from "@/components/blocks/venue-gallery";
import Testimonials from "@/components/blocks/testimonials";
import UpcomingDates from "@/components/blocks/upcoming-dates";
import FAQ from "@/components/blocks/faq";
import ReservationForm from "@/components/blocks/reservation-form";
import Footer from "@/components/blocks/footer";
import WhatsAppFloat from "@/components/blocks/whatsapp-float";
import SectionDivider from "@/components/blocks/section-divider";

export default function Home() {
  return (
    <main className="min-h-screen bg-wine-dark">
      <ScrollProgress />
      <Navbar />
      <WineTastingHero />
      <VenueGallery />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <UpcomingDates />
      <SectionDivider />
      <FAQ />
      <ReservationForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
