import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import GridListView from "..";

global.fetch = vi.fn();

const data = {
  results: [
    {
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
      },
      location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
  ],
};

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("<GridListView />", () => {
  it("should render list and toggles", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <GridListView />
      </MemoryRouter>,
    );
    const gridBtn = await screen.findByRole("button", { name: /grid view/i });

    expect(gridBtn).toBeDefined();

    expect(screen.getByRole("button", { name: /list view/i })).toBeDefined();

    expect(screen.getByText(/rick sanchez/i)).toBeDefined();

    fireEvent.click(gridBtn);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /grid view/i }).disabled,
      ).toEqual(true);
    });
  });
});
