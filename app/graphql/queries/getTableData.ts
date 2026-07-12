import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { TableRow } from "~/types/TableRow";

type CharactersTableResponse = {
  characters: {
    info: {
      count: number;
      pages: number;
    };
    results: TableRow[] | null;
  };
};

type SearchOptions = Partial<Pick<TableRow, "name" | "species" | "status">>;

const GET_TABLE_DATA = gql`
  query GetTableData($page: Int!, $name: String, $species: String, $status: String) {
    characters(page: $page, filter: { name: $name, species: $species, status: $status }) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
		    species
        status
      }
    }
  }
` as TypedDocumentNode<CharactersTableResponse, { page: number; name?: string | null; species?: string | null; status?: string | null }>;

export function useTableData(page: number, searchOptions?: SearchOptions) {
  return useQuery(GET_TABLE_DATA, { variables: { page, ...searchOptions } });
}
