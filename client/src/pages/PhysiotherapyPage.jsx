import React from 'react';
import { Link } from 'react-router-dom';
import { Footprints, Calendar, CheckCircle2, Bone, ShieldCheck, Activity } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const PhysiotherapyPage = () => {
  const topics = [
    { title: 'Lower Back Pain & Sciatica Relief', desc: 'Custom core strengthening, pelvic stabilization, and ergonomic desk adjustments to relieve lumbar disc irritation.' },
    { title: 'Cervical Neck Pain & Spondylosis', desc: 'Gentle cervical traction, postural retraining, and isometric neck exercises for computer-induced tension.' },
    { title: 'Knee Osteoarthritis Rehabilitation', desc: 'Quadriceps and hamstring strengthening, joint unloading mechanics, and resistance band therapy.' },
    { title: 'Frozen Shoulder & Rotator Cuff Care', desc: 'Restoring glenohumeral mobility through targeted joint mobilization, pendulum exercises, and electrotherapy.' },
    { title: 'Sports Injury & Ligament Recovery', desc: 'Structured recovery pathways following ankle sprains, hamstring pulls, and ACL ligament conditioning.' },
    { title: 'Post-Operative Orthopaedic Rehab', desc: 'Guided gait training, progressive weight-bearing, and swelling management after fracture fixation or joint replacement.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Footprints className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pillar 3 — Stay Healthy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Physiotherapy & Physical Rehabilitation
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Restoring pain-free movement, postural balance, joint function, and functional strength at our Kanchipuram clinic rehabilitation bay.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="bg-gradient-to-r from-emerald-950 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl my-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">CareSphere Physiotherapy & Mobility Suite</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Equipped with Interferential Therapy (IFT), Therapeutic Ultrasound, TENS units, exercise stations, and posture analysis tools for personalized rehabilitation.
          </p>
          <div className="pt-2">
            <Link
              to="/appointments?specialty=Physiotherapy"
              className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-800" />
              <span>Book Physiotherapy Session</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
            alt="Physiotherapy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {topics.map((t, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-2.5">
            <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
