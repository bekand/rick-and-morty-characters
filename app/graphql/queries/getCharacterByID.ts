import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Character } from "~/types/Character";

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
	character(id: $id) {
	  id
	  name
	  status
	  species
	  type
	  gender
	  origin {
		name
		type
		dimension
	  }
	  location {
		name
		type
		dimension
	  }
	  image
	  episode {
	  	name
		episode
	  }
	  created
	}
  }` as TypedDocumentNode<{ character: Character }, { id: string }>;

export function useCharacterById(id: string, skip: boolean = false) {
  return useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip,
  });
}