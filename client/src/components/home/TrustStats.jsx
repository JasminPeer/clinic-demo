import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Users, Activity, HeartHandshake, Clock, Award } from 'lucide-react';

const STATS = [
  { label: 'Specialities', value: '15+', icon: Stethoscope, desc: 'Complete clinical disciplines' },
  { label: 'Qualified Doctors', value: '30+', icon: Users, desc: 'Across Kanchipuram network' },
  { label: 'Diagnostic Services', value: '20+', icon: Activity, desc: 'Pathology & digital imaging' },
  { label: 'Patients Served', value: '10,000+', icon: HeartHandshake, desc: 'Compassionate family care' },
  { label: 'Years of Care', value: '8+', icon: Clock, desc: 'Serving Tamil Nadu communities' }
];

export const TrustStats = () => {
  return (
    <section className="bg-gradient-to-b from-brand-900 to-brand-950 text-white py-16 px-4 sm:px-6 lg:px-8 my-10 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Clinical Excellence & Trust</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Setting the Benchmark for Outpatient Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Committed to clinical precision, transparent medical counsel, and empathetic care.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-200">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {stat.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transparent Demo Notice */}
        <div className="mt-8 text-center text-[11px] text-cyan-200/60">
          * Demo platform data — Displayed for presentation and structural verification of CareSphere Clinic features.
        </div>
      </div>
    </section>
  );
};
