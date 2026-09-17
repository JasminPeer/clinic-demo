import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Activity, Thermometer, ShieldAlert, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

const CATEGORIES = [
  { name: 'Diseases Encyclopedia', path: '/health-library/diseases', count: '30+ Conditions', desc: 'Detailed biology, transmission, symptoms & therapies' },
  { name: 'Symptom Finder', path: '/health-library/symptoms', count: '15+ Guides', desc: 'Evaluate physical symptoms and red flag indicators' },
  { name: 'Fever Care Hub', path: '/health-library/symptoms/fever', count: 'Featured Guide', desc: 'Temperature monitoring, hydration & urgent cues' },
  { name: 'HIV & AIDS Science', path: '/health-library/diseases/hiv', count: 'Stigma-Free', desc: 'Transmission vs non-transmission, PrEP & U=U' },
  { name: 'Medical Glossary (A-Z)', path: '/glossary', count: '20+ Terms', desc: 'Everyday clinical terms explained in plain language' },
  { name: 'Health Articles & Tips', path: '/health-tips', count: 'Lifestyle Articles', desc: 'Nutrition, sleep, exercise, and stress guidance' },
  { name: "Women's Health", path: '/womens-health', count: 'Reproductive & PCOS', desc: 'Antenatal care, PCOS, and cervical screening' },
  { name: "Children's Health", path: '/childrens-health', count: 'Paediatrics', desc: 'Growth milestones, vaccination & nutrition' }
];

export const HealthLibraryPage = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pillar 2 — Healthcare Education Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Understand Your Health
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Empowering patients and families in Kanchipuram with clear, evidence-based medical information, clinical guides, and health literacy.
        </p>
      </div>

      <MedicalDisclaimer />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-800 border border-brand-100 mb-3 inline-block">
                {cat.count}
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-1.5">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {cat.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-brand-800 group-hover:gap-2 transition-all">
              <span>Explore Section</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
