import { useEffect, useRef, useState } from "react";
import { StepOne, validateBasics, type Errors } from "./StepOne";
import { StepTwo, type Profile } from "./StepTwo";
import { Checkbox } from "./fields";
import { supabase } from "@/lib/supabase";

import {
  EMPTY_BASICS,
  PARTNER_TYPES,
  loadRecord,
  saveRecord,
  makePartnerId,
  trackFor,
  type BasicDetails,
  type PartnerRecord,
} from "@/lib/partner-onboarding";

type Phase = "step1" | "saving" | "step2" | "later" | "done";

export function PartnerOnboarding() {
  const [phase, setPhase] = useState<Phase>("step1");
  const [basics, setBasics] = useState<BasicDetails>(EMPTY_BASICS);
  const [profile, setProfile] = useState<Profile>({});
  const [errors, setErrors] = useState<Errors>({});
  const [record, setRecord] = useState<PartnerRecord | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Restore an in-progress partner record.
  useEffect(() => {
    const existing = loadRecord();

    if (!existing) return;

    setRecord(existing);
    setBasics({ ...EMPTY_BASICS, ...existing.basics });
    setProfile((existing.profile as Profile) ?? {});

    if (existing.detailedFormCompleted) {
      setPhase("done");
    } else if (existing.basicFormCompleted) {
      setPhase("step2");
    }
  }, []);

  const scrollToForm = () => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /**
   * STEP 1
   *
   * 1. Validate Step 1.
   * 2. Create/update local partner record.
   * 3. Save Step 1 immediately to Supabase.
   * 4. Save local backup.
   * 5. Continue to Step 2.
   */
  const handleSaveAndContinue = async () => {
    const found = validateBasics(basics);

    setErrors(found);

    if (Object.keys(found).length > 0) {
      scrollToForm();
      return;
    }

    const now = new Date().toISOString();
    const isOther = trackFor(basics.partnerType) === "other";

    const base: PartnerRecord = record
      ? {
          ...record,
          basics,
          basicFormCompleted: true,
          detailedFormStarted: true,
          updatedAt: now,
        }
      : {
          partnerId: makePartnerId(),
          basics,
          profile: {},
          basicFormCompleted: true,
          detailedFormStarted: true,
          detailedFormCompleted: false,
          status: "Partner Details Completed",
          createdAt: now,
          updatedAt: now,
        };

    const next: PartnerRecord = isOther
      ? {
          ...base,
          detailedFormCompleted: true,
          status: "Profile Completed",
        }
      : base;

    // Show thank-you/saving screen while Supabase saves the data.
    setPhase("saving");
    scrollToForm();

    /**
     * Save Step 1 to Supabase.
     *
     * Important:
     * qualification_details contains all the dynamic Step 1 fields
     * for Manufacturer, Consultant, Food Technologist, Supplier,
     * Testing Lab, Packaging Partner, etc.
     */
    const { error: dbError } = await supabase.from("partners").insert({
      full_name: basics.fullName,
      email: basics.email,

      phone: `${basics.countryCode}${basics.phone}`,

      partner_type: basics.partnerType,

      location: [basics.city, basics.state]
        .filter(Boolean)
        .join(", "),

      linkedin_url: basics.linkedin || null,

      whatsapp_opt_in: basics.joinCommunity,

      step_1_completed: true,

      step_2_completed: isOther,

      status: isOther ? "Completed" : "In Progress",

      step_2_data: {
        partner_id: next.partnerId,

        entity: basics.entity,

        company_name: basics.companyName,

        country_code: basics.countryCode,

        city: basics.city,

        state: basics.state,

        qualification_details: basics.qual,
      },
    });

    /**
     * If database saving fails:
     * don't move the user to Step 2.
     */
    if (dbError) {
      console.error("Supabase Step 1 error:", dbError);

      alert(
        "We couldn't save your details right now. Please try again."
      );

      setPhase("step1");
      scrollToForm();

      return;
    }

    /**
     * Supabase save succeeded.
     *
     * Keep localStorage as a backup and for restoring
     * the user's progress in the browser.
     */
    setRecord(next);
    saveRecord(next);

    /**
     * Keep the existing thank-you transition.
     */
    window.setTimeout(() => {
      setPhase(isOther ? "done" : "step2");
      scrollToForm();
    }, 1400);
  };

  /**
   * STEP 2
   *
   * Currently this completes the existing local prototype.
   *
   * We'll connect this to Supabase UPDATE after confirming
   * that Step 1 INSERT works correctly.
   */
  const handleSubmit = () => {
    if (!record) return;

    const now = new Date().toISOString();

    const next: PartnerRecord = {
      ...record,
      basics,
      profile,
      detailedFormCompleted: true,
      status: "Profile Completed",
      updatedAt: now,
    };

    setRecord(next);
    saveRecord(next);

    setPhase("done");
    scrollToForm();
  };

  /**
   * Continue keeping Step 2 progress locally.
   */
  const persistProfile = (updated: Profile) => {
    setProfile(updated);

    if (record) {
      const next: PartnerRecord = {
        ...record,
        profile: updated,
        detailedFormStarted: true,
        status: record.detailedFormCompleted
          ? record.status
          : "Profile In Progress",
        updatedAt: new Date().toISOString(),
      };

      setRecord(next);
      saveRecord(next);
    }
  };

  const track = trackFor(basics.partnerType);

  const showCommunityOptIn =
    track === "expert" || track === "consultant";

  const partnerLabel =
    PARTNER_TYPES.find(
      (p) => p.id === basics.partnerType
    )?.label ?? "Partner";

  return (
    <div
      ref={containerRef}
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-background p-6 shadow-[0_1px_2px_rgba(34,39,31,0.04)] sm:p-10">

        {phase !== "done" && phase !== "later" && (
          <ProgressHeader
            step={
              phase === "step1" || phase === "saving"
                ? 1
                : 2
            }
          />
        )}

        {/* STEP 1 */}
        {phase === "step1" && (
          <div className="step-fade mt-8">

            <StepOne
              data={basics}
              errors={errors}
              onChange={(patch) =>
                setBasics((b) => ({
                  ...b,
                  ...patch,
                }))
              }
            />

            <div className="mt-10 border-t border-border pt-8">

              {showCommunityOptIn && (
                <div className="step-fade mb-6">

                  <Checkbox
                    checked={
                      basics.joinCommunity !== false
                    }
                    onChange={(v) =>
                      setBasics((b) => ({
                        ...b,
                        joinCommunity: v,
                      }))
                    }
                    label="I'd like to join the First Batch Food Experts WhatsApp Community"
                  />

                </div>
              )}

              <button
                type="button"
                onClick={handleSaveAndContinue}
                className="w-full rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent-warm sm:w-auto"
              >
                Save &amp; Continue →
              </button>

              <p className="mt-3 text-sm text-muted-foreground">
                Your details are saved before moving to the
                next step.
              </p>

            </div>
          </div>
        )}

        {/* SAVING / THANK YOU */}
        {phase === "saving" && (
          <div className="step-fade mt-10 flex min-h-[22rem] flex-col items-center justify-center text-center">

            <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-2xl font-bold">
              ✓
            </span>

            <p className="mt-5 max-w-md text-lg font-semibold">
              Thank you for sharing your details! We'll reach
              out to you soon. 😊
            </p>

            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {record?.partnerId}
            </p>

          </div>
        )}

        {/* STEP 2 */}
        {phase === "step2" && (
          <div className="step-fade mt-8">

            <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl bg-cream px-4 py-3 text-sm">

              <span className="font-mono text-xs uppercase tracking-widest text-accent-warm">
                {record?.partnerId}
              </span>

              <span className="text-muted-foreground">
                {basics.fullName} · {partnerLabel}

                {basics.entity === "company" &&
                basics.companyName
                  ? ` · ${basics.companyName}`
                  : ""}
              </span>

            </div>

            <StepTwo
              partnerType={basics.partnerType}
              data={profile}
              set={(key, value) =>
                persistProfile({
                  ...profile,
                  [key]: value,
                })
              }
            />

            <div className="mt-10 border-t border-border pt-8">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent-warm sm:w-auto"
                >
                  Submit Partner Profile →
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPhase("step1");
                    scrollToForm();
                  }}
                  className="w-full rounded-full border border-border px-7 py-3.5 text-base font-medium transition-colors hover:bg-cream sm:w-auto"
                >
                  ← Back to Partner Details
                </button>

              </div>

              <button
                type="button"
                onClick={() => {
                  setPhase("later");
                  scrollToForm();
                }}
                className="mt-5 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent-warm"
              >
                Complete this later
              </button>

            </div>
          </div>
        )}

        {/* COMPLETE LATER */}
        {phase === "later" && (
          <div className="step-fade flex min-h-[20rem] flex-col items-center justify-center text-center">

            <span className="grid h-12 w-12 place-items-center rounded-full bg-butter text-xl">
              ✓
            </span>

            <h2 className="mt-5 text-2xl">
              No worries — we've saved your details.
            </h2>

            <p className="mt-2 max-w-md text-muted-foreground">
              Our team can follow up with you. You can pick up
              right where you left off whenever you're ready.
            </p>

            <button
              type="button"
              onClick={() => setPhase("step2")}
              className="mt-6 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-cream"
            >
              Continue my profile
            </button>

          </div>
        )}

        {/* COMPLETED */}
        {phase === "done" && (
          <SuccessState record={record} />
        )}

      </div>

      {record && phase !== "done" && (
        <p className="mx-auto mt-4 max-w-3xl text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Prototype record · {record.partnerId} ·{" "}
          {record.status}
        </p>
      )}

    </div>
  );
}

