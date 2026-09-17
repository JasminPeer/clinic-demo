import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  MapPin,
  Stethoscope,
  HeartPulse,
  Sun,
  Bone,
  Baby,
  Sparkles,
  Utensils,
  Wind,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  CalendarPlus,
  Home,
  Printer
} from 'lucide-react';
import { api } from '../../services/api';
import { BrandLogo } from '../common/BrandLogo';

const HEALTH_CATEGORIES = [
  { id: 'General Health', name: 'General Health & Fever', icon: Stethoscope, specialty: 'General Medicine' },
  { id: 'Heart', name: 'Heart & Blood Pressure', icon: HeartPulse, specialty: 'Cardiology' },
  { id: 'Skin', name: 'Skin, Hair & Allergies', icon: Sun, specialty: 'Dermatology' },
  { id: 'Bones', name: 'Bones, Joints & Back Pain', icon: Bone, specialty: 'Orthopaedics' },
  { id: "Women's Health", name: "Women's Health & Gynae", icon: Sparkles, specialty: 'Gynaecology & Obstetrics' },
  { id: "Children's Health", name: "Children's Health & Baby", icon: Baby, specialty: 'Paediatrics' },
  { id: 'Digestive', name: 'Digestive & Gastric Care', icon: Utensils, specialty: 'Gastroenterology' },
  { id: 'Respiratory', name: 'Breathing, Cough & Asthma', icon: Wind, specialty: 'Pulmonology' },
  { id: 'Other', name: 'Other Medical Concerns', icon: HelpCircle, specialty: 'General Medicine' }
];

const TIME_SLOTS = [
  { time: '09:00 AM', period: 'Morning' },
  { time: '10:00 AM', period: 'Morning' },
  { time: '11:30 AM', period: 'Morning' },
  { time: '02:00 PM', period: 'Afternoon' },
  { time: '03:30 PM', period: 'Afternoon' },
  { time: '05:00 PM', period: 'Evening' },
  { time: '06:30 PM', period: 'Evening' },
  { time: '07:30 PM', period: 'Evening' }
];

