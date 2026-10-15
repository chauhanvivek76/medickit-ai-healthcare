'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { analyzeSymptoms } from '@/lib/ai-triage';
import { TriageRecommendation, Doctor } from '@/lib/types';
import { INITIAL_DOCTORS } from '@/lib/doctors-data';
import BookingModal from '@/components/BookingModal';
import {
  Sparkles,
  Bot,
  Send,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Star,
  RefreshCw,
  Clock,
  HeartPulse
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'Severe throbbing headache with nausea and light sensitivity',
  'Chest heaviness and shortness of breath while climbing stairs',
  'Red itchy skin rash across cheeks and sudden hair loss',
  'My 2-year-old child has high fever and constant coughing',
  'Sharp knee pain and morning stiffness in joints',
  'Constant anxiety, panic heart racing, and severe insomnia'
];

export default function AIAssistantPage() {
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TriageRecommendation | null>(null);

  // Booking Modal
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnalyze = (queryToAnalyze?: string) => {
    const text = queryToAnalyze || symptomInput;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate smart AI inference delay
    setTimeout(() => {
      const res = analyzeSymptoms(text);
      setResult(res);
      setIsAnalyzing(false);
    }, 750);
  };

  const matchingDoctors = result
    ? INITIAL_DOCTORS.filter((d) => d.specialty === result.specialty)
    : [];

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-semibold mb-4 border border-white/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>AI-Powered Medical Symptom Triage</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Health Assistant & Specialist Matcher
          </h1>
          <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Describe what you are feeling in natural language. Our clinical triage engine will assess urgency, provide precautions, and match you with the right verified specialist.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 -mt-6">
        {/* Input Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8">
          <label className="text-sm font-bold text-slate-800 block mb-2 flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-600" />
            <span>Describe your symptoms or health concern</span>
          </label>

          <div className="relative">
            <textarea
              rows={3}
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="e.g., I have been experiencing a persistent dull headache with dizziness for 3 days, especially when looking at screens..."
              className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition resize-none"
            />
          </div>

          {/* Quick Prompt Chips */}
          <div className="mt-3">
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              Or try common scenarios:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setSymptomInput(prompt);
                    handleAnalyze(prompt);
                  }}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-3 py-1.5 rounded-full transition border border-slate-200/60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={isAnalyzing || !symptomInput.trim()}
              onClick={() => handleAnalyze()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 text-sm"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Symptoms...</span>
                </>
              ) : (
                <>
                  <span>Analyze & Recommend Doctor</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Triage Results Card */}
        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 overflow-hidden relative">
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${
                  result.urgency === 'Urgent'
                    ? 'bg-red-500'
                    : result.urgency === 'Moderate'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />

              {/* Triage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Recommended Specialist
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                    <HeartPulse className="w-6 h-6 text-blue-600" />
                    <span>{result.specialty}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {/* Urgency Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      result.urgency === 'Urgent'
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : result.urgency === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {result.urgency === 'Urgent' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {result.urgency === 'Moderate' && <Clock className="w-3.5 h-3.5" />}
                    {result.urgency === 'Low' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{result.urgency} Urgency</span>
                  </span>

                  {/* Confidence */}
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-full">
                    {result.confidence}% Match
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="py-5 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Clinical Assessment
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {result.summary}
                </p>
              </div>

              {/* Advice Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-blue-600" />
                    <span>Important Precautions & First-Aid</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {result.advice.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    <span>Questions to Ask Your Doctor</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {result.suggestedQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">?</span>
                        <span className="italic">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Medical Disclaimer */}
              <div className="pt-4 text-[11px] text-slate-400 flex items-center gap-2">
                <span>ℹ️</span>
                <span>
                  <strong>Clinical Notice:</strong> This AI triage tool provides preliminary triage advice. If you face acute, life-threatening symptoms, call emergency services immediately.
                </span>
              </div>
            </div>

            {/* Matched Verified Doctors */}
            {matchingDoctors.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Verified {result.specialty} Specialists Available
                  </h3>
                  <Link
                    href={`/book`}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    View All Doctors
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-start gap-4 hover:border-blue-300 transition"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                        <Image
                          src={doc.avatarUrl}
                          alt={doc.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                          <span className="flex items-center gap-0.5 text-xs font-bold text-slate-700">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            {doc.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{doc.degrees}</p>
                        <p className="text-xs text-slate-600 font-medium mt-1">
                          {doc.hospital}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">
                            ₹{doc.consultationFee}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDoctor(doc);
                              setIsModalOpen(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xs transition flex items-center gap-1"
                          >
                            <span>Book Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookingSuccess={() => {}}
      />
    </div>
  );
}
