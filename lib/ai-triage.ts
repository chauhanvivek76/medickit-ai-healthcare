import { TriageRecommendation } from './types';

interface MedicalPattern {
  specialty: string;
  keywords: string[];
  urgency: 'Low' | 'Moderate' | 'Urgent';
  summary: string;
  advice: string[];
  suggestedQuestions: string[];
}

const MEDICAL_KNOWLEDGE_BASE: MedicalPattern[] = [
  {
    specialty: 'Cardiologist',
    keywords: [
      'chest pain', 'chest tightness', 'heart', 'palpitation', 'bp', 'blood pressure',
      'shortness of breath', 'cholesterol', 'chhati', 'dil', 'heartbeat', 'breathless'
    ],
    urgency: 'Urgent',
    summary: 'Symptoms indicate potential cardiovascular or hemodynamic involvement that requires evaluation by a cardiologist.',
    advice: [
      'Avoid strenuous physical exertion until evaluated.',
      'If you experience crushing chest pain radiating to left arm/jaw, seek emergency ER care immediately.',
      'Keep track of blood pressure readings if you have a home monitor.'
    ],
    suggestedQuestions: [
      'Do I need an ECG or 2D-Echocardiogram test?',
      'Are these symptoms related to hypertension or arterial blockage?',
      'What immediate lifestyle or dietary adjustments should I adopt?'
    ]
  },
  {
    specialty: 'Dermatologist',
    keywords: [
      'skin', 'rash', 'acne', 'pimple', 'itching', 'allergy', 'hair fall', 'hair loss',
      'eczema', 'psoriasis', 'dandruff', 'khujli', 'fungal', 'scalp', 'boil'
    ],
    urgency: 'Low',
    summary: 'Symptoms relate to dermatological or trichological conditions suitable for specialist assessment and targeted therapy.',
    advice: [
      'Refrain from popping pimples or aggressively scratching itchy skin.',
      'Avoid unprescribed steroid creams or harsh scented soaps.',
      'Maintain gentle hydration with non-comedogenic moisturizers.'
    ],
    suggestedQuestions: [
      'Is this flare-up caused by an allergy, fungal infection, or hormonal imbalance?',
      'What is the recommended daily skincare or haircare regimen for my condition?',
      'Will topical treatments suffice or are oral medications necessary?'
    ]
  },
  {
    specialty: 'Neurologist',
    keywords: [
      'headache', 'migraine', 'dizziness', 'seizure', 'fits', 'numbness', 'tingling',
      'vertigo', 'memory', 'paralysis', 'sir dard', 'chakkar', 'nerve pain', 'tremor'
    ],
    urgency: 'Moderate',
    summary: 'Symptoms involve the central or peripheral nervous system. A neurological evaluation will diagnose root causes of pain or sensorimotor symptoms.',
    advice: [
      'Rest in a quiet, dimly lit room during acute headache or dizziness episodes.',
      'Maintain a log of symptom onset, triggers, and duration.',
      'Stay properly hydrated and avoid excessive caffeine spikes.'
    ],
    suggestedQuestions: [
      'Is my headache a migraine or secondary to another cause?',
      'Do you recommend brain neuroimaging like an MRI or CT scan?',
      'What preventative therapies can reduce recurrence frequency?'
    ]
  },
  {
    specialty: 'Pediatrician',
    keywords: [
      'child', 'baby', 'toddler', 'infant', 'kid', 'vaccination', 'milestone',
      'baccha', 'colic', 'pediatric', 'growth'
    ],
    urgency: 'Moderate',
    summary: 'Patient is a child or infant. A certified pediatrician must supervise pediatric physiology, growth milestones, and dosage adjustments.',
    advice: [
      'Never administer adult over-the-counter medicine to children.',
      'Ensure adequate oral hydration with electrolyte solutions or breastmilk/formula.',
      'Monitor body temperature using an accurate digital thermometer.'
    ],
    suggestedQuestions: [
      'Are my child’s growth milestones and vaccination schedule on track?',
      'What red-flag signs should prompt immediate emergency care?',
      'What dietary interventions support optimal immune development?'
    ]
  },
  {
    specialty: 'Orthopedic',
    keywords: [
      'bone', 'joint', 'knee', 'back pain', 'spine', 'shoulder', 'fracture', 'sprain',
      'arthritis', 'ligament', 'kamar dard', 'ghutna', 'mobility', 'stiffness', 'slip disc'
    ],
    urgency: 'Low',
    summary: 'Symptoms suggest musculoskeletal or joint involvement suitable for clinical examination and postural/radiological assessment.',
    advice: [
      'Apply cold compresses for acute swelling or warm compresses for chronic stiffness.',
      'Avoid heavy lifting or sudden twisting movements.',
      'Maintain neutral ergonomics while sitting or working at desks.'
    ],
    suggestedQuestions: [
      'Do I need an X-ray or MRI to inspect cartilage or ligament health?',
      'Would physical therapy or physiotherapy exercises resolve this?',
      'Are posture correction braces or ergonomic changes helpful?'
    ]
  },
  {
    specialty: 'Gynecologist',
    keywords: [
      'period', 'menstrual', 'pregnancy', 'pcod', 'pcos', 'ovary', 'cramps',
      'vaginal', 'menopause', 'pelvic', 'fertility', 'mahina', 'bleeding'
    ],
    urgency: 'Low',
    summary: 'Symptoms correspond to female reproductive health, hormonal cycles, or obstetric care requiring gynecological consultation.',
    advice: [
      'Track your menstrual cycle dates and note any flow irregularities.',
      'Use a warm heating pad across lower abdomen for temporary cramp relief.',
      'Do not start hormonal supplements without physician supervision.'
    ],
    suggestedQuestions: [
      'Are these cycle symptoms linked to hormonal imbalances like PCOS or thyroid?',
      'Do I need a pelvic ultrasound or blood hormone profiling?',
      'What nutritional supplements support reproductive health?'
    ]
  },
  {
    specialty: 'Psychiatrist',
    keywords: [
      'anxiety', 'depression', 'stress', 'panic', 'insomnia', 'sleep', 'burnout',
      'mood', 'sadness', 'overthinking', 'mental', 'nervous', 'ghabrahat'
    ],
    urgency: 'Low',
    summary: 'Symptoms involve mood regulation, anxiety, or sleep disturbances suitable for compassionate mental health evaluation and coping strategies.',
    advice: [
      'Practice deep diaphragmatic breathing exercises (4-7-8 technique).',
      'Limit late-night screen time to encourage restorative circadian sleep cycles.',
      'Remember seeking psychological support is a courageous sign of strength.'
    ],
    suggestedQuestions: [
      'Is my anxiety situational or an underlying neurochemical condition?',
      'Do you recommend psychotherapy (CBT), medical therapy, or lifestyle adjustments?',
      'How soon can I expect improvements in sleep and mood stability?'
    ]
  }
];

