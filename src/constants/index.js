// ─── Brand & Design Tokens ──────────────────────────────────────────────────
export const BRAND = {
  name: "ClinicFlow",
  tagline: "The Intelligent Dental Platform",
  email: "hello@clinicflow.io",
  phone: "+1 (888) 555-FLOW",
  address: "123 Health Innovation Dr, San Francisco, CA 94105",
};

export const COLORS = {
  primary: "#0ea5e9",       // Sky blue — medical precision
  primaryDark: "#0284c7",
  primaryLight: "#38bdf8",
  secondary: "#06b6d4",     // Cyan — fresh dental feel
  accent: "#f0f9ff",        // Icy white
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  purple: "#8b5cf6",
  bgDark: "#f8fafc",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  border: "#e2e8f0",
  white: "#ffffff",
};

export const AVATAR_COLORS = [
  "#0ea5e9","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#3b82f6"
];

// ─── Chart Data ──────────────────────────────────────────────────────────────
export const APPT_DATA = [
  { month: "Jan", appts: 142, revenue: 18400 },
  { month: "Feb", appts: 168, revenue: 22100 },
  { month: "Mar", appts: 155, revenue: 20300 },
  { month: "Apr", appts: 210, revenue: 28500 },
  { month: "May", appts: 195, revenue: 25800 },
  { month: "Jun", appts: 238, revenue: 32100 },
  { month: "Jul", appts: 256, revenue: 34600 },
  { month: "Aug", appts: 271, revenue: 36200 },
];

export const WEEK_DATA = [
  { day: "Mon", count: 24 }, { day: "Tue", count: 31 },
  { day: "Wed", count: 18 }, { day: "Thu", count: 38 },
  { day: "Fri", count: 42 }, { day: "Sat", count: 29 }, { day: "Sun", count: 12 },
];

export const PIE_DATA = [
  { name: "Dental", value: 45 },
  { name: "Orthodontics", value: 30 },
  { name: "Cosmetic", value: 25 },
];

export const PIE_COLORS = ["#0ea5e9", "#8b5cf6", "#06b6d4"];

// ─── Application Data ────────────────────────────────────────────────────────
export const PATIENTS = [
  { id: "P-1042", name: "Sarah Mitchell", age: 34, type: "Dental", next: "Today, 2:30 PM", status: "confirmed", avatar: "SM", visits: 8 },
  { id: "P-1041", name: "James Rodriguez", age: 28, type: "Orthodontics", next: "Tomorrow, 10:00 AM", status: "pending", avatar: "JR", visits: 3 },
  { id: "P-1040", name: "Emily Chen", age: 45, type: "Cosmetic", next: "Dec 18, 3:00 PM", status: "confirmed", avatar: "EC", visits: 12 },
  { id: "P-1039", name: "Marcus Thompson", age: 52, type: "Dental", next: "Dec 20, 9:00 AM", status: "completed", avatar: "MT", visits: 6 },
  { id: "P-1038", name: "Aisha Patel", age: 31, type: "Cosmetic", next: "Dec 22, 1:00 PM", status: "confirmed", avatar: "AP", visits: 4 },
  { id: "P-1037", name: "Oliver Bennett", age: 67, type: "Orthodontics", next: "Dec 23, 11:00 AM", status: "pending", avatar: "OB", visits: 18 },
];

export const TODAY_APPTS = [
  { time: "09:00", name: "Sarah Mitchell", type: "Teeth Whitening", duration: 45, status: "completed" },
  { time: "10:00", name: "James Rodriguez", type: "Orthodontic Check", duration: 30, status: "completed" },
  { time: "11:30", name: "Emily Chen", type: "Dental Cleaning", duration: 30, status: "in-progress" },
  { time: "14:30", name: "Marcus Thompson", type: "Root Canal", duration: 90, status: "upcoming" },
  { time: "16:00", name: "Aisha Patel", type: "Veneers Consultation", duration: 60, status: "upcoming" },
];

