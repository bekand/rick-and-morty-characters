import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCharacterById } from "~/api/queries/getCharacterByID";
import { useTableData } from "~/api/queries/getTableData";
import Home from "~/routes/home";
import Profile from "~/routes/profile";
import { mockCharacter1, mockCharactersResponse } from "./mockData";
import { LocationProbe } from "./LocationProbe";

vi.mock("../app/api/queries/getTableData.ts", () => ({
  useTableData: vi.fn(),
}));

vi.mock("../app/api/queries/getCharacterByID.ts", () => ({
  useCharacterById: vi.fn(),
}));


describe("Home route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to a profile page when a character name is clicked", () => {
    vi.mocked(useTableData).mockReturnValue({
      data: {
        characters: {
          ...mockCharactersResponse.data.characters,
          info: {
            count: 2,
            pages: 1,
          },
        },
      },
      loading: false,
      error: undefined,
    } as unknown as ReturnType<typeof useTableData>);

    vi.mocked(useCharacterById).mockReturnValue({
      data: { character: mockCharacter1 },
      loading: false,
      error: undefined,
    } as unknown as ReturnType<typeof useCharacterById>);

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Rick Sanchez" }));

    expect(screen.getByRole("heading", { name: "Rick Sanchez" })).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
  });


  it("shows an error state and Search bar, when the GraphQL query fails", () => {
    vi.mocked(useTableData).mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: "GraphQL query failed." },
    } as ReturnType<typeof useTableData>);

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByText("GraphQL query failed.")).toBeInTheDocument();

  });

  it("shows a loading state and Search bar, when the GraphQL query is loading", () => {
    vi.mocked(useTableData).mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    } as ReturnType<typeof useTableData>);

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByText("Loading characters...")).toBeInTheDocument();
  });

  it("shows the table when the GraphQL query has loaded data", () => {
    vi.mocked(useTableData).mockReturnValue({
      data: {
        characters: {
          ...mockCharactersResponse.data.characters,
          info: {
            count: 2,
            pages: 1,
          },
        },
      },
      loading: false,
      error: undefined,
    } as unknown as ReturnType<typeof useTableData>);

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Test Character")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 characters on page 1 of 1.")).toBeInTheDocument();
  });

  it("still renders with malformed URL params", () => {
    const useTableDataMock = vi.mocked(useTableData);
    useTableDataMock.mockReturnValue({
      data: {
        characters: {
          ...mockCharactersResponse.data.characters,
          info: {
            count: 2,
            pages: 1,
          },
        },
      },
      loading: false,
      error: undefined,
    } as unknown as ReturnType<typeof useTableData>);

    render(
      <MemoryRouter initialEntries={["/home?page=not-a-number&name=%20%20%20"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 characters on page 1 of 1.")).toBeInTheDocument();
    expect(useTableDataMock).toHaveBeenCalledWith(1, null);
  });

  it("updates the url params and refetches after the search debounce", async () => {
    vi.useFakeTimers();

    const useTableDataMock = vi.mocked(useTableData);
    useTableDataMock.mockReturnValue({
      data: {
        characters: {
          ...mockCharactersResponse.data.characters,
          info: {
            count: 2,
            pages: 1,
          },
        },
      },
      loading: false,
      error: undefined,
    } as unknown as ReturnType<typeof useTableData>);

    try {
      render(
        <MemoryRouter initialEntries={["/home?page=2"]}>
          <LocationProbe />
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </MemoryRouter>,
      );

      fireEvent.change(screen.getByRole("textbox", { name: "Search" }), { target: { value: "Rick" } });

      expect(screen.getByTestId("location-probe")).toHaveTextContent("?page=2");
      expect(useTableDataMock).not.toHaveBeenCalledWith(1, "Rick");

      await act(async () => {
        await vi.advanceTimersByTimeAsync(300);
      });

      expect(screen.getByTestId("location-probe")).toHaveTextContent("name=Rick");
      expect(screen.getByTestId("location-probe")).toHaveTextContent("page=1");
      expect(useTableDataMock).toHaveBeenCalledWith(1, "Rick");
    } finally {
      vi.useRealTimers();
    }
  });


});
