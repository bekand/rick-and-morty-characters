import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Character } from "~/types/Character";

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
	character(id: $id) {
	  id
	  name
	  image
	  status
	  species
	  type
	  gender
	  origin {
		  name
		  type
	  }
	  location {
		  name
		  type
	  }
	  episode {
	  	name
		  episode
	  }
	  created
	}
  }` as TypedDocumentNode<{ character: Character }, { id: number }>;

export function useCharacterById(id: number, skip: boolean = false) {
  return useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip,
  });
}