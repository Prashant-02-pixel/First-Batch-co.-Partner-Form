export type PartnerTypeId =
  | "food-technologist"
  | "consultant"
  | "contract-manufacturer"
  | "ingredient-supplier"
  | "lab"
  | "packaging"
  | "other";

export const PARTNER_TYPES: { id: PartnerTypeId; label: string; hint: string }[] = [
  {
    id: "food-technologist",
    label: "Food Technologist / R&D / NPD",
    hint: "Formulation & product development",
  },
  { id: "consultant", label: "Food Consultant", hint: "Advisory & strategy" },
  { id: "contract-manufacturer", label: "Contract Manufacturer", hint: "Lines & capacity" },
  { id: "ingredient-supplier", label: "Ingredient Supplier", hint: "Raw materials" },
  { id: "lab", label: "Testing / Research Lab", hint: "Analysis & compliance" },
  { id: "packaging", label: "Packaging Partner", hint: "Materials & printing" },
  { id: "other", label: "Other", hint: "Tell us more" },
];

export const EXPERT_TRACK: PartnerTypeId[] = ["food-technologist"];

export type Track = "expert" | "consultant" | "manufacturer" | "supplier" | "lab" | "packaging" | "other";

export function trackFor(type: PartnerTypeId | ""): Track {
  if (!type) return "other";
  if (EXPERT_TRACK.includes(type)) return "expert";
  if (type === "consultant") return "consultant";
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
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Outside India",
];

export const EXPERTISE = [
  "Product Formulation",
  "New Product Development",
  "Recipe Development",
  "Ingredient Selection",
  "Sensory Evaluation",
  "Shelf-Life Improvement",
  "Process Optimization",
  "Scale-Up",
  "Cost Optimization",
  "Regulatory / FSSAI",
  "Quality",
  "Packaging Development",
];

export const FOOD_CATEGORIES = [
  "Nutrition Bars",
  "Protein Bars",
  "Fiber Bars",
  "Energy Bars",
  "Chocolate",
  "Bakery",
  "Snacks",
  "Beverages",
  "Dairy",
  "Plant-Based Foods",
  "Functional Foods",
  "Nutraceutical Foods",
  "Other",
];

export const MANUFACTURING_PRODUCTS = [
  "Fiber Bars",
  "Protein Bars",
  "Energy Bars",
  "Nutrition Bars",
  "Granola Bars",
  "Date Bars",
  "Nut Bars",
  "Chocolate Bars",
  "Chocolate-Coated Bars",
  "Functional Foods",
  "Other",
];

export const CERTIFICATIONS = ["FSSAI", "ISO", "HACCP", "GMP", "BRC", "Organic", "Other"];

export const MOQ_UNITS = ["Bars", "Pieces", "Packs", "Boxes", "Kg", "Units", "Other"];

export const WORK_TYPES = ["Freelance", "Firm", "In-house"];

export const MANUFACTURER_CATEGORIES = [
  "Fiber Bars",
  "Protein Bars",
  "Energy Bars",
  "Nutrition Bars",
  "Granola Bars",
  "Date Bars",
  "Nut Bars",
  "Chocolate Bars",
  "Chocolate-Coated Bars",
  "Functional Foods",
  "Healthy Snacks",
  "Bakery",
  "Beverages",
  "Other Food Products",
];

export const TESTING_SERVICES = [
  "Shelf-Life Testing",
  "Nutritional Testing",
  "Microbiological Testing",
  "Chemical Testing",
  "Sensory Testing",
  "Stability Testing",
  "Allergen Testing",
  "Other",
];

export const ENGAGEMENT_TYPES = [
  "Freelance",
  "Part-time",
  "Project-based",
  "Consulting",
  "Open to long-term collaboration",
];

export const PACKAGING_SUPPORT = [
  "Primary packaging",
  "Secondary packaging",
  "Custom packaging",
  "No packaging support",
];

export const INGREDIENT_CATEGORIES = [
  "Proteins",
  "Fibers & Prebiotics",
  "Sweeteners",
  "Cocoa & Chocolate",
  "Nuts & Seeds",
  "Dried Fruits",
  "Flavours",
  "Vitamins & Minerals",
  "Functional Actives",
  "Other",
];

export const TESTING_CAPABILITIES = [
  "Nutritional analysis",
  "Microbiological",
  "Shelf-life / accelerated",
  "Heavy metals",
  "Pesticide residue",
  "Allergen",
  "Sensory",
  "Label / FSSAI compliance",
];

export const PACKAGING_TYPES = [
  "Flow wrap",
  "Pouches",
  "Cartons",
  "Sleeves",
  "Jars",
  "Bottles",
  "Shrink / secondary",
  "Other",
];

export const PACKAGING_MATERIALS = [
  "Laminates",
  "Paper / Kraft",
  "Compostable",
  "Recyclable mono-material",
  "Aluminium foil",
  "Glass",
  "PET",
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
  status: "Partner Details Completed" | "Profile In Progress" | "Profile Completed";
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
    /* storage unavailable — prototype continues in memory */
  }
}

export function clearRecord() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
