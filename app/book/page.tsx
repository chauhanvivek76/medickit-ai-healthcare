'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Doctor, Appointment } from '@/lib/types';
import { SPECIALTIES, INITIAL_DOCTORS } from '@/lib/doctors-data';
import { getStoredAppointments, cancelStoredAppointment } from '@/lib/appointment-store';
import BookingModal from '@/components/BookingModal';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  Building2,
  ShieldCheck,
  CheckCircle,
  XCircle,
  ArrowRight,
  User,
  Phone,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function BookPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'appointments'>('browse');
  const [doctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee-low' | 'fee-high'>('rating');

  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        const matchesSearch =
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSpecialty =
          selectedSpecialty === 'All Specialties' || doc.specialty === selectedSpecialty;

        return matchesSearch && matchesSpecialty;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        if (sortBy === 'fee-low') return a.consultationFee - b.consultationFee;
        if (sortBy === 'fee-high') return b.consultationFee - a.consultationFee;
        return 0;
      });
  }, [doctors, searchQuery, selectedSpecialty, sortBy]);

  const handleStartBooking = (doctor: Doctor) => {
    setSelectedDoctorForBooking(doctor);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment scheduled with ${newAppointment.doctorName}!`);
  };

  const handleCancelAppointment = (id: string, doctorName: string) => {
    if (confirm(`Are you sure you want to cancel your appointment with ${doctorName}?`)) {
      const updated = cancelStoredAppointment(id);
      setAppointments(updated);
      showToast(`Appointment with ${doctorName} has been cancelled.`);
    }
  };

  const activeAppointmentsCount = appointments.filter((a) => a.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-semibold mb-3 border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Medical Specialists
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Find & Book Trusted Doctors
              </h1>
              <p className="mt-2 text-blue-100 max-w-xl text-sm sm:text-base">
                Search verified medical specialists, check available slots, and book video or clinic consultations with instant confirmation.
              </p>
            </div>

            {/* AI Assistant Banner Link */}
            <Link
              href="/ai-assistant"
              className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md px-5 py-3.5 rounded-2xl flex items-center gap-3 transition shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-indigo-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Unsure who to see?</span>
                <span className="text-[11px] text-blue-100 font-medium flex items-center gap-1">
                  Try AI Symptom Triage <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-3 border-b border-blue-500/40 pb-px">
            <button
              type="button"
              onClick={() => setActiveTab('browse')}
              className={`pb-3 px-4 font-semibold text-sm transition border-b-2 flex items-center gap-2 ${
                activeTab === 'browse'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <span>Browse Doctors</span>
              <span className="bg-blue-800/80 text-blue-100 text-xs px-2 py-0.5 rounded-full font-bold">
                {doctors.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`pb-3 px-4 font-semibold text-sm transition border-b-2 flex items-center gap-2 ${
                activeTab === 'appointments'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <span>My Appointments</span>
              {activeAppointmentsCount > 0 && (
                <span className="bg-emerald-400 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                  {activeAppointmentsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* TAB 1: BROWSE DOCTORS */}
        {activeTab === 'browse' && (
          <div>
            {/* Search and Filters Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor by name, specialty, or hospital..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-slate-50/50"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="rating">Sort: Top Rated</option>
                    <option value="experience">Sort: Most Experienced</option>
                    <option value="fee-low">Fee: Low to High</option>
                    <option value="fee-high">Fee: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Specialty Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {SPECIALTIES.map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => setSelectedSpecialty(sp)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                      selectedSpecialty === sp
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctors Count Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Available Specialists ({filteredDoctors.length})
              </h2>
              {selectedSpecialty !== 'All Specialties' && (
                <span className="text-xs text-slate-500">
                  Filtered by <strong className="text-blue-600">{selectedSpecialty}</strong>
                </span>
              )}
            </div>

            {/* Doctor Cards Grid */}
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No doctors found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search query or removing filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('All Specialties');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition shadow-xs hover:shadow-md p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                          <Image
                            src={doc.avatarUrl}
                            alt={doc.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                              {doc.specialty}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                              {doc.rating}
                              <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 mt-1">
                            {doc.name}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {doc.degrees}
                          </p>
                          <p className="text-xs text-slate-600 font-semibold mt-0.5">
                            {doc.experienceYears} Years Overall Experience
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-slate-800">{doc.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{doc.location}</span>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {doc.about}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Consultation Fee</span>
                        <span className="text-xl font-extrabold text-slate-900">
                          ₹{doc.consultationFee}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleStartBooking(doc)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs hover:shadow transition flex items-center gap-1.5"
                      >
                        <span>Book Appointment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">My Appointments</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  View and manage your scheduled doctor consultations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('browse')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                + Book Another Doctor
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
                <Calendar className="w-14 h-14 text-blue-500/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No appointments scheduled yet</h3>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                  You haven’t booked any doctor consultations yet. Browse verified specialists and schedule an appointment.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('browse')}
                  className="mt-5 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow"
                >
                  Find a Doctor Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`bg-white rounded-2xl border p-5 sm:p-6 transition shadow-xs ${
                      apt.status === 'Cancelled'
                        ? 'border-slate-200 opacity-60'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={apt.doctorAvatar}
                            alt={apt.doctorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">
                              {apt.doctorName}
                            </h4>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                              {apt.doctorSpecialty}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {apt.doctorHospital}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:text-right">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            ID: {apt.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 ${
                              apt.status === 'Confirmed'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : apt.status === 'Cancelled'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {apt.status === 'Confirmed' && <CheckCircle className="w-3 h-3" />}
                            {apt.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Date & Time</span>
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="font-medium text-slate-600 mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.timeSlot}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-0.5">Mode</span>
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          {apt.consultationType === 'Video Call' ? (
                            <Video className="w-3.5 h-3.5 text-indigo-600" />
                          ) : (
                            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          <span>{apt.consultationType}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">
                          Fee: ₹{apt.fee}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-0.5">Patient</span>
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.patientName}</span>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{apt.patientPhone}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-0.5">Symptoms / Notes</span>
                        <p className="text-slate-700 italic truncate" title={apt.symptoms}>
                          &quot;{apt.symptoms}&quot;
                        </p>
                      </div>
                    </div>

                    {apt.status === 'Confirmed' && (
                      <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleCancelAppointment(apt.id, apt.doctorName)}
                          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <BookingModal
        doctor={selectedDoctorForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
