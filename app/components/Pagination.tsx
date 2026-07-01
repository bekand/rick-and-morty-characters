import type { Dispatch, SetStateAction } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isActive?: boolean;
}
function PaginationButton({ children, isActive = false, ...props }: PaginationButtonProps) {
	const baseClasses = "rounded border px-3 py-2 text-sm transition";

	if (isActive) {
		return (
			<span className={`${baseClasses} border-slate-600 bg-slate-700 font-semibold text-slate-100`}>
				{children}
			</span>
		);
	}

	return (
		<button
			type="button"
			className={`${baseClasses} border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50`}
			{...props}
		>
			{children}
		</button>
	);
}


interface PaginationProps {
	totalPages: number;
	pageNumber: number;
	setPage: Dispatch<SetStateAction<number>>;
}

export function Pagination({ totalPages, pageNumber, setPage }: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex flex-wrap items-center gap-2">
			<PaginationButton
				onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
				disabled={pageNumber <= 1}
			>
				← Previous
			</PaginationButton>

			{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
				const isActive = page === pageNumber;
				if (isActive) {
					return (
						<PaginationButton key={page} isActive>
							{page}
						</PaginationButton>
					);
				} else if ([1, 2, 3].includes(page) ||
					[totalPages - 2, totalPages - 1, totalPages].includes(page) ||
					Math.abs(page - pageNumber) == 1) {
					return (
						<PaginationButton key={page} onClick={() => setPage(page)}>
							{page}
						</PaginationButton>
					);
				} else if (Math.abs(page - pageNumber) == 2 ||
					(pageNumber === 1 && page === 4) ||
					(pageNumber === totalPages && page === totalPages - 3)) {
					return <span key={page} className="px-3 py-2 text-sm text-slate-400">...</span>;
				}
			})}

			<PaginationButton
				onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
				disabled={pageNumber >= totalPages}
			>
				Next →
			</PaginationButton>
		</div>
	);
}
