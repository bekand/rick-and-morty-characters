import { useQuery } from "@tanstack/react-query";
import type { TableRow } from "~/types/TableRow";

const CHARACTER_API_URL = "https://rickandmortyapi.com/api/character";

type CharactersTableResponse = {
  characters: {
    info: {
      count: number;
      pages: number;
    };
    results: TableRow[] | null;
  };
};

async function fetchCharacters(page: number, name: string | null): Promise<CharactersTableResponse> {
  const params = new URLSearchParams({ page: String(page) });
  if (name?.trim()) {
    params.set("name", name.trim());
  }

  const response = await fetch(`${CHARACTER_API_URL}?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        characters: {
          info: { count: 0, pages: 1 },
          results: [],
        },
      };
    }
    throw new Error(`Failed to load character list (HTTP ${response.status}).`);
  }

  const json = (await response.json()) as {
    info: {
      count: number;
      pages: number;
    };
    results: TableRow[];
  };

  return {
    characters: {
      info: {
        count: json.info.count,
        pages: json.info.pages,
      },
      results: json.results,
    },
  };
}

export function useTableData(page: number, name: string | null) {
  const query = useQuery({
    queryKey: ["characters", page, name ?? ""],
    queryFn: () => fetchCharacters(page, name),
  });

  return {
    data: query.data,
    loading: query.isPending,
    error: query.error ?? undefined,
  };
}
