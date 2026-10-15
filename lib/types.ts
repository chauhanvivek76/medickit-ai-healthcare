export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  avatarUrl: string;
  about: string;
  hospital: string;
  location: string;
  availableDays: string[];
  slots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  languages: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorHospital: string;
  doctorAvatar: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  consultationType: 'Video Call' | 'In-Clinic';
  date: string;
  timeSlot: string;
  symptoms: string;
  fee: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface TriageRecommendation {
  specialty: string;
  urgency: 'Low' | 'Moderate' | 'Urgent';
  summary: string;
  advice: string[];
  suggestedQuestions: string[];
  confidence: number;
}