// Fallback General Physician pattern
const GENERAL_PHYSICIAN_PATTERN: MedicalPattern = {
  specialty: 'General Physician',
  keywords: ['fever', 'cold', 'cough', 'bukhar', 'throat', 'fatigue', 'weakness', 'stomach', 'vomit', 'infection'],
  urgency: 'Low',
  summary: 'Your symptoms appear suitable for a comprehensive primary care evaluation by a General Physician to identify infection or systemic causes.',
  advice: [
    'Drink plenty of warm fluids, broths, and stay well hydrated.',
    'Take sufficient physical bed rest and monitor temperature every 6 hours.',
    'Consult promptly if high fever persists for more than 48 hours.'
  ],
  suggestedQuestions: [
    'Is this viral or a bacterial infection needing prescription medication?',
    'Do you recommend routine blood tests like CBC or Dengue/Typhoid screens?',
    'What precautions should I take to prevent transmission to family members?'
  ]
};

export function analyzeSymptoms(query: string): TriageRecommendation {
  const normalized = query.toLowerCase().trim();

  // Score each knowledge pattern
  let bestMatch: MedicalPattern = GENERAL_PHYSICIAN_PATTERN;
  let highestScore = 0;

  for (const pattern of MEDICAL_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length > 5 ? 2 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = pattern;
    }
  }

  // Check if General Physician keywords matched better
  let gpScore = 0;
  for (const kw of GENERAL_PHYSICIAN_PATTERN.keywords) {
    if (normalized.includes(kw)) {
      gpScore += 1;
    }
  }

  if (highestScore === 0) {
    bestMatch = GENERAL_PHYSICIAN_PATTERN;
  } else if (gpScore > highestScore) {
    bestMatch = GENERAL_PHYSICIAN_PATTERN;
  }

  // Check critical red flags for urgency upgrade
  let finalUrgency = bestMatch.urgency;
  if (
    normalized.includes('unconscious') ||
    normalized.includes('cannot breathe') ||
    normalized.includes('severe bleeding') ||
    normalized.includes('collapsed') ||
    (normalized.includes('chest') && normalized.includes('pain'))
  ) {
    finalUrgency = 'Urgent';
  }

  const confidence = Math.min(96, Math.max(78, 80 + highestScore * 4));

  return {
    specialty: bestMatch.specialty,
    urgency: finalUrgency,
    summary: bestMatch.summary,
    advice: bestMatch.advice,
    suggestedQuestions: bestMatch.suggestedQuestions,
    confidence
  };
}
