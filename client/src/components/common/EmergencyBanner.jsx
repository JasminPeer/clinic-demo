import React from 'react';
import { PhoneCall, Navigation, AlertOctagon, HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDirectionsUrl } from '../../services/googleMapsService';

export const EmergencyBanner = ({ className = '' }) => {
  // Direct emergency directions to Kanchipuram Government Headquarters Hospital Casualty
  const emergencyDirectionsUrl = getDirectionsUrl(12.8315, 79.7125, 'Government Headquarters Hospital Kanchipuram');

  return (
    <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white p-6 sm:p-10 shadow-xl ${className}`}>
      {/* Subtle background pulse circle */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-8 bottom-4 opacity-10 pointer-events-none">
        <HeartCrack className="w-48 h-48" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold tracking-wider uppercase mb-4 border border-white/20">
          <AlertOctagon className="w-4 h-4 text-red-200" />
          Immediate Action Required
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Need Urgent Medical Attention?
        </h3>

        <p className="text-sm sm:text-base text-red-100 max-w-2xl leading-relaxed mb-6">
          For life-threatening emergencies, severe chest pain, loss of consciousness, uncontrolled bleeding, or acute trauma, immediately contact emergency services or proceed to the nearest hospital casualty emergency department.
        </p>

        <div className="flex flex-wrap items-center gap-3.5">
          {/* Call National Ambulance Helpline 108 */}
          <a
            href="tel:108"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            Call Ambulance (108)
          </a>

          {/* Kanchipuram 24/7 Casualty Directions */}
          <a
            href={emergencyDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-red-800/80 hover:bg-red-900 border border-white/20 text-white font-semibold text-sm transition-all hover:scale-[1.02]"
          >
            <Navigation className="w-4 h-4 text-red-200" />
            Directions to Nearest Casualty (GH Kanchipuram)
          </a>

          {/* Find nearest facility in Clinic Locator */}
          <Link
            to="/clinics"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
          >
            Find Healthcare Facilities
          </Link>
        </div>

        <p className="mt-4 text-[11px] text-red-200/90 italic">
          Notice: CareSphere outpatient clinic operates regular daylight hours. Critical emergencies are directed to regional trauma and hospital emergency facilities.
        </p>
      </div>
    </section>
  );
};
