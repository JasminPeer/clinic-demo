import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Doctor, Clinic, Disease, Symptom, Diagnostic, HealthPackage } from '../models/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

const load = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf-8'));

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/caresphere';
  console.log(`Connecting to ${uri}...`);
  await mongoose.connect(uri);

  console.log('Clearing existing collections...');
  await Promise.all([
    Doctor.deleteMany({}),
    Clinic.deleteMany({}),
    Disease.deleteMany({}),
    Symptom.deleteMany({}),
    Diagnostic.deleteMany({}),
    HealthPackage.deleteMany({})
  ]);

  console.log('Seeding fresh data...');
  await Doctor.insertMany(load('doctors.json'));
  await Clinic.insertMany(load('clinics.json'));
  await Disease.insertMany(load('diseases.json'));
  await Symptom.insertMany(load('symptoms.json'));
  await Diagnostic.insertMany(load('diagnostics.json'));
  await HealthPackage.insertMany(load('packages.json'));

  console.log('✓ Seeding completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
