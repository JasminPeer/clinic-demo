import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Doctor, Clinic, Appointment, Disease, Symptom, Diagnostic, HealthPackage } from '../models/index.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

// Helper to read local JSON files
const loadJson = (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error loading ${filename}:`, err.message);
  }
  return [];
};

// Cached datasets
const jsonDoctors = loadJson('doctors.json');
const jsonClinics = loadJson('clinics.json');
const jsonServices = loadJson('services.json');
const jsonDiseases = loadJson('diseases.json');
const jsonSymptoms = loadJson('symptoms.json');
const jsonDiagnostics = loadJson('diagnostics.json');
const jsonPackages = loadJson('packages.json');
const jsonHealthTips = loadJson('healthTips.json');
const jsonGlossary = loadJson('glossary.json');
const jsonFaqs = loadJson('faqs.json');

// Memory appointment store (for when MongoDB is offline)
const memoryAppointments = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: isDbConnected() ? 'connected' : 'memory/json-mode',
    clinic: 'CareSphere Clinic, Kanchipuram'
  });
});

// DOCTORS
router.get('/doctors', async (req, res) => {
  try {
    const { specialty, search, consultationType } = req.query;
    let list = jsonDoctors;

    if (isDbConnected()) {
      try {
        const query = {};
        if (specialty) query.specialty = new RegExp(specialty, 'i');
        const dbDocs = await Doctor.find(query);
        if (dbDocs.length > 0) list = dbDocs;
      } catch (e) {
        // fallback to json
      }
    }

    let filtered = [...list];
    if (specialty && specialty !== 'All') {
      filtered = filtered.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
    }
    if (consultationType && consultationType !== 'All') {
      filtered = filtered.filter(d => d.consultationType === consultationType || d.consultationType === 'Both');
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.specialty.toLowerCase().includes(q) ||
        (d.languages && d.languages.some(l => l.toLowerCase().includes(q)))
      );
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let doctor = jsonDoctors.find(d => d.id === id);
    if (!doctor && isDbConnected()) {
      doctor = await Doctor.findOne({ id });
    }
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CLINICS
router.get('/clinics', async (req, res) => {
  try {
    const { search, openNow, hasDiagnostics } = req.query;
    let list = [...jsonClinics];

    if (openNow === 'true') {
      list = list.filter(c => c.openNow);
    }
    if (hasDiagnostics === 'true') {
      list = list.filter(c => c.hasDiagnostics);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.city.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
      );
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clinics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let clinic = jsonClinics.find(c => c.id === id);
    if (!clinic && isDbConnected()) {
      clinic = await Clinic.findOne({ id });
    }
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SERVICES
router.get('/services', (req, res) => {
  res.json(jsonServices);
});

router.get('/services/:slug', (req, res) => {
  const service = jsonServices.find(s => s.slug === req.params.slug);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
});

// DISEASES
router.get('/diseases', async (req, res) => {
  try {
    const { category, search } = req.query;
    let list = [...jsonDiseases];

    if (category && category !== 'All') {
      list = list.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.summary.toLowerCase().includes(q) ||
        (d.symptoms && d.symptoms.some(s => s.toLowerCase().includes(q)))
      );
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/diseases/:slug', (req, res) => {
  const disease = jsonDiseases.find(d => d.slug === req.params.slug);
  if (!disease) return res.status(404).json({ error: 'Disease not found' });
  res.json(disease);
});

// SYMPTOMS
router.get('/symptoms', (req, res) => {
  const { search } = req.query;
  let list = [...jsonSymptoms];
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q));
  }
  res.json(list);
});

router.get('/symptoms/:slug', (req, res) => {
  const symptom = jsonSymptoms.find(s => s.slug === req.params.slug);
  if (!symptom) return res.status(404).json({ error: 'Symptom not found' });
  res.json(symptom);
});

// DIAGNOSTICS
router.get('/diagnostics', (req, res) => {
  const { category, search } = req.query;
  let list = [...jsonDiagnostics];
  if (category && category !== 'All') {
    list = list.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.whatItChecks.toLowerCase().includes(q));
  }
  res.json(list);
});

router.get('/diagnostics/:slug', (req, res) => {
  const test = jsonDiagnostics.find(t => t.slug === req.params.slug);
  if (!test) return res.status(404).json({ error: 'Diagnostic test not found' });
  res.json(test);
});

// HEALTH PACKAGES
router.get('/packages', (req, res) => {
  res.json(jsonPackages);
});

router.get('/packages/:slug', (req, res) => {
  const pkg = jsonPackages.find(p => p.slug === req.params.slug);
  if (!pkg) return res.status(404).json({ error: 'Health package not found' });
  res.json(pkg);
});

// HEALTH TIPS / ARTICLES
router.get('/health-tips', (req, res) => {
  res.json(jsonHealthTips);
});

router.get('/health-tips/:slug', (req, res) => {
  const tip = jsonHealthTips.find(t => t.slug === req.params.slug);
  if (!tip) return res.status(404).json({ error: 'Article not found' });
  res.json(tip);
});

// GLOSSARY
router.get('/glossary', (req, res) => {
  const { letter, search } = req.query;
  let list = [...jsonGlossary];
  if (letter && letter !== 'All') {
    list = list.filter(g => g.letter.toUpperCase() === letter.toUpperCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(g => g.term.toLowerCase().includes(q) || g.simpleDefinition.toLowerCase().includes(q));
  }
  res.json(list);
});

// FAQS
router.get('/faqs', (req, res) => {
  const { category } = req.query;
  let list = [...jsonFaqs];
  if (category && category !== 'All') {
    list = list.filter(f => f.category.toLowerCase() === category.toLowerCase());
  }
  res.json(list);
});

// APPOINTMENTS (Booking engine)
router.post('/appointments', async (req, res) => {
  try {
    const data = req.body;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `CS-2026-${randomSuffix}`;

    const newAppointment = {
      ...data,
      appointmentId,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    if (isDbConnected()) {
      try {
        const saved = await Appointment.create(newAppointment);
        return res.status(201).json(saved);
      } catch (dbErr) {
        console.warn('Could not save to MongoDB, storing in memory:', dbErr.message);
      }
    }

    memoryAppointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/appointments/:id', (req, res) => {
  const appt = memoryAppointments.find(a => a.appointmentId === req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });
  res.json(appt);
});

// GLOBAL MULTI-CATEGORY SEARCH
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === '') {
    return res.json({ doctors: [], diseases: [], symptoms: [], services: [], diagnostics: [], articles: [] });
  }
  const query = q.toLowerCase();

  const doctors = jsonDoctors.filter(d => 
    d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query)
  ).slice(0, 4);

  const diseases = jsonDiseases.filter(d => 
    d.name.toLowerCase().includes(query) || (d.symptoms && d.symptoms.some(s => s.toLowerCase().includes(query)))
  ).slice(0, 4);

  const symptoms = jsonSymptoms.filter(s => 
    s.name.toLowerCase().includes(query) || s.commonCauses.some(c => c.toLowerCase().includes(query))
  ).slice(0, 4);

  const services = jsonServices.filter(s => 
    s.name.toLowerCase().includes(query) || s.commonConditions.some(c => c.toLowerCase().includes(query))
  ).slice(0, 4);

  const diagnostics = jsonDiagnostics.filter(t => 
    t.name.toLowerCase().includes(query) || t.whatItChecks.toLowerCase().includes(query)
  ).slice(0, 4);

  const articles = jsonHealthTips.filter(a => 
    a.title.toLowerCase().includes(query) || a.category.toLowerCase().includes(query)
  ).slice(0, 4);

  res.json({
    doctors,
    diseases,
    symptoms,
    services,
    diagnostics,
    articles
  });
});

export default router;
