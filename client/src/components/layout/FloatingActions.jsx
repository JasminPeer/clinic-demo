import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

export const FloatingActions = () => {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex flex-col gap-2.5 items-end select-none">
      {/* WhatsApp Quick Chat */}
      <a
        href="https://wa.me/914427228900?text=Hello%20CareSphere%20Clinic%20Kanchipuram,%20I%20would%20like%20to%20inquire%20about%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
        aria-label="Chat with CareSphere Kanchipuram on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Chat with Clinic
        </span>
      </a>

      {/* Direct 24/7 Helpline */}
      <a
        href="tel:+914427228900"
        className="p-3 rounded-full bg-brand-800 hover:bg-brand-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
        title="Call CareSphere Kanchipuram"
        aria-label="Call CareSphere Kanchipuram clinic"
      >
        <PhoneCall className="w-4 h-4 text-cyan-300" />
      </a>
    </div>
  );
};
