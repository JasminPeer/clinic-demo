import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, UserCheck, Star, MapPin, Languages, Clock, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

export const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.getDoctors().then(data => setDoctors(data || []));
  }, []);

  return (
    <section className="bg-slate-100/60 py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
              <span>Consultant Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Senior Specialists
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Experienced, empathetic doctors delivering personalized medical attention in Kanchipuram.
            </p>
          </div>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-900 hover:underline shrink-0"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Photo & Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-brand-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {doctor.specialty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-slate-900 hover:text-brand-800 transition-colors">
                    <Link to={`/doctors/${doctor.id}`}>
                      {doctor.name}
                    </Link>
                  </h3>

                  <div className="text-xs text-brand-700 font-semibold">
                    {doctor.qualification} • {doctor.experienceYears}+ Years Exp.
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doctor.languages.join(', ')}</span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                    <span className="truncate">CareSphere Kanchipuram</span>
                  </div>

                  <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5 pt-1">
                    <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{doctor.availability}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-center font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  View Profile
                </Link>

                <Link
                  to={`/appointments?doctorId=${doctor.id}`}
                  className="py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-center font-bold text-xs shadow-xs transition-colors"
                >
                  Book Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
