interface StatusPillProps {
  status: string;
}

export function StatusPill({ status }: StatusPillProps) {
  const baseClasses = "rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition duration-200";

  let classes = `${baseClasses} bg-amber-500/15 text-amber-300 ring-amber-500/30`;

  switch (status.toLowerCase()) {
    case "alive":
      classes = `${baseClasses} bg-emerald-500/15 text-emerald-300 ring-emerald-500/30`;
      break;
    case "dead":
      classes = `${baseClasses} bg-rose-500/15 text-rose-300 ring-rose-500/30`;
      break;
  }

  return <span className={classes}>{status}</span>;
}
