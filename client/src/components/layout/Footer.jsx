import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Navigation, MessageCircle, Heart, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { getDirectionsUrl } from '../../services/googleMapsService';

export const Footer = () => {
  const kanchipuramDirections = getDirectionsUrl(12.8342, 79.7036, 'CareSphere Multispeciality Clinic Kanchipuram');

  return (
    <footer className="bg-brand-950 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-brand-900/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 space-y-4">
            <BrandLogo inverted={true} size="large" />
            <p className="text-xs text-slate-400 leading-relaxed">
              CareSphere Clinic delivers comprehensive, patient-centered multispeciality outpatient care, advanced diagnostics, and compassionate medical education in Kanchipuram, Tamil Nadu.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="text-xs font-semibold text-slate-400">Follow CareSphere:</span>
              <a href="#social" className="hover:text-cyan-400 transition-colors text-xs">LinkedIn</a>
              <span className="text-slate-700">•</span>
              <a href="#social" className="hover:text-cyan-400 transition-colors text-xs">Twitter</a>
              <span className="text-slate-700">•</span>
              <a href="#social" className="hover:text-cyan-400 transition-colors text-xs">YouTube</a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/general-medicine" className="hover:text-white transition-colors">
                  General Medicine
                </Link>
              </li>
              <li>
                <Link to="/services/cardiology" className="hover:text-white transition-colors">
                  Cardiology
                </Link>
              </li>
              <li>
                <Link to="/services/dermatology" className="hover:text-white transition-colors">
                  Dermatology
                </Link>
              </li>
              <li>
                <Link to="/services/paediatrics" className="hover:text-white transition-colors">
                  Paediatrics
                </Link>
              </li>
              <li>
                <Link to="/diagnostics" className="hover:text-white transition-colors">
                  Diagnostic Lab & Imaging
                </Link>
              </li>
              <li>
                <Link to="/physiotherapy" className="hover:text-white transition-colors">
                  Physiotherapy & Rehab
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-cyan-400 hover:underline font-medium">
                  View All 16 Specialties →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Patient Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  Find Doctor
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/health-library" className="hover:text-white transition-colors">
                  Health Library
                </Link>
              </li>
              <li>
                <Link to="/health-library/symptoms" className="hover:text-white transition-colors">
                  Symptom Evaluator
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-white transition-colors">
                  Medical Glossary (A-Z)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Patient FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Clinic */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              About Clinic
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About CareSphere
                </Link>
              </li>
              <li>
                <Link to="/clinics" className="hover:text-white transition-colors">
                  Clinic Locator & Maps
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Clinic
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy & Demo Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Primary Location
            </h4>
            <div className="text-xs space-y-2.5">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  No. 42, Gandhi Road, Near Rangaswamy Tank, Kanchipuram, Tamil Nadu 631501
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+914427228900" className="hover:text-white font-medium">
                  +91 44 2722 8900
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:kanchipuram@caresphereclinic.com" className="hover:text-white truncate">
                  kanchipuram@caresphereclinic.com
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={kanchipuramDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-semibold text-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-cyan-300" />
                  Get Google Maps Directions
                </a>

                <a
                  href="https://wa.me/914427228900?text=Hello%20CareSphere%20Clinic%20Kanchipuram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Demo Notice & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-1">
            <p>
              © 2026 CareSphere Clinic — Demo Healthcare Platform. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Medical information provided on this platform is for educational and orientation purposes only and does not replace professional medical evaluation.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-400">Demo Architecture</Link>
            <span>•</span>
            <Link to="/clinics" className="hover:text-slate-400">Kanchipuram Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
