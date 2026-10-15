'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Doctor, Appointment } from '@/lib/types';
import { saveStoredAppointment } from '@/lib/appointment-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Clock,
  Video,
  Building2,
  CheckCircle2,
  User,
  Phone,
  Mail,
  FileText,
  Star,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingModal({
  doctor,
  isOpen,
  onClose,
  onBookingSuccess,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [consultationType, setConsultationType] = useState<'Video Call' | 'In-Clinic'>('Video Call');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const upcomingDays = useMemo(() => {
    const days: { dateStr: string; displayDay: string; displayDate: string; isAvailable: boolean }[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      const displayDay = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dateStr = d.toISOString().split('T')[0];
      
      const isAvailable = doctor ? doctor.availableDays.includes(dayName) : true;
      days.push({ dateStr, displayDay, displayDate, isAvailable });
    }
    return days;
  }, [doctor]);

  useEffect(() => {
    if (upcomingDays.length > 0 && !selectedDate) {
      const firstAvailable = upcomingDays.find(d => d.isAvailable);
      if (firstAvailable) {
        setSelectedDate(firstAvailable.dateStr);
      }
    }
  }, [upcomingDays, selectedDate]);

  if (!doctor) return null;

  const handleProceedToDetails = () => {
    if (!selectedDate) {
      setErrorMsg('Please choose an available appointment date.');
      return;
    }
    if (!selectedSlot) {
      setErrorMsg('Please select a time slot.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const newAppointment: Appointment = {
      id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorHospital: doctor.hospital,
      doctorAvatar: doctor.avatarUrl,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || 'patient@example.com',
      consultationType,
      date: selectedDate,
      timeSlot: selectedSlot,
      symptoms: symptoms.trim() || 'General Consultation',
      fee: doctor.consultationFee,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    saveStoredAppointment(newAppointment);
    setConfirmedAppointment(newAppointment);
    setStep(3);
    onBookingSuccess(newAppointment);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedSlot('');
    setErrorMsg('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 sm:rounded-2xl">
        {/* Doctor Summary Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 sm:p-7 rounded-t-2xl">
          <DialogHeader className="text-left">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/50 shrink-0 shadow">
                <Image
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-100 text-xs font-medium mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Specialist
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                  {doctor.name}
                </DialogTitle>
                <DialogDescription className="text-blue-100 text-sm mt-0.5">
                  {doctor.specialty} • {doctor.degrees}
                </DialogDescription>
                <div className="flex items-center gap-4 mt-2 text-xs text-blue-100 font-medium">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                    {doctor.rating} ({doctor.reviewCount} reviews)
                  </span>
                  <span>{doctor.experienceYears}+ Yrs Experience</span>
                  <span className="text-white font-bold bg-white/20 px-2 py-0.5 rounded">
                    ₹{doctor.consultationFee} Fee
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: SELECT MODE, DATE, & SLOT */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-800 block mb-2">
                  1. Choose Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('Video Call')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition ${
                      consultationType === 'Video Call'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg ${consultationType === 'Video Call' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Video Call</div>
                      <div className="text-xs text-slate-500">Online Consultation</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('In-Clinic')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition ${
                      consultationType === 'In-Clinic'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg ${consultationType === 'In-Clinic' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">In-Clinic Visit</div>
                      <div className="text-xs text-slate-500">{doctor.hospital}</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-800 flex items-center justify-between mb-2">
                  <span>2. Select Appointment Date</span>
                  <span className="text-xs text-slate-500 font-normal">Next 7 days</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {upcomingDays.map((d) => (
                    <button
                      key={d.dateStr}
                      type="button"
                      disabled={!d.isAvailable}
                      onClick={() => {
                        setSelectedDate(d.dateStr);
                        setSelectedSlot('');
                      }}
                      className={`p-2.5 rounded-xl text-center border text-xs transition flex flex-col items-center justify-center ${
                        !d.isAvailable
                          ? 'opacity-40 bg-slate-50 border-slate-200 cursor-not-allowed text-slate-400'
                          : selectedDate === d.dateStr
                          ? 'border-blue-600 bg-blue-600 text-white font-semibold shadow'
                          : 'border-slate-200 hover:border-blue-300 text-slate-800 bg-white'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{d.displayDay}</span>
                      <span className="text-sm font-bold mt-0.5">{d.displayDate}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>3. Select Preferred Time Slot</span>
                </label>

                <div className="mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Morning
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {doctor.slots.morning.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                          selectedSlot === slot
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-600'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {doctor.slots.afternoon.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Afternoon
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {doctor.slots.afternoon.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                            selectedSlot === slot
                              ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-600'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {doctor.slots.evening.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Evening
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {doctor.slots.evening.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                            selectedSlot === slot
                              ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-600'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProceedToDetails}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow transition flex items-center justify-center gap-2"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PATIENT DETAILS */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Selected Schedule:</span>
                  <div className="font-semibold text-slate-800 text-sm mt-0.5">
                    {selectedDate} at {selectedSlot} ({consultationType})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:underline font-medium text-xs"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> Reason for Visit / Symptoms
                </label>
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe symptoms briefly (e.g., chest heaviness, mild fever for 2 days, skin rash...)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-4">
                  <span>Total Consultation Fee:</span>
                  <span className="text-lg text-blue-600 font-bold">₹{doctor.consultationFee}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-sm transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow transition"
                  >
                    Confirm & Book Now
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 3 && confirmedAppointment && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your appointment has been successfully scheduled.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-mono font-bold text-slate-900">{confirmedAppointment.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-semibold text-slate-900">{confirmedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-semibold text-blue-700">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Mode:</span>
                  <span className="font-semibold text-slate-900">{confirmedAppointment.consultationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-900">{confirmedAppointment.patientName}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition shadow"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
