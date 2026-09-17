import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { QuickHealthSearch } from '../components/home/QuickHealthSearch';
import { HealthcareNearYou } from '../components/home/HealthcareNearYou';
import { TrustStats } from '../components/home/TrustStats';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { FeaturedDoctors } from '../components/home/FeaturedDoctors';
import { HealthPackagesGrid } from '../components/home/HealthPackagesGrid';
import { DiagnosticsPreview } from '../components/home/DiagnosticsPreview';
import { HealthPillarsExplorer } from '../components/home/HealthPillarsExplorer';
import { DiseasePreview } from '../components/home/DiseasePreview';
import { HealthTipsSection } from '../components/home/HealthTipsSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { PatientReviews } from '../components/home/PatientReviews';
import { FaqAccordion } from '../components/home/FaqAccordion';
import { EmergencyBanner } from '../components/common/EmergencyBanner';

export const HomePage = () => {
  return (
    <main className="space-y-4">
      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Hero Image Carousel */}
      <HeroCarousel />

      {/* 5. Quick Health Search & 4 Action Cards */}
      <QuickHealthSearch />

      {/* 6. Healthcare Near You Location & Map Section */}
      <HealthcareNearYou />

      {/* 7. Trust Statistics */}
      <TrustStats />

      {/* 8. Healthcare Services (16 Specialities) */}
      <ServicesGrid />

      {/* 9. Find a Doctor Showcase */}
      <FeaturedDoctors />

      {/* 10. Health Packages */}
      <HealthPackagesGrid />

      {/* 11. Diagnostics */}
      <DiagnosticsPreview />

      {/* 12. Health Explorer (Pillars 1, 2, 3) */}
      <HealthPillarsExplorer />

      {/* 13. Disease & Symptoms Preview */}
      <DiseasePreview />

      {/* 14. Health Articles & Tips */}
      <HealthTipsSection />

      {/* 15. Why Choose CareSphere */}
      <WhyChooseUs />

      {/* 16. Patient Reviews */}
      <PatientReviews />

      {/* 17. FAQ Accordion */}
      <FaqAccordion limit={6} />

      {/* 18. Emergency CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <EmergencyBanner />
      </div>
    </main>
  );
};
