import { useId } from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function Search({ value, onChange, label = "Search", placeholder = "Search by name" }: SearchProps) {
  const inputId = useId();

  return (
    <div className="size-full">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-sm">
        <input
          name="search by name"
          maxLength={50}
          id={inputId}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
        />
         <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="rounded p-1 text-sm text-slate-400 transition enabled:cursor-pointer enabled:hover:bg-slate-800 enabled:hover:text-slate-100 disabled:opacity-50"
            disabled={!value}
          >
            Clear
          </button>
      </div>
    </div>
  );
}
