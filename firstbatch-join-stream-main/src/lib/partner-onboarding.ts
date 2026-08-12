export type PartnerTypeId =
  | "food-technologist"
  | "food-consultant"
  | "contract-manufacturer"
  | "ingredient-supplier"
  | "lab"
  | "packaging"
  | "other";

export const PARTNER_TYPES: {
  id: PartnerTypeId;
  label: string;
  hint: string;
}[] = [
  {
    id: "food-technologist",
    label: "Food Technologist / R&D / NPD",
    hint: "Formulation & product development",
  },
  {
    id: "food-consultant",
    label: "Food Consultant",
    hint: "Advisory & food business support",
  },
  {
    id: "contract-manufacturer",
    label: "Contract Manufacturer",
    hint: "Manufacturing & production",
  },
  {
    id: "ingredient-supplier",
    label: "Ingredient Supplier",
    hint: "Ingredients & raw materials",
  },
  {
    id: "lab",
    label: "Testing / Research Lab",
    hint: "Testing & research",
  },
  {
    id: "packaging",
    label: "Packaging Partner",
    hint: "Packaging solutions",
  },
  {
    id: "other",
    label: "Other",
    hint: "Tell us more",
  },
];

export type Track =
  | "expert"
  | "consultant"
  | "manufacturer"
  | "supplier"
  | "lab"
  | "packaging"
  | "other";

export function trackFor(type: PartnerTypeId | ""): Track {
  if (type === "food-technologist") return "expert";
  if (type === "food-consultant") return "consultant";
  if (type === "contract-manufacturer") return "manufacturer";
  if (type === "ingredient-supplier") return "supplier";
  if (type === "lab") return "lab";
  if (type === "packaging") return "packaging";
  return "other";
}

export const COUNTRY_CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "AE +971" },
  { code: "+65", label: "SG +65" },
  { code: "+61", label: "AU +61" },
  { code: "+49", label: "DE +49" },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const EXPERIENCE_LEVELS = [
  "0–2 years",
  "3–5 years",
  "6–10 years",
  "11–15 years",
  "15+ years",
];

export const AVAILABILITY_OPTIONS = [
  "Working full time, open to freelance/part time project",
  "Working as an independent consultant/freelancer",
];

/* Partner 1 — Food Technologist / R&D / NPD */

export const FOOD_TECH_EXPERTISE = [
  "Product Formulation",
  "Ingredient Selection",
  "Sensory Evaluation",
  "Shelf-Life Improvement",
  "Process Optimization",
  "Scale-Up & Commercialization",
  "Cost Optimization",
  "Regulatory / FSSAI",
  "Quality Assurance & Food Safety",
  "Contract Manufacturer identification",
  "Raw Material/packaging vendor identification",
  "Other",
];

export const FOOD_TECH_FOOD_CATEGORIES = [
  "Beverages (incl. alcoholic)",
  "Dairy & alternatives",
  "Bakery & cereals",
  "Confectionery",
  "Snacks",
  "Meat, poultry & seafood",
  "Plant-based & alternative proteins",
  "Ready meals & chilled prepared",
  "Sauces, soups & condiments",
  "Frozen",
  "Ambient & canned",
  "Functional/ Nutraceuticals/Supplements",
  "Infant & specialist nutrition",
  "Ingredients & flavours",
];

export const SCALE_UP_EXPERIENCE = [
  "Lab formulation only",
  "Pilot scale",
  "Commercial production",
];

/* Partner 2 — Food Consultant */

export const FOOD_CONSULTANT_EXPERTISE = [
  "Category & Market Assessment",
  "Consumer & Channel Research",
  "Product Strategy, Development & Portfolio Planning",
  "Ingredient/Packaging Supplier & Manufacturing Partner Selection",
  "Cost & Margin Optimization",
  "Process, Operations & Scale-Up",
  "Quality & Food Safety Advisory",
  "Regulatory, Licensing & Compliance (incl. FSSAI)",
  "Brand Strategy, Architecture & Identity",
  "Agency Selection & Management",
  "Go-to-Market Strategy & Execution",
  "Marketing Strategy & Budget Planning",
  "Organisation Design & Leadership Hiring",
  "Other",
];

/* Partner 3 — Contract Manufacturer */

export const MANUFACTURER_SERVICES = [
  "OEM / Contract Manufacturing",
  "Private Label",
  "White Label",
  "Co-Packing / Co-Manufacturing",
  "R&D / Formulation Support",
];

export const MANUFACTURER_CERTIFICATIONS = [
  "FSSAI Central License",
  "GMP",
  "HACCP",
  "ISO 22000",
];

/* Partner 4 — Ingredient Supplier */

export const INGREDIENT_CERTIFICATIONS = [
  "ISO 9001",
  "ISO 22000",
  "ISO 14001",
  "FSSAI",
  "FSSC",
  "BRCGS",
  "IFS",
  "Organic",
  "Halal",
  "Kosher",
];

export const SUPPLIER_REGIONS = [
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
  "Pan India",
  "Export",
];

/* Partner 5 — Testing / Research Lab */

export const TESTING_SERVICES = [
  "Shelf-Life Testing",
  "Nutritional Testing",
  "Microbiological Testing",
  "Chemical Testing",
  "Sensory Testing",
  "Stability Testing",
  "Allergen Testing",
];

export const LAB_ACCREDITATIONS = [
  "NABL",
  "FSSAI Notified",
  "ISO 17025",
  "GLP",
];

/* Partner 6 — Packaging Partner */

export const PACKAGING_TYPES = [
  "Flow Wrap",
  "Pouches",
  "Cartons",
  "Sleeves",
  "Jars",
  "Bottles",
  "Shrink / Secondary",
];

export const PACKAGING_MATERIALS = [
  "Laminates",
  "Paper / Kraft",
  "Compostable",
  "Recyclable Mono-material",
  "Aluminium Foil",
  "Glass",
  "PET",
];

/* MOQ — Partners 3, 4 and 6 */

export const MOQ_UNITS = [
  "Unit & Kg",
  "Flexible + Case by Case",
  "Custom",
];

export type BasicDetails = {
  partnerType: PartnerTypeId | "";
  fullName: string;
  entity: "independent" | "company" | "";
  companyName: string;
  countryCode: string;
  phone: string;
  email: string;
  linkedin: string;
  city: string;
  state: string;
  qual: Record<string, string | string[]>;
  joinCommunity: boolean;
};

export type PartnerRecord = {
  partnerId: string;
  basics: BasicDetails;
  profile: Record<string, unknown>;
  basicFormCompleted: boolean;
  detailedFormStarted: boolean;
  detailedFormCompleted: boolean;
  status:
    | "Partner Details Completed"
    | "Profile In Progress"
    | "Profile Completed";
  createdAt: string;
  updatedAt: string;
};

export const EMPTY_BASICS: BasicDetails = {
  partnerType: "",
  fullName: "",
  entity: "",
  companyName: "",
  countryCode: "+91",
  phone: "",
  email: "",
  linkedin: "",
  city: "",
  state: "",
  qual: {},
  joinCommunity: true,
};

const STORAGE_KEY = "fb_partner_record";

export function makePartnerId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `FB-P-${new Date().getFullYear()}-${n}`;
}

export function loadRecord(): PartnerRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PartnerRecord) : null;
  } catch {
    return null;
  }
}

export function saveRecord(record: PartnerRecord) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Local storage unavailable.
  }
}

export function clearRecord() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // No action needed.
  }
}