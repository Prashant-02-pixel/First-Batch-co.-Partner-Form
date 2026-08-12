import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type KeyboardEvent,
} from "react";

export function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-foreground">
        {label}{" "}
        {required && (
          <span className="text-accent-warm">*</span>
        )}
      </label>

      {hint && (
        <p className="mb-2 text-xs text-muted-foreground">
          {hint}
        </p>
      )}

      {children}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-accent-warm">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={`field-base ${props.className ?? ""}`}
    />
  );
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      rows={4}
      {...props}
      className={`field-base resize-y ${props.className ?? ""}`}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
  hidePlaceholderOption = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  hidePlaceholderOption?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-base appearance-none pr-10"
      >
        {!hidePlaceholderOption && (
          <option
            value=""
            disabled
            hidden
          >
            {placeholder ?? "Select one"}
          </option>
        )}

        {options.map((o) => (
          <option
            key={o}
            value={o}
          >
            {o}
          </option>
        ))}
      </select>

      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      >
        <path
          d="M5 8l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}

export function ChipGroup({
  options,
  value,
  onChange,
  multi = true,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
}) {
  const toggle = (o: string) => {
    if (!multi) {
      return onChange(
        value[0] === o ? [] : [o],
      );
    }

    onChange(
      value.includes(o)
        ? value.filter((v) => v !== o)
        : [...value, o],
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);

        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            aria-pressed={on}
            className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
              on
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-accent-warm hover:bg-cream"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function OptionCards({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: {
    id: string;
    label: string;
    hint?: string;
  }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${
        columns === 3
          ? "lg:grid-cols-3"
          : ""
      }`}
    >
      {options.map((o) => {
        const on = value === o.id;

        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={on}
            className={`rounded-xl border p-3.5 text-left transition-all ${
              on
                ? "border-primary bg-cream shadow-[0_1px_0_0_var(--primary)]"
                : "border-border bg-background hover:border-accent-warm/60 hover:bg-cream/60"
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-sm font-semibold">
                {o.label}
              </span>

              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                  on
                    ? "border-primary bg-primary"
                    : "border-border"
                }`}
              >
                {on && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                )}
              </span>
            </span>

            {o.hint && (
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {o.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function YesNo({
  value,
  onChange,
  options = ["Yes", "No"],
}: {
  value: string;
  onChange: (v: string) => void;
  options?: string[];
}) {
  return (
    <ChipGroup
      options={options}
      value={value ? [value] : []}
      onChange={(v) =>
        onChange(v[0] ?? "")
      }
      multi={false}
    />
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
      />

      <span>{label}</span>
    </label>
  );
}

/* =========================================================
   TAG INPUT
   ========================================================= */

export function TagInput({
  options,
  value,
  onChange,
  placeholder = "Search or type to add…",
  allowCustom = true,
  specialOther = false,
  customPlaceholder = "Add new option",
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  allowCustom?: boolean;
  specialOther?: boolean;
  customPlaceholder?: string;
}) {
  const [query, setQuery] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [customQuery, setCustomQuery] =
    useState("");

  /*
   * Ref for the complete TagInput component.
   *
   * This includes:
   * - selected capsules
   * - main selector
   * - dropdown
   * - dropdown search
   * - Other custom textbox
   */
  const tagInputRef =
    useRef<HTMLDivElement>(null);

  /*
   * Close the dropdown whenever the
   * user clicks outside this component.
   */
  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        tagInputRef.current &&
        !tagInputRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const OTHER_OPTION = "Other";

  const otherSelected =
    specialOther &&
    value.some(
      (v) =>
        v.trim().toLowerCase() ===
        OTHER_OPTION.toLowerCase(),
    );

  /*
   * "Other" is never shown as a capsule.
   * All other selected values are capsules.
   */
  const selectedValues =
    specialOther
      ? value.filter(
          (v) =>
            v.trim().toLowerCase() !==
            OTHER_OPTION.toLowerCase(),
        )
      : value;

  /*
   * Select an existing option.
   */
  const add = (
    option: string,
  ) => {
    const text =
      option.trim();

    if (!text) {
      return;
    }

    /*
     * Select "Other".
     */
    if (
      specialOther &&
      text.toLowerCase() ===
        OTHER_OPTION.toLowerCase()
    ) {
      const alreadySelected =
        value.some(
          (x) =>
            x.trim().toLowerCase() ===
            OTHER_OPTION.toLowerCase(),
        );

      if (!alreadySelected) {
        onChange([
          ...value,
          OTHER_OPTION,
        ]);
      }

      setQuery("");
      setOpen(false);

      return;
    }

    /*
     * Selecting a normal option
     * removes "Other" first.
     */
    const withoutOther =
      specialOther
        ? value.filter(
            (x) =>
              x.trim().toLowerCase() !==
              OTHER_OPTION.toLowerCase(),
          )
        : value;

    const alreadyExists =
      withoutOther.some(
        (x) =>
          x.trim().toLowerCase() ===
          text.toLowerCase(),
      );

    if (!alreadyExists) {
      onChange([
        ...withoutOther,
        text,
      ]);
    } else {
      onChange(
        withoutOther,
      );
    }

    setQuery("");
    setOpen(false);
  };

  /*
   * Add user's custom value from
   * the special "Other" textbox.
   */
  const addCustom = () => {
    const text =
      customQuery.trim();

    if (!text) {
      return;
    }

    /*
     * Don't allow "Other" as a
     * custom capsule.
     */
    if (
      specialOther &&
      text.toLowerCase() ===
        OTHER_OPTION.toLowerCase()
    ) {
      setCustomQuery("");
      return;
    }

    const alreadyExists =
      value.some(
        (x) =>
          x.trim().toLowerCase() ===
          text.toLowerCase(),
      );

    if (!alreadyExists) {
      onChange([
        ...value,
        text,
      ]);
    }

    setCustomQuery("");
  };

  /*
   * Remove a capsule.
   */
  const remove = (
    v: string,
  ) => {
    onChange(
      value.filter(
        (x) => x !== v,
      ),
    );
  };

  /*
   * Filter existing options.
   */
  const normalizedQuery =
    query.trim().toLowerCase();

  const suggestions =
    options.filter(
      (option) =>
        option
          .toLowerCase()
          .includes(
            normalizedQuery,
          ) &&
        !value.some(
          (selected) =>
            selected
              .toLowerCase() ===
            option.toLowerCase(),
        ),
    );

  /*
   * allowCustom is kept in the API
   * for compatibility with existing
   * partner components.
   */
  void allowCustom;

  return (
    /*
     * IMPORTANT:
     * tagInputRef must be on this OUTER
     * container so clicks inside the
     * dropdown/custom input do not
     * trigger the outside-click handler.
     */
    <div
      ref={tagInputRef}
      className="w-full"
    >
      {/* =====================================================
          SELECTED CAPSULES
      ===================================================== */}

      {selectedValues.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedValues.map(
            (v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground"
              >
                {v}

                <button
                  type="button"
                  aria-label={`Remove ${v}`}
                  onClick={() =>
                    remove(v)
                  }
                  className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  ×
                </button>
              </span>
            ),
          )}
        </div>
      )}

      {/* =====================================================
          MAIN SELECTOR
      ===================================================== */}

      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setOpen(
              (current) =>
                !current,
            )
          }
          className="field-base flex min-h-[3.5rem] w-full items-center justify-between text-left"
        >
          <span
            className={
              otherSelected
                ? "text-foreground"
                : "text-muted-foreground"
            }
          >
            {otherSelected
              ? "Other"
              : placeholder}
          </span>

          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
              open
                ? "rotate-180"
                : ""
            }`}
          >
            <path
              d="M5 8l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>

        {/* =====================================================
            DROPDOWN
        ===================================================== */}

        {open && (
          <div className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-[0_8px_24px_rgba(34,39,31,0.10)]">
            {/* Dropdown search */}
            <input
              autoFocus
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value,
                )
              }
              placeholder="Search your options..."
              className="field-base mb-2"
            />

            {/* Existing options */}
            {suggestions.length >
            0 ? (
              <div className="space-y-1">
                {suggestions.map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        add(option)
                      }
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-cream"
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            ) : (
              <p className="px-3 py-2 text-sm text-muted-foreground">
                No matching options found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          CUSTOM INPUT
          ONLY appears when "Other" is selected.
      ===================================================== */}

      {specialOther &&
        otherSelected && (
          <div className="mt-2">
            <input
              value={customQuery}
              onChange={(e) =>
                setCustomQuery(
                  e.target.value,
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  e.preventDefault();
                  addCustom();
                }
              }}
              placeholder={
                customPlaceholder
              }
              className="field-base"
            />
          </div>
        )}
    </div>
  );
}

