import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import MicrowaveApp from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <MicrowaveApp />
    </MemoryRouter>,
  );
});

describe("<Promotions />", () => {
  it("should render display and buttons", async () => {
    expect(await screen.findByText(/0:00/i)).toBeDefined();
    const add10 = screen.getByRole("button", { name: /\+10s/i });
    const add60 = screen.getByRole("button", { name: /\+60s/i });
    expect(add10).toBeDefined();
    expect(add60).toBeDefined();
    expect(screen.getByRole("button", { name: /Start/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /stop/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /reset/i })).toBeDefined();

    fireEvent.click(add10);
    expect(await screen.findByText(/0:10/i)).toBeDefined();

    fireEvent.click(add60);
    expect(await screen.findByText(/1:10/i)).toBeDefined();
  });
});
