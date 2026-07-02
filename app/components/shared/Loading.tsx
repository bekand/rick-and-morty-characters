interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Loading" }: LoadingProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center py-10" >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-slate-100" />
        <div aria-live="polite" className="text-sm text-slate-300">
          {message}
        </div>
      </div>
    </div>
  );
}
