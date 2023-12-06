import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import DeepBreathing from "..";

describe("<DeepBreathing />", () => {
  it("should render breathing exercise elements", async () => {
    render(
      <MemoryRouter>
        <DeepBreathing />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("button", { name: /start/i })).toBeDefined();
    const settings = screen.getByRole("button", { name: /settings/i });
    expect(settings).toBeDefined();
    fireEvent.click(settings);
    expect(
      await screen.findByRole("slider", { name: /breathe: 4s/i }),
    ).toBeDefined();
    expect(screen.getByRole("slider", { name: /hold: 2s/i })).toBeDefined();
    expect(screen.getByText(/begin/i)).toBeDefined();
  });
});
