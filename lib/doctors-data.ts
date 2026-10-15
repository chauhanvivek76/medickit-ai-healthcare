import { Doctor } from './types';

export const SPECIALTIES = [
  'All Specialties',
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Orthopedic',
  'Gynecologist',
  'Psychiatrist'
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    degrees: 'MBBS, MD (Medicine), DM (Cardiology)',
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 342,
    consultationFee: 800,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    about: 'Senior Consultant Interventional Cardiologist specializing in preventive cardiology, hypertension, coronary artery disease, and heart rhythm management.',
    hospital: 'Max Super Speciality Hospital',
    location: 'Saket, New Delhi',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: {
      morning: ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '02:15 PM', '03:00 PM'],
      evening: ['05:00 PM', '05:45 PM', '06:30 PM']
    },
    languages: ['English', 'Hindi']
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Khanna',
    specialty: 'General Physician',
    degrees: 'MBBS, MD (General Medicine)',
    experienceYears: 18,
    rating: 4.8,
    reviewCount: 520,
    consultationFee: 500,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    about: 'Expert in primary healthcare, chronic disease management (diabetes, thyroid, hypertension), seasonal viral infections, and full preventive health checks.',
    hospital: 'Apollo Clinic & Healthcare',
    location: 'Connaught Place, New Delhi',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    slots: {
      morning: ['08:30 AM', '09:15 AM', '10:00 AM', '11:30 AM'],
      afternoon: ['01:00 PM', '02:00 PM', '03:30 PM'],
      evening: ['05:30 PM', '06:15 PM', '07:00 PM']
    },
    languages: ['English', 'Hindi', 'Punjabi']
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Mukherjee',
    specialty: 'Dermatologist',
    degrees: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 10,
    rating: 4.9,
    reviewCount: 289,
    consultationFee: 750,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813501-48e025171757?auto=format&fit=crop&q=80&w=400',
    about: 'Board-certified clinical and aesthetic dermatologist treating acne, eczema, fungal infections, hair fall disorders, and skin allergy diagnostics.',
    hospital: 'Fortis Memorial Research Institute',
    location: 'Gurugram, Haryana',
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    slots: {
      morning: ['10:00 AM', '10:45 AM', '11:30 AM'],
      afternoon: ['02:00 PM', '02:45 PM', '03:30 PM'],
      evening: ['04:30 PM', '05:15 PM', '06:00 PM']
    },
    languages: ['English', 'Hindi', 'Bengali']
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikram Malhotra',
    specialty: 'Neurologist',
    degrees: 'MBBS, MD, DM (Neurology)',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 215,
    consultationFee: 1000,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    about: 'Specialized in neurological disorders, chronic migraine management, vertigo, peripheral neuropathy, epilepsy, and post-stroke recovery care.',
    hospital: 'Medanta - The Medicity',
    location: 'Gurugram, Sector 38',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    slots: {
      morning: ['09:30 AM', '10:30 AM', '11:15 AM'],
      afternoon: ['01:30 PM', '02:30 PM'],
      evening: ['05:00 PM', '06:00 PM', '06:45 PM']
    },
    languages: ['English', 'Hindi']
  },
  {
    id: 'doc-5',
    name: 'Dr. Sneha Pillai',
    specialty: 'Pediatrician',
    degrees: 'MBBS, DNB (Pediatrics), Fellowship in Neonatology',
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 460,
    consultationFee: 600,
    avatarUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    about: 'Dedicated pediatrician with special focus on newborn care, child immunization, developmental milestones, pediatric respiratory infections, and nutrition.',
    hospital: 'Rainbow Children’s Hospital',
    location: 'Malviya Nagar, New Delhi',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: {
      morning: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'],
      afternoon: ['01:00 PM', '02:00 PM'],
      evening: ['04:00 PM', '05:00 PM', '06:00 PM']
    },
    languages: ['English', 'Hindi', 'Malayalam']
  },
  {
    id: 'doc-6',
    name: 'Dr. Arunav Sen',
    specialty: 'Orthopedic',
    degrees: 'MBBS, MS (Orthopedics), M.Ch (Joint Replacement)',
    experienceYears: 15,
    rating: 4.7,
    reviewCount: 310,
    consultationFee: 850,
    avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    about: 'Orthopedic surgeon managing sports ligament tears, knee arthritis, sciatica, chronic cervical neck pain, bone fractures, and joint mobility issues.',
    hospital: 'Manipal Hospital',
    location: 'Dwarka, New Delhi',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: {
      morning: ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'],
      afternoon: ['02:00 PM', '03:00 PM'],
      evening: ['05:30 PM', '06:30 PM', '07:15 PM']
    },
    languages: ['English', 'Hindi']
  },
  {
    id: 'doc-7',
    name: 'Dr. Kavita Verma',
    specialty: 'Gynecologist',
    degrees: 'MBBS, MS (Obstetrics & Gynecology), DGO',
    experienceYears: 13,
    rating: 4.9,
    reviewCount: 405,
    consultationFee: 750,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    about: 'Empathetic women’s health specialist guiding patients on prenatal care, high-risk pregnancies, PCOS/PCOD hormonal issues, and reproductive wellness.',
    hospital: 'Cloudnine Hospital',
    location: 'Patparganj, New Delhi',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    slots: {
      morning: ['10:00 AM', '10:45 AM', '11:30 AM'],
      afternoon: ['01:30 PM', '02:15 PM', '03:15 PM'],
      evening: ['05:00 PM', '06:00 PM']
    },
    languages: ['English', 'Hindi']
  },
  {
    id: 'doc-8',
    name: 'Dr. Sameer Joshi',
    specialty: 'Psychiatrist',
    degrees: 'MBBS, MD (Psychiatry)',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 198,
    consultationFee: 900,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    about: 'Compassionate mental health expert specializing in clinical anxiety, depression, corporate burnout, sleep insomnia, and cognitive behavioral wellness.',
    hospital: 'Vimhans Nayati Superspeciality',
    location: 'Nehru Nagar, New Delhi',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    slots: {
      morning: ['11:00 AM', '11:45 AM'],
      afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
      evening: ['05:00 PM', '06:00 PM', '07:00 PM']
    },
    languages: ['English', 'Hindi', 'Marathi']
  }
];
