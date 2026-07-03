import type { Character } from "~/types/Character";

export const mockCharacter1: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
  location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [ {name: "Pilot", episode: "S01E01"} ],
  created: "2017-11-04T18:48:46.250Z",
};

export const mockCharacter2: Character = {
  id: 2,
  name: "Test Character",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Female",
  origin: { name: "Test Origin", url: "https://rickandmortyapi.com/api/location/100" },
  location: { name: "Test Location", url: "https://rickandmortyapi.com/api/location/101" },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: [ {name: "Test Episode", episode: "S01E01"} ],
  created: "2017-11-04T18:50:21.651Z",
};

export const mockCharactersResponse: { data: { characters: { results: Character[] } } } = {
  data: {
	characters: {
		results: [mockCharacter1, mockCharacter2],
	},
  },
};