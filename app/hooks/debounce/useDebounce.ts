import { useCallback, useEffect, useRef } from "react";


export function useDebounce() {
	const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, []);

	return useCallback((callback: () => void, delay: number) => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}
		debounceTimeoutRef.current = setTimeout(callback, delay);
	}, []);;
}