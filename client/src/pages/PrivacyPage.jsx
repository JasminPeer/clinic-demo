import React from 'react';
import { ShieldCheck, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          <Lock className="w-3.5 h-3.5 text-brand-800" />
          <span>Data Privacy & Safety Policy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Privacy Policy & Demonstration Terms
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Commitment to data security, patient autonomy, and transparent demonstration policies.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          Important Healthcare Demonstration Notice
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          CareSphere Clinic is an advanced healthcare portfolio and demonstration platform designed to illustrate modern clinical information architecture, Google Maps Platform geolocation, and seamless patient scheduling. <strong>Do not submit confidential personal health records, sensitive diagnostic reports, or real financial payment data on this demonstration instance.</strong>
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Data Collected in Appointment Booking</h2>
          <p>
            When utilizing our 7-step appointment wizard, test inputs (such as patient names, contact telephone numbers, and reasons for consultation) are processed locally or stored in non-production demonstration database instances. Data is utilized strictly to render confirmation vouchers and Google Calendar links.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Google Maps Platform & Location Data</h2>
          <p>
            Geolocation requests triggered by the "Use My Location" feature are handled directly by your browser's official Geolocation API. Coordinates are used solely in real-time to center the interactive map and calculate approximate distances to healthcare centers in Kanchipuram. CareSphere does not track or store your historical physical movements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Non-Diagnostic Medical Disclaimer</h2>
          <p>
            All health educational materials, disease articles, and symptom evaluation guidance provided on this website are for general informational orientation only. They do not constitute personalized medical advice, diagnostic algorithms, or prescription orders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Facilities & Google Places</h2>
          <p>
            Nearby hospitals and healthcare facilities shown in the clinic locator are retrieved dynamically through Google Maps Platform APIs. These third-party entities are independent of CareSphere Clinic and are displayed for regional public convenience.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Contact & Inquiries</h2>
          <p>
            For questions regarding this demonstration architecture or clinic capabilities, contact our team at:
            <br />
            <strong>CareSphere Clinic, Kanchipuram, Tamil Nadu</strong>
            <br />
            Email: <a href="mailto:privacy@caresphereclinic.com" className="text-brand-800 hover:underline">privacy@caresphereclinic.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};
