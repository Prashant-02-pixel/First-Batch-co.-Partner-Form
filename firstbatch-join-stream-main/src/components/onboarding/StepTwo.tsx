import { Field, TextInput, TextArea, Select, ChipGroup, YesNo } from "./fields";
import {
  FOOD_CATEGORIES,
  CERTIFICATIONS,
  MOQ_UNITS,
  PACKAGING_SUPPORT,
  PACKAGING_TYPES,
  PACKAGING_MATERIALS,
  trackFor,
  type PartnerTypeId,
} from "@/lib/partner-onboarding";

export type Profile = Record<string, string | string[]>;

type Props = {
  partnerType: PartnerTypeId | "";
  data: Profile;
  set: (key: string, value: string | string[]) => void;
};

const str = (d: Profile, k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
const arr = (d: Profile, k: string) => (Array.isArray(d[k]) ? (d[k] as string[]) : []);

export function StepTwo({ partnerType, data, set }: Props) {
  const track = trackFor(partnerType);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl sm:text-4xl">Tell us more about your work.</h2>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          This helps us understand where your expertise fits within the First Batch network.
        </p>
      </div>

      {(track === "expert" || track === "consultant") && (
        <ExpertFields data={data} set={set} showCategories={track === "expert"} />
      )}
      {track === "manufacturer" && <ManufacturerFields data={data} set={set} />}
      {track === "supplier" && <SupplierFields data={data} set={set} />}
      {track === "lab" && <LabFields data={data} set={set} />}
      {track === "packaging" && <PackagingFields data={data} set={set} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Website" hint="Optional">
          <TextInput
            value={str(data, "website")}
            placeholder="https://"
            onChange={(e) => set("website", e.target.value)}
          />
        </Field>
      </div>
      <Field label="Additional information" hint="Optional">
        <TextArea
          value={str(data, "additional")}
          onChange={(e) => set("additional", e.target.value)}
          placeholder="Anything else we should know?"
        />
      </Field>
    </div>
  );
}

function ExpertFields({
  data,
  set,
  showCategories,
}: {
  data: Profile;
  set: Props["set"];
  showCategories: boolean;
}) {
  return (
    <>
      {showCategories && (
        <Field label="Food categories you have worked with" hint="Select all that apply">
          <ChipGroup
            options={FOOD_CATEGORIES}
            value={arr(data, "categories")}
            onChange={(v) => set("categories", v)}
          />
        </Field>
      )}

      <Field label="Have you independently developed or significantly contributed to a food formulation?">
        <YesNo value={str(data, "formulation")} onChange={(v) => set("formulation", v)} />
      </Field>

      {str(data, "formulation") === "Yes" && (
        <div className="step-fade">
          <Field label="Tell us briefly about one product you worked on.">
            <TextArea
              value={str(data, "formulationStory")}
              onChange={(e) => set("formulationStory", e.target.value)}
              placeholder="What was the product, your role, and what changed because of your work?"
            />
          </Field>
        </div>
      )}

      <Field label="Scale-up experience">
        <YesNo
          value={str(data, "scaleUp")}
          onChange={(v) => set("scaleUp", v)}
          options={["Lab formulation only", "Pilot scale", "Commercial production", "All of the above"]}
        />
      </Field>
    </>
  );
}

function ManufacturerFields({ data, set }: { data: Profile; set: Props["set"] }) {
  return (
    <>
      <Field label="Monthly production capacity">
        <TextInput
          value={str(data, "capacity")}
          placeholder="e.g. 300,000 bars / month"
          onChange={(e) => set("capacity", e.target.value)}
        />
      </Field>

      <Field label="R&D / formulation support available?">
        <YesNo value={str(data, "rndSupport")} onChange={(v) => set("rndSupport", v)} />
      </Field>

      <Field label="Can you source ingredients?">
        <YesNo
          value={str(data, "sourcing")}
          onChange={(v) => set("sourcing", v)}
          options={["Yes", "No", "Partially"]}
        />
      </Field>

      <Field label="Packaging support" hint="Select all that apply">
        <ChipGroup
          options={PACKAGING_SUPPORT}
          value={arr(data, "packagingSupport")}
          onChange={(v) => set("packagingSupport", v)}
        />
      </Field>
    </>
  );
}

function SupplierFields({ data, set }: { data: Profile; set: Props["set"] }) {
  return (
    <>
      <Field label="Regions served" hint="Select all that apply">
        <ChipGroup
          options={["North India", "South India", "East India", "West India", "Pan India", "Export"]}
          value={arr(data, "regions")}
          onChange={(v) => set("regions", v)}
        />
      </Field>

      <Field label="Sample availability">
        <YesNo value={str(data, "samples")} onChange={(v) => set("samples", v)} />
      </Field>
    </>
  );
}

function LabFields({ data, set }: { data: Profile; set: Props["set"] }) {
  return (
    <>
      <Field label="Do you support method development or custom protocols?">
        <YesNo
          value={str(data, "methodDevelopment")}
          onChange={(v) => set("methodDevelopment", v)}
          options={["Yes", "No", "Case by case"]}
        />
      </Field>

      <Field label="Do you offer pickup / logistics for samples?">
        <YesNo value={str(data, "samplePickup")} onChange={(v) => set("samplePickup", v)} />
      </Field>
    </>
  );
}

function PackagingFields({ data, set }: { data: Profile; set: Props["set"] }) {
  return (
    <>
      <Field label="Packaging types" hint="Select all that apply">
        <ChipGroup
          options={PACKAGING_TYPES}
          value={arr(data, "packagingTypes")}
          onChange={(v) => set("packagingTypes", v)}
        />
      </Field>

      <Field label="Materials supported" hint="Select all that apply">
        <ChipGroup
          options={PACKAGING_MATERIALS}
          value={arr(data, "materials")}
          onChange={(v) => set("materials", v)}
        />
      </Field>

      <Field label="Food categories served" hint="Select all that apply">
        <ChipGroup
          options={FOOD_CATEGORIES}
          value={arr(data, "categories")}
          onChange={(v) => set("categories", v)}
        />
      </Field>

      <Field label="Certifications" hint="Select all that apply">
        <ChipGroup
          options={CERTIFICATIONS}
          value={arr(data, "certifications")}
          onChange={(v) => set("certifications", v)}
        />
      </Field>

      <Field label="Minimum order quantity (MOQ)">
        <div className="grid grid-cols-[minmax(0,1fr)_9rem] gap-2">
          <TextInput
            value={str(data, "moq")}
            inputMode="numeric"
            placeholder="e.g. 10000"
            onChange={(e) => set("moq", e.target.value)}
          />
          <Select
            value={str(data, "moqUnit")}
            onChange={(v) => set("moqUnit", v)}
            options={MOQ_UNITS}
            placeholder="Unit"
          />
        </div>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Custom printing available?">
          <YesNo value={str(data, "printing")} onChange={(v) => set("printing", v)} />
        </Field>
        <Field label="Prototype / sample available?">
          <YesNo value={str(data, "prototype")} onChange={(v) => set("prototype", v)} />
        </Field>
        <Field label="Typical lead time">
          <TextInput
            value={str(data, "leadTime")}
            placeholder="e.g. 3–4 weeks"
            onChange={(e) => set("leadTime", e.target.value)}
          />
        </Field>
        <Field label="Location">
          <TextInput
            value={str(data, "packagingLocation")}
            placeholder="Plant city / state"
            onChange={(e) => set("packagingLocation", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}
