import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(data => setServices(data || []));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Multispeciality Outpatient Care</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Clinical Services & Medical Specialties
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          CareSphere Clinic Kanchipuram provides 16 clinical departments staffed by certified consultant physicians, surgeons, and therapists.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.slug}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-800 text-brand-800 group-hover:text-white flex items-center justify-center transition-colors mb-4 shadow-xs">
                <Stethoscope className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-1">
                <Link to={`/services/${svc.slug}`}>{svc.name}</Link>
              </h2>

              <p className="text-xs text-brand-700 font-medium mb-2">{svc.tagline}</p>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">{svc.description}</p>

              {svc.commonConditions && (
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Common Conditions:</span>
                  <div className="flex flex-wrap gap-1">
                    {svc.commonConditions.slice(0, 3).map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/services/${svc.slug}`}
                className="text-xs font-bold text-brand-800 group-hover:text-brand-900 flex items-center gap-1"
              >
                <span>Department Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/appointments?specialty=${encodeURIComponent(svc.name)}`}
                className="text-[11px] font-semibold text-cyan-700 hover:underline"
              >
                Book Specialist
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
