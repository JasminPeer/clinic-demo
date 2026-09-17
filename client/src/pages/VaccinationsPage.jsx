import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

const VACCINE_CATEGORIES = [
  {
    category: 'Children (IAP Schedule)',
    desc: 'National and Indian Academy of Pediatrics immunizations from birth to adolescence.',
    items: [
      { name: 'BCG, OPV & Hepatitis B', timing: 'At Birth', desc: 'Protects against severe childhood tuberculosis and hepatic infections.' },
      { name: 'DTP, Hib, IPV, Hepatitis B (6-in-1)', timing: '6, 10, 14 Weeks', desc: 'Fundamental primary series protecting against six life-threatening childhood infections.' },
      { name: 'Rotavirus Vaccine', timing: '6, 10, 14 Weeks', desc: 'Prevents severe dehydrating rotaviral diarrhea in infants.' },
      { name: 'Pneumococcal Conjugate (PCV)', timing: '6, 14 Weeks & Booster', desc: 'Shields against bacterial pneumonia, ear infections, and bacteremia.' },
      { name: 'MMR (Measles, Mumps, Rubella)', timing: '9 Months & 15 Months', desc: 'Long-term immunity against three major childhood viral contagions.' },
      { name: 'Typhoid Conjugate (TCV)', timing: '6 to 9 Months', desc: 'Robust protection against enteric Salmonella Typhi infection.' }
    ]
  },
  {
    category: 'Adults & Chronic Illness',
    desc: 'Essential booster shots and disease-specific immunizations for adults.',
    items: [
      { name: 'Hepatitis B Adult Series', timing: '3 Doses (0, 1, 6 months)', desc: 'Recommended for all adults, especially healthcare workers and diabetics.' },
      { name: 'Td / Tdap (Tetanus, Diphtheria, Pertussis)', timing: 'Every 10 Years', desc: 'Continuous protection against tetanus from cuts and adult whooping cough.' },
      { name: 'Pneumococcal Vaccine (PCV13 / PPSV23)', timing: 'Age 50+ or Chronic Illness', desc: 'Critical for persons with diabetes, heart conditions, or asthma to prevent pneumonia.' },
      { name: 'Shingles / Herpes Zoster', timing: 'Age 50+ (2 Doses)', desc: 'Substantially reduces the excruciating pain of adult shingles reactivation.' }
    ]
  },
  {
    category: "Women's Vaccinations",
    desc: 'Specialized immunizations protecting female reproductive health and pregnancy.',
    items: [
      { name: 'HPV Vaccine (Human Papillomavirus)', timing: 'Ages 9 to 45', desc: 'Highly effective vaccine proven to prevent cervical cancer and related precancers.' },
      { name: 'Tdap in Pregnancy', timing: '27 to 36 Weeks of Gestation', desc: 'Transfers protective maternal antibodies to safeguard the newborn against pertussis.' },
      { name: 'Rubella (MMR pre-pregnancy)', timing: 'Prior to Conception', desc: 'Prevents Congenital Rubella Syndrome in unborn infants.' }
    ]
  },
  {
    category: 'Travel & Seasonal',
    desc: 'Targeted immunizations for travel clearance and annual respiratory protection.',
    items: [
      { name: 'Annual Influenza (Quadrivalent Flu)', timing: 'Every Year (Pre-monsoon/Winter)', desc: 'Protects against current circulating seasonal influenza strains in Tamil Nadu.' },
      { name: 'Yellow Fever Vaccine', timing: 'Travel to Africa / S. America', desc: 'International Health Certificate requirement for designated travel corridors.' },
      { name: 'Meningococcal Meningitis', timing: 'Hajj / Pilgrim travel', desc: 'Mandatory preventive vaccine for high-density international gatherings.' }
    ]
  }
];

export const VaccinationsPage = () => {
  const [selectedCat, setSelectedCat] = useState('Children (IAP Schedule)');

  const currentCategory = VACCINE_CATEGORIES.find(c => c.category === selectedCat) || VACCINE_CATEGORIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pillar 3 — Stay Healthy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Immunization & Vaccination Schedules
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Educational guidance on recommended childhood and adult vaccines. CareSphere maintains certified cold-chain vaccine storage at our Kanchipuram clinic.
        </p>
      </div>

      <MedicalDisclaimer />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 my-8">
        {VACCINE_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCat(cat.category)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              selectedCat === cat.category
                ? 'bg-brand-800 text-white shadow-md scale-105'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Vaccines Table / Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">{currentCategory.category}</h2>
          <p className="text-xs text-slate-500 mt-1">{currentCategory.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {currentCategory.items.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                <span className="text-[11px] font-bold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                  {item.timing}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            * Cold chain maintained at 2°C - 8°C with continuous temperature logging at CareSphere Kanchipuram.
          </div>
          <Link
            to="/appointments"
            className="px-6 py-3 rounded-xl bg-brand-800 text-white font-bold text-xs shadow-xs hover:bg-brand-900"
          >
            Inquire About Vaccines
          </Link>
        </div>
      </div>
    </div>
  );
};
