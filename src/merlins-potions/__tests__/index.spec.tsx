import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import PotionsStore from "..";

describe("<PotionsStore />", () => {
  it("should render list of potions", async () => {
    render(
      <MemoryRouter>
        <PotionsStore />
      </MemoryRouter>,
    );
    const agingPotion = await screen.findByRole("button", {
      name: /aging potion/i,
    });
    expect(agingPotion).toBeDefined();
    expect(
      screen.getByRole("button", { name: /bulgeye potion/i }),
    ).toBeDefined();
    fireEvent.click(agingPotion);

    expect(
      await screen.findByText("Causes the drinker to advance in age"),
    ).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    fireEvent.click(screen.getByRole("button", { name: /open cart/i }));
    expect(screen.getByText("Your Cart")).toBeDefined();
  });
});
