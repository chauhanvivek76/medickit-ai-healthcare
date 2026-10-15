'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Calendar, User, Stethoscope } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                Medickit<span className="text-blue-600">.ai</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                Healthcare & AI Triage
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link
              href="/"
              className={`transition ${
                pathname === '/' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/book"
              className={`transition ${
                pathname === '/book' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Find Doctors
            </Link>
            <Link
              href="/ai-assistant"
              className={`flex items-center gap-1.5 transition ${
                pathname === '/ai-assistant'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Symptom Checker</span>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-indigo-200">
                AI
              </span>
            </Link>
            <Link
              href="/book"
              className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>My Appointments</span>
            </Link>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/ai-assistant"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3.5 py-2 rounded-xl transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check Symptoms</span>
          </Link>

          <Link
            href="/book"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-xs transition"
          >
            Book Appointment
          </Link>
        </div>
      </nav>
    </header>
  );
}