function ProgressHeader({
  step,
}: {
  step: 1 | 2;
}) {
  return (
    <div>

      <p className="eyebrow">
        Step {step} of 2
      </p>

      <p className="mt-1 text-lg font-semibold">
        {step === 1
          ? "Partner Details"
          : "Partner Profile"}
      </p>

      <div className="mt-4 flex items-center gap-3">

        <Dot
          state={
            step === 1
              ? "active"
              : "done"
          }
          label="1"
        />

        <span className="h-px flex-1 bg-border">
          <span
            className="block h-px bg-primary transition-all duration-500"
            style={{
              width:
                step === 2
                  ? "100%"
                  : "0%",
            }}
          />
        </span>

        <Dot
          state={
            step === 2
              ? "active"
              : "idle"
          }
          label="2"
        />

      </div>
    </div>
  );
}

function Dot({
  state,
  label,
}: {
  state: "idle" | "active" | "done";
  label: string;
}) {
  const cls =
    state === "active"
      ? "border-primary bg-primary text-primary-foreground"
      : state === "done"
        ? "border-primary bg-mint text-foreground"
        : "border-border bg-background text-muted-foreground";

  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-xs transition-colors ${cls}`}
    >
      {state === "done" ? "✓" : label}
    </span>
  );
}

function SuccessState({
  record,
}: {
  record: PartnerRecord | null;
}) {
  return (
    <div className="step-fade flex flex-col items-center py-6 text-center">

      <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-3xl font-bold">
        ✓
      </span>

      <h2 className="mt-6 text-4xl sm:text-5xl">
        You're in!
      </h2>

      <p className="mt-3 text-lg font-semibold">
        Thanks for joining the First Batch network.
      </p>

      <p className="mt-3 max-w-md text-muted-foreground">
        We've received your profile. Our team will review your
        details and reach out if there's a relevant opportunity
        to collaborate.
      </p>

      {record && (
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {record.partnerId} · {record.status}
        </p>
      )}

    </div>
  );
}