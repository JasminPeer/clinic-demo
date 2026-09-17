import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, BookOpen, Heart, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    id: 'care',
    title: 'Pillar 1 — CARE',
    subtitle: 'Consultations, Diagnostics & Clinic Locator',
    icon: Stethoscope,
    badge: 'Clinical Excellence',
    desc: 'Connect directly with certified specialists, schedule fast in-person or video consultations, book diagnostic blood work, and locate your closest healthcare facilities in Kanchipuram.',
    color: 'from-brand-900 to-cyan-950',
    links: [
      { name: 'Find Doctor', path: '/doctors', desc: 'Over 30 specialists across clinical branches' },
      { name: '7-Step Appointment Booking', path: '/appointments', desc: 'Choose concern, doctor, date & time' },
      { name: 'Clinic Locator (Google Maps)', path: '/clinics', desc: 'GPS synchronized map with directions' },
      { name: 'Diagnostics & Pathology', path: '/diagnostics', desc: 'NABL quality lab tests & home blood collection' },
      { name: 'Preventive Health Packages', path: '/health-packages', desc: 'Age-specific whole-body health checks' }
    ]
  },
  {
    id: 'understand',
    title: 'Pillar 2 — UNDERSTAND',
    subtitle: 'Disease Library, Symptoms & Medical Glossary',
    icon: BookOpen,
    badge: 'Health Literacy',
    desc: 'Empower yourself with medically accurate, non-judgmental healthcare information. Understand chronic conditions, acute infections, transmission science, and everyday medical terms in plain language.',
    color: 'from-cyan-950 to-slate-900',
    links: [
      { name: 'Disease Encyclopedia (30+ Conditions)', path: '/health-library/diseases', desc: 'Dengue, Diabetes, Malaria, Asthma, etc.' },
      { name: 'HIV & AIDS Clear Guidance', path: '/health-library/diseases/hiv', desc: 'Biological facts, transmission vs non-transmission, ART & U=U' },
      { name: 'Fever Care & Monitoring Guide', path: '/health-library/symptoms/fever', desc: 'Causes, hydration, red flags & fever tracking' },
      { name: 'Symptom Evaluator', path: '/health-library/symptoms', desc: 'Chest pain, headaches, coughs, and joint aches' },
      { name: 'Medical Glossary (A-Z)', path: '/glossary', desc: 'Common clinical terms explained without confusing jargon' }
    ]
  },
  {
    id: 'stay-healthy',
    title: 'Pillar 3 — STAY HEALTHY',
    subtitle: 'Preventive Health, Life Stages & Wellness',
    icon: Heart,
    badge: 'Lifelong Wellness',
    desc: 'True healthcare starts before illness begins. Access preventive lifestyle protocols, age-tailored wellness guides, clinical nutrition, physical rehabilitation, and routine immunization plans.',
    color: 'from-emerald-950 to-brand-950',
    links: [
      { name: "Women's Health & PCOS Care", path: '/womens-health', desc: 'Reproductive health, prenatal & menopausal wellness' },
      { name: "Children's Health & Paediatrics", path: '/childrens-health', desc: 'Milestones, growth tracking and pediatric advice' },
      { name: "Men's Health & Metabolic Screen", path: '/mens-health', desc: 'Cardiovascular screening and prostate education' },
      { name: 'Senior Citizen Vitality', path: '/senior-health', desc: 'Geriatric joint mobility, memory & bone strength' },
      { name: 'Immunization & Vaccination', path: '/vaccinations', desc: 'Childhood IAP and adult vaccine schedules' },
      { name: 'Physiotherapy & Rehabilitation', path: '/physiotherapy', desc: 'Spine, neck, knee and sports injury protocols' }
    ]
  }
];

export const HealthPillarsExplorer = () => {
  const [activeTab, setActiveTab] = useState('care');

  const activePillar = PILLARS.find(p => p.id === activeTab) || PILLARS[0];
  const Icon = activePillar.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-none">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
            CareSphere Core Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
            The Three Pillars of Your Healthcare Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            A comprehensive ecosystem designed to deliver immediate care, deepen health knowledge, and sustain lifelong wellbeing.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
          {PILLARS.map((p) => {
            const TabIcon = p.icon;
            const isCurrent = p.id === activeTab;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isCurrent
                    ? 'bg-white text-slate-950 shadow-lg scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isCurrent ? 'text-brand-800' : 'text-slate-400'}`} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activePillar.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activePillar.subtitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePillar.desc}
              </p>
            </div>

            {/* Right Interactive Links Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activePillar.links.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:translate-x-1 group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-300 flex items-center justify-between mb-1">
                      <span>{link.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {link.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
