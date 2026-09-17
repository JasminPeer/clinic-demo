import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ShieldCheck, CheckCircle2, HeartPulse } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Decorative gradient blur orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-brand-100/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Regional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200/80 text-brand-900 text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-brand-800" />
              <span>Comprehensive Healthcare in Kanchipuram</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Healthcare That <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand-800 via-brand-700 to-cyan-600 bg-clip-text text-transparent">
                Puts You First
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Find trusted doctors, explore healthcare services, book appointments and understand your health — all in one place. Serving Kanchipuram and surrounding communities with compassionate clinical excellence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-900/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-cyan-300" />
                <span>Book an Appointment</span>
              </Link>

              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm sm:text-base shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Users className="w-4 h-4 text-brand-700" />
                <span>Find a Doctor</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>NABL Accredited Diagnostics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Senior Kanchipuram Consultants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero-Wait Tele-Review Option</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Large Healthcare Visual with subtle floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80"
                  alt="CareSphere Senior Physician Kanchipuram"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />

                {/* Overlaid Banner at bottom of photo */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 text-brand-800 font-bold">
                      <HeartPulse className="w-5 h-5 text-brand-800" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        CareSphere Multispeciality Clinic
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Gandhi Road, Kanchipuram • Open Today until 9:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Animated Pill Badge 1: Top Right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-sm">
                  15+
                </div>
                <div className="text-left pr-1">
                  <div className="text-xs font-bold text-slate-800">Specialities</div>
                  <div className="text-[10px] text-slate-400">Complete Care</div>
                </div>
              </motion.div>

              {/* Floating Animated Pill Badge 2: Bottom Left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left pr-2">
                  <div className="text-xs font-bold text-slate-800">Verified Doctors</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">100% Licensed</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
