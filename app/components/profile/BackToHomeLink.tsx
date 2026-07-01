import { Link, useLocation } from "react-router";

export function BackToHomeLink() {
	const location = useLocation();
	const from: { pathname: string; search: string } = location.state?.from ?? { pathname: "/home", search: "" };
	const to = from ? { pathname: from.pathname, search: from.search } : "/home";

	return (
		<Link
			to={to}
			className="m-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
		>
			<span aria-hidden="true">←</span>
			Back to home
		</Link>
	);
}