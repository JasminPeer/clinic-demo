import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: 'S. Rajagopalan',
    location: 'Gandhi Road, Kanchipuram',
    service: 'General Medicine & Diabetology',
    rating: 5.0,
    review: 'Dr. Ananya took the time to review all my previous blood tests and explained my HbA1c trajectory clearly. The diagnostic lab at CareSphere provided results within 2 hours. Very professional and polite staff.',
    treatment: 'Diabetes Management'
  },
  {
    name: 'Revathi Murugan',
    location: 'Chinna Kanchipuram',
    service: 'Paediatrics & Vaccination',
    rating: 5.0,
    review: 'Brought my 3-year-old daughter for her scheduled immunization. Dr. Priya was exceptionally gentle, making sure my child remained calm. The clean, modern clinic environment gave us great peace of mind.',
    treatment: 'Child Vaccination'
  },
  {
    name: 'M. Venkatesh',
    location: 'Ennaikaran, Kanchipuram',
    service: 'Cardiology & Preventive Screening',
    rating: 4.9,
    review: 'Had an ECG and Echo done under the heart health package. Dr. Karthik explained my lipid panel without alarming me and guided me on dietary salt reduction. Highly recommend for family healthcare.',
    treatment: 'Cardiac Checkup'
  }
];

export const PatientReviews = () => {
  return (
    <section className="bg-slate-100/70 py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Patients Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Demonstration testimonials showcasing patient interaction, clinic environment, and diagnostic care in Kanchipuram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-800 border border-brand-100">
                    {rev.treatment}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-400">{rev.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Visit</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[11px] text-slate-400">
          * Demo patient reviews — Presented strictly for interface and experience demonstration.
        </div>
      </div>
    </section>
  );
};
