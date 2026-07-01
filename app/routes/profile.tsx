import { useParams } from "react-router";
import { CharacterProfile } from "~/components/profile/CharacterProfile";
import { Loading } from "~/components/shared/Loading";
import { ErrorMessage } from "~/components/shared/ErrorMessage";
import { useCharacterById } from "~/graphql/queries/getCharacterByID";
import { BackToHomeLink } from "~/components/profile/BackToHomeLink";

export function meta({ params }: { params: Record<string, string> }) {
	return [
		{ title: `Profile #${params.id}` },
		{ name: "description", content: `Profile page for character #${params.id}.` },
	];
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
