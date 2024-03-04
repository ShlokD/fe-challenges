import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import NavigationBars from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <NavigationBars />
    </MemoryRouter>,
  );
});

describe("<NavigationBars />", () => {
  it("should render navigation bars", async () => {
    const text = await screen.findByText(/communication/i);
    expect(text).toBeDefined();
    expect(screen.getByText("MedTech")).toBeDefined();
    expect(screen.getByText("FinTech")).toBeDefined();
    expect(screen.getByText("ECommerce")).toBeDefined();
    expect(screen.getAllByRole("button", { name: /home/i })).toHaveLength(3);
    expect(screen.getAllByRole("button", { name: /profile/i })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /search/i })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /history/i })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /gift-cards/i })).toHaveLength(
      1,
    );
    expect(
      screen.getAllByRole("button", { name: /transactions/i }),
    ).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /settings/i })).toHaveLength(
      1,
    );
  });
});
