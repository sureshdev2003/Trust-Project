import NavigationMenu from "@/components/custom/navigation-menu";
import BannerCarousel from "@/components/custom/banner-carousel";
import SponserSection from "@/components/custom/sponser-section";
import DonationForm from "@/components/custom/donation-form";
import AboutPage from "@/components/custom/aboutus";
import ImpactSection from "@/components/custom/impact-section";
import FooterSection from "@/components/custom/footer-section";
import { LatestNews } from "@/components/custom/latestnews";

export default function Home() {
  return (
    <>
      <NavigationMenu />
      <main
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <>
          <BannerCarousel />
          <AboutPage />
          <ImpactSection />
          <LatestNews />
          <SponserSection />
          <FooterSection />
        </>
      </main>
    </>
  );
}
