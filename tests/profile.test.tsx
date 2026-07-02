import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Profile from "../app/routes/profile";
import { useCharacterById } from "../app/graphql/queries/getCharacterByID";
import { mockCharacter1 } from "./mockData";
import { LocationProbe } from "./LocationProbe";

vi.mock("../app/graphql/queries/getCharacterByID", () => ({
  useCharacterById: vi.fn(),
}));

describe("Profile route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows an error state and can navigate back to home when the character is not found", () => {
    vi.mocked(useCharacterById).mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: "Character not found." },
    } as ReturnType<typeof useCharacterById>);

    render(
      <MemoryRouter initialEntries={["/profile/not-a-number"]}>
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/home" element={<div>Home page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Invalid character ID.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to home/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /back to home/i }));

    expect(screen.getByText("Home page")).toBeInTheDocument();
  });

  it("shows a loading state when the character data is loading", () => {
    vi.mocked(useCharacterById).mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    } as ReturnType<typeof useCharacterById>);
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading details for character #1...")).toBeInTheDocument();
  });


  it("shows character details when the character data is loaded", () => {
    vi.mocked(useCharacterById).mockReturnValue({
      data: { character: mockCharacter1 },
      loading: false,
      error: undefined,
    } as unknown as ReturnType<typeof useCharacterById>);

    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });


  it("preserves the current search params when navigating back to home", () => {
    vi.mocked(useCharacterById).mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: "Character not found." },
    } as ReturnType<typeof useCharacterById>);

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/profile/not-a-number", search: "?name=rick&page=2", state: { from: { pathname: "/home", search: "?name=rick&page=2" } } }]}
      >
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/home" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link", { name: /back to home/i }));

    expect(screen.getByTestId("location-probe")).toHaveTextContent("/home?name=rick&page=2");
  });
});
