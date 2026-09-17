import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  HeartPulse,
  Baby,
  Sparkles,
  Bone,
  Sun,
  Ear,
  Activity,
  Brain,
  Utensils,
  Wind,
  ShieldAlert,
  Eye,
  Smile,
  Footprints,
  Apple,
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';

// Icon Map
const ICON_MAP = {
  Stethoscope,
  HeartPulse,
  Baby,
  Sparkles,
  Bone,
  Sun,
  Ear,
  Activity,
  Brain,
  Utensils,
  Wind,
  ShieldAlert,
  Eye,
  Smile,
  Footprints,
  Apple
};

export const ServicesGrid = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(data => setServices(data || []));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
            <span>Specialised Outpatient Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Healthcare Under One Roof
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            From everyday wellness and chronic condition management to advanced sub-speciality consultations in Kanchipuram.
          </p>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-900 hover:underline shrink-0"
        >
          <span>View All 16 Specialities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 16 Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.slice(0, 8).map((service) => {
          const IconComponent = ICON_MAP[service.icon] || Stethoscope;

          return (
            <div
              key={service.slug}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-800 text-brand-800 group-hover:text-white flex items-center justify-center transition-colors mb-4 shadow-xs">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-1.5">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Common Conditions Pills */}
                {service.commonConditions && (
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Treats:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {service.commonConditions.slice(0, 3).map((cond, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Explore Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-bold text-brand-800 group-hover:text-brand-900 flex items-center gap-1 group-hover:gap-1.5 transition-all"
                >
                  <span>Explore Speciality</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/appointments"
                  className="text-[11px] font-semibold text-cyan-600 hover:text-cyan-800"
                >
                  Book Doctor
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
