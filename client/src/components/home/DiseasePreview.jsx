import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Thermometer, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const DiseasePreview = () => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    api.getDiseases().then(data => setDiseases(data || []));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
            <span>Pillar 2 — Educational Medical Encyclopedia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understand Diseases & Symptoms
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Medically reviewed guides detailing transmission science, symptoms, prevention, and when to seek medical attention.
          </p>
        </div>

        <Link
          to="/health-library/diseases"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-900 hover:underline shrink-0"
        >
          <span>View All Diseases</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Spotlight Card 1: Dedicated Fever Care */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border border-amber-200 shadow-soft flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 mb-3">
              <Thermometer className="w-3.5 h-3.5 text-amber-700" />
              <span>Special Symptom Feature</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Fever Care & Temperature Monitoring
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Learn how to safely monitor temperatures with digital thermometers, oral rehydration protocols (ORS), comfortable rest, and critical red flag warning signs.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Non-prescriptive hydration guidelines</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>When to contact a paediatrician or physician</span>
              </li>
            </ul>
          </div>

          <Link
            to="/health-library/symptoms/fever"
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs text-center transition-colors shadow-xs"
          >
            Read Fever Guidelines →
          </Link>
        </div>

        {/* Spotlight Card 2: HIV & AIDS Scientific Understanding */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-cyan-500/10 via-brand-500/5 to-white border border-cyan-200 shadow-soft flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-900 mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-700" />
              <span>Stigma-Free Science</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Understanding HIV & AIDS
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              HIV is a virus; AIDS is an advanced condition. Learn scientifically how HIV spreads, how it does NOT spread, confidential testing, PrEP/PEP, and U=U (Undetectable = Untransmittable).
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                <span>100% stigma-free medical facts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                <span>Dispelling common social myths</span>
              </li>
            </ul>
          </div>

          <Link
            to="/health-library/diseases/hiv"
            className="w-full py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs text-center transition-colors shadow-xs"
          >
            Read HIV / AIDS Guide →
          </Link>
        </div>

        {/* Spotlight Card 3: Dengue, Malaria & Typhoid */}
        <div className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>Vector & Enteric Infections</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Dengue, Malaria & Typhoid
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              In-depth profiles on tropical endemic infections in Tamil Nadu: recognizing the 'breakbone' fever of Dengue, rigors of Malaria, and step-ladder fever of Typhoid.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              <Link to="/health-library/diseases/dengue" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 text-xs font-semibold">
                Dengue Guide
              </Link>
              <Link to="/health-library/diseases/malaria" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 text-xs font-semibold">
                Malaria Guide
              </Link>
              <Link to="/health-library/diseases/typhoid" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 text-xs font-semibold">
                Typhoid Guide
              </Link>
            </div>
          </div>

          <Link
            to="/health-library/diseases"
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs text-center transition-colors"
          >
            Browse Full Disease Library →
          </Link>
        </div>
      </div>
    </section>
  );
};
