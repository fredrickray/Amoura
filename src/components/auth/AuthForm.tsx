import { cn } from "@/lib/utils";

export function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  className,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)} htmlFor={id}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        className="h-12 rounded-full border border-line bg-surface px-5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-[var(--ease-out-strong)] placeholder:text-ink-muted focus:border-ink/40 focus:shadow-[0_0_0_4px_rgba(17,17,17,0.06)]"
      />
    </label>
  );
}

export function AuthSubmit({
  children,
  className,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "pill pill-solid w-full cursor-hover justify-center py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-flex size-5 items-center justify-center rounded-full bg-white/15 text-[11px]"
      >
        →
      </span>
    </button>
  );
}

export function AuthDivider({ label = "or continue with" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs uppercase tracking-[0.08em] text-ink-muted">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function AuthSocialButtons({
  onContinue,
}: {
  onContinue?: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onContinue}
        className="flex h-12 cursor-hover items-center justify-center gap-2 rounded-full border border-line bg-surface text-sm font-medium transition-colors duration-200 hover:bg-surface-soft active:scale-[0.98]"
      >
        <GoogleIcon />
        Google
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="flex h-12 cursor-hover items-center justify-center gap-2 rounded-full border border-line bg-surface text-sm font-medium transition-colors duration-200 hover:bg-surface-soft active:scale-[0.98]"
      >
        <AppleIcon />
        Apple
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 17" fill="currentColor" aria-hidden>
      <path d="M11.66 8.78c.02-2.1 1.72-3.11 1.8-3.16-1-1.45-2.53-1.65-3.07-1.67-1.3-.13-2.55.77-3.21.77-.67 0-1.69-.75-2.78-.73-1.42.02-2.74.83-3.47 2.11-1.49 2.59-.38 6.41 1.06 8.51.71 1.03 1.55 2.18 2.65 2.14 1.07-.04 1.47-.69 2.76-.69 1.28 0 1.65.69 2.77.67 1.15-.02 1.87-1.04 2.57-2.08.81-1.18 1.14-2.33 1.16-2.39-.03-.01-2.21-.85-2.24-3.48ZM9.7 2.73c.58-.71.98-1.69.87-2.67-.84.03-1.86.56-2.46 1.27-.54.62-1.01 1.63-.88 2.58.93.07 1.88-.47 2.47-1.18Z" />
    </svg>
  );
}
