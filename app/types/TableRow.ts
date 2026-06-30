import type { Character } from "./Character";

export type TableRow = Pick<Character, "id" | "name" | "status" | "species" | "image">;