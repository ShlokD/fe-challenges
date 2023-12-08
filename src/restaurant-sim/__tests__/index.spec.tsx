import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import RestaurantSim from "..";

describe("<RestaurantSim />", () => {
  it("should render simulator elements", async () => {
    render(
      <MemoryRouter>
        <RestaurantSim />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /add customer/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: /restaurant/i, level: 2 }),
    ).toBeDefined();
    expect(screen.getByText(/cook 1 idle/i)).toBeDefined();
    const addCookBtn = screen.getByRole("button", { name: /add cook/i });
    fireEvent.click(addCookBtn);
    expect(screen.getByText(/cook 2 idle/i)).toBeDefined();

  });
});
