import { useQuery } from "@tanstack/react-query";
import type { Character, Episode } from "~/types/Character";

type CharacterApiResponse = Omit<Character, "episode"> & {
	episode: string[];
};

const CHARACTER_API_URL = "https://rickandmortyapi.com/api/character";
const EPISODE_API_URL = "https://rickandmortyapi.com/api/episode";

function extractEpisodeIds(episodeUrls: string[]): string[] {
	return episodeUrls
		.map((url) => url.split("/").pop() ?? "")
		.filter((id) => id.length > 0);
}

async function fetchEpisodesByIds(ids: string[]) {
	if (ids.length === 0) {
		return [] as Episode[];
	}

	const response = await fetch(`${EPISODE_API_URL}/${ids.join(",")}`);
	if (!response.ok) {
		throw new Error(`Failed to load episodes (HTTP ${response.status}).`);
	}

	const json = (await response.json()) as Episode | Episode[];
	return Array.isArray(json) ? json : [json];
}

async function fetchCharacterById(id: number): Promise<{ character: Character }> {
	const response = await fetch(`${CHARACTER_API_URL}/${id}`);
	if (!response.ok) {
		throw new Error(response.status === 404 ? "Character not found." : `Failed to load character (HTTP ${response.status}).`);
	}

	const json = (await response.json()) as CharacterApiResponse;
	const episodeIds = extractEpisodeIds(json.episode);
	const episodes = await fetchEpisodesByIds(episodeIds);

	return {
		character: {
			id: json.id,
			name: json.name,
			image: json.image,
			status: json.status,
			species: json.species,
			type: json.type,
			gender: json.gender,
			origin: {
				name: json.origin.name,
				url: json.origin.url,
			},
			location: {
				name: json.location.name,
				url: json.location.url,
			},
			episode: episodes,
			created: json.created,
		},
	};
}

export function useCharacterById(id: number, skip: boolean = false) {
	const query = useQuery({
		queryKey: ["character", id],
		queryFn: () => fetchCharacterById(id),
		enabled: !skip,
  });

	return {
		data: query.data,
		loading: !skip && query.isPending,
		error: query.error ?? undefined,
	};
}