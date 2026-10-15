# 🩺 Medickit.ai – AI-Integrated Doctor Appointment & Telemedicine Platform

> An industry-grade, fullstack healthcare platform featuring real-time doctor discovery, multi-step appointment scheduling, and an intelligent **AI Medical Symptom Triage Engine**.

---

## 🌟 Key Features

### 1. 🤖 AI Clinical Symptom Triage Engine
* **Natural Language Symptom Assessment**: Patients describe health concerns in plain English or conversational phrases.
* **Clinical Knowledge Pattern Matching**: Evaluates urgency levels (`Low`, `Moderate`, `Urgent`) and maps complaints to the appropriate specialty (Cardiologist, Neurologist, Dermatologist, Pediatrician, Orthopedic, Gynecologist, Psychiatrist, General Physician).
* **Automated Action Plan**: Provides first-aid precautions, questions to ask during consultation, confidence metrics, and 1-click booking with matched verified specialists.

### 2. 🧑‍⚕️ Doctor Discovery & Catalog
* **Verified Doctor Profiles**: Comprehensive credentials including medical degrees, years of experience, clinic/hospital affiliation, consultation fees, and patient reviews.
* **Real-Time Search & Filters**: Live search across doctor names, hospitals, locations, and interactive specialty filter pills.
* **Flexible Sorting**: Sort by rating, experience, and consultation fees.

### 3. 📅 Interactive Multi-Step Booking Wizard
* **Dual Consultation Modes**: HD Video Consultation or In-Clinic hospital visit.
* **Dynamic Calendar**: Automated 7-day rolling calendar respecting individual doctor availability schedules.
* **Slot Categorization**: Morning, Afternoon, and Evening slots.
* **Patient Data Validation**: Validates full name, phone number, email, and symptoms notes with immediate booking ID generation.

### 4. 📋 My Appointments Management Dashboard
* **Active Bookings Tracker**: Persisted across browser sessions with unique booking IDs.
* **Status Tracking**: Visual status indicators (`Confirmed`, `Completed`, `Cancelled`).
* **Appointment Cancellation**: 1-click cancellation with state updates and real-time toast feedback.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Radix UI Dialog primitives |
| **AI Triage System** | Custom Clinical Rule-Based & Semantic Heuristic Triage Engine |
| **State Persistence** | Reactive LocalStorage persistence with resilient SSR hydrations |
| **Deployment** | Vercel (Edge-ready) |

---

## 📂 Project Structure

```
medickit-ai-healthcare/
├── app/
│   ├── ai-assistant/
│   │   └── page.tsx        # AI Symptom Checker & Doctor Matcher
│   ├── book/
│   │   └── page.tsx        # Doctor directory & Appointments management
│   ├── layout.tsx          # Root layout with navbar & footer
│   ├── page.tsx            # Modern platform landing page
│   └── globals.css         # Tailwind CSS styling
├── components/
│   ├── ui/
│   │   └── dialog.tsx      # Radix UI dialog accessible modal
│   ├── BookingModal.tsx    # Multi-step appointment booking wizard
│   ├── Header.tsx          # Sticky navigation bar
│   └── Footer.tsx          # Healthcare platform footer
├── lib/
│   ├── ai-triage.ts        # AI Symptom Triage & specialist heuristic engine
│   ├── appointment-store.ts# Booking state & localStorage persistence
│   ├── doctors-data.ts     # Verified doctor catalog & specialties
│   ├── types.ts            # TypeScript interfaces & contracts
│   └── utils.ts            # Classnames merge utility
├── public/                 # Static assets & banners
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd medickit-ai-healthcare
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment to Vercel (1-Click)

1. Push your repository to your personal GitHub account:
   ```bash
   git add .
   git commit -m "feat: initial commit of Medickit AI Healthcare platform"
   git remote add origin https://github.com/<your-username>/medickit-ai-healthcare.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. Click **Deploy** — your live link will be ready in under 60 seconds!

---

## 👨‍💻 Author
Built from scratch by **Vivek Chauhan**
