import {
  Field,
  TextInput,
  TextArea,
  Select,
  OptionCards,
  ChipGroup,
  TagInput,
  YesNo,
  RepeatableTextInputs,
} from "./fields";

import {
  PARTNER_TYPES,
  COUNTRY_CODES,
  INDIAN_STATES,
  FOOD_TECH_EXPERTISE,
  FOOD_CONSULTANT_EXPERTISE,
  FOOD_TECH_FOOD_CATEGORIES,
  EXPERIENCE_LEVELS,
  AVAILABILITY_OPTIONS,
  SCALE_UP_EXPERIENCE,
  MANUFACTURER_SERVICES,
  MANUFACTURER_CERTIFICATIONS,
  INGREDIENT_CERTIFICATIONS,
  SUPPLIER_REGIONS,
  TESTING_SERVICES,
  LAB_ACCREDITATIONS,
  PACKAGING_TYPES,
  PACKAGING_MATERIALS,
  MOQ_UNITS,
  MOQ_CUSTOM_OPTIONS,
  trackFor,
  type BasicDetails,
} from "@/lib/partner-onboarding";

export type Errors = Partial<
  Record<string, string>
>;

const errorFor = (
  errors: Errors,
  key: string,
): string => {
  return errors[key] ?? "";
};

type Qual = Record<
  string,
  string | string[]
>;

const str = (
  d: Qual,
  key: string,
): string => {
  return typeof d[key] === "string"
    ? d[key]
    : "";
};

const arr = (
  d: Qual,
  key: string,
): string[] => {
  return Array.isArray(d[key])
    ? d[key]
    : [];
};

const hasValue = (
  d: Qual,
  key: string,
): boolean => {
  return str(d, key).trim().length > 0;
};

const hasValues = (
  d: Qual,
  key: string,
): boolean => {
  return arr(d, key).some(
    (value) =>
      value.trim().length > 0,
  );
};

/* =========================================================
   STEP ONE
========================================================= */

