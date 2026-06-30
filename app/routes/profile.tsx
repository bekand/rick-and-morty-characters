import { Link, useParams } from "react-router";
import { CharacterProfile } from "~/components/CharacterProfile";
import { Loading } from "~/components/shared/Loading";
import { ErrorMessage } from "~/components/shared/ErrorMessage";
import { useCharacterById } from "~/graphql/queries/getCharacterByID";

export function meta({ params }: { params: Record<string, string> }) {
	return [
		{ title: `Profile #${params.id}` },
		{ name: "description", content: `Profile page for character #${params.id}.` },
	];
}

function BackToHomeLink() {
	return (
		<Link
			to="/"
			className="m-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
		>
			<span aria-hidden="true">←</span>
			Back to home
		</Link>
	);
}

export default function Profile() {
	const params = useParams();
	const id = params.id ?? "";
	const isValidId = /^\d+$/.test(id);
	const { data, loading, error } = useCharacterById(id, !isValidId);

	if (loading) return <Loading />;

	if (error || !data?.character || !isValidId) {
		const message = !isValidId
			? "Invalid character ID."
			: error?.message ?? "Character not found.";
		return <ErrorMessage message={message} children={<BackToHomeLink />} />;
	}

	return (
		<>
			<BackToHomeLink />
			<CharacterProfile character={data.character} />
		</>
	);
}
