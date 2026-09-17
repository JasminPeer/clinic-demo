import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { api } from '../services/api';

export const HealthPackageDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getPackageBySlug(slug).then((data) => {
      setPkg(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center text-slate-500">Loading package...</div>;
  if (!pkg) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Package Not Found</h2>
        <Link to="/health-packages" className="px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs inline-block">
          Return to Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <button
        onClick={() => navigate('/health-packages')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Packages
      </button>

      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 space-y-4">
        <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/20 text-cyan-200">
          {pkg.testCount} Clinical Tests Included
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">{pkg.title}</h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl">{pkg.description}</p>
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-3xl font-black text-white">{pkg.demoPrice}</span>
          <span className="text-xs text-slate-300 line-through">{pkg.originalPrice}</span>
          <span className="text-xs font-bold text-emerald-300">({pkg.discountPercentage} Off)</span>
        </div>
        <div className="pt-2">
          <Link
            to={`/appointments?package=${pkg.slug}`}
            className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-brand-800" />
            <span>Book Package at Kanchipuram Clinic</span>
          </Link>
        </div>
      </div>

      <div className="space-y-6 text-slate-700 text-sm">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Who is this package ideal for?</h2>
          <p className="leading-relaxed">{pkg.idealFor}</p>
          <div className="pt-2">
            <strong className="text-slate-900">Preparation: </strong>
            <span>{pkg.preparation}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Complete Tests & Parameters Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pkg.testsIncluded.map((test, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{test}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
