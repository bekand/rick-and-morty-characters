import { useMemo, type ButtonHTMLAttributes, type ReactNode } from "react";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isCurrentPage?: boolean;
  ariaLabel?: string;
}
function PaginationButton({ children, isCurrentPage = false, ariaLabel, ...props }: PaginationButtonProps) {
  const baseClasses = "rounded border px-3 py-2 text-sm transition enabled:cursor-pointer";
  const activePageClasses = "border-slate-600 bg-slate-700 font-bold text-slate-100";
  const clickablePageClasses = "border-slate-700 bg-slate-800 text-slate-300 enabled:hover:bg-slate-700 disabled:opacity-50";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={isCurrentPage || props.disabled}
      className={`${baseClasses} ${isCurrentPage ? activePageClasses : clickablePageClasses} `}
      {...props}
    >
      {children}
    </button>
  );
}


interface PaginationProps {
  totalPages: number;
  pageNumber: number;
  setPage: (page: number) => void;
}

export function Pagination({ totalPages, pageNumber, setPage }: PaginationProps) {
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
      const isCurrentPage = page === pageNumber;
      if (isCurrentPage) {
        return (
          <PaginationButton key={page} isCurrentPage>
            {page}
          </PaginationButton>
        );
      }

      if ([1, 2, 3].includes(page) || [totalPages - 2, totalPages - 1, totalPages].includes(page) || Math.abs(page - pageNumber) === 1) {
        return (
          <PaginationButton key={page} onClick={() => setPage(page)} ariaLabel={`Go to page ${page}`}>
            {page}
          </PaginationButton>
        );
      }

      if (
        Math.abs(page - pageNumber) === 2 ||
        (pageNumber === 1 && page === 4) ||
        (pageNumber === totalPages && page === totalPages - 3)
      ) {
        return <span key={page} className="px-3 py-2 text-sm text-slate-400">...</span>;
      }

      return null;
    });
  }, [pageNumber, setPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label={`Pagination. You are currently on page ${pageNumber} of ${totalPages}.`}>
      <PaginationButton
        onClick={() => setPage(Math.max(1, pageNumber - 1))}
        disabled={pageNumber <= 1}
        ariaLabel="Go to previous page"
      >
        <span aria-hidden="true">←</span> Previous page
      </PaginationButton>

      {pageNumbers}

      <PaginationButton
        onClick={() => setPage(Math.min(totalPages, pageNumber + 1))}
        disabled={pageNumber >= totalPages}
        ariaLabel="Go to next page"
      >
        Next page <span aria-hidden="true">→</span>
      </PaginationButton>
    </nav>
  );
}
