export type Location = {
  name: string;
  type: string;
  dimension: string;
};

export type Episode = {
  name: string;
  episode: string;
}

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
  created: string;
}
