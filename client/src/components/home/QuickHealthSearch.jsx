import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserCheck, Activity, Stethoscope, FileText, BookOpen, MapPin, Calendar, ArrowRight, X } from 'lucide-react';
import { api } from '../../services/api';

export const QuickHealthSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      const data = await api.searchAll(query);
      setResults(data);
      setLoading(false);
      setIsOpen(true);
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalMatches = results
    ? (results.doctors?.length || 0) +
      (results.diseases?.length || 0) +
      (results.symptoms?.length || 0) +
      (results.services?.length || 0) +
      (results.diagnostics?.length || 0) +
      (results.articles?.length || 0)
    : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Search Header Container */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-cyan-900 rounded-3xl p-6 sm:p-10 shadow-xl text-white relative overflow-hidden" ref={containerRef}>
        {/* Background decorative geometry */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
          <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
            CareSphere Unified Health Search
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            How can we help you today?
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm">
            Search doctors, clinical specialties, diseases, symptoms, or diagnostic lab tests across Kanchipuram
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-3xl mx-auto relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-800">
              <Search className="w-5 h-5 text-brand-700" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.trim()) setIsOpen(true);
              }}
              placeholder="Search doctor, disease, symptom, service or test... (e.g. fever, heart, diabetes)"
              className="w-full pl-12 pr-10 py-4 bg-white rounded-2xl text-slate-800 text-sm sm:text-base font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 shadow-lg"
            />

            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setResults(null);
                  setIsOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Keyword Pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Popular:</span>
            {['Fever', 'Dengue', 'Diabetes', 'Cardiology', 'CBC Test', 'Asthma'].map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => setQuery(kw)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Grouped Live Search Results Dropdown */}
          {isOpen && results && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 max-h-[70vh] overflow-y-auto z-50 p-4 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-semibold text-slate-400">
                <span>Search Results for "{query}"</span>
                <span>{totalMatches} matches found</span>
              </div>

              {totalMatches === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  <Activity className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">No direct results for "{query}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching a symptom (e.g. fever), specialty (cardiology), or condition.</p>
                </div>
              ) : (
                <div className="space-y-4 pt-3">
                  {/* Symptoms */}
                  {results.symptoms?.length > 0 && (
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> Symptoms
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {results.symptoms.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/health-library/symptoms/${s.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-colors text-left"
                          >
                            <div className="text-sm font-bold text-slate-900">{s.name}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{s.summary}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diseases */}
                  {results.diseases?.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Diseases & Conditions
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {results.diseases.map((d) => (
                          <Link
                            key={d.slug}
                            to={`/health-library/diseases/${d.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors text-left"
                          >
                            <div className="text-sm font-bold text-slate-900">{d.name}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{d.tagline || d.summary}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Doctors */}
                  {results.doctors?.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-800 mb-2 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5" /> Doctors & Consultants
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {results.doctors.map((doc) => (
                          <Link
                            key={doc.id}
                            to={`/doctors/${doc.id}`}
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-colors text-left flex items-center gap-3"
                          >
                            <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">{doc.name}</div>
                              <div className="text-xs text-brand-700 font-medium">{doc.specialty} • {doc.qualification}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diagnostics */}
                  {results.diagnostics?.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Diagnostics & Tests
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {results.diagnostics.map((t) => (
                          <Link
                            key={t.slug}
                            to={`/diagnostics/${t.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-cyan-50 border border-transparent hover:border-cyan-200 transition-colors text-left flex justify-between items-center"
                          >
                            <div>
                              <div className="text-sm font-bold text-slate-900">{t.name}</div>
                              <div className="text-xs text-slate-500">{t.reportTime} • {t.sampleType}</div>
                            </div>
                            <span className="text-xs font-bold text-brand-800">{t.demoPrice}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4 Premium Quick Action Cards (Pillars Entry) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {/* Card 1: Find Doctor */}
        <Link
          to="/doctors"
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-50 group-hover:bg-brand-800 flex items-center justify-center text-brand-800 group-hover:text-white transition-colors mb-4 shadow-xs">
            <UserCheck className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
            Find a Doctor
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Search top consultants in Kanchipuram across 16 medical specialties.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-800 group-hover:gap-2 transition-all">
            <span>Explore Specialists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Card 2: Book Appointment */}
        <Link
          to="/appointments"
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 group-hover:bg-cyan-600 flex items-center justify-center text-cyan-700 group-hover:text-white transition-colors mb-4 shadow-xs">
            <Calendar className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
            Book Appointment
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Instant 7-step scheduling with instant confirmation & calendar export.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-cyan-700 group-hover:gap-2 transition-all">
            <span>Schedule Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Card 3: Find a Clinic */}
        <Link
          to="/clinics"
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 flex items-center justify-center text-emerald-700 group-hover:text-white transition-colors mb-4 shadow-xs">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Find a Clinic
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Interactive Google Map with CareSphere Kanchipuram & nearby facilities.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:gap-2 transition-all">
            <span>Open Map Locator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Card 4: Explore Health Library */}
        <Link
          to="/health-library"
          className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-amber-600 flex items-center justify-center text-amber-700 group-hover:text-white transition-colors mb-4 shadow-xs">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            Health Library
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Diseases, symptoms, fever guides, and simplified medical glossary.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:gap-2 transition-all">
            <span>Understand Health</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </section>
  );
};