/* =========================================================
   REPEATABLE TEXT INPUTS
   ========================================================= */

export function RepeatableTextInputs({
  value,
  onChange,
  placeholder = "Enter value",
  initialCount = 1,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  initialCount?: number;
}) {
  const items =
    value.length > 0
      ? value
      : Array.from(
          {
            length:
              initialCount,
          },
          () => "",
        );

  const inputRefs =
    useRef<
      HTMLInputElement[]
    >([]);

  const update = (
    index: number,
    text: string,
  ) => {
    const next = [
      ...items,
    ];

    next[index] = text;

    onChange(next);
  };

  const add = () => {
    onChange([
      ...items,
      "",
    ]);
  };

  const remove = (
    index: number,
  ) => {
    if (
      items.length === 1
    ) {
      onChange([""]);
      return;
    }

    onChange(
      items.filter(
        (_, i) =>
          i !== index,
      ),
    );
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    /*
     * Don't create an empty textbox.
     */
    if (
      !e.currentTarget.value.trim()
    ) {
      return;
    }

    const isLast =
      index ===
      items.length - 1;

    if (isLast) {
      add();

      /*
       * Focus the newly-created
       * textbox.
       */
      requestAnimationFrame(
        () => {
          inputRefs.current[
            index + 1
          ]?.focus();
        },
      );

      return;
    }

    /*
     * If next textbox already exists,
     * simply move the cursor there.
     */
    inputRefs.current[
      index + 1
    ]?.focus();
  };

  return (
    <div className="space-y-2">
      {items.map(
        (item, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <input
                ref={(el) => {
                  if (el) {
                    inputRefs.current[
                      index
                    ] = el;
                  }
                }}
                value={item}
                onChange={(e) =>
                  update(
                    index,
                    e.target.value,
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    index,
                  )
                }
                placeholder={
                  placeholder
                }
                className="field-base min-w-0 flex-1"
              />

              {index ===
                items.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    add();

                    requestAnimationFrame(
                      () => {
                        inputRefs.current[
                          index + 1
                        ]?.focus();
                      },
                    );
                  }}
                  aria-label="Add another"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-lg font-semibold text-foreground transition-colors hover:border-primary hover:bg-cream"
                >
                  +
                </button>
              )}

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    remove(index)
                  }
                  aria-label="Remove"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-lg font-semibold text-muted-foreground transition-colors hover:border-accent-warm hover:text-accent-warm"
                >
                  ×
                </button>
              )}
            </div>
          );
        },
      )}
    </div>
  );
}