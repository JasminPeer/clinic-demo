import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'normal', inverted = false, showTagline = true }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconDimension = isLarge ? 'w-12 h-12' : isSmall ? 'w-8 h-8' : 'w-10 h-10';
  const titleSize = isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl';
  const taglineSize = isLarge ? 'text-xs' : 'text-[11px]';

  return (
    <Link to="/" className="inline-flex items-center gap-3 group select-none">
      {/* Original CareSphere SVG Emblem */}
      <div className={`relative ${iconDimension} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm`}>
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="logoSphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D5C75" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
            <linearGradient id="logoAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>

          {/* Outer Sphere Ring */}
          <circle cx="32" cy="32" r="29" stroke="url(#logoSphereGrad)" strokeWidth="3.5" fill={inverted ? 'rgba(255,255,255,0.1)' : '#F0F9FA'} />

          {/* Medical Cross */}
          <rect x="27.5" y="15" width="9" height="34" rx="4.5" fill="url(#logoSphereGrad)" />
          <rect x="15" y="27.5" width="34" height="9" rx="4.5" fill="url(#logoSphereGrad)" />

          {/* Subtle Heartbeat Pulse Overlay */}
          <path
            d="M12 32 H23 L27 21 L32 43 L36 26 L40 35 L43 32 H52"
            stroke="#FFFFFF"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${titleSize} ${inverted ? 'text-white' : 'text-brand-900'}`}>
            Care<span className="text-cyan-600">Sphere</span>
          </span>
          <span className={`text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${inverted ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-800 border border-brand-200'}`}>
            Clinic
          </span>
        </div>
        {showTagline && (
          <span className={`font-medium tracking-normal ${taglineSize} ${inverted ? 'text-slate-300' : 'text-slate-500'}`}>
            Trusted Care. Better Health. Every Day.
          </span>
        )}
      </div>
    </Link>
  );
};
