import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import { TopUtilityBar } from './components/layout/TopUtilityBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FloatingActions } from './components/layout/FloatingActions';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { DiagnosticDetailPage } from './pages/DiagnosticDetailPage';
import { HealthPackagesPage } from './pages/HealthPackagesPage';
import { HealthPackageDetailPage } from './pages/HealthPackageDetailPage';
import { HealthLibraryPage } from './pages/HealthLibraryPage';
import { DiseasesPage } from './pages/DiseasesPage';
import { DiseaseDetailPage } from './pages/DiseaseDetailPage';
import { SymptomsPage } from './pages/SymptomsPage';
import { SymptomDetailPage } from './pages/SymptomDetailPage';
import { HealthTipsPage } from './pages/HealthTipsPage';
import { HealthTipDetailPage } from './pages/HealthTipDetailPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { VaccinationsPage } from './pages/VaccinationsPage';
import { PhysiotherapyPage } from './pages/PhysiotherapyPage';
import { WomensHealthPage } from './pages/WomensHealthPage';
import { MensHealthPage } from './pages/MensHealthPage';
import { ChildrensHealthPage } from './pages/ChildrensHealthPage';
import { SeniorHealthPage } from './pages/SeniorHealthPage';
import { ClinicsPage } from './pages/ClinicsPage';
import { ClinicDetailPage } from './pages/ClinicDetailPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

// ScrollToTop on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* Top Utility Bar */}
        <TopUtilityBar />

        {/* Main Navigation */}
        <Navbar />

        {/* Dynamic Route View */}
        <div className="flex-1">
          <Routes>
            {/* Core & Home */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Pillar 1: Care */}
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorDetailPage />} />
            <Route path="/clinics" element={<ClinicsPage />} />
            <Route path="/clinics/:id" element={<ClinicDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/diagnostics" element={<DiagnosticsPage />} />
            <Route path="/diagnostics/:slug" element={<DiagnosticDetailPage />} />
            <Route path="/health-packages" element={<HealthPackagesPage />} />
            <Route path="/health-packages/:slug" element={<HealthPackageDetailPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />

            {/* Pillar 2: Understand */}
            <Route path="/health-library" element={<HealthLibraryPage />} />
            <Route path="/health-library/diseases" element={<DiseasesPage />} />
            <Route path="/health-library/diseases/:slug" element={<DiseaseDetailPage />} />
            <Route path="/health-library/symptoms" element={<SymptomsPage />} />
            <Route path="/health-library/symptoms/:slug" element={<SymptomDetailPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/health-tips" element={<HealthTipsPage />} />
            <Route path="/health-tips/:slug" element={<HealthTipDetailPage />} />

            {/* Pillar 3: Stay Healthy */}
            <Route path="/vaccinations" element={<VaccinationsPage />} />
            <Route path="/physiotherapy" element={<PhysiotherapyPage />} />
            <Route path="/womens-health" element={<WomensHealthPage />} />
            <Route path="/mens-health" element={<MensHealthPage />} />
            <Route path="/childrens-health" element={<ChildrensHealthPage />} />
            <Route path="/senior-health" element={<SeniorHealthPage />} />

            {/* Support & Legal */}
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* Fallback 404 Route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav />

        {/* Floating WhatsApp & Helpline Actions */}
        <FloatingActions />
      </div>
    </BrowserRouter>
  );
}
