import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'CareSphere Clinic API',
    tagline: 'Trusted Care. Better Health. Every Day.',
    location: 'Kanchipuram, Tamil Nadu, India',
    status: 'online',
    docs: '/api/health'
  });
});

// Start server and attempt DB connection
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(` CareSphere Clinic API running on http://localhost:${PORT}`);
    console.log(` Demo Center: Kanchipuram, Tamil Nadu`);
    console.log(`=================================================`);
  });
};

startServer();
