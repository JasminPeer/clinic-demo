import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Calendar, CheckCircle2, ShieldCheck, Thermometer } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const ChildrensHealthPage = () => {
  const topics = [
    { title: 'IAP Childhood Vaccinations', desc: 'Full immunization adherence according to the Indian Academy of Pediatrics schedule with certified cold chain storage.' },
    { title: 'Growth & Developmental Milestones', desc: 'Tracking height, weight, head circumference, and cognitive motor milestones during well-baby visits.' },
    { title: 'Paediatric Fever Management', desc: 'Safe temperature monitoring, gentle tepid sponging, fluid hydration, and fever red flags in infants.' },
    { title: 'Childhood Asthma & Allergies', desc: 'Gentle nebulization support, trigger avoidance, and child-friendly inhaler spacer techniques.' },
    { title: 'Common Childhood Infections', desc: 'Treating hand-foot-and-mouth disease, viral croup, acute gastroenteritis, and ear infections.' },
    { title: 'Paediatric Nutrition & Picky Eating', desc: 'Guidance on weaning foods, balanced iron and calcium intake, and healthy school lunch habits.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Baby className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pillar 3 — Stay Healthy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Children's Health & Paediatrics Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Gentle, compassionate medical care for infants, children, and teenagers guided by Consultant Paediatrician Dr. Priya Natarajan in Kanchipuram.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="bg-gradient-to-r from-cyan-900 via-brand-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl my-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Well-Baby & Child Immunization Clinic</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            From BCG and Hepatitis B at birth to MMR, Typhoid, and Flu shots, our certified pediatric bay guarantees sterile, calm, and pain-minimized vaccination.
          </p>
          <div className="pt-2">
            <Link
              to="/appointments?specialty=Paediatrics"
              className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-800" />
              <span>Book Paediatric Appointment</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1594824813581-2292f7e754a6?auto=format&fit=crop&w=800&q=80"
            alt="Paediatrics"
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
