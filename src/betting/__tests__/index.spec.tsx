import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import Betting from "..";

global.fetch = vi.fn();

const data = [
  {
    id: "EVT_1",
    name: "Real Madrid vs Barcelona",
    markets: [
      {
        id: "MKT_1",
        name: "Team to Win",
        selections: [
          {
            id: "SEL_1",
            name: "Real Madrid",
            price: 1.23,
          },
          {
            id: "SEL_2",
            name: "Barcelona",
            price: 2.05,
          },
        ],
      },
      {
        id: "MKT_2",
        name: "Player to Score First",
        selections: [
          {
            id: "SEL_3",
            name: "Ronaldo",
            price: 1.15,
          },
          {
            id: "SEL_4",
            name: "Messi",
            price: 1.3,
          },
          {
            id: "SEL_5",
            name: "Bale",
            price: 1.35,
          },
        ],
      },
    ],
  },
  {
    id: "EVT_2",
    name: "Atletico Madrid vs Malaga",
    markets: [
      {
        id: "MKT_3",
        name: "Team to Win",
        selections: [
          {
            id: "SEL_6",
            name: "Atletico",
            price: 1.4,
          },
          {
            id: "SEL_7",
            name: "Malaga",
            price: 3.05,
          },
        ],
      },
    ],
  },
  {
    id: "EVT_3",
    name: "Empty Event that shouldn't render",
    markets: [],
  },
];

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("<Betting />", () => {
  it("should render betting header", async () => {
    render(
      <MemoryRouter>
        <Betting />
      </MemoryRouter>,
    );
    const openMenu = screen.getByRole("button", { name: /open menu/i });
    expect(openMenu).toBeDefined();
    fireEvent.click(openMenu);
    const close = await screen.findByRole("button", {
      name: /close menu/i,
    });
    expect(close).toBeDefined();
  });

  it("should render bets", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <Betting />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/real madrid vs barcelona/i)).toBeDefined();
    expect(screen.getAllByText(/team to win/i)).toHaveLength(2);
    expect(screen.getByText(/player to score first/i)).toBeDefined();
    expect(screen.getByRole("radio", { name: /real madrid/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /barcelona/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /ronaldo/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /messi/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /bale/i })).toBeDefined();
  });

  it("should render bets inside menu", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <Betting />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/real madrid vs barcelona/i)).toBeDefined();
    expect(screen.getAllByText(/team to win/i)).toHaveLength(2);
    expect(screen.getByText(/player to score first/i)).toBeDefined();
    let option = screen.getByRole("radio", { name: /real madrid/i });
    fireEvent.click(option);
    expect(option.defaultChecked).toEqual(true);
    const openMenu = screen.getByRole("button", { name: /open menu/i });
    expect(openMenu).toBeDefined();
    fireEvent.click(openMenu);
    expect(screen.getByText(/team to win: real madrid/i)).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    const close = await screen.findByRole("button", {
      name: /close menu/i,
    });
    fireEvent.click(close);
    option = screen.getByRole("radio", { name: /real madrid/i });
    expect(option.defaultChecked).toEqual(false);
  });
});
