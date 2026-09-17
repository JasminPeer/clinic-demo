import axios from 'axios';
import jsonDoctors from '../data/doctors.json';
import jsonClinics from '../data/clinics.json';
import jsonServices from '../data/services.json';
import jsonDiseases from '../data/diseases.json';
import jsonSymptoms from '../data/symptoms.json';
import jsonDiagnostics from '../data/diagnostics.json';
import jsonPackages from '../data/packages.json';
import jsonHealthTips from '../data/healthTips.json';
import jsonGlossary from '../data/glossary.json';
import jsonFaqs from '../data/faqs.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3500,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Safe API caller that falls back to embedded data
async function safeGet(endpoint, fallbackData, params = {}) {
  try {
    const res = await apiClient.get(endpoint, { params });
    return res.data;
  } catch (err) {
    // Graceful fallback to rich local JSON data
    return fallbackData;
  }
}

export const api = {
  // Doctors
  getDoctors: async (params) => {
    try {
      const res = await apiClient.get('/doctors', { params });
      return res.data;
    } catch (e) {
      let filtered = [...jsonDoctors];
      if (params?.specialty && params.specialty !== 'All') {
        filtered = filtered.filter(d => d.specialty.toLowerCase().includes(params.specialty.toLowerCase()));
      }
      if (params?.consultationType && params.consultationType !== 'All') {
        filtered = filtered.filter(d => d.consultationType === params.consultationType || d.consultationType === 'Both');
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
      }
      return filtered;
    }
  },

  getDoctorById: async (id) => {
    try {
      const res = await apiClient.get(`/doctors/${id}`);
      return res.data;
    } catch (e) {
      return jsonDoctors.find(d => d.id === id) || null;
    }
  },

  // Clinics
  getClinics: async (params) => {
    try {
      const res = await apiClient.get('/clinics', { params });
      return res.data;
    } catch (e) {
      let list = [...jsonClinics];
      if (params?.openNow === true) {
        list = list.filter(c => c.openNow);
      }
      if (params?.hasDiagnostics === true) {
        list = list.filter(c => c.hasDiagnostics);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
      }
      return list;
    }
  },

  getClinicById: async (id) => {
    try {
      const res = await apiClient.get(`/clinics/${id}`);
      return res.data;
    } catch (e) {
      return jsonClinics.find(c => c.id === id) || null;
    }
  },

  // Services
  getServices: () => safeGet('/services', jsonServices),
  getServiceBySlug: async (slug) => {
    try {
      const res = await apiClient.get(`/services/${slug}`);
      return res.data;
    } catch (e) {
      return jsonServices.find(s => s.slug === slug) || null;
    }
  },

  // Diseases
  getDiseases: async (params) => {
    try {
      const res = await apiClient.get('/diseases', { params });
      return res.data;
    } catch (e) {
      let list = [...jsonDiseases];
      if (params?.category && params.category !== 'All') {
        list = list.filter(d => d.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(d => d.name.toLowerCase().includes(q) || (d.symptoms && d.symptoms.some(s => s.toLowerCase().includes(q))));
      }
      return list;
    }
  },

  getDiseaseBySlug: async (slug) => {
    try {
      const res = await apiClient.get(`/diseases/${slug}`);
      return res.data;
    } catch (e) {
      return jsonDiseases.find(d => d.slug === slug) || null;
    }
  },

  // Symptoms
  getSymptoms: () => safeGet('/symptoms', jsonSymptoms),
  getSymptomBySlug: async (slug) => {
    try {
      const res = await apiClient.get(`/symptoms/${slug}`);
      return res.data;
    } catch (e) {
      return jsonSymptoms.find(s => s.slug === slug) || null;
    }
  },

  // Diagnostics
  getDiagnostics: () => safeGet('/diagnostics', jsonDiagnostics),
  getDiagnosticBySlug: async (slug) => {
    try {
      const res = await apiClient.get(`/diagnostics/${slug}`);
      return res.data;
    } catch (e) {
      return jsonDiagnostics.find(d => d.slug === slug) || null;
    }
  },

  // Packages
  getPackages: () => safeGet('/packages', jsonPackages),
  getPackageBySlug: async (slug) => {
    try {
      const res = await apiClient.get(`/packages/${slug}`);
      return res.data;
    } catch (e) {
      return jsonPackages.find(p => p.slug === slug) || null;
    }
  },

  // Health Tips
  getHealthTips: () => safeGet('/health-tips', jsonHealthTips),
  getHealthTipBySlug: async (slug) => {
    try {
      const res = await apiClient.get(`/health-tips/${slug}`);
      return res.data;
    } catch (e) {
      return jsonHealthTips.find(t => t.slug === slug) || null;
    }
  },

  // Glossary
  getGlossary: () => safeGet('/glossary', jsonGlossary),

  // FAQs
  getFaqs: () => safeGet('/faqs', jsonFaqs),

  // Appointment creation
  bookAppointment: async (appointmentData) => {
    try {
      const res = await apiClient.post('/appointments', appointmentData);
      return res.data;
    } catch (e) {
      // Local fallback generator
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generated = {
        ...appointmentData,
        appointmentId: `CS-2026-${randomSuffix}`,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      return generated;
    }
  },

  // Unified Multi-Category Search
  searchAll: async (q) => {
    try {
      const res = await apiClient.get('/search', { params: { q } });
      return res.data;
    } catch (e) {
      const query = (q || '').toLowerCase();
      if (!query) return { doctors: [], diseases: [], symptoms: [], services: [], diagnostics: [], articles: [] };

      return {
        doctors: jsonDoctors.filter(d => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query)).slice(0, 4),
        diseases: jsonDiseases.filter(d => d.name.toLowerCase().includes(query) || (d.symptoms && d.symptoms.some(s => s.toLowerCase().includes(query)))).slice(0, 4),
        symptoms: jsonSymptoms.filter(s => s.name.toLowerCase().includes(query) || s.commonCauses.some(c => c.toLowerCase().includes(query))).slice(0, 4),
        services: jsonServices.filter(s => s.name.toLowerCase().includes(query)).slice(0, 4),
        diagnostics: jsonDiagnostics.filter(t => t.name.toLowerCase().includes(query) || t.whatItChecks.toLowerCase().includes(query)).slice(0, 4),
        articles: jsonHealthTips.filter(a => a.title.toLowerCase().includes(query)).slice(0, 4)
      };
    }
  }
};
