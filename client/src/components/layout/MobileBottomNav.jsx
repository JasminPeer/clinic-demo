import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, MapPin, MoreHorizontal, X, BookOpen, Stethoscope, FileText, Phone } from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Popover when 'More' is tapped */}
      {moreOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex flex-col justify-end" onClick={() => setMoreOpen(false)}>
          <div className="bg-white rounded-t-3xl p-5 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">More Healthcare Resources</span>
              <button onClick={() => setMoreOpen(false)} className="text-slate-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Link
                to="/services"
                onClick={() => setMoreOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:text-brand-800"
              >
                <Stethoscope className="w-4 h-4 text-brand-700" />
                <span>Specialties</span>
              </Link>
              <Link
                to="/diagnostics"
                onClick={() => setMoreOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:text-brand-800"
              >
                <FileText className="w-4 h-4 text-cyan-600" />
                <span>Diagnostics</span>
              </Link>
              <Link
                to="/health-library"
                onClick={() => setMoreOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:text-brand-800"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Health Library</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMoreOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:text-brand-800"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Contact Clinic</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            isActive('/') ? 'text-brand-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          to="/doctors"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            isActive('/doctors') ? 'text-brand-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Doctors</span>
        </Link>

        {/* Center Prominent Book Button */}
        <Link
          to="/appointments"
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-800 group-hover:bg-brand-900 text-white flex items-center justify-center shadow-lg shadow-brand-900/20 transition-transform group-hover:scale-105 active:scale-95">
            <Calendar className="w-6 h-6 text-cyan-300" />
          </div>
          <span className="text-[10px] font-bold text-brand-900 mt-1">Book</span>
        </Link>

        <Link
          to="/clinics"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            isActive('/clinics') ? 'text-brand-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">Clinics</span>
        </Link>

        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            moreOpen ? 'text-brand-800 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>
    </>
  );
};
