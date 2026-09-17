import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer = ({ compact = false, text }) => {
  const defaultText =
    text ||
    'This medical information is provided for general educational purposes only and does not replace professional medical advice, clinical diagnosis, or personalized treatment. If you are experiencing concerning symptoms, please consult a qualified healthcare professional.';

  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold">Educational Medical Notice: </strong>
          {defaultText}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-2xl p-4 sm:p-5 my-6 shadow-xs">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900 tracking-wide uppercase mb-1">
            Important Medical Disclaimer
          </h4>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            {defaultText}
          </p>
          <div className="mt-2 flex items-center gap-4 text-[11px] text-amber-700/80">
            <span>• Educational Healthcare Demo</span>
            <span>• Non-diagnostic guidance</span>
            <span>• In emergencies, dial 108</span>
          </div>
        </div>
      </div>
    </div>
  );
};
