import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  StepOne,
  validateBasics,
  type Errors,
} from "./StepOne";

import { Checkbox } from "./fields";

import { supabase } from "@/lib/supabase";

import {
  EMPTY_BASICS,
  PARTNER_TYPES,
  loadRecord,
  saveRecord,
  makePartnerId,
  type BasicDetails,
  type PartnerRecord,
} from "@/lib/partner-onboarding";

const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/D8aKoArz25zAp6oFtp7hBP?s=cl&p=i&mlu=0";

type Phase =
  | "form"
  | "saving"
  | "done";

export function PartnerOnboarding() {
  const [phase, setPhase] =
    useState<Phase>("form");

  const [basics, setBasics] =
    useState<BasicDetails>(
      EMPTY_BASICS,
    );

  const [errors, setErrors] =
    useState<Errors>({});

  const [record, setRecord] =
    useState<PartnerRecord | null>(
      null,
    );

  const [submitting, setSubmitting] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing =
      loadRecord();

    if (!existing) return;

    if (
      existing.detailedFormCompleted
    ) {
      window.localStorage.removeItem(
        "fb_partner_record",
      );

      window.localStorage.removeItem(
        "fb_partner_supabase_id",
      );

      setRecord(null);

      setBasics({
        ...EMPTY_BASICS,
      });

      setPhase("form");

      return;
    }

    setRecord(existing);

    setBasics({
      ...EMPTY_BASICS,
      ...existing.basics,
    });
  }, []);

  const scrollToForm = () => {
    containerRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
      },
    );
  };

  const partnerLabel =
    PARTNER_TYPES.find(
      (partner) =>
        partner.id ===
        basics.partnerType,
    )?.label ?? "Partner";

  const handleSubmit =
    async () => {
      if (submitting) return;

      const found =
        validateBasics(
          basics,
        );

      setErrors(found);

      if (
        Object.keys(found)
          .length > 0
      ) {
        scrollToForm();
        return;
      }

      setSubmitting(true);
      setPhase("saving");
      scrollToForm();

      const now =
        new Date().toISOString();

      const partnerId =
        record?.partnerId ??
        makePartnerId();

      const nextRecord: PartnerRecord =
        record
          ? {
              ...record,
              basics,
              basicFormCompleted:
                true,
              detailedFormStarted:
                true,
              detailedFormCompleted:
                true,
              status:
                "Profile Completed",
              updatedAt: now,
            }
          : {
              partnerId,
              basics,
              profile: {},
              basicFormCompleted:
                true,
              detailedFormStarted:
                true,
              detailedFormCompleted:
                true,
              status:
                "Profile Completed",
              createdAt: now,
              updatedAt: now,
            };

      /*
       * Your existing Supabase table has step_2_data,
       * so we use that existing JSONB column to store
       * all partner-specific fields from this single form.
       */

      const formData = {
        partner_id:
          partnerId,

        country_code:
          basics.countryCode,

        entity:
          basics.entity || null,

        company_name:
          basics.companyName || null,

        city:
          basics.city,

        state:
          basics.state,

        drive_link:
          basics.qual["driveLink"] ??
          null,

        qualification_details:
          basics.qual,
      };

      const {
        data: insertedPartner,
        error: dbError,
      } = await supabase
        .from("partners")
        .insert({
          full_name:
            basics.fullName,

          email:
            basics.email,

          phone:
            `${basics.countryCode}${basics.phone}`,

          partner_type:
            basics.partnerType,

          location: [
            basics.city,
            basics.state,
          ]
            .filter(Boolean)
            .join(", "),

          linkedin_url:
            basics.linkedin ||
            null,

          whatsapp_opt_in:
            basics.joinCommunity,

          step_1_completed:
            true,

          /*
           * There is no user-facing Step 2.
           * This remains true only for compatibility
           * with the existing database structure.
           */
          step_2_completed:
            true,

          status:
            "Completed",

          step_2_data:
            formData,
        })
        .select("id")
        .single();

      if (
        dbError ||
        !insertedPartner
      ) {
        console.error(
          "Supabase submission error:",
          dbError,
        );

        alert(
          "We couldn't save your details right now. Please try again.",
        );

        setPhase("form");
        setSubmitting(false);
        scrollToForm();

        return;
      }

      window.localStorage.setItem(
        "fb_partner_supabase_id",
        insertedPartner.id,
      );

      setRecord(
        nextRecord,
      );

      saveRecord(
        nextRecord,
      );

      setSubmitting(false);
      setPhase("done");
      scrollToForm();
    };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div
      ref={containerRef}
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-background p-6 shadow-[0_1px_2px_rgba(34,39,31,0.04)] sm:p-10">

        {phase === "form" && (
          <div className="step-fade">

            <StepOne
              data={basics}
              errors={errors}
              onChange={(patch) => {
                setBasics(
                  (current) => ({
                    ...current,
                    ...patch,
                  }),
                );

                setErrors({});
              }}
            />

            <div className="mt-10 border-t border-border pt-8">

              <div className="step-fade mb-6">

                <Checkbox
                  checked={
                    basics.joinCommunity
                  }
                  onChange={(value) =>
                    setBasics(
                      (current) => ({
                        ...current,
                        joinCommunity:
                          value,
                      }),
                    )
                  }
                  label="I'd like to join the First Batch Food Experts WhatsApp Community"
                />

              </div>

              <button
                type="button"
                disabled={
                  submitting
                }
                onClick={
                  handleSubmit
                }
                className="w-full rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent-warm disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit →"}
              </button>

            </div>
          </div>
        )}

        {phase === "saving" && (
          <div className="step-fade mt-10 flex min-h-[13rem] flex-col items-center justify-center text-center">

            <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-2xl font-bold">
              ✓
            </span>

            <p className="mt-4 max-w-md text-lg font-semibold">
              Thank you,{" "}
              {basics.fullName}.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              We're submitting your details.
            </p>

          </div>
        )}

        {phase === "done" && (
          <SuccessState
            name={
              basics.fullName
            }
            partnerLabel={
              partnerLabel
            }
            onBack={
              handleBackToHome
            }
          />
        )}

      </div>
    </div>
  );
}

function SuccessState({
  name,
  partnerLabel,
  onBack,
}: {
  name: string;
  partnerLabel: string;
  onBack: () => void;
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

      <div className="mt-5 rounded-2xl bg-cream px-5 py-3 text-sm">

        <span className="font-medium">
          {name}
        </span>

        <span className="text-muted-foreground">
          {" "}
          · {partnerLabel}
        </span>

      </div>

      <p className="mt-5 max-w-md text-muted-foreground">
        We've received your details. Whenever we have a relevant project or collaboration opportunity, we'll reach out to you.
      </p>

      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        Stay updated on project opportunities through the First Batch Food Experts WhatsApp Community.
      </p>

      <a
        href={
          WHATSAPP_COMMUNITY_URL
        }
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-cream"
      >
        Join the First Batch Food Experts WhatsApp Community →
      </a>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-warm"
      >
        Back to Home
      </button>

    </div>
  );
}