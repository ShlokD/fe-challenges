import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import EventListings from "..";

describe("<EventListings />", () => {
  it("should render event listings", async () => {
    render(
      <MemoryRouter>
        <EventListings />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/jingle bell rock concert/i)).toBeDefined();
    expect(screen.getByText(/gospel choir performance/i)).toBeDefined();

    const music = screen.getByRole("checkbox", { name: /music/i });
    expect(music).toBeDefined();
    const food = screen.getByRole("checkbox", { name: /food/i });
    expect(food).toBeDefined();
    const search = screen.getByRole("searchbox", { name: /search/i });
    expect(search).toBeDefined();

    fireEvent.click(food);
    expect(screen.queryByText(/jingle bell rock concert/i)).toBeNull();
    fireEvent.click(food);
    expect(await screen.findByText(/jingle bell rock concert/i)).toBeDefined();
    fireEvent.change(search, { target: { value: "jingle bell rock concert" } });
    expect(screen.queryByText(/gospel choir performance/i)).toBeNull();
    expect(screen.getByText(/jingle bell rock concert/i)).toBeDefined();
  });
});
