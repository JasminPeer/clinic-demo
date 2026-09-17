import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Star,
  MapPin,
  Languages,
  Clock,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Stethoscope,
  HelpCircle,
  Video,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { api } from '../services/api';

export const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDoctorById(id).then((data) => {
      setDoctor(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading doctor profile...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Doctor Not Found</h2>
        <p className="text-xs text-slate-500">The medical consultant you searched for does not exist.</p>
        <Link to="/doctors" className="inline-block px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs">
          Return to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/doctors')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Doctors</span>
      </button>

      {/* Main Profile Grid: Left 8 cols info, Right 4 cols sticky booking card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Profile & Tabbed Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shrink-0 border-2 border-slate-100 bg-slate-100 shadow-sm">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
            </div>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800">
                  {doctor.specialty}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {doctor.name}
              </h1>

              <p className="text-xs text-brand-700 font-semibold">
                {doctor.qualification} • {doctor.experienceYears}+ Years Clinical Practice
              </p>

              <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Fluent in: <strong>{doctor.languages.join(', ')}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                  <span>Primary Center: <strong>CareSphere Clinic, Kanchipuram</strong></span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{doctor.availability}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex gap-1 overflow-x-auto">
            {['overview', 'education', 'experience', 'services', 'faqs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors shrink-0 ${
                  activeTab === tab
                    ? 'bg-brand-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft text-slate-700 text-sm leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-brand-700" />
                  Doctor's Clinical Overview
                </h3>
                <p>{doctor.about}</p>
                <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 text-xs space-y-1">
                  <div className="font-bold text-brand-900">Clinical Focus Areas:</div>
                  <div className="text-slate-600">{doctor.specialty}, Adult & Family Wellness, Preventive Risk Assessment</div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-cyan-600" />
                  Medical Education & Fellowships
                </h3>
                <div className="space-y-3">
                  {doctor.education?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800 text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                  Hospital & Clinical Positions Held
                </h3>
                <div className="space-y-3">
                  {doctor.experience?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800 text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-800" />
                  Key Clinical Treatments & Procedures
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.services?.map((svc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-brand-50/50 border border-brand-100 text-xs font-semibold text-brand-900">
                      <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  Consultation Questions & Answers
                </h3>
                <div className="space-y-3">
                  {doctor.faqs?.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">Q: {faq.question}</div>
                      <div className="text-xs text-slate-600 leading-relaxed">A: {faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Booking Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">
              Book Consultation
            </h3>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Consultation Fee:</span>
                <strong className="text-base font-black text-brand-900">₹{doctor.consultationFee}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Consultation Type:</span>
                <span className="font-semibold text-slate-800">{doctor.consultationType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Clinic:</span>
                <span className="font-semibold text-slate-800">CareSphere Kanchipuram</span>
              </div>
            </div>

            <Link
              to={`/appointments?doctorId=${doctor.id}`}
              className="w-full py-4 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-900/10 transition-colors"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>Book Appointment Now</span>
            </Link>

            <a
              href="tel:+914427228900"
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <span>Call Kanchipuram Desk: +91 44 2722 8900</span>
            </a>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              Free rescheduling up to 2 hours before scheduled slot.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
