import { Appointment, Doctor } from './types';
import { INITIAL_DOCTORS } from './doctors-data';

const STORAGE_KEY = 'medickit_appointments';

export function getDoctors(): Doctor[] {
  return INITIAL_DOCTORS;
}

export function getDoctorById(id: string): Doctor | undefined {
  return INITIAL_DOCTORS.find((doc) => doc.id === id);
}

export function getStoredAppointments(): Appointment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load appointments from localStorage', err);
    return [];
  }
}

export function saveStoredAppointment(appointment: Appointment): Appointment[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredAppointments();
    const updated = [appointment, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save appointment to localStorage', err);
    return [];
  }
}

export function cancelStoredAppointment(id: string): Appointment[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredAppointments();
    const updated = existing.map((apt) =>
      apt.id === id ? { ...apt, status: 'Cancelled' as const } : apt
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to cancel appointment', err);
    return [];
  }
}
