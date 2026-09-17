import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Stethoscope, Microscope, Users, Sparkles, Heart } from 'lucide-react';

const CAROUSEL_SLIDES = [
  {
    id: 1,
    category: 'Doctors & Care',
    icon: Stethoscope,
    headline: 'Expert Care, Close to Home',
    description: 'Connect with qualified healthcare professionals, physicians, and surgeons right here in Kanchipuram.',
    ctaText: 'Find a Doctor',
    ctaLink: '/doctors',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85',
    accentColor: 'from-brand-900/90 to-slate-950/80'
  },
  {
    id: 2,
    category: 'Modern Clinic',
    icon: ShieldCheck,
    headline: 'Advanced Outpatient Facility',
    description: 'Experience sterile, well-equipped outpatient suites designed for calm, dignified, and patient-first consultations.',
    ctaText: 'Explore Kanchipuram Clinic',
    ctaLink: '/clinics/caresphere-kanchipuram-main',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    accentColor: 'from-cyan-950/90 to-brand-950/85'
  },
  {
    id: 3,
    category: 'Diagnostics',
    icon: Microscope,
    headline: 'Precision Lab & Imaging Services',
    description: 'NABL-standard automated pathology, digital X-Ray, ultrasound, and home blood collection across Kanchipuram.',
    ctaText: 'View Diagnostic Tests',
    ctaLink: '/diagnostics',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    accentColor: 'from-slate-950/90 to-blue-950/85'
  },
  {
    id: 4,
    category: 'Family Healthcare',
    icon: Users,
    headline: 'Comprehensive Care for All Generations',
    description: 'From pediatric immunizations to senior geriatric screenings, we support your entire family’s wellness journey.',
    ctaText: 'Book Family Appointment',
    ctaLink: '/appointments',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=85',
    accentColor: 'from-emerald-950/90 to-brand-950/85'
  },
  {
    id: 5,
    category: 'Preventive Healthcare',
    icon: Sparkles,
    headline: 'Catch Conditions Before They Start',
    description: 'Targeted wellness checkup packages designed to assess cardiac, metabolic, and hormonal health at every age.',
    ctaText: 'Explore Health Packages',
    ctaLink: '/health-packages',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85',
    accentColor: 'from-brand-950/90 to-slate-900/80'
  },
  {
    id: 6,
    category: 'Healthy Lifestyle',
    icon: Heart,
    headline: 'Understand Your Health Better',
    description: 'Browse our evidence-based disease encyclopedia, fever guidelines, nutrition advice, and medical glossary.',
    ctaText: 'Visit Health Library',
    ctaLink: '/health-library',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=85',
    accentColor: 'from-cyan-950/90 to-slate-950/80'
  }
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  const slide = CAROUSEL_SLIDES[current];
  const SlideIcon = slide.icon;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] sm:min-h-[500px] flex items-center">
        {/* Background Image with Smooth Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-cover object-center"
            />
            {/* Deep gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor}`} />
          </motion.div>
        </AnimatePresence>

        {/* Content Box */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-12 lg:p-16 text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-cyan-200 text-xs font-bold uppercase tracking-wider border border-white/20">
            <SlideIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>{slide.category}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {slide.headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
            {slide.description}
          </p>

          <div className="pt-2">
            <Link
              to={slide.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-brand-950 hover:bg-cyan-50 font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-brand-800" />
            </Link>
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous carousel slide"
            className="p-3 rounded-2xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next carousel slide"
            className="p-3 rounded-2xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-6 sm:left-12 z-20 flex items-center gap-2">
          {CAROUSEL_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}: ${s.category}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-cyan-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
