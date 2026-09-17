import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Navigation } from 'lucide-react';
import { GoogleMap } from '../components/common/GoogleMap';
import { getDirectionsUrl, DEFAULT_CENTER } from '../services/googleMapsService';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const clinicLocation = {
    id: 'contact-kanchipuram',
    name: 'CareSphere Multispeciality Clinic Kanchipuram',
    isCareSphere: true,
    address: 'No. 42, Gandhi Road, Near Rangaswamy Tank, Kanchipuram, Tamil Nadu 631501',
    lat: 12.8342,
    lng: 79.7036
  };

  const directionsUrl = getDirectionsUrl(clinicLocation.lat, clinicLocation.lng, clinicLocation.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          <MapPin className="w-3.5 h-3.5 text-brand-800" />
          <span>Kanchipuram, Tamil Nadu</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact CareSphere Clinic
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          We are here to assist you with appointments, lab sample collection, doctor availability, and general inquiries.
        </p>
      </div>

      {/* Main Split: Left Contact Info & Form, Right Interactive Google Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Details & Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-brand-800 font-bold">
                <MapPin className="w-4 h-4" />
                <span>Clinic Address</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                No. 42, Gandhi Road, Near Rangaswamy Tank, Kanchipuram, Tamil Nadu 631501
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Phone className="w-4 h-4" />
                <span>Telephone Desk</span>
              </div>
              <p className="text-slate-600">
                Reception: <a href="tel:+914427228900" className="font-bold text-slate-900 hover:underline">+91 44 2722 8900</a>
              </p>
              <p className="text-slate-600">
                Emergency: <a href="tel:108" className="font-bold text-red-600 hover:underline">108 / +91 44 2722 8999</a>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-cyan-700 font-bold">
                <Mail className="w-4 h-4" />
                <span>Email Inquiries</span>
              </div>
              <p className="text-slate-600 truncate">
                <a href="mailto:kanchipuram@caresphereclinic.com" className="hover:underline text-brand-800 font-semibold">
                  kanchipuram@caresphereclinic.com
                </a>
              </p>
              <p className="text-[11px] text-slate-400">Response within 24 hours</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-brand-800 font-bold">
                <Clock className="w-4 h-4" />
                <span>Clinic Timings</span>
              </div>
              <p className="text-slate-600">Mon - Sat: 7:30 AM - 9:30 PM</p>
              <p className="text-slate-600">Sunday: 8:00 AM - 2:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">Our patient coordination desk will respond promptly via phone or email.</p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-800">Thank you for reaching out. Our staff will contact you shortly.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-white text-emerald-800 border border-emerald-300 font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Ramanathan"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400 12345"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Diagnostic enquiry / Appointment"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our clinical or diagnostic team help you?"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Google Map of Kanchipuram Clinic (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="h-[440px] rounded-3xl overflow-hidden shadow-soft border border-slate-200">
            <GoogleMap
              center={{ lat: clinicLocation.lat, lng: clinicLocation.lng }}
              zoom={15}
              markers={[clinicLocation]}
              selectedPlace={clinicLocation}
              className="w-full h-full"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">CareSphere Clinic Kanchipuram</div>
              <div className="text-[11px] text-slate-500">Gandhi Road, Near Rangaswamy Tank</div>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-800 text-white font-bold text-xs shadow-xs hover:bg-brand-900 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
