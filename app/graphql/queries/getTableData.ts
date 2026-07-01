import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { TableRow } from "~/types/TableRow";

type CharactersTableResponse = {
  characters: {
    info: {
      count: number;
      pages: number;
    };
    results: TableRow[];
  };
};

const GET_TABLE_DATA = gql`
  query GetTableData($page: Int!, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
      }
      results {
        id
		image
        name
		species
        status
      }
    }
  }
` as TypedDocumentNode<CharactersTableResponse, { page: number; name: string | null }>;

export function useTableData(page: number, name: string | null) {
  return useQuery(GET_TABLE_DATA, { variables: { page, name }, skip: (!!name && name.trim() === "" )});
}
