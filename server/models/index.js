import mongoose from 'mongoose';

// Doctor Schema
const DoctorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: String,
  specialty: { type: String, required: true },
  qualification: String,
  experienceYears: Number,
  languages: [String],
  clinicId: String,
  clinicName: String,
  consultationFee: Number,
  consultationType: { type: String, enum: ['In-clinic', 'Video', 'Both'], default: 'Both' },
  availability: String,
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 50 },
  image: String,
  about: String,
  education: [String],
  experience: [String],
  services: [String],
  faqs: [{ question: String, answer: String }]
}, { timestamps: true });

// Clinic Schema
const ClinicSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isCareSphere: { type: Boolean, default: false },
  facilityType: String,
  affiliationNotice: String,
  tagline: String,
  address: { type: String, required: true },
  city: { type: String, default: 'Kanchipuram' },
  state: { type: String, default: 'Tamil Nadu' },
  pincode: String,
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  phone: String,
  emergencyPhone: String,
  email: String,
  openingHours: String,
  openNow: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 100 },
  image: String,
  gallery: [String],
  specialties: [String],
  facilities: [String],
  hasDiagnostics: { type: Boolean, default: true },
  appointmentAvailable: { type: Boolean, default: true },
  about: String
}, { timestamps: true });

// Appointment Schema
const AppointmentSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorSpecialty: String,
  clinicId: { type: String, required: true },
  clinicName: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  consultationType: { type: String, default: 'In-clinic' },
  patient: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    reason: String
  },
  status: { type: String, enum: ['Confirmed', 'Completed', 'Cancelled'], default: 'Confirmed' }
}, { timestamps: true });

// Disease Schema
const DiseaseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: String,
  tagline: String,
  summary: String,
  whatIsIt: String,
  causes: String,
  howItSpreads: [String],
  howItDoesNotSpread: [String],
  symptoms: [String],
  riskFactors: [String],
  testing: String,
  diagnosisOverview: String,
  prevention: [String],
  treatmentOverview: String,
  whenToSeekCare: String,
  mythsAndFacts: [{ myth: String, fact: String }],
  faqs: [{ question: String, answer: String }],
  relatedSpecialists: [String],
  relatedTests: [String],
  relatedArticles: [String],
  lastReviewedDate: String,
  medicalDisclaimer: String
}, { timestamps: true });

// Symptom Schema
const SymptomSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: String,
  icon: String,
  tagline: String,
  summary: String,
  whatIsIt: String,
  commonCauses: [String],
  associatedSymptoms: [String],
  temperatureMonitoring: [String],
  homeCareAndHydration: [String],
  whenToContactDoctor: [String],
  emergencyWarningSigns: [String],
  safetyDisclaimer: String,
  faqs: [{ question: String, answer: String }],
  relatedSpecialists: [String],
  relatedTests: [String],
  relatedDiseases: [String]
}, { timestamps: true });

// Diagnostic Test Schema
const DiagnosticSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: String,
  tagline: String,
  description: String,
  whatItChecks: String,
  preparation: String,
  sampleType: String,
  reportTime: String,
  homeSampleOption: Boolean,
  demoPrice: String,
  popular: Boolean
}, { timestamps: true });

// Health Package Schema
const HealthPackageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: String,
  description: String,
  idealFor: String,
  testCount: Number,
  testsIncluded: [String],
  preparation: String,
  demoPrice: String,
  originalPrice: String,
  discountPercentage: String,
  popular: Boolean
}, { timestamps: true });

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
export const Clinic = mongoose.models.Clinic || mongoose.model('Clinic', ClinicSchema);
export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
export const Disease = mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);
export const Symptom = mongoose.models.Symptom || mongoose.model('Symptom', SymptomSchema);
export const Diagnostic = mongoose.models.Diagnostic || mongoose.model('Diagnostic', DiagnosticSchema);
export const HealthPackage = mongoose.models.HealthPackage || mongoose.model('HealthPackage', HealthPackageSchema);
