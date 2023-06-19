import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import GymSearch from "..";

global.fetch = vi.fn();

const data = {
  locations: [
    {
      id: 10998878976097,
      title: "Dom Severino",
      content:
        "\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n",
      opened: true,
      mask: "required",
      towel: "required",
      fountain: "partial",
      locker_room: "allowed",
      schedules: [
        {
          weekdays: "Seg. à Sex.",
          hour: "06h às 22h",
        },
        {
          weekdays: "Sáb.",
          hour: "Fechada",
        },
        {
          weekdays: "Dom.",
          hour: "Fechada",
        },
      ],
    },
  ],
};

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("<TarotCards />", () => {
  it("should render gym search", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <GymSearch />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /smart fit reopening/i }),
    ).toBeDefined();

    expect(screen.getByText(/what period do you want to train/i)).toBeDefined();
    expect(screen.getByRole("radio", { name: /morning/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /afternoon/i })).toBeDefined();

    expect(screen.getByRole("radio", { name: /night/i })).toBeDefined();

    expect(screen.getByText("Mask")).toBeDefined();
    expect(screen.getByText("Towel")).toBeDefined();
    expect(screen.getByText("Fountain")).toBeDefined();
    expect(screen.getByText("Locker Room Access")).toBeDefined();

    expect(screen.getByText("Dom Severino")).toBeDefined();
    expect(screen.getByText("06h às 22h")).toBeDefined();
    expect(screen.getAllByText("Fechada")).toHaveLength(2);
  });
});
