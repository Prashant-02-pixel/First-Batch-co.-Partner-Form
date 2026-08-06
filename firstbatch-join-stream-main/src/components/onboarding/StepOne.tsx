import { Field, TextInput, TextArea, Select, OptionCards, ChipGroup, TagInput, YesNo } from "./fields";
import {
  PARTNER_TYPES,
  COUNTRY_CODES,
  INDIAN_STATES,
  EXPERTISE,
  FOOD_CATEGORIES,
  MANUFACTURING_PRODUCTS,
  MANUFACTURER_CATEGORIES,
  INGREDIENT_CATEGORIES,
  TESTING_SERVICES,
  CERTIFICATIONS,
  MOQ_UNITS,
  ENGAGEMENT_TYPES,
  WORK_TYPES,
  trackFor,
  type BasicDetails,
} from "@/lib/partner-onboarding";

export type Errors = Partial<Record<keyof BasicDetails, string>>;

type Qual = Record<string, string | string[]>;
const str = (d: Qual, k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
const arr = (d: Qual, k: string) => (Array.isArray(d[k]) ? (d[k] as string[]) : []);

export function StepOne({
  data,
  errors,
  onChange,
}: {
  data: BasicDetails;
  errors: Errors;
  onChange: (patch: Partial<BasicDetails>) => void;
}) {
  const qual: Qual = data.qual ?? {};
  const setQ = (key: string, value: string | string[]) =>
    onChange({ qual: { ...qual, [key]: value } });
  const track = trackFor(data.partnerType);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl sm:text-4xl">Let's start with the basics.</h2>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Tell us a little about yourself so we can understand how you could be part of the First
          Batch network.
        </p>
      </div>

      <Field label="Partner type" required error={errors.partnerType}>
        <OptionCards
          options={PARTNER_TYPES.map((p) => ({ id: p.id, label: p.label, hint: p.hint }))}
          value={data.partnerType}
          onChange={(v) => onChange({ partnerType: v as BasicDetails["partnerType"] })}
        />
      </Field>

      <Field label="Full name" required error={errors.fullName}>
        <TextInput
          value={data.fullName}
          placeholder="Full name"
          onChange={(e) => onChange({ fullName: e.target.value })}
        />
      </Field>

      <Field label="Company or independent" required error={errors.entity}>
        <OptionCards
          options={[
            { id: "independent", label: "Independent Professional" },
            { id: "company", label: "Company / Organization" },
          ]}
          value={data.entity}
          onChange={(v) => onChange({ entity: v as BasicDetails["entity"] })}
        />
      </Field>

      {data.entity === "company" && (
        <div className="step-fade">
          <Field label="Company name" required error={errors.companyName}>
            <TextInput
              value={data.companyName}
              placeholder="Registered or trading name"
              onChange={(e) => onChange({ companyName: e.target.value })}
            />
          </Field>
        </div>
      )}

      <Field label="WhatsApp / contact number" required error={errors.phone}>
        <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2">
          <div className="relative">
            <select
              value={data.countryCode}
              onChange={(e) => onChange({ countryCode: e.target.value })}
              className="field-base appearance-none pr-8 font-mono text-sm"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            >
              <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
          <TextInput
            value={data.phone}
            inputMode="tel"
            placeholder="10-digit mobile number"
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email address" required error={errors.email}>
          <TextInput
            value={data.email}
            type="email"
            placeholder="you@company.com"
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </Field>
        <Field label="LinkedIn profile">
          <TextInput
            value={data.linkedin}
            placeholder="linkedin.com/in/…"
            onChange={(e) => onChange({ linkedin: e.target.value })}
          />
        </Field>
        <Field label="City" required error={errors.city}>
          <TextInput
            value={data.city}
            placeholder="e.g. Pune"
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </Field>
        <Field label="State" required error={errors.state}>
          <Select
            value={data.state}
            onChange={(v) => onChange({ state: v })}
            options={INDIAN_STATES}
            placeholder="Select state"
          />
        </Field>
      </div>

      {data.partnerType && (
        <div className="step-fade space-y-8 border-t border-border pt-8">
          {(track === "expert" || track === "consultant") && (
            <ProfessionalFields
              qual={qual}
              setQ={setQ}
              withFoodCategories={track === "consultant"}
            />
          )}
          {track === "manufacturer" && <ManufacturerStepOne qual={qual} setQ={setQ} />}
          {track === "supplier" && <SupplierStepOne qual={qual} setQ={setQ} />}
          {track === "lab" && <LabStepOne qual={qual} setQ={setQ} />}
          {track === "other" && <OtherStepOne qual={qual} setQ={setQ} />}
        </div>
      )}
    </div>
  );
}

