import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "../debounce/useDebounce";

function normalizeSearchTerm(rawSearchTerm: string | null): string | undefined {
	const nameParam = rawSearchTerm?.trim().replace(/\s+/g, " ").slice(0, 50);
	if (nameParam && nameParam.length > 0) {
		return nameParam;
	}
	return undefined;
}

export function useSearch({ field }: { field: string }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const urlSearchTerm = normalizeSearchTerm(searchParams.get(field));
	const [searchTermValue, setSearchTermValue] = useState(urlSearchTerm);
	const debounce = useDebounce();

	// Sync local input when URL changes externally
	useEffect(() => {
		setSearchTermValue(urlSearchTerm);
	}, [urlSearchTerm]);


	const handleSearchChange = (term: string) => {
		setSearchTermValue(term);
		debounce(() => {
			setSearchTermParam(term);
		}, 300);
	};

	const setSearchTermParam = (rawTerm: string | null) => {
		const term = normalizeSearchTerm(rawTerm);
		setSearchParams((prev) => {
			const nextParams = new URLSearchParams(prev);
			if (term) {
				nextParams.set(field, term);
			} else {
				nextParams.delete(field);
			}
			nextParams.delete("page");
			return nextParams;
		}, { replace: true });
	};

	return {
		inputValue: searchTermValue,
		searchTerm: urlSearchTerm,
		handleSearchChange,
	};

}	