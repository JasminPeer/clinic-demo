import React from 'react';
import { AppointmentWizard } from '../components/appointments/AppointmentWizard';
import { Calendar, ShieldCheck, MapPin, Clock } from 'lucide-react';

export const AppointmentsPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full mb-3 border border-brand-200">
          <Calendar className="w-3.5 h-3.5 text-brand-800" />
          <span>CareSphere Kanchipuram Scheduling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Book Your Appointment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Complete our quick 7-step wizard to reserve a consultation with your chosen specialist at CareSphere Clinic Kanchipuram.
        </p>
      </div>

      {/* The 7-Step Interactive Booking Engine */}
      <AppointmentWizard />
    </div>
  );
};
