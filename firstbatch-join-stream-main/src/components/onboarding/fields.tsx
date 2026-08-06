import { useState, type ReactNode } from "react";

export function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {

  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-accent-warm">*</span>}
      </label>
      {hint && <p className="mb-2 text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-accent-warm">{error}</p>}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`field-base ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={`field-base resize-y ${props.className ?? ""}`} />;
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-base appearance-none pr-10"
      >
        <option value="">{placeholder ?? "Select one"}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      >
        <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
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
    if (!multi) return onChange(value[0] === o ? [] : [o]);
    onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
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
  options: { id: string; label: string; hint?: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
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
              <span className="min-w-0 truncate text-sm font-semibold">{o.label}</span>
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                  on ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {on && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
              </span>
            </span>
            {o.hint && <span className="mt-0.5 block text-xs text-muted-foreground">{o.hint}</span>}
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
  return <ChipGroup options={options} value={value ? [value] : []} onChange={(v) => onChange(v[0] ?? "")} multi={false} />;
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
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
      />
      <span>{label}</span>
    </label>
  );
}

export function TagInput({
  options,
  value,
  onChange,
  placeholder = "Search or type to add…",
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const add = (v: string) => {
    const t = v.trim();
    if (!t) return;
    if (!value.some((x) => x.toLowerCase() === t.toLowerCase())) onChange([...value, t]);
    setQuery("");
  };
  const remove = (v: string) => onChange(value.filter((x) => x !== v));

  const suggestions = options.filter(
    (o) =>
      o.toLowerCase().includes(query.trim().toLowerCase()) &&
      !value.some((x) => x.toLowerCase() === o.toLowerCase()),
  );
  const canAddCustom =
    query.trim().length > 0 &&
    !options.some((o) => o.toLowerCase() === query.trim().toLowerCase()) &&
    !value.some((x) => x.toLowerCase() === query.trim().toLowerCase());

  return (
    <div className="relative">
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {value.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground"
            >
              {v}
              <button
                type="button"
                aria-label={`Remove ${v}`}
                onClick={() => remove(v)}
                className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(query);
          }
        }}
        placeholder={placeholder}
        className="field-base"
      />
      {open && (suggestions.length > 0 || canAddCustom) && (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-background p-1 shadow-[0_8px_24px_rgba(34,39,31,0.10)]">
          {suggestions.map((o) => (
            <button
              key={o}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => add(o)}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-cream"
            >
              {o}
            </button>
          ))}
          {canAddCustom && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => add(query)}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-accent-warm transition-colors hover:bg-cream"
            >
              Add “{query.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  );
}
