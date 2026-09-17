import React, { useState } from 'react';
import { Phone, Clock, MapPin, AlertCircle, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TopUtilityBar = () => {
  const [lang, setLang] = useState('EN');

  return (
    <div className="bg-brand-950 text-slate-300 text-xs py-2 px-4 border-b border-brand-800/40 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Location & Hours */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kanchipuram, Tamil Nadu, India</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Mon - Sat: 7:30 AM - 9:30 PM | Sun: 8:00 AM - 2:00 PM</span>
          </div>
        </div>

        {/* Right: Emergency, Phone & Language */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
            <span>24x7 Emergency: </span>
            <a href="tel:108" className="hover:underline font-bold text-white">108</a>
            <span className="text-slate-500">|</span>
            <a href="tel:+914427228999" className="hover:underline text-slate-200">+91 44 2722 8999</a>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <a href="tel:+914427228900" className="hover:text-white font-medium">
              +91 44 2722 8900
            </a>
          </div>

          {/* Language Switcher Indicator */}
          <div className="flex items-center gap-1 pl-3 border-l border-slate-700">
            <Globe className="w-3 h-3 text-slate-400" />
            <button
              onClick={() => setLang('EN')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                lang === 'EN' ? 'text-white bg-brand-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('TA')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                lang === 'TA' ? 'text-white bg-brand-800' : 'text-slate-400 hover:text-white'
              }`}
              title="தமிழ்"
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
