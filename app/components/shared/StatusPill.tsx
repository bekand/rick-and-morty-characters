import type { Character } from "~/types/Character";

interface StatusPillProps {
  status: Pick<Character, "status">["status"];
}

export function StatusPill({ status }: StatusPillProps) {
  const baseClasses = "rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition duration-200";

  let classes: string;

  switch (status) {
    case "Alive":
      classes = `${baseClasses} bg-emerald-500/15 text-emerald-300 ring-emerald-500/30`;
      break;
    case "Dead":
      classes = `${baseClasses} bg-rose-500/15 text-rose-300 ring-rose-500/30`;
      break;
    default:
      classes = `${baseClasses} bg-amber-500/15 text-amber-300 ring-amber-500/30`;
      break;
  }

  return <span className={classes}>{status}</span>;
}
