import React from 'react';
import Link from 'next/link';
import { Stethoscope, Heart, ShieldCheck, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                Medickit<span className="text-blue-500">.ai</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering healthcare access with intelligent AI symptom triage, verified specialists, and seamless online consultation booking.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Medical Practitioners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/book" className="hover:text-white transition">Find Specialists</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-white transition">AI Symptom Checker</Link></li>
              <li><Link href="/book" className="hover:text-white transition">Manage Appointments</Link></li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Top Specialties</h4>
            <ul className="space-y-2">
              <li><Link href="/book" className="hover:text-white transition">Cardiology</Link></li>
              <li><Link href="/book" className="hover:text-white transition">Dermatology</Link></li>
              <li><Link href="/book" className="hover:text-white transition">General Medicine</Link></li>
              <li><Link href="/book" className="hover:text-white transition">Pediatrics & Child Care</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Support & Clinical Help</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+91 1800-MEDICKIT (24x7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>care@medickit.ai</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2">
                In case of emergency, immediately contact your nearest hospital or emergency services (112/108).
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Medickit.ai • Built for production healthcare access.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for better digital health</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
