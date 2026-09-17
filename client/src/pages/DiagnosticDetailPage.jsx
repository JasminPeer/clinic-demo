import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Home, Calendar, CheckCircle2, ShieldCheck, Microscope } from 'lucide-react';
import { api } from '../services/api';

export const DiagnosticDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDiagnosticBySlug(slug).then((data) => {
      setTest(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center text-slate-500">Loading test info...</div>;
  if (!test) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Diagnostic Test Not Found</h2>
        <Link to="/diagnostics" className="px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs inline-block">
          Return to Diagnostics
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <button
        onClick={() => navigate('/diagnostics')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Diagnostics
      </button>

      <div className="bg-gradient-to-br from-brand-900 via-cyan-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 space-y-4">
        <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/20 text-cyan-200">
          {test.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">{test.name}</h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl">{test.description}</p>
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-3xl font-black text-white">{test.demoPrice}</span>
          <span className="text-xs text-cyan-200">*demonstration rate</span>
        </div>
        <div className="pt-2">
          <Link
            to={`/appointments?test=${test.slug}`}
            className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-brand-800" />
            <span>Book Test & Sample Collection</span>
          </Link>
        </div>
      </div>

      <div className="space-y-6 text-slate-700 text-sm">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-slate-900">What This Test Checks</h2>
          <p className="leading-relaxed">{test.whatItChecks}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Preparation & Fasting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{test.preparation}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Sample & Turnaround</h3>
            <p className="text-xs text-slate-600">Sample: <strong>{test.sampleType}</strong></p>
            <p className="text-xs text-slate-600">Report Ready: <strong>{test.reportTime}</strong></p>
            {test.homeSampleOption && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <Home className="w-3.5 h-3.5" /> Home sample collection available in Kanchipuram
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