export const AppointmentWizard = () => {
  const [searchParams] = useSearchParams();
  const preSelectedDoctorId = searchParams.get('doctorId');

  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState('General Health');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    reason: ''
  });

  const [confirmedData, setConfirmedData] = useState(null);

  // Load initial doctors and clinics
  useEffect(() => {
    api.getDoctors().then(docs => {
      setDoctors(docs || []);
      if (preSelectedDoctorId) {
        const found = docs.find(d => d.id === preSelectedDoctorId);
        if (found) {
          setSelectedDoctor(found);
          setStep(3); // Jump to Clinic
        }
      }
    });

    api.getClinics().then(cls => {
      const careSphereOnly = cls.filter(c => c.isCareSphere);
      setClinics(careSphereOnly.length > 0 ? careSphereOnly : cls);
      setSelectedClinic(careSphereOnly[0] || cls[0] || null);
    });
  }, [preSelectedDoctorId]);

  // Generate next 7 dates
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      display: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  // Automatically select first date if not set
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].iso);
    }
  }, []);

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      category: selectedCategory,
      doctorId: selectedDoctor?.id || 'dr-ananya-sundaram',
      doctorName: selectedDoctor?.name || 'Dr. Ananya Sundaram',
      doctorSpecialty: selectedDoctor?.specialty || 'General Medicine',
      clinicId: selectedClinic?.id || 'caresphere-kanchipuram-main',
      clinicName: selectedClinic?.name || 'CareSphere Multispeciality Clinic, Kanchipuram',
      appointmentDate: selectedDate,
      appointmentTime: selectedTime || '10:00 AM',
      patient: patientDetails
    };

    const res = await api.bookAppointment(payload);
    setConfirmedData(res);
    setIsSubmitting(false);
    setStep(7); // Jump to Confirmation
  };

  // Google Calendar URL Generator
  const generateGoogleCalendarUrl = () => {
    if (!confirmedData) return '#';
    const title = encodeURIComponent(`Doctor Appointment: ${confirmedData.doctorName} - CareSphere Clinic`);
    const details = encodeURIComponent(`Appointment ID: ${confirmedData.appointmentId}\nDoctor: ${confirmedData.doctorName} (${confirmedData.doctorSpecialty})\nClinic: ${confirmedData.clinicName}\nReason: ${confirmedData.patient?.reason || 'Clinical Consultation'}`);
    const location = encodeURIComponent(confirmedData.clinicName);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Step Indicator Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Step {step} of 7: {
            step === 1 ? 'Health Concern' :
            step === 2 ? 'Select Doctor' :
            step === 3 ? 'Select Clinic' :
            step === 4 ? 'Select Date' :
            step === 5 ? 'Select Time Slot' :
            step === 6 ? 'Patient Information' :
            'Appointment Confirmed'
          }</span>
          <span className="text-brand-800 font-extrabold">{Math.round((step / 7) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-brand-800 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: What do you need help with? */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft animate-in fade-in duration-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            What do you need help with?
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Choose your primary healthcare concern so we can recommend the appropriate specialist.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HEALTH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    // Match a relevant doctor
                    const matchingDoc = doctors.find(d => d.specialty.toLowerCase().includes(cat.specialty.toLowerCase())) || doctors[0];
                    if (matchingDoc) setSelectedDoctor(matchingDoc);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/50 shadow-md ring-1 ring-brand-600'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-brand-800 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{cat.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{cat.specialty}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md transition-colors"
            >
              <span>Continue to Doctor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Doctor */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft animate-in fade-in duration-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Select Your Doctor
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Showing specialists suitable for: <strong className="text-brand-800">{selectedCategory}</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doc) => {
              const isSelected = selectedDoctor?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/50 shadow-md ring-1 ring-brand-600'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h4>
                    <p className="text-xs text-brand-700 font-semibold">{doc.specialty}</p>
                    <p className="text-xs text-slate-400">{doc.qualification} • {doc.experienceYears}+ yrs</p>
                    <div className="mt-2 text-xs font-bold text-slate-700">
                      Fee: ₹{doc.consultationFee}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!selectedDoctor}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md disabled:opacity-50"
            >
              <span>Select Clinic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Select Clinic */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft animate-in fade-in duration-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Select CareSphere Clinic
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Choose your preferred branch for this consultation.
          </p>

          <div className="space-y-4">
            {clinics.map((clinic) => {
              const isSelected = selectedClinic?.id === clinic.id;
              return (
                <div
                  key={clinic.id}
                  onClick={() => setSelectedClinic(clinic)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/50 shadow-md ring-1 ring-brand-600'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-100 text-brand-800">
                      CareSphere Primary Facility
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{clinic.name}</h4>
                    <p className="text-xs text-slate-500">{clinic.address}</p>
                    <p className="text-xs text-slate-400 mt-1">Hours: {clinic.openingHours}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-brand-800 bg-brand-800 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!selectedClinic}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md"
            >
              <span>Choose Date</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Select Date */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft animate-in fade-in duration-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Select Appointment Date
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Consulting with: <strong className="text-brand-800">{selectedDoctor?.name}</strong> at {selectedClinic?.name}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableDates.map((d) => {
              const isSelected = selectedDate === d.iso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setSelectedDate(d.iso)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-brand-600 bg-brand-800 text-white shadow-md'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Calendar className="w-5 h-5 mx-auto mb-1 opacity-70" />
                  <div className="text-xs font-bold">{d.display}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-cyan-200' : 'text-slate-400'}`}>
                    Available Slots
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={!selectedDate}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md"
            >
              <span>Choose Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Select Time */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft animate-in fade-in duration-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Select Time Slot
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Date: <strong className="text-brand-800">{selectedDate}</strong>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_SLOTS.map((slot, idx) => {
              const isSelected = selectedTime === slot.time;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-brand-600 bg-brand-800 text-white shadow-md'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-5 h-5 mx-auto mb-1 opacity-70" />
                  <div className="text-sm font-bold">{slot.time}</div>
                  <div className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-cyan-200' : 'text-slate-400'}`}>
                    {slot.period}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(6)}
              disabled={!selectedTime}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md disabled:opacity-50"
            >
              <span>Patient Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Patient Details */}
      {step === 6 && (
        <form onSubmit={handlePatientSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft animate-in fade-in duration-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Patient Information
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Please provide accurate details for registration and instant digital booking confirmation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Patient Name *</label>
              <input
                type="text"
                required
                value={patientDetails.name}
                onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                placeholder="e.g. S. Narayanan"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={patientDetails.age}
                  onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                  placeholder="34"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                <select
                  value={patientDetails.gender}
                  onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
                  className="w-full px-3 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-600 focus:outline-none bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone *</label>
              <input
                type="tel"
                required
                value={patientDetails.phone}
                onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                placeholder="+91 98400 12345"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={patientDetails.email}
                onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                placeholder="patient@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Consultation / Key Symptoms</label>
              <textarea
                rows="3"
                value={patientDetails.reason}
                onChange={(e) => setPatientDetails({ ...patientDetails, reason: e.target.value })}
                placeholder="Briefly describe what symptoms or questions you'd like the doctor to review (e.g. fever for 3 days, blood sugar checkup)"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(5)}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md transition-colors"
            >
              <span>{isSubmitting ? 'Confirming...' : 'Confirm Appointment'}</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-300" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 7: Confirmation Slip */}
      {step === 7 && confirmedData && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div id="appointment-slip" className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl relative overflow-hidden">
            {/* Top confirmation banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                    ✓ Appointment Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Booking Successful!
                  </h2>
                </div>
              </div>

              <div className="text-center sm:text-right bg-brand-50 border border-brand-200 px-4 py-2 rounded-2xl">
                <div className="text-[10px] font-bold text-brand-700 uppercase">Appointment ID</div>
                <div className="text-lg font-black text-brand-900">{confirmedData.appointmentId}</div>
              </div>
            </div>

            {/* Appointment Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 text-sm">
              <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">Consulting Doctor</div>
                <div className="font-extrabold text-slate-900 text-base">{confirmedData.doctorName}</div>
                <div className="text-xs text-brand-700 font-semibold">{confirmedData.doctorSpecialty}</div>
              </div>

              <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">Clinic Location</div>
                <div className="font-extrabold text-slate-900 text-base">{confirmedData.clinicName}</div>
                <div className="text-xs text-slate-500">Gandhi Road, Kanchipuram, Tamil Nadu</div>
              </div>

              <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">Date & Time</div>
                <div className="font-extrabold text-slate-900 text-base">{confirmedData.appointmentDate}</div>
                <div className="text-xs text-slate-600 font-medium">{confirmedData.appointmentTime} (IST)</div>
              </div>

              <div className="space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">Patient Information</div>
                <div className="font-extrabold text-slate-900 text-base">{confirmedData.patient?.name}</div>
                <div className="text-xs text-slate-500">
                  {confirmedData.patient?.age} yrs • {confirmedData.patient?.gender} • {confirmedData.patient?.phone}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <strong>Instructions:</strong> Please arrive 15 minutes before your scheduled slot. Bring previous lab reports and current prescription slips.
            </div>
          </div>

          {/* Action Buttons (Excluded from print) */}
          <div className="no-print flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-2">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs"
              >
                <CalendarPlus className="w-4 h-4 text-brand-700" />
                <span>Add to Calendar</span>
              </a>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs"
              >
                <Printer className="w-4 h-4 text-cyan-600" />
                <span>Print Confirmation</span>
              </button>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
