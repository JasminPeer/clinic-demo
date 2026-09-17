import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  FileText,
  ShieldAlert,
  Clock,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const DiseaseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDiseaseBySlug(slug).then((data) => {
      setDisease(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading disease overview...
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Condition Not Found</h2>
        <p className="text-xs text-slate-500">The medical condition you requested could not be located in our encyclopedia.</p>
        <Link to="/health-library/diseases" className="inline-block px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs">
          Return to Encyclopedia
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link to="/health-library" className="hover:text-brand-800">Health Library</Link>
        <span>&gt;</span>
        <Link to="/health-library/diseases" className="hover:text-brand-800">Diseases</Link>
        <span>&gt;</span>
        <span className="text-slate-400">{disease.category}</span>
        <span>&gt;</span>
        <span className="font-bold text-slate-800">{disease.name}</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-6">
        <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/20 text-cyan-200 tracking-wider mb-2">
          {disease.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          {disease.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-6">
          {disease.tagline || disease.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-950 hover:bg-cyan-50 font-bold text-xs shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4 text-brand-800" />
            <span>Book Appointment</span>
          </Link>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
          >
            <UserCheck className="w-4 h-4 text-cyan-300" />
            <span>Find Specialist</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Clinical Educational Disclaimer */}
      <MedicalDisclaimer />

      {/* Content Sections */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* What Is It? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-slate-900">What is {disease.name}?</h2>
          <p>{disease.whatIsIt || disease.summary}</p>
        </div>

        {/* Causes */}
        {disease.causes && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Causes & Pathophysiology</h2>
            <p>{disease.causes}</p>
          </div>
        )}

        {/* Transmission vs Non-Transmission Grid (Vital for HIV/AIDS & Infectious diseases) */}
        {(disease.howItSpreads || disease.howItDoesNotSpread) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disease.howItSpreads && (
              <div className="bg-red-50/60 rounded-3xl p-6 border border-red-200 shadow-soft space-y-3">
                <h3 className="text-base font-bold text-red-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  How It Can Spread / Transmission
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-red-950">
                  {disease.howItSpreads.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {disease.howItDoesNotSpread && (
              <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200 shadow-soft space-y-3">
                <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  How It Does NOT Spread (Stigma-Free Facts)
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                  {disease.howItDoesNotSpread.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Symptoms */}
        {disease.symptoms && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Symptoms & Clinical Presentation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {disease.symptoms.map((sym, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {disease.riskFactors && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Risk Factors</h2>
            <ul className="space-y-2">
              {disease.riskFactors.map((rf, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Testing & Diagnosis */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Testing & Diagnostic Evaluation</h2>
          <p>{disease.testing}</p>
          {disease.diagnosisOverview && (
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 text-xs sm:text-sm text-cyan-950">
              <strong className="font-bold">Diagnostic Criteria: </strong>
              {disease.diagnosisOverview}
            </div>
          )}
        </div>

        {/* Prevention */}
        {disease.prevention && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Prevention & Risk Reduction</h2>
            <div className="space-y-2">
              {disease.prevention.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Overview */}
        {disease.treatmentOverview && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Modern Treatment & Care Overview</h2>
            <p>{disease.treatmentOverview}</p>
          </div>
        )}

        {/* When to Seek Care (Red Flags) */}
        {disease.whenToSeekCare && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-l-4 border-red-600 space-y-2">
            <h3 className="text-base font-bold text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              When to Seek Medical Attention
            </h3>
            <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
              {disease.whenToSeekCare}
            </p>
          </div>
        )}

        {/* Myths & Facts */}
        {disease.mythsAndFacts && disease.mythsAndFacts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Common Myths vs Scientific Facts</h2>
            <div className="space-y-3">
              {disease.mythsAndFacts.map((mf, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs sm:text-sm">
                  <div className="text-red-700 font-bold flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Myth: {mf.myth}
                  </div>
                  <div className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fact: {mf.fact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {disease.faqs && disease.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-800" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {disease.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Q: {faq.question}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tests & Specialists */}
        <div className="bg-brand-50/50 rounded-3xl p-6 sm:p-8 border border-brand-100 space-y-4">
          <h3 className="text-base font-bold text-brand-950">Next Steps at CareSphere Kanchipuram</h3>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-slate-500">Related Specialists:</div>
              <div className="text-sm font-bold text-brand-900">{disease.relatedSpecialists?.join(', ') || 'General Medicine'}</div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/appointments"
                className="px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs shadow-xs hover:bg-brand-900"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/diagnostics"
                className="px-5 py-2.5 rounded-xl bg-white border border-brand-200 text-brand-800 font-bold text-xs hover:bg-slate-50"
              >
                Book Lab Work
              </Link>
            </div>
          </div>
        </div>

        {/* Sources & Review Meta */}
        <div className="pt-4 border-t border-slate-200 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span>Sources: WHO Guidelines, ICMR Clinical Protocols, CDC Health Standards</span>
          <span>Last Reviewed: <strong>{disease.lastReviewedDate}</strong> by CareSphere Clinical Council</span>
        </div>
      </div>
    </div>
  );
};
