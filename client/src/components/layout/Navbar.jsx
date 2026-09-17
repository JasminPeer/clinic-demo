import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Calendar,
  Search,
  MapPin,
  HeartPulse,
  BookOpen,
  Activity,
  Shield,
  PhoneCall
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = [
    {
      title: 'Care',
      badge: 'Pillar 1',
      items: [
        { name: 'Find Doctor', path: '/doctors', desc: 'Consult qualified specialists in Kanchipuram' },
        { name: 'Book Appointment', path: '/appointments', desc: '7-step seamless instant scheduling' },
        { name: 'Clinic Locator', path: '/clinics', desc: 'Find CareSphere & nearby healthcare centers' },
        { name: 'Specialities & Services', path: '/services', desc: '16 comprehensive clinical departments' },
        { name: 'Diagnostics & Lab Tests', path: '/diagnostics', desc: 'Blood, imaging, and home sample collection' },
        { name: 'Health Packages', path: '/health-packages', desc: 'Preventive checkups for every life stage' }
      ]
    },
    {
      title: 'Understand',
      badge: 'Pillar 2',
      items: [
        { name: 'Disease Encyclopedia', path: '/health-library/diseases', desc: 'Over 30 conditions explained clearly' },
        { name: 'HIV & AIDS Education', path: '/health-library/diseases/hiv', desc: 'Stigma-free transmission, testing & care' },
        { name: 'Fever Care & Monitoring', path: '/health-library/symptoms/fever', desc: 'Hydration, red flags & temperature guide' },
        { name: 'Symptom Library', path: '/health-library/symptoms', desc: 'Educational symptom evaluation' },
        { name: 'Medical Glossary (A-Z)', path: '/glossary', desc: 'Medical terms simplified' },
        { name: 'Health Articles & Tips', path: '/health-tips', desc: 'Lifestyle, nutrition and preventive advice' }
      ]
    },
    {
      title: 'Stay Healthy',
      badge: 'Pillar 3',
      items: [
        { name: "Women's Health", path: '/womens-health', desc: 'PCOS, antenatal and reproductive wellness' },
        { name: "Children's Health", path: '/childrens-health', desc: 'Paediatrics, nutrition and growth tracking' },
        { name: "Men's Health", path: '/mens-health', desc: 'Cardio-metabolic and prostate care' },
        { name: 'Senior Citizen Health', path: '/senior-health', desc: 'Geriatric vitality, mobility and bone care' },
        { name: 'Vaccination Schedules', path: '/vaccinations', desc: 'Childhood & adult immunizations' },
        { name: 'Physiotherapy & Rehab', path: '/physiotherapy', desc: 'Back, neck, joint pain and mobility recovery' }
      ]
    },
    {
      title: 'About Clinic',
      items: [
        { name: 'About CareSphere', path: '/about', desc: 'Our mission, doctors & facilities' },
        { name: 'Clinics & Maps', path: '/clinics', desc: 'Kanchipuram flagship & network' },
        { name: 'Frequently Asked Questions', path: '/faq', desc: 'Appointments, fees, and tests' },
        { name: 'Contact Us', path: '/contact', desc: 'Reach our Kanchipuram clinic team' }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="shrink-0">
            <BrandLogo />
          </div>

          {/* Desktop Mega-Menus */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((menu, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    activeDropdown === menu.title
                      ? 'text-brand-800 bg-brand-50'
                      : 'text-slate-700 hover:text-brand-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{menu.title}</span>
                  {menu.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-bold">
                      {menu.badge}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === menu.title ? 'rotate-180 text-brand-800' : 'text-slate-400'}`} />
                </button>

                {/* Dropdown Menu Box */}
                {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      {menu.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.path}
                          onClick={() => setActiveDropdown(null)}
                          className="block p-2.5 rounded-xl hover:bg-brand-50/70 transition-colors group"
                        >
                          <div className="text-sm font-bold text-slate-800 group-hover:text-brand-800 flex items-center justify-between">
                            <span>{item.name}</span>
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Quick Clinic Map Link */}
            <Link
              to="/clinics"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-800 hover:bg-slate-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-brand-700" />
              <span>Clinics</span>
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/clinics"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-800 hover:border-brand-300 text-xs font-bold transition-colors"
              title="Locate Clinics in Kanchipuram"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-700" />
              <span>Kanchipuram Map</span>
            </Link>

            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs tracking-wide shadow-md shadow-brand-900/10 hover:shadow-brand-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/appointments"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-800 text-white text-xs font-bold shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-slate-900/40 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation Menu</span>
              <button onClick={closeMobile} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {navLinks.map((menu, mIdx) => (
              <div key={mIdx} className="space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-brand-800 flex items-center gap-2">
                  <span>{menu.title}</span>
                  {menu.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 lowercase">
                      {menu.badge}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                  {menu.items.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.path}
                      onClick={closeMobile}
                      className="py-1.5 text-sm font-semibold text-slate-700 hover:text-brand-800 flex items-center justify-between"
                    >
                      <span>{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Link
                to="/appointments"
                onClick={closeMobile}
                className="w-full py-3 rounded-xl bg-brand-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:108"
                className="w-full py-2.5 rounded-xl bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center gap-2 border border-red-200"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency: Call 108</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
