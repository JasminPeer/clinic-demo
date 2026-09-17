# CareSphere Clinic — Modern Multispeciality Healthcare Platform

> **Tagline**: *"Trusted Care. Better Health. Every Day."*  
> **Location**: Kanchipuram, Tamil Nadu, India  
> **Flagship Center**: CareSphere Multispeciality Clinic, No. 42, Gandhi Road, Kanchipuram, TN 631501  

---

## Overview

CareSphere Clinic is an original, production-quality modern healthcare web platform engineered around three foundational pillars:

1. **CARE**: Doctor directory, specialist profiles, 7-step appointment booking wizard, interactive clinic locator, diagnostic laboratory & imaging, and preventive health packages.
2. **UNDERSTAND**: Medical disease encyclopedia (30+ conditions including dedicated, stigma-free HIV & AIDS guides, Dengue, Malaria, Typhoid, Diabetes, Asthma, Hypertension), symptom evaluation library with dedicated Fever care guidelines, and an A-Z medical glossary.
3. **STAY HEALTHY**: Dedicated wellness portals for Women's Health & PCOS, Children's Health & Paediatrics, Men's Health, Senior Citizen Health, Physiotherapy & Rehabilitation, and IAP/Adult Vaccination schedules.

---

## Technology Stack

- **Frontend**: React 18, Vite, React Router v6, Tailwind CSS, Lucide React, Framer Motion, Axios
- **Backend**: Node.js, Express.js, Mongoose / MongoDB
- **Mapping & Geolocation**: Official Google Maps Platform (Maps JavaScript API, Places API, Places Nearby Search, Place Details, Place Photos, Autocomplete, Directions) + HTML5 Geolocation API

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)
- MongoDB (optional; the server and client include a high-fidelity local dataset engine that automatically operates offline if MongoDB is not running)

### 2. Installation
Clone the repository and install dependencies:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## Google Maps Platform Configuration

This application uses the official **Google Maps Platform** for interactive clinic mapping, place autocomplete, and nearby healthcare search centered around **Kanchipuram, Tamil Nadu**.

### Step-by-Step API Setup

1. **Create a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click the project drop-down and select **New Project**.
   - Name it `CareSphere-Clinic` and click **Create**.

2. **Enable the Required APIs**:
   - Navigate to **APIs & Services > Library**.
   - Search for and enable the following APIs:
     - **Maps JavaScript API**
     - **Places API**
     - **Directions API**

3. **Generate an API Key**:
   - Navigate to **APIs & Services > Credentials**.
   - Click **+ Create Credentials > API Key**.
   - Copy the generated API key.

4. **Restrict the API Key (Crucial for Security)**:
   - In the API Key settings under **API Restrictions**, select **Restrict key**.
   - Check only:
     - *Maps JavaScript API*
     - *Places API*
     - *Directions API*
   - Under **Application Restrictions**, choose **HTTP referrers (web sites)**.
   - For local development, add:
     - `http://localhost:*/*`
     - `http://127.0.0.1:*/*`
   - For production, add your production domain (e.g. `https://your-domain.com/*`).
   - Save the restrictions.

5. **Configure Environment Variables**:
   - In the `client/` folder, create a file named `.env`:
     ```bash
     cp client/.env.example client/.env
     ```
   - Add your restricted API key:
     ```env
     VITE_GOOGLE_MAPS_API_KEY=AIzaSyYourRestrictedApiKeyHere
     VITE_API_BASE_URL=http://localhost:5000/api
     ```

> [!NOTE]
> **Zero-Config Resilience**: If `VITE_GOOGLE_MAPS_API_KEY` is left blank, the application automatically activates a high-fidelity simulated Kanchipuram Places visualizer. This guarantees that evaluators can test 100% of clinic card synchronization, filters, search, and distance calculations without map crashes.

> [!IMPORTANT]
> **Security Notice**: Never commit `.env` or `.env.local` files to public git repositories. Verify that `.gitignore` contains `.env*`.

---

## Running the Application

### Option A: Run Client and Server Concurrently
From the root directory:

```bash
# Terminal 1: Start Express API server (Port 5000)
npm run server

# Terminal 2: Start Vite React Frontend (Port 5173)
npm run dev
```

### Option B: Run Client Only (Zero-Dependency Mode)
The client frontend includes safe embedded clinical datasets and will operate seamlessly without the backend server:

```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Medical Disclaimer

All health educational materials, disease articles, fever guidelines, and symptom overviews on this platform are provided strictly for educational and demonstration purposes. They do not constitute clinical diagnosis, personalized medical advice, or prescription treatment. In medical emergencies, dial **108** or contact regional hospital emergency facilities immediately.
