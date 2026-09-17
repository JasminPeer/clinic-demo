import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, ShieldCheck, Activity, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const DiseasesPage = () => {
  const [diseases, setDiseases] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDiseases({ category, search }).then((data) => {
      setDiseases(data || []);
      setLoading(false);
    });
  }, [category, search]);

  const categories = ['All', 'Infectious Diseases', 'Respiratory', 'Cardiovascular', 'Endocrine & Metabolic'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pillar 2 — Medical Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Disease Encyclopedia
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Comprehensive, evidence-based medical overviews explaining condition biology, symptoms, prevention, testing, and modern treatment approaches.
        </p>
      </div>

      <MedicalDisclaimer />

      {/* Search & Category Pills */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search condition name, symptom or infection (e.g. HIV, Dengue, Diabetes, Malaria)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                category === cat
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Clinical Guidance Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/health-library/diseases/hiv"
          className="p-5 rounded-3xl bg-gradient-to-r from-brand-900 to-cyan-950 text-white shadow-md hover:shadow-lg transition-all group flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/20 text-cyan-200 tracking-wider">
              Stigma-Free Guide
            </span>
            <h3 className="text-lg font-bold mt-1">Understanding HIV</h3>
            <p className="text-xs text-slate-300">Transmission, non-transmission facts, PrEP & treatment</p>
          </div>
          <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/health-library/diseases/aids"
          className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 to-brand-950 text-white shadow-md hover:shadow-lg transition-all group flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/20 text-cyan-200 tracking-wider">
              Clinical Staging
            </span>
            <h3 className="text-lg font-bold mt-1">Understanding AIDS</h3>
            <p className="text-xs text-slate-300">Immune recovery, opportunistic infections & prevention</p>
          </div>
          <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Diseases List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease) => (
          <div
            key={disease.slug}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {disease.category}
                </span>
                <span className="text-[11px] text-slate-400">Reviewed {disease.lastReviewedDate}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-1.5">
                <Link to={`/health-library/diseases/${disease.slug}`}>
                  {disease.name}
                </Link>
              </h3>

              <p className="text-xs text-brand-700 font-semibold mb-2">
                {disease.tagline}
              </p>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                {disease.summary}
              </p>

              {disease.symptoms && (
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Common Signs:</span>
                  <div className="text-xs text-slate-600 line-clamp-2">
                    {disease.symptoms.slice(0, 3).join(', ')}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/health-library/diseases/${disease.slug}`}
                className="text-xs font-bold text-brand-800 group-hover:text-brand-900 flex items-center gap-1 group-hover:gap-1.5 transition-all"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/appointments"
                className="text-[11px] font-semibold text-slate-500 hover:text-brand-800"
              >
                Consult Doctor
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
