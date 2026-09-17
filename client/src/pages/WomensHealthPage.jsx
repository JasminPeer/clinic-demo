import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, CheckCircle2, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const WomensHealthPage = () => {
  const topics = [
    { title: 'Polycystic Ovary Syndrome (PCOS)', desc: 'Holistic hormonal management, lifestyle modifications, and metabolic regulation.' },
    { title: 'Menstrual Health & Dysmenorrhea', desc: 'Evaluating cycle irregularities, heavy bleeding, and pelvic cramping.' },
    { title: 'Prenatal & Antenatal Care', desc: 'Trimester tracking, fetal ultrasonography, iron supplementation, and maternal wellness.' },
    { title: 'Endometriosis Support', desc: 'Understanding chronic pelvic discomfort, diagnostic ultrasound, and relief strategies.' },
    { title: 'Menopausal Transition', desc: 'Managing hot flushes, bone mineral retention, and emotional balance during perimenopause.' },
    { title: 'Breast Health & Mammography', desc: 'Self-examination guides, clinical palpation, and preventative screening schedules.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pillar 3 — Stay Healthy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Women's Health & Gynaecology Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Compassionate, confidential care across reproductive wellness, adolescent hormonal health, prenatal journeys, and mature longevity in Kanchipuram.
        </p>
      </div>

      <MedicalDisclaimer />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl my-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">CareSphere Women's Wellness Screening</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Includes thyroid profile, vitamin D & B12, complete hemogram, pelvic ultrasound scan, and consultation with Senior Gynaecologist Dr. Deepa Chandran.
          </p>
          <div className="pt-2">
            <Link
              to="/appointments?specialty=Gynaecology"
              className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-800" />
              <span>Book Gynaecology Consultation</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
            alt="Women's Health"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Focus Topics Grid */}
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