function ProfessionalFields({
  qual,
  setQ,
  withFoodCategories,
}: {
  qual: Qual;
  setQ: (k: string, v: string | string[]) => void;
  withFoodCategories: boolean;
}) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Current designation">
          <TextInput
            value={str(qual, "designation")}
            placeholder="e.g. Senior Food Technologist"
            onChange={(e) => setQ("designation", e.target.value)}
          />
        </Field>
        <Field label="Years of experience">
          <Select
            value={str(qual, "experience")}
            onChange={(v) => setQ("experience", v)}
            options={["0–2 years", "3–5 years", "6–10 years", "11–15 years", "15+ years"]}
          />
        </Field>
      </div>

      <Field label="Primary expertise" hint="Select all that apply">
        <ChipGroup
          options={EXPERTISE}
          value={arr(qual, "expertise")}
          onChange={(v) => setQ("expertise", v)}
        />
      </Field>

      <Field label="Availability" hint="Select all that apply">
        <ChipGroup
          options={ENGAGEMENT_TYPES}
          value={arr(qual, "availability")}
          onChange={(v) => setQ("availability", v)}
        />
      </Field>

      <Field label="Specialties" hint="What are you especially known for?">
        <TextArea
          value={str(qual, "specialties")}
          onChange={(e) => setQ("specialties", e.target.value)}
          placeholder="e.g. high-protein bar formulation, clean-label sweetener systems"
        />
      </Field>

      <Field label="Work type">
        <YesNo
          value={str(qual, "workType")}
          onChange={(v) => setQ("workType", v)}
          options={WORK_TYPES}
        />
      </Field>

      {withFoodCategories && (
        <Field
          label="Food categories you have worked with"
          hint="Search, select multiple, or type to add your own"
        >
          <TagInput
            options={FOOD_CATEGORIES.filter((c) => c !== "Other")}
            value={arr(qual, "foodCategories")}
            onChange={(v) => setQ("foodCategories", v)}
            placeholder="Search food categories…"
          />
        </Field>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Portfolio link">
          <TextInput
            value={str(qual, "portfolio")}
            placeholder="https://"
            onChange={(e) => setQ("portfolio", e.target.value)}
          />
        </Field>
        <Field label="Resume / CV link">
          <TextInput
            value={str(qual, "resume")}
            placeholder="https://"
            onChange={(e) => setQ("resume", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

function MoqField({
  qual,
  setQ,
  placeholder,
}: {
  qual: Qual;
  setQ: (k: string, v: string | string[]) => void;
  placeholder: string;
}) {
  return (
    <>
      <Field label="Minimum order quantity (MOQ)">
        <div className="grid grid-cols-[minmax(0,1fr)_9rem] gap-2">
          <TextInput
            value={str(qual, "moq")}
            inputMode="numeric"
            placeholder={placeholder}
            onChange={(e) => setQ("moq", e.target.value)}
          />
          <Select
            value={str(qual, "moqUnit")}
            onChange={(v) => setQ("moqUnit", v)}
            options={MOQ_UNITS}
            placeholder="Unit"
          />
        </div>
      </Field>
      {str(qual, "moqUnit") === "Other" && (
        <div className="step-fade">
          <Field label="Please specify MOQ unit">
            <TextInput
              value={str(qual, "moqUnitOther")}
              placeholder="e.g. Cartons"
              onChange={(e) => setQ("moqUnitOther", e.target.value)}
            />
          </Field>
        </div>
      )}
    </>
  );
}

function ManufacturerStepOne({
  qual,
  setQ,
}: {
  qual: Qual;
  setQ: (k: string, v: string | string[]) => void;
}) {
  return (
    <>
      <Field label="Categories you work in" hint="Search, select multiple, or type to add your own">
        <TagInput
          options={MANUFACTURER_CATEGORIES}
          value={arr(qual, "mfgCategories")}
          onChange={(v) => setQ("mfgCategories", v)}
          placeholder="Search categories…"
        />
      </Field>

      <Field label="What do you make?" hint="Select all that apply">
        <ChipGroup
          options={MANUFACTURING_PRODUCTS}
          value={arr(qual, "products")}
          onChange={(v) => setQ("products", v)}
        />
      </Field>

      <Field label="Manufacturing location">
        <TextInput
          value={str(qual, "manufacturingLocation")}
          placeholder="Plant city / state"
          onChange={(e) => setQ("manufacturingLocation", e.target.value)}
        />
      </Field>

      <MoqField qual={qual} setQ={setQ} placeholder="e.g. 5000" />

      <Field label="Pilot / small batch available?">
        <YesNo
          value={str(qual, "pilot")}
          onChange={(v) => setQ("pilot", v)}
          options={["Yes", "No", "Depends on product"]}
        />
      </Field>

      <Field label="Certifications" hint="Select all that apply">
        <ChipGroup
          options={CERTIFICATIONS}
          value={arr(qual, "certifications")}
          onChange={(v) => setQ("certifications", v)}
        />
      </Field>
    </>
  );
}

function SupplierStepOne({
  qual,
  setQ,
}: {
  qual: Qual;
  setQ: (k: string, v: string | string[]) => void;
}) {
  const cats = arr(qual, "ingredientCategories");
  return (
    <>
      <Field label="Ingredient categories" hint="Select all that apply">
        <ChipGroup
          options={INGREDIENT_CATEGORIES}
          value={cats}
          onChange={(v) => setQ("ingredientCategories", v)}
        />
      </Field>

      {cats.includes("Other") && (
        <div className="step-fade">
          <Field label="Please specify other ingredient category">
            <TextInput
              value={str(qual, "ingredientCategoryOther")}
              placeholder="Your ingredient category"
              onChange={(e) => setQ("ingredientCategoryOther", e.target.value)}
            />
          </Field>
        </div>
      )}

      <MoqField qual={qual} setQ={setQ} placeholder="e.g. 500" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Location">
          <TextInput
            value={str(qual, "supplyLocation")}
            placeholder="Warehouse / plant city"
            onChange={(e) => setQ("supplyLocation", e.target.value)}
          />
        </Field>
        <Field label="Typical lead time">
          <TextInput
            value={str(qual, "leadTime")}
            placeholder="e.g. 2–3 weeks"
            onChange={(e) => setQ("leadTime", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Certifications" hint="Select all that apply">
        <ChipGroup
          options={CERTIFICATIONS}
          value={arr(qual, "certifications")}
          onChange={(v) => setQ("certifications", v)}
        />
      </Field>
    </>
  );
}

function LabStepOne({
  qual,
  setQ,
}: {
  qual: Qual;
  setQ: (k: string, v: string | string[]) => void;
}) {
  const services = arr(qual, "testingServices");
  const cats = arr(qual, "labFoodCategories");
  return (
    <>
      <Field label="Testing services available" hint="Select all that apply">
        <ChipGroup
          options={TESTING_SERVICES}
          value={services}
          onChange={(v) => setQ("testingServices", v)}
        />
      </Field>

      {services.includes("Other") && (
        <div className="step-fade">
          <Field label="Please specify other testing services">
            <TextInput
              value={str(qual, "testingServicesOther")}
              placeholder="Your testing services"
              onChange={(e) => setQ("testingServicesOther", e.target.value)}
            />
          </Field>
        </div>
      )}

      <Field label="Accreditations / certifications" hint="Select all that apply">
        <ChipGroup
          options={["NABL", "FSSAI notified", "ISO 17025", "GLP", "Other"]}
          value={arr(qual, "accreditations")}
          onChange={(v) => setQ("accreditations", v)}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Location">
          <TextInput
            value={str(qual, "labLocation")}
            placeholder="Lab city / state"
            onChange={(e) => setQ("labLocation", e.target.value)}
          />
        </Field>
        <Field label="Typical turnaround time">
          <TextInput
            value={str(qual, "turnaround")}
            placeholder="e.g. 5–7 working days"
            onChange={(e) => setQ("turnaround", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Food categories supported" hint="Select all that apply">
        <ChipGroup
          options={FOOD_CATEGORIES}
          value={cats}
          onChange={(v) => setQ("labFoodCategories", v)}
        />
      </Field>

      {cats.includes("Other") && (
        <div className="step-fade">
          <Field label="Please specify other food categories">
            <TextInput
              value={str(qual, "labFoodCategoriesOther")}
              placeholder="Your food categories"
              onChange={(e) => setQ("labFoodCategoriesOther", e.target.value)}
            />
          </Field>
        </div>
      )}

      <Field label="Sample requirements">
        <TextInput
          value={str(qual, "sampleRequirements")}
          placeholder="e.g. 250g per SKU, sealed"
          onChange={(e) => setQ("sampleRequirements", e.target.value)}
        />
      </Field>
    </>
  );
}

function OtherStepOne({
  qual,
  setQ,
}: {
  qual: Qual;
  setQ: (k: string, v: string | string[]) => void;
}) {
  return (
    <>
      <Field label="What do you do?" hint="Tell us how you'd fit into the network.">
        <TextArea
          value={str(qual, "otherDescription")}
          onChange={(e) => setQ("otherDescription", e.target.value)}
          placeholder="Describe your work, capabilities and the kind of brands you'd like to work with."
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Website">
          <TextInput
            value={str(qual, "website")}
            placeholder="https://"
            onChange={(e) => setQ("website", e.target.value)}
          />
        </Field>
        <Field label="Resume / CV link">
          <TextInput
            value={str(qual, "resume")}
            placeholder="https://"
            onChange={(e) => setQ("resume", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

export function validateBasics(d: BasicDetails): Errors {
  const e: Errors = {};
  if (!d.partnerType) e.partnerType = "Pick the option closest to what you do.";
  if (!d.fullName.trim()) e.fullName = "Please add your name.";
  if (!d.entity) e.entity = "Let us know how you work.";
  if (d.entity === "company" && !d.companyName.trim()) e.companyName = "Company name is required.";
  if (!d.phone.trim()) e.phone = "We reach partners on WhatsApp first.";
  else if (d.phone.replace(/\D/g, "").length < 7) e.phone = "That number looks incomplete.";
  if (!d.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Check the email format.";
  if (!d.city.trim()) e.city = "City is required.";
  if (!d.state) e.state = "State is required.";
  return e;
}
