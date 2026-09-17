import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Thermometer,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Heart,
  Clock,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const SymptomDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [symptom, setSymptom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getSymptomBySlug(slug).then((data) => {
      setSymptom(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading symptom guide...
      </div>
    );
  }

  if (!symptom) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Symptom Guide Not Found</h2>
        <p className="text-xs text-slate-500">The symptom guide you requested could not be located.</p>
        <Link to="/health-library/symptoms" className="inline-block px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs">
          Return to Symptoms
        </Link>
      </div>
    );
  }

  const isFever = symptom.slug === 'fever';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link to="/health-library" className="hover:text-brand-800">Health Library</Link>
        <span>&gt;</span>
        <Link to="/health-library/symptoms" className="hover:text-brand-800">Symptoms</Link>
        <span>&gt;</span>
        <span className="font-bold text-slate-800">{symptom.name}</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-orange-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-6">
        <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/20 text-amber-200 tracking-wider mb-2">
          {symptom.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          {symptom.name}
        </h1>
        <p className="text-sm sm:text-base text-amber-100 max-w-2xl leading-relaxed mb-6">
          {symptom.tagline || symptom.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-amber-950 hover:bg-amber-50 font-bold text-xs shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Consult Physician at Kanchipuram</span>
          </Link>
          <Link
            to="/health-library/symptoms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
          >
            <span>All Symptoms</span>
          </Link>
        </div>
      </div>

      <MedicalDisclaimer />

      {/* Symptom Content Sections */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* What is it? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-slate-900">What is {symptom.name}?</h2>
          <p>{symptom.whatIsIt}</p>
        </div>

        {/* Common Causes */}
        {symptom.commonCauses && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Common Causes & Related Infections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {symptom.commonCauses.map((cause, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{cause}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Temperature Monitoring Protocol (Specifically for Fever) */}
        {symptom.temperatureMonitoring && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-amber-600" />
              How to Safely Monitor Body Temperature
            </h2>
            <div className="space-y-2.5">
              {symptom.temperatureMonitoring.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs sm:text-sm text-amber-950">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-xs">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Home Care, Hydration & Rest */}
        {symptom.homeCareAndHydration && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-600" />
              Hydration, Rest & Supportive Home Care
            </h2>
            <div className="space-y-2.5">
              {symptom.homeCareAndHydration.map((care, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
                  {care}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Warning Signs (Crucial Red Flags) */}
        {symptom.emergencyWarningSigns && (
          <div className="bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-3">
            <h3 className="text-lg font-black flex items-center gap-2 text-white">
              <AlertTriangle className="w-6 h-6 text-red-200 shrink-0" />
              Emergency Red Flag Warning Signs
            </h3>
            <p className="text-xs sm:text-sm text-red-100">
              If any of the following critical indicators appear, proceed to the nearest casualty / hospital emergency department immediately:
            </p>
            <ul className="space-y-2 pt-2 text-xs sm:text-sm text-white font-medium">
              {symptom.emergencyWarningSigns.map((sign, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* When to Contact Doctor */}
        {symptom.whenToContactDoctor && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">When to Schedule a Consultation</h2>
            <ul className="space-y-2">
              {symptom.whenToContactDoctor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {symptom.faqs && symptom.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-800" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {symptom.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Q: {faq.question}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CareSphere Next Steps */}
        <div className="bg-brand-50/50 rounded-3xl p-6 sm:p-8 border border-brand-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Have concerns about persistent symptoms?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Consult our general physicians at CareSphere Clinic Kanchipuram.</p>
          </div>
          <Link
            to="/appointments"
            className="px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-xs"
          >
            Book In-Clinic Evaluation
          </Link>
        </div>
      </div>
    </div>
  );
};
