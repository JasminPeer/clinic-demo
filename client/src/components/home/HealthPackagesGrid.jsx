import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

export const HealthPackagesGrid = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api.getPackages().then(data => setPackages(data || []));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
            <span>Preventive Wellness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Health Packages
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Proactive health screenings designed to detect imbalances early and protect your future vitality.
          </p>
        </div>

        <Link
          to="/health-packages"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-900 hover:underline shrink-0"
        >
          <span>View All Packages</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.slice(0, 3).map((pkg) => (
          <div
            key={pkg.slug}
            className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              pkg.popular
                ? 'bg-gradient-to-b from-brand-50/60 to-white border-brand-300 shadow-md ring-1 ring-brand-300/40'
                : 'bg-white border-slate-200/80 shadow-soft hover:shadow-card-hover'
            }`}
          >
            <div>
              {/* Top Tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-brand-800 uppercase tracking-wide">
                  {pkg.testCount} Tests Included
                </span>
                {pkg.popular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-800 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-300" /> Popular
                  </span>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-1.5">
                {pkg.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                {pkg.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                <strong className="font-semibold text-slate-700">Ideal For: </strong>
                <span className="text-slate-600">{pkg.idealFor}</span>
              </div>

              {/* Key Tests Checklist */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Parameters:
                </div>
                {pkg.testsIncluded.slice(0, 4).map((test, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{test}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <div className="text-2xl font-black text-brand-900 tracking-tight">
                  {pkg.demoPrice}
                </div>
                <div className="text-[11px] text-slate-400 line-through">
                  {pkg.originalPrice}
                </div>
              </div>

              <Link
                to={`/health-packages/${pkg.slug}`}
                className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Book Package
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
