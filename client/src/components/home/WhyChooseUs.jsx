import React from 'react';
import { UserCheck, HeartHandshake, Microscope, CalendarCheck, ShieldCheck } from 'lucide-react';

const REASONS = [
  {
    icon: UserCheck,
    title: 'Qualified Healthcare Professionals',
    desc: 'Our team comprises credentialed MD/MS and DM specialists with extensive clinical tenure in leading medical institutions across Tamil Nadu.'
  },
  {
    icon: HeartHandshake,
    title: 'Patient-Centered Care',
    desc: 'We dedicate ample time to every consultation, explaining diagnostic tests, treatment pathways, and answering all questions without rushing.'
  },
  {
    icon: Microscope,
    title: 'Modern Diagnostics',
    desc: 'NABL-standard automated clinical laboratory, digital radiography, sonography, and rapid pathology report turnarounds under one roof.'
  },
  {
    icon: CalendarCheck,
    title: 'Easy Appointment Booking',
    desc: 'Seamless 7-step online scheduling, real-time availability, instant digital confirmations, and zero-fuss rescheduling.'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-none">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The CareSphere Promise</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Why Choose CareSphere Clinic?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          We combine medical precision with genuine human compassion to make every patient visit reassuring and effective.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REASONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 group-hover:bg-brand-800 text-brand-800 group-hover:text-white flex items-center justify-center transition-colors mb-5 shadow-xs">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
