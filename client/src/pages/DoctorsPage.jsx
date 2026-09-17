import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserCheck, Star, MapPin, Languages, Clock, Filter, Calendar, Video } from 'lucide-react';
import { api } from '../services/api';

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [gender, setGender] = useState('All');
  const [consultationType, setConsultationType] = useState('All');
  const [minExp, setMinExp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDoctors({ specialty, search, consultationType }).then((data) => {
      setDoctors(data || []);
      setLoading(false);
    });
  }, [specialty, search, consultationType]);

  // Secondary local filters
  const filteredDoctors = doctors.filter((doc) => {
    if (gender !== 'All' && doc.gender !== gender) return false;
    if (doc.experienceYears < minExp) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <UserCheck className="w-3.5 h-3.5" />
          <span>CareSphere Medical Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find the Right Doctor for You
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Consult seasoned specialists in Kanchipuram with transparent credentials and scheduling.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name, specialty, or condition (e.g. Dr. Ananya, Cardiology, Fever)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 placeholder:text-slate-400"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Specialization</label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              <option value="All">All Specialities</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Paediatrics">Paediatrics</option>
              <option value="Orthopaedics">Orthopaedics</option>
              <option value="Gynaecology">Gynaecology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Diabetology">Diabetology</option>
              <option value="ENT">ENT</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Consultation Mode</label>
            <select
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              <option value="All">In-clinic & Video</option>
              <option value="In-clinic">In-clinic Visit Only</option>
              <option value="Video">Video Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Doctor Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              <option value="All">All Genders</option>
              <option value="Female">Female Doctor</option>
              <option value="Male">Male Doctor</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Minimum Experience</label>
            <select
              value={minExp}
              onChange={(e) => setMinExp(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              <option value="0">Any Experience</option>
              <option value="10">10+ Years</option>
              <option value="15">15+ Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Count & Results */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
        <span>Available Specialists ({filteredDoctors.length})</span>
        <span>CareSphere Kanchipuram</span>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
          <UserCheck className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <h3 className="font-bold text-slate-800">No doctors match your criteria</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting the filters or clearing the search query.</p>
          <button
            onClick={() => {
              setSearch('');
              setSpecialty('All');
              setGender('All');
              setConsultationType('All');
              setMinExp(0);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-50 text-brand-800 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-brand-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {doc.specialty}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-lg font-bold text-slate-900 hover:text-brand-800 transition-colors">
                    <Link to={`/doctors/${doc.id}`}>{doc.name}</Link>
                  </h3>

                  <div className="text-xs text-brand-700 font-semibold">
                    {doc.qualification} • {doc.experienceYears}+ Years Exp.
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {doc.about}
                  </p>

                  <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.languages.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                      <span className="truncate">CareSphere Kanchipuram Clinic</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{doc.availability}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Consultation Fee: </span>
                      <strong className="text-slate-900 font-bold">₹{doc.consultationFee}</strong>
                    </div>
                    {doc.consultationType === 'Both' && (
                      <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Video className="w-3 h-3" /> In-Clinic & Video
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  to={`/doctors/${doc.id}`}
                  className="py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-center font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  View Profile
                </Link>
                <Link
                  to={`/appointments?doctorId=${doc.id}`}
                  className="py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-center font-bold text-xs shadow-xs transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
