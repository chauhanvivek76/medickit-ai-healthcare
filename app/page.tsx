'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Video,
  Clock,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Building2,
  Bot,
  HeartPulse,
  Activity,
  Smile,
  Brain,
  Baby,
  Stethoscope
} from 'lucide-react';
import { INITIAL_DOCTORS } from '@/lib/doctors-data';

const SPECIALTY_LIST = [
  { name: 'Cardiology', icon: HeartPulse, count: '14 Specialists', color: 'bg-red-50 text-red-600' },
  { name: 'Dermatology', icon: Smile, count: '20 Specialists', color: 'bg-amber-50 text-amber-600' },
  { name: 'General Medicine', icon: Stethoscope, count: '35 Specialists', color: 'bg-blue-50 text-blue-600' },
  { name: 'Neurology', icon: Brain, count: '12 Specialists', color: 'bg-purple-50 text-purple-600' },
  { name: 'Pediatrics', icon: Baby, count: '18 Specialists', color: 'bg-pink-50 text-pink-600' },
  { name: 'Orthopedics', icon: Activity, count: '16 Specialists', color: 'bg-emerald-50 text-emerald-600' },
];

export default function Home() {
  const featuredDoctors = INITIAL_DOCTORS.slice(0, 4);

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-6 border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Next-Gen Healthcare with AI Clinical Triage</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Book trusted doctors, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                guided by smart AI.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Find top verified specialists, book instant video or clinic visits, and use our clinical AI assistant to assess symptoms and find the exact care you need.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/book"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Find Doctors & Book</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/ai-assistant"
                className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold px-6 py-3.5 rounded-2xl transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Symptom Triage</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 max-w-lg">
              <div>
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Verified Doctors</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">Instant</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Slot Confirmation</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">24/7</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">AI Triage Assistance</div>
              </div>
            </div>
          </div>

          {/* Right Banner / Interactive AI Card Preview */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900">
              <Image
                src="/banner2.png"
                alt="Healthcare Consultation Banner"
                width={800}
                height={550}
                className="w-full h-auto object-cover opacity-90 hover:scale-102 transition duration-500"
                priority
              />

              {/* Floating AI Callout Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-4">
                <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-900 block">
                    AI Clinical Symptom Matcher
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Unsure which doctor to see? Get instant triage advice.
                  </span>
                </div>
                <Link
                  href="/ai-assistant"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition shrink-0"
                >
                  Try AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI SPOTLIGHT BANNER */}
      <section className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white py-14 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Smart Medical Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Feeling unwell? Let AI guide your consultation.
            </h2>
            <p className="mt-2 text-indigo-100 text-sm leading-relaxed">
              Simply type your symptoms in plain language. The AI evaluates severity, advises precautions, and matches you with verified specialists who can treat your condition.
            </p>
          </div>

          <Link
            href="/ai-assistant"
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 shrink-0 text-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Launch Symptom Checker</span>
          </Link>
        </div>
      </section>

      {/* SPECIALTIES EXPLORER */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Browse by Medical Specialty
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Select your required field of medicine to browse availability and consult verified doctors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPECIALTY_LIST.map((sp) => {
              const Icon = sp.icon;
              return (
                <Link
                  key={sp.name}
                  href={`/book`}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition text-center group flex flex-col items-center justify-center"
                >
                  <div className={`w-12 h-12 rounded-2xl ${sp.color} flex items-center justify-center mb-3 group-hover:scale-110 transition duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">
                    {sp.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {sp.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Top Medical Experts
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Featured Verified Specialists
              </h2>
            </div>
            <Link
              href="/book"
              className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View All 8+ Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-100">
                    <Image
                      src={doc.avatarUrl}
                      alt={doc.name}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 mb-1.5">
                    {doc.specialty}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.degrees}</p>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {doc.hospital}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fee</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{doc.consultationFee}
                    </span>
                  </div>
                  <Link
                    href="/book"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Effortless Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How Medickit Works in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Describe or Search</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Search by doctor name or use our AI Symptom Checker to automatically match the best medical specialty.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Choose Mode & Time</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Select between convenient Video Consultation or In-Clinic hospital visit, and pick a slot that fits your day.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Instant Confirmation</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Receive instant booking details with your unique Booking ID and manage appointments right from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
