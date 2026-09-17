import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, ShieldCheck, HeartPulse, CheckCircle2, User } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const MensHealthPage = () => {
  const topics = [
    { title: 'Cardiovascular Risk Stratification', desc: 'Preventive lipid profiles, blood pressure monitoring, and resting ECGs for men aged 30+.' },
    { title: 'Prostate Health Education', desc: 'Understanding Benign Prostatic Hyperplasia (BPH), urinary flow changes, and Serum PSA screening.' },
    { title: 'Metabolic Syndrome & Diabetes', desc: 'Combating visceral abdominal adiposity, insulin resistance, and fatty liver disease through targeted exercise and diet.' },
    { title: 'Reproductive & Hormonal Health', desc: 'Educational overviews of testosterone regulation, fatigue management, and confidential andrology consultations.' },
    { title: 'Work Stress & Blood Pressure', desc: 'Managing corporate stress, hypertensive spikes, sleep apnea, and mental wellness.' },
    { title: 'Musculoskeletal Vitality', desc: 'Preserving lean muscle mass, joint ergonomics, and spine posture during desk-heavy careers.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Activity className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pillar 3 — Stay Healthy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Men's Health & Preventive Wellness
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Comprehensive preventive health screenings, cardiac protection, metabolic profiling, and prostate wellness in Kanchipuram.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-cyan-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl my-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Executive Men's Health Screening</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Covers comprehensive lipid panel, HbA1c, liver & kidney function, uric acid, resting 12-lead ECG, and senior physician consultation.
          </p>
          <div className="pt-2">
            <Link
              to="/appointments?specialty=General%20Medicine"
              className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-800" />
              <span>Book Preventive Men's Checkup</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
            alt="Men's Health"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {topics.map((t, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-2.5">
            <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
