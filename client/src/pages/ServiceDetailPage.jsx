import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Stethoscope, Calendar, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getServiceBySlug(slug).then((data) => {
      setService(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center text-slate-500">Loading service...</div>;
  if (!service) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Service Not Found</h2>
        <Link to="/services" className="px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs inline-block">
          Return to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <button
        onClick={() => navigate('/services')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Specialties
      </button>

      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 space-y-4">
        <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/20 text-cyan-200">
          Department of {service.name}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">{service.name}</h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl">{service.tagline}</p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to={`/appointments?specialty=${encodeURIComponent(service.name)}`}
            className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md"
          >
            Book Specialist Appointment
          </Link>
          <Link
            to="/doctors"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20"
          >
            Meet Department Doctors
          </Link>
        </div>
      </div>

      <div className="space-y-6 text-slate-700 text-sm">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
          <h2 className="text-xl font-bold text-slate-900">About {service.name}</h2>
          <p className="leading-relaxed">{service.description}</p>
        </div>

        {service.commonConditions && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Conditions Treated</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {service.commonConditions.map((cond, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.procedures && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Clinical Procedures & Diagnostics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {service.procedures.map((proc, i) => (
                <div key={i} className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100 text-xs sm:text-sm text-cyan-950 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
                  <span>{proc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
