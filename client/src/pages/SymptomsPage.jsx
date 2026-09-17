import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Activity, Thermometer, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { api } from '../services/api';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const SymptomsPage = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getSymptoms().then(data => setSymptoms(data || []));
  }, []);

  const filtered = symptoms.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Educational Symptom Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Symptom Evaluator & Guide
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Learn how to monitor physical discomforts, apply safe home comfort protocols, and recognize when evaluation by a doctor is essential.
        </p>
      </div>

      <MedicalDisclaimer />

      {/* Prominent Educational Notice */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 text-xs text-cyan-950 mb-8 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Educational Orientation Notice: </strong>
          Physical symptoms can have multiple diverse causes. CareSphere does not provide automated self-diagnosis algorithms (such as claiming "You have Dengue"). Instead, our guides help you understand body signals and recognize warning signs requiring medical care.
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symptoms (e.g. fever, cough, headache, chest pain, stomach ache)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Dedicated Fever Spotlight Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Thermometer className="w-3.5 h-3.5 text-amber-200" />
            <span>Featured Educational Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Fever (Pyrexia) Complete Care Guide</h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Everything you need to know about body temperature monitoring, hydration, rest, red flags, and when to seek urgent care.
          </p>
        </div>
        <Link
          to="/health-library/symptoms/fever"
          className="px-6 py-3.5 rounded-2xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs shrink-0 shadow-md transition-colors"
        >
          Open Fever Guide →
        </Link>
      </div>

      {/* Symptoms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((symptom) => (
          <div
            key={symptom.slug}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {symptom.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors mb-1.5">
                <Link to={`/health-library/symptoms/${symptom.slug}`}>
                  {symptom.name}
                </Link>
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                {symptom.summary}
              </p>

              <div className="space-y-1 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Common Triggers:</span>
                <div className="text-xs text-slate-600 line-clamp-2">
                  {symptom.commonCauses.slice(0, 3).join(' • ')}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/health-library/symptoms/${symptom.slug}`}
                className="text-xs font-bold text-amber-700 group-hover:text-amber-800 flex items-center gap-1 group-hover:gap-1.5 transition-all"
              >
                <span>Read Evaluation Guide</span>
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
