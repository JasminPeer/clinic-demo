import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, CheckCircle2, Bone, Brain, Activity } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const SeniorHealthPage = () => {
  const topics = [
    { title: 'Geriatric Cardiac & Vascular Health', desc: 'Managing systolic hypertension, heart failure symptoms, and vascular elasticity with routine ECG and echocardiography.' },
    { title: 'Senior Diabetes & Hypoglycemia Care', desc: 'Carefully balancing glycemic control in elderly adults to prevent sudden fainting, falls, and hypoglycemia episodes.' },
    { title: 'Osteoporosis & Fall Prevention', desc: 'Bone mineral density assessments, Vitamin D3/Calcium supplementation, and balance training to prevent hip fractures.' },
    { title: 'Joint Mobility & Osteoarthritis', desc: 'Non-surgical knee pain therapies, viscosupplementation, and gentle physical therapy for active independence.' },
    { title: 'Cognitive Health & Memory Care', desc: 'Early screening for mild cognitive impairment, dementia, sleep architecture support, and mental alertness.' },
    { title: 'Senior Nutrition & Hydration', desc: 'Ensuring adequate dietary protein to combat sarcopenia, gentle dietary fiber, and adequate electrolyte hydration.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Heart className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pillar 3 — Stay Healthy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Senior Citizen Health & Geriatric Care
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Honoring our elders with dedicated outpatient assessments, chronic condition monitoring, joint care, and compassionate medical attention in Kanchipuram.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="bg-gradient-to-r from-brand-950 via-cyan-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl my-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Senior Citizen Comprehensive Care Package</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            54 essential parameters including digital chest X-Ray, ECG, abdominal sonography, kidney & liver panels, electrolytes, bone vitamins, and senior physician review.
          </p>
          <div className="pt-2">
            <Link
              to="/health-packages/senior-health-check"
              className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-800" />
              <span>Explore Senior Health Package</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
            alt="Senior Citizen Care"
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