export const FEATURES = [
  {
    icon: "Brain",
    title: "AI-Powered Scheduling",
    desc: "Intelligent appointment optimization that reduces no-shows by 68% using predictive analytics and smart reminders.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
  },
  {
    icon: "HeartPulse",
    title: "Patient Health Records",
    desc: "Comprehensive digital dental records with treatment history, X-rays, and prescriptions — all HIPAA compliant.",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
  },
  {
    icon: "TrendingUp",
    title: "Revenue Analytics",
    desc: "Real-time financial insights, revenue forecasting, and automated billing to maximize practice profitability.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
  {
    icon: "Building2",
    title: "Multi-Branch Management",
    desc: "Centrally manage multiple clinic locations, staff scheduling, and supply inventory from one unified dashboard.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    icon: "Zap",
    title: "Automated Workflows",
    desc: "Smart automation for follow-ups, prescription renewals, recalls, and insurance claims processing.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    desc: "Bank-grade encryption, HIPAA & GDPR compliance, role-based access, and full audit trails built-in.",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
  },
];

export const TESTIMONIALS = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Dentist, SmilePro Dental",
    stars: 5,
    text: "ClinicFlow transformed how we manage our 3 branches. Patient no-shows dropped 60% and revenue increased 40% in just 4 months.",
    avatar: "SC",
    specialty: "Dental",
    color: "#0ea5e9",
  },
  {
    name: "Dr. Marcus Webb",
    role: "Orthodontist, AlignCare Clinics",
    stars: 5,
    text: "The AI scheduling alone paid for itself in the first month. Our chairs are booked solid and clients love the automated reminders.",
    avatar: "MW",
    specialty: "Orthodontics",
    color: "#8b5cf6",
  },
  {
    name: "Dr. Ahmed Hassan",
    role: "Director, PrimeDental Group",
    stars: 5,
    text: "Finally a platform that understands private healthcare. The analytics dashboard is incredible — we make data-driven decisions daily.",
    avatar: "AH",
    specialty: "Cosmetic",
    color: "#06b6d4",
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 79,
    period: "mo",
    desc: "Perfect for solo practices and new clinics",
    color: "#0ea5e9",
    features: [
      "Up to 200 appointments/mo",
      "1 practitioner",
      "Patient records & history",
      "Basic analytics",
      "Email & SMS reminders",
      "HIPAA compliance",
      "Email support",
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Professional",
    price: 199,
    period: "mo",
    desc: "The complete solution for growing clinics",
    color: "#8b5cf6",
    features: [
      "Unlimited appointments",
      "Up to 10 practitioners",
      "Advanced AI scheduling",
      "Revenue analytics dashboard",
      "Multi-channel reminders",
      "Automated billing",
      "Insurance claim processing",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For multi-branch dental groups",
    color: "#06b6d4",
    features: [
      "Everything in Professional",
      "Unlimited practitioners",
      "Multi-branch management",
      "Custom integrations & API",
      "Dedicated success manager",
      "SLA guarantees",
      "On-premise deployment option",
      "Advanced security controls",
      "White-label options",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export const STATS = [
  { val: 5200, suffix: "+", label: "Clinics Worldwide" },
  { val: 2.4, suffix: "M+", label: "Appointments Managed", isDecimal: true },
  { val: 99, suffix: ".9%", label: "Uptime SLA" },
  { val: 48, suffix: " countries", label: "Global Reach" },
];

export const FAQS = [
  ["Is there a free trial?", "Yes — all plans come with a 14-day free trial. No credit card needed to start."],
  ["Can I change plans anytime?", "Absolutely. Upgrade or downgrade at any time, and we'll prorate the difference."],
  ["Is my data secure?", "We're HIPAA, GDPR, and SOC 2 compliant. All data is encrypted at rest and in transit."],
  ["Do you offer onboarding support?", "Every plan includes guided onboarding. Professional and Enterprise get dedicated support."],
  ["Can I import existing patient data?", "Yes — we support imports from most major clinic software including CSV, HL7, and FHIR formats."],
  ["What payment methods do you accept?", "We accept all major credit cards, ACH bank transfers, and invoicing for Enterprise."],
];
