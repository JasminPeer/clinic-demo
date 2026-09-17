import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Award, Users, Stethoscope, Microscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          <span>About CareSphere Clinic</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Trusted Care. Better Health. Every Day.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded in the historical temple city of Kanchipuram, CareSphere Clinic was envisioned as an integrated outpatient and diagnostic sanctuary where clinical precision meets unhurried, human empathy.
        </p>
      </div>

      {/* Story & Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">Our Story</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Transforming Outpatient Healthcare in Tamil Nadu
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            CareSphere Clinic was established to bridge the critical gap between overcrowded tertiary hospital casualty wards and isolated standalone clinics. By housing 16 medical specialities, automated diagnostic testing, and physical rehabilitation under one roof in Kanchipuram, we eliminate fragmented care.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every patient at CareSphere receives a thorough, respectful consultation where diagnosis, prescription rationales, and preventive lifestyle goals are explained in plain, accessible Tamil and English.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100">
              <div className="text-2xl font-black text-brand-900">10,000+</div>
              <div className="text-xs text-slate-600 font-semibold">Patients Served</div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100">
              <div className="text-2xl font-black text-cyan-900">16</div>
              <div className="text-xs text-slate-600 font-semibold">Clinical Disciplines</div>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
            alt="CareSphere Clinic Facility"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission, Vision & Values Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide accessible, evidence-based, and compassionate outpatient healthcare that treats individuals with dignity and emphasizes prevention at every stage.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To be Tamil Nadu's most trusted multispeciality community healthcare platform, known for medical integrity, health literacy, and superior patient outcomes.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Core Values</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Clinical transparency, scientific rigor, zero unneeded investigations, respect for patient time, and unwavering empathy for every visiting family.
          </p>
        </div>
      </div>

      {/* Patient First Principles */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <div className="max-w-2xl">
          <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Our Standard</span>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">The Patient-First Care Model</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Every clinical protocol at CareSphere Clinic is engineered around comfort, safety, and thorough communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          {[
            'Detailed 20-minute consultation slots with minimal waiting',
            'Full explanation of lab results in plain language',
            'No commercial targets or forced extra tests',
            'Integrated electronic medical records accessible securely',
            'Sterile examination environments with daily disinfection',
            'Direct emergency guidance and regional trauma referral linkages'
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
