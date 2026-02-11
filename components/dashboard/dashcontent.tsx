"use client";

import LatestNewsSection from "./latestnews";
import ImpactSection from "./impact";
import SponsorsSection from "./sponsers";
import GallerySection from "./gallery";
import DonorsSection from "./donors";
import CertificateSection from "./certificates";

interface DashboardContentProps {
  activeSection: string;
}

export default function DashboardContent({
  activeSection,
}: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 md:p-8">
        {activeSection === "latest-news" && <LatestNewsSection />}
        {activeSection === "impact" && <ImpactSection />}
        {activeSection === "sponsors" && <SponsorsSection />}
        {activeSection === "gallery" && <GallerySection />}
        {activeSection === "donors" && <DonorsSection />}
        {activeSection === "certificates" && <CertificateSection />}
      </div>
    </main>
  );
}