export function StepOne({
  data,
  errors,
  onChange,
}: {
  data: BasicDetails;
  errors: Errors;
  onChange: (
    patch: Partial<BasicDetails>,
  ) => void;
}) {
  const qual = data.qual ?? {};

  const track = trackFor(
    data.partnerType,
  );

  const setQ = (
    key: string,
    value: string | string[],
  ) => {
    onChange({
      qual: {
        ...qual,
        [key]: value,
      },
    });
  };

  const isIndividualPartner =
    track === "expert" ||
    track === "consultant" ||
    track === "other";

  const isCompanyPartner =
    track === "manufacturer" ||
    track === "supplier" ||
    track === "lab" ||
    track === "packaging";

  const handlePartnerTypeChange = (
    value: BasicDetails["partnerType"],
  ) => {
    onChange({
      partnerType: value,
      entity: "",
      companyName: "",
      qual: {},
    });
  };

  const cityLabel =
    isIndividualPartner
      ? "City"
      : "Your City";

  const stateLabel =
    isIndividualPartner
      ? "State"
      : "Your State";

  return (
    <div className="space-y-8">
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div>
        <h2 className="text-3xl sm:text-4xl">
          Let's start with the basics.
        </h2>

        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Tell us a little about yourself so we can understand how you could be part of the First Batch network.
        </p>
      </div>

      {/* =====================================================
          PARTNER TYPE
      ===================================================== */}

      <Field
        label="Partner type"
        required
        error={errorFor(
          errors,
          "partnerType",
        )}
      >
        <OptionCards
          options={PARTNER_TYPES.map(
            (partner) => ({
              id: partner.id,
              label: partner.label,
              hint: partner.hint,
            }),
          )}
          value={data.partnerType}
          onChange={(value) =>
            handlePartnerTypeChange(
              value as BasicDetails["partnerType"],
            )
          }
        />
      </Field>

      {/* =====================================================
          NAME
      ===================================================== */}

      <Field
        label="Name"
        required
        error={errorFor(
          errors,
          "fullName",
        )}
      >
        <TextInput
          value={data.fullName}
          placeholder="Your name"
          onChange={(e) =>
            onChange({
              fullName:
                e.target.value,
            })
          }
        />
      </Field>

      {/* =====================================================
          INDEPENDENT / ORGANIZATION
      ===================================================== */}

      {data.partnerType &&
        isIndividualPartner && (
          <Field
            label="Independent / Organization"
            required
            error={errorFor(
              errors,
              "entity",
            )}
          >
            <OptionCards
              options={[
                {
                  id: "independent",
                  label: "Independent",
                },
                {
                  id: "company",
                  label: "Organization",
                },
              ]}
              value={data.entity}
              onChange={(value) =>
                onChange({
                  entity:
                    value as BasicDetails["entity"],
                  companyName:
                    value === "company"
                      ? data.companyName
                      : "",
                })
              }
            />
          </Field>
        )}

      {/* =====================================================
          COMPANY / ORGANIZATION NAME
      ===================================================== */}

      {data.partnerType &&
        (isCompanyPartner ||
          data.entity === "company") && (
          <Field
            label={
              isCompanyPartner
                ? "Company Name"
                : "Organization Name"
            }
            required
            error={errorFor(
              errors,
              "companyName",
            )}
          >
            <TextInput
              value={
                data.companyName
              }
              placeholder={
                isCompanyPartner
                  ? "Company name"
                  : "Organization name"
              }
              onChange={(e) =>
                onChange({
                  companyName:
                    e.target.value,
                })
              }
            />
          </Field>
        )}

      {/* =====================================================
          PHONE
      ===================================================== */}

      <Field
        label={
          track === "expert" ||
          track === "consultant"
            ? "WhatsApp No."
            : "Phone No."
        }
        required
        error={errorFor(
          errors,
          "phone",
        )}
      >
        <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2">
          <div className="relative">
            <select
              value={
                data.countryCode
              }
              onChange={(e) =>
                onChange({
                  countryCode:
                    e.target.value,
                })
              }
              className="field-base appearance-none pr-8 font-mono text-sm"
            >
              {COUNTRY_CODES.map(
                (country) => (
                  <option
                    key={country.code}
                    value={country.code}
                  >
                    {country.label}
                  </option>
                ),
              )}
            </select>

            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            >
              <path
                d="M5 8l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </div>

          <TextInput
            value={data.phone}
            inputMode="tel"
            placeholder="Mobile number"
            onChange={(e) =>
              onChange({
                phone:
                  e.target.value,
              })
            }
          />
        </div>
      </Field>

      {/* =====================================================
          EMAIL
      ===================================================== */}

      <Field
        label="Email"
        required
        error={errorFor(
          errors,
          "email",
        )}
      >
        <TextInput
          value={data.email}
          type="email"
          placeholder="you@company.com"
          onChange={(e) =>
            onChange({
              email:
                e.target.value,
            })
          }
        />
      </Field>

      {/* =====================================================
          LINKEDIN
      ===================================================== */}

      <Field
        label={
          isCompanyPartner
            ? "Your LinkedIn"
            : "LinkedIn"
        }
        required={
          track !== "manufacturer" &&
          track !== "supplier" &&
          track !== "lab" &&
          track !== "packaging"
        }
        error={errorFor(
          errors,
          "linkedin",
        )}
      >
        <TextInput
          value={data.linkedin}
          placeholder="LinkedIn profile link"
          onChange={(e) =>
            onChange({
              linkedin:
                e.target.value,
            })
          }
        />
      </Field>

      {/* =====================================================
          COMPANY WEBSITE
      ===================================================== */}

      {isCompanyPartner && (
        <Field label="Company Website">
          <TextInput
            value={str(
              qual,
              "companyWebsite",
            )}
            placeholder="https://"
            onChange={(e) =>
              setQ(
                "companyWebsite",
                e.target.value,
              )
            }
          />
        </Field>
      )}

      {/* =====================================================
          DRIVE LINK
      ===================================================== */}

      {(track === "expert" ||
  track === "consultant" ||
  track === "other") && (
  <Field
    label="Portfolio / Website / CV"
    required={
      track === "expert" ||
      track === "consultant"
    }
    error={errorFor(errors, "driveLink")}
  >
    <TextInput
      type="url"
      value={str(
        qual,
        "driveLink",
      )}
      placeholder="Drive link"
      onChange={(e) =>
        setQ(
          "driveLink",
          e.target.value,
        )
      }
    />
  </Field>
)}
      {/* =====================================================
          CITY + STATE
      ===================================================== */}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={cityLabel}
          required
          error={errorFor(
            errors,
            "city",
          )}
        >
          <TextInput
            value={data.city}
            placeholder="e.g. Bengaluru"
            onChange={(e) =>
              onChange({
                city:
                  e.target.value,
              })
            }
          />
        </Field>

        <Field
          label={stateLabel}
          required
          error={errorFor(
            errors,
            "state",
          )}
        >
          <Select
            value={data.state}
            onChange={(value) =>
              onChange({
                state: value,
              })
            }
            options={
              INDIAN_STATES
            }
            placeholder="Select state"
          />
        </Field>
      </div>

      {/* =====================================================
          PARTNER-SPECIFIC FIELDS
      ===================================================== */}

      {track === "expert" && (
        <ExpertFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}

      {track === "consultant" && (
        <ConsultantFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}

      {track === "manufacturer" && (
        <ManufacturerFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}

      {track === "supplier" && (
        <SupplierFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}

      {track === "lab" && (
        <LabFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}

      {track === "packaging" && (
        <PackagingFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}

      {track === "other" && (
        <OtherFields
          qual={qual}
          setQ={setQ}
          errors={errors}
        />
      )}
    </div>
  );
}

/* =========================================================
   AVAILABILITY
========================================================= */

function AvailabilityField({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <Field
      label="Availability"
      required
      error={errorFor(
        errors,
        "availability",
      )}
    >
      <Select
        value={str(
          qual,
          "availability",
        )}
        onChange={(value) =>
          setQ(
            "availability",
            value,
          )
        }
        options={
          AVAILABILITY_OPTIONS
        }
        placeholder="Select availability"
      />
    </Field>
  );
}

/* =========================================================
   PARTNER 1 — FOOD TECHNOLOGIST / R&D / NPD
========================================================= */

function ExpertFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field
        label="Years of Experience"
        required
        error={errorFor(
          errors,
          "experience",
        )}
      >
        <Select
          value={str(
            qual,
            "experience",
          )}
          onChange={(value) =>
            setQ(
              "experience",
              value,
            )
          }
          options={
            EXPERIENCE_LEVELS
          }
          placeholder="Select experience"
        />
      </Field>

      <Field
        label="Primary Expertise"
        required
        error={errorFor(
          errors,
          "expertise",
        )}
      >
        <TagInput
          options={
            FOOD_TECH_EXPERTISE
          }
          value={arr(
            qual,
            "expertise",
          )}
          onChange={(value) =>
            setQ(
              "expertise",
              value,
            )
          }
          placeholder="Search or add expertise…"
          allowCustom
        />
      </Field>

      <AvailabilityField
        qual={qual}
        setQ={setQ}
        errors={errors}
      />

      <Field
        label="Food Categories You Have Worked In"
        required
        error={errorFor(
          errors,
          "foodCategories",
        )}
      >
        <TagInput
          options={
            FOOD_TECH_FOOD_CATEGORIES
          }
          value={arr(
            qual,
            "foodCategories",
          )}
          onChange={(value) =>
            setQ(
              "foodCategories",
              value,
            )
          }
          placeholder="Search or add food categories…"
          allowCustom
        />
      </Field>

      <Field label="Have you independently developed or significantly contributed to a food formulation?">
        <YesNo
          value={str(
            qual,
            "formulation",
          )}
          onChange={(value) =>
            setQ(
              "formulation",
              value,
            )
          }
        />
      </Field>

      <Field label="Scale-up Experience">
        <ChipGroup
          options={
            SCALE_UP_EXPERIENCE
          }
          value={arr(
            qual,
            "scaleUp",
          )}
          onChange={(value) =>
            setQ(
              "scaleUp",
              value,
            )
          }
        />
      </Field>

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   PARTNER 2 — FOOD CONSULTANT
========================================================= */

function ConsultantFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field
        label="Years of Experience"
        required
        error={errorFor(
          errors,
          "experience",
        )}
      >
        <Select
          value={str(
            qual,
            "experience",
          )}
          onChange={(value) =>
            setQ(
              "experience",
              value,
            )
          }
          options={
            EXPERIENCE_LEVELS
          }
          placeholder="Select experience"
        />
      </Field>

      <Field
        label="Primary Expertise"
        required
        error={errorFor(
          errors,
          "expertise",
        )}
      >
        <TagInput
          options={
            FOOD_CONSULTANT_EXPERTISE
          }
          value={arr(
            qual,
            "expertise",
          )}
          onChange={(value) =>
            setQ(
              "expertise",
              value,
            )
          }
          placeholder="Search or add expertise…"
          allowCustom
        />
      </Field>

      <AvailabilityField
        qual={qual}
        setQ={setQ}
        errors={errors}
      />

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   MOQ
========================================================= */

function MoqField({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <Field
      label="MOQs"
      required
      error={errorFor(
        errors,
        "moq",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_9rem] gap-2">
        <TextInput
          value={str(
            qual,
            "moq",
          )}
          placeholder="MOQ"
          onChange={(e) =>
            setQ(
              "moq",
              e.target.value,
            )
          }
        />

        <Select
          value={str(
            qual,
            "moqUnit",
          )}
          onChange={(value) =>
            setQ(
              "moqUnit",
              value,
            )
          }
          options={
            MOQ_UNITS
          }
          placeholder="Unit"
        />
      </div>

      {str(
        qual,
        "moqUnit",
      ) === "Custom" && (
        <div className="mt-2 step-fade">
          <Select
            value={str(
              qual,
              "moqCustom",
            )}
            onChange={(value) =>
              setQ(
                "moqCustom",
                value,
              )
            }
            options={
              MOQ_CUSTOM_OPTIONS
            }
            placeholder="Select"
          />
        </div>
      )}
    </Field>
  );
}

/* =========================================================
   PARTNER 3 — CONTRACT MANUFACTURER
========================================================= */

function ManufacturerFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field label="Brands + Product Categories You Have Worked With">
        <RepeatableTextInputs
          value={arr(
            qual,
            "brandsCategories",
          )}
          onChange={(value) =>
            setQ(
              "brandsCategories",
              value,
            )
          }
          placeholder="Brand or product category"
        />
      </Field>

      <Field
        label="List the Products You Can Manufacture or Work On"
        required
        error={errorFor(
          errors,
          "products",
        )}
      >
        <RepeatableTextInputs
          value={arr(
            qual,
            "products",
          )}
          onChange={(value) =>
            setQ(
              "products",
              value,
            )
          }
          placeholder="Product"
        />
      </Field>

      <Field
        label="Services You Offer"
        required
        error={errorFor(
          errors,
          "services",
        )}
      >
        <TagInput
          options={
            MANUFACTURER_SERVICES
          }
          value={arr(
            qual,
            "services",
          )}
          onChange={(value) =>
            setQ(
              "services",
              value,
            )
          }
          placeholder="Search or add services…"
          allowCustom
        />
      </Field>

      <MoqField
        qual={qual}
        setQ={setQ}
        errors={errors}
      />

      <Field
        label="Pilot / Small-Batch Production Available?"
        required
        error={errorFor(
          errors,
          "pilot",
        )}
      >
        <YesNo
          value={str(
            qual,
            "pilot",
          )}
          onChange={(value) =>
            setQ(
              "pilot",
              value,
            )
          }
        />
      </Field>

      <Field
        label="Certifications"
        required
        error={errorFor(
          errors,
          "certifications",
        )}
      >
        <TagInput
          options={
            MANUFACTURER_CERTIFICATIONS
          }
          value={arr(
            qual,
            "certifications",
          )}
          onChange={(value) =>
            setQ(
              "certifications",
              value,
            )
          }
          placeholder="Search or add certifications…"
          allowCustom
        />
      </Field>

      <Field label="Monthly Production Capacity">
        <TextInput
          value={str(
            qual,
            "monthlyCapacity",
          )}
          onChange={(e) =>
            setQ(
              "monthlyCapacity",
              e.target.value,
            )
          }
        />
      </Field>

      <Field label="Can you source ingredients?">
        <YesNo
          value={str(
            qual,
            "ingredientSourcing",
          )}
          onChange={(value) =>
            setQ(
              "ingredientSourcing",
              value,
            )
          }
          options={[
            "Yes",
            "No",
            "Partially",
          ]}
        />
      </Field>

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   PARTNER 4 — INGREDIENT SUPPLIER
========================================================= */

function SupplierFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field
        label="Ingredient Category"
        required
        error={errorFor(
          errors,
          "ingredientCategories",
        )}
      >
        <RepeatableTextInputs
          value={arr(
            qual,
            "ingredientCategories",
          )}
          onChange={(value) =>
            setQ(
              "ingredientCategories",
              value,
            )
          }
          placeholder="Ingredient category"
          initialCount={5}
        />
      </Field>

      <MoqField
        qual={qual}
        setQ={setQ}
        errors={errors}
      />

      <Field
        label="Certifications"
        required
        error={errorFor(
          errors,
          "certifications",
        )}
      >
        <TagInput
          options={
            INGREDIENT_CERTIFICATIONS
          }
          value={arr(
            qual,
            "certifications",
          )}
          onChange={(value) =>
            setQ(
              "certifications",
              value,
            )
          }
          placeholder="Search or add certifications…"
          allowCustom
        />
      </Field>

      <Field
        label="Regions Served"
        required
        error={errorFor(
          errors,
          "regions",
        )}
      >
        <ChipGroup
          options={
            SUPPLIER_REGIONS
          }
          value={arr(
            qual,
            "regions",
          )}
          onChange={(value) =>
            setQ(
              "regions",
              value,
            )
          }
        />
      </Field>

      <Field
        label="Sample Available?"
        required
        error={errorFor(
          errors,
          "samples",
        )}
      >
        <YesNo
          value={str(
            qual,
            "samples",
          )}
          onChange={(value) =>
            setQ(
              "samples",
              value,
            )
          }
        />
      </Field>

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   PARTNER 5 — TESTING / RESEARCH LAB
========================================================= */

function LabFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field
        label="Testing Services Available"
        required
        error={errorFor(
          errors,
          "testingServices",
        )}
      >
        <TagInput
          options={
            TESTING_SERVICES
          }
          value={arr(
            qual,
            "testingServices",
          )}
          onChange={(value) =>
            setQ(
              "testingServices",
              value,
            )
          }
          placeholder="Search testing services…"
          allowCustom={false}
        />
      </Field>

      <Field
        label="Accreditations / Certifications"
        required
        error={errorFor(
          errors,
          "accreditations",
        )}
      >
        <TagInput
          options={
            LAB_ACCREDITATIONS
          }
          value={arr(
            qual,
            "accreditations",
          )}
          onChange={(value) =>
            setQ(
              "accreditations",
              value,
            )
          }
          placeholder="Search accreditations…"
          allowCustom={false}
        />
      </Field>

      <Field label="Typical Turnaround Time">
        <TextInput
          value={str(
            qual,
            "turnaround",
          )}
          onChange={(e) =>
            setQ(
              "turnaround",
              e.target.value,
            )
          }
        />
      </Field>

      <Field label="Food Categories Supported">
        <RepeatableTextInputs
          value={arr(
            qual,
            "foodCategoriesSupported",
          )}
          onChange={(value) =>
            setQ(
              "foodCategoriesSupported",
              value,
            )
          }
          placeholder="Food category"
        />
      </Field>

      <Field
        label="Sample Requirement"
        required
        error={errorFor(
          errors,
          "sampleRequirement",
        )}
      >
        <TextInput
          value={str(
            qual,
            "sampleRequirement",
          )}
          placeholder="e.g. 250g per SKU"
          onChange={(e) =>
            setQ(
              "sampleRequirement",
              e.target.value,
            )
          }
        />
      </Field>

      <Field
        label="Sample Pickup / Logistics Available?"
        required
        error={errorFor(
          errors,
          "samplePickup",
        )}
      >
        <YesNo
          value={str(
            qual,
            "samplePickup",
          )}
          onChange={(value) =>
            setQ(
              "samplePickup",
              value,
            )
          }
        />
      </Field>

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   PARTNER 6 — PACKAGING PARTNER
========================================================= */

function PackagingFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field
        label="Packaging Type"
        required
        error={errorFor(
          errors,
          "packagingTypes",
        )}
      >
        <TagInput
          options={
            PACKAGING_TYPES
          }
          value={arr(
            qual,
            "packagingTypes",
          )}
          onChange={(value) =>
            setQ(
              "packagingTypes",
              value,
            )
          }
          placeholder="Search or add packaging types…"
          allowCustom
        />
      </Field>

      <Field
        label="Materials Supported"
        required
        error={errorFor(
          errors,
          "packagingMaterials",
        )}
      >
        <TagInput
          options={
            PACKAGING_MATERIALS
          }
          value={arr(
            qual,
            "packagingMaterials",
          )}
          onChange={(value) =>
            setQ(
              "packagingMaterials",
              value,
            )
          }
          placeholder="Search or add materials…"
          allowCustom
        />
      </Field>

      <Field
        label="Licenses Available"
        required
        error={errorFor(
          errors,
          "licenses",
        )}
      >
        <RepeatableTextInputs
          value={arr(
            qual,
            "licenses",
          )}
          onChange={(value) =>
            setQ(
              "licenses",
              value,
            )
          }
          placeholder="License"
        />
      </Field>

      <MoqField
        qual={qual}
        setQ={setQ}
        errors={errors}
      />

      <Field
        label="Custom Printing Available?"
        required
        error={errorFor(
          errors,
          "printing",
        )}
      >
        <YesNo
          value={str(
            qual,
            "printing",
          )}
          onChange={(value) =>
            setQ(
              "printing",
              value,
            )
          }
          options={[
            "Yes",
            "No",
            "Partially",
          ]}
        />
      </Field>

      <Field
        label="Packaging Samples / Prototypes Available?"
        required
        error={errorFor(
          errors,
          "prototype",
        )}
      >
        <YesNo
          value={str(
            qual,
            "prototype",
          )}
          onChange={(value) =>
            setQ(
              "prototype",
              value,
            )
          }
        />
      </Field>

      <Field label="Typical Lead Time">
        <TextInput
          value={str(
            qual,
            "leadTime",
          )}
          placeholder="e.g. 3–4 Weeks"
          onChange={(e) =>
            setQ(
              "leadTime",
              e.target.value,
            )
          }
        />
      </Field>

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   PARTNER 7 — OTHER
========================================================= */

function OtherFields({
  qual,
  setQ,
  errors,
}: {
  qual: Qual;
  setQ: (
    key: string,
    value: string | string[],
  ) => void;
  errors: Errors;
}) {
  return (
    <>
      <Field
        label="What do you do?"
        required
        error={errorFor(
          errors,
          "whatDoYouDo",
        )}
      >
        <TextArea
          value={str(
            qual,
            "whatDoYouDo",
          )}
          onChange={(e) =>
            setQ(
              "whatDoYouDo",
              e.target.value,
            )
          }
        />
      </Field>

      <Field label="Anything else you would like to share with us?">
        <TextArea
          value={str(
            qual,
            "additional",
          )}
          onChange={(e) =>
            setQ(
              "additional",
              e.target.value,
            )
          }
        />
      </Field>
    </>
  );
}

/* =========================================================
   VALIDATION
========================================================= */

export function validateBasics(
  data: BasicDetails,
): Errors {
  const errors: Errors = {};

  const q = data.qual ?? {};

  const track = trackFor(
    data.partnerType,
  );

  /* =======================================================
     BASIC DETAILS
  ======================================================= */

  if (!data.partnerType) {
    errors["partnerType"] =
      "Please select a partner type.";
  }

  if (!data.fullName.trim()) {
    errors["fullName"] =
      "Please add your name.";
  }

  const companyPartner =
    track === "manufacturer" ||
    track === "supplier" ||
    track === "lab" ||
    track === "packaging";

  if (
    data.partnerType &&
    !companyPartner &&
    !data.entity
  ) {
    errors["entity"] =
      "Please select Independent or Organization.";
  }

  if (
    data.partnerType &&
    (companyPartner ||
      data.entity === "company") &&
    !data.companyName.trim()
  ) {
    errors["companyName"] =
      companyPartner
        ? "Company name is required."
        : "Organization name is required.";
  }

  if (!data.phone.trim()) {
    errors["phone"] =
      "Phone number is required.";
  }

  if (!data.email.trim()) {
    errors["email"] =
      "Email is required.";
  } else if (
    !/^\S+@\S+\.\S+$/.test(
      data.email,
    )
  ) {
    errors["email"] =
      "Check the email format.";
  }

  const linkedinRequired =
    track !== "manufacturer" &&
    track !== "supplier" &&
    track !== "lab" &&
    track !== "packaging";

  if (
    data.partnerType &&
    linkedinRequired &&
    !data.linkedin.trim()
  ) {
    errors["linkedin"] =
      "LinkedIn is required.";
  }

  if (!data.city.trim()) {
    errors["city"] =
      "City is required.";
  }

  if (!data.state) {
    errors["state"] =
      "State is required.";
  }

  /* =======================================================
     PARTNER 1 & 2
  ======================================================= */

  if (
    track === "expert" ||
    track === "consultant"
  ) {
    if (
      !hasValue(
        q,
        "driveLink",
      )
    ) {
      errors["driveLink"] =
        "Drive link is required.";
    }

    if (
      !hasValue(
        q,
        "experience",
      )
    ) {
      errors["experience"] =
        "Please select your years of experience.";
    }

    if (
      !hasValues(
        q,
        "expertise",
      )
    ) {
      errors["expertise"] =
        "Please add at least one expertise.";
    }

    if (
      !hasValue(
        q,
        "availability",
      )
    ) {
      errors["availability"] =
        "Please select your availability.";
    }
  }

  /* =======================================================
     FOOD TECHNOLOGIST
  ======================================================= */

  if (
    track === "expert" &&
    !hasValues(
      q,
      "foodCategories",
    )
  ) {
    errors["foodCategories"] =
      "Please add at least one food category.";
  }

  /* =======================================================
     PARTNER 3 — MANUFACTURER
  ======================================================= */

  if (
    track === "manufacturer"
  ) {
    if (
      !hasValues(
        q,
        "products",
      )
    ) {
      errors["products"] =
        "Please add at least one product.";
    }

    if (
      !hasValues(
        q,
        "services",
      )
    ) {
      errors["services"] =
        "Please select at least one service.";
    }

    if (
      !hasValue(
        q,
        "moq",
      )
    ) {
      errors["moq"] =
        "MOQ is required.";
    } else if (
      !hasValue(
        q,
        "moqUnit",
      )
    ) {
      errors["moq"] =
        "Please select the MOQ unit.";
    } else if (
      str(
        q,
        "moqUnit",
      ) === "Custom" &&
      !hasValue(
        q,
        "moqCustom",
      )
    ) {
      errors["moq"] =
        "Please select the MOQ option.";
    }

    if (
      !hasValue(
        q,
        "pilot",
      )
    ) {
      errors["pilot"] =
        "Please select an option.";
    }

    if (
      !hasValues(
        q,
        "certifications",
      )
    ) {
      errors["certifications"] =
        "Please add at least one certification.";
    }
  }

  /* =======================================================
     PARTNER 4 — SUPPLIER
  ======================================================= */

  if (
    track === "supplier"
  ) {
    if (
      !hasValues(
        q,
        "ingredientCategories",
      )
    ) {
      errors["ingredientCategories"] =
        "Please add at least one ingredient category.";
    }

    if (
      !hasValue(
        q,
        "moq",
      )
    ) {
      errors["moq"] =
        "MOQ is required.";
    } else if (
      !hasValue(
        q,
        "moqUnit",
      )
    ) {
      errors["moq"] =
        "Please select the MOQ unit.";
    } else if (
      str(
        q,
        "moqUnit",
      ) === "Custom" &&
      !hasValue(
        q,
        "moqCustom",
      )
    ) {
      errors["moq"] =
        "Please select the MOQ option.";
    }

    if (
      !hasValues(
        q,
        "certifications",
      )
    ) {
      errors["certifications"] =
        "Please add at least one certification.";
    }

    if (
      !hasValues(
        q,
        "regions",
      )
    ) {
      errors["regions"] =
        "Please select at least one region.";
    }

    if (
      !hasValue(
        q,
        "samples",
      )
    ) {
      errors["samples"] =
        "Please select an option.";
    }
  }

  /* =======================================================
     PARTNER 5 — LAB
  ======================================================= */

  if (
    track === "lab"
  ) {
    if (
      !hasValues(
        q,
        "testingServices",
      )
    ) {
      errors["testingServices"] =
        "Please select at least one testing service.";
    }

    if (
      !hasValues(
        q,
        "accreditations",
      )
    ) {
      errors["accreditations"] =
        "Please select at least one accreditation.";
    }

    if (
      !hasValue(
        q,
        "sampleRequirement",
      )
    ) {
      errors["sampleRequirement"] =
        "Sample requirement is required.";
    }

    if (
      !hasValue(
        q,
        "samplePickup",
      )
    ) {
      errors["samplePickup"] =
        "Please select an option.";
    }
  }

  /* =======================================================
     PARTNER 6 — PACKAGING
  ======================================================= */

  if (
    track === "packaging"
  ) {
    if (
      !hasValues(
        q,
        "packagingTypes",
      )
    ) {
      errors["packagingTypes"] =
        "Please select at least one packaging type.";
    }

    if (
      !hasValues(
        q,
        "packagingMaterials",
      )
    ) {
      errors["packagingMaterials"] =
        "Please select at least one material.";
    }

    if (
      !hasValues(
        q,
        "licenses",
      )
    ) {
      errors["licenses"] =
        "Please add at least one license.";
    }

    if (
      !hasValue(
        q,
        "moq",
      )
    ) {
      errors["moq"] =
        "MOQ is required.";
    } else if (
      !hasValue(
        q,
        "moqUnit",
      )
    ) {
      errors["moq"] =
        "Please select the MOQ unit.";
    } else if (
      str(
        q,
        "moqUnit",
      ) === "Custom" &&
      !hasValue(
        q,
        "moqCustom",
      )
    ) {
      errors["moq"] =
        "Please select the MOQ option.";
    }

    if (
      !hasValue(
        q,
        "printing",
      )
    ) {
      errors["printing"] =
        "Please select an option.";
    }

    if (
      !hasValue(
        q,
        "prototype",
      )
    ) {
      errors["prototype"] =
        "Please select an option.";
    }
  }

  /* =======================================================
     PARTNER 7 — OTHER
  ======================================================= */

  if (
    track === "other" &&
    !hasValue(
      q,
      "whatDoYouDo",
    )
  ) {
    errors["whatDoYouDo"] =
      "Please tell us what you do.";
  }

  return errors;
}