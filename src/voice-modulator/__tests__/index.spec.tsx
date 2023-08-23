import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import VoiceModulator from "..";

describe("<Wishlist />", () => {
  it("should render buttons, audio and range", async () => {
    render(
      <MemoryRouter>
        <VoiceModulator />
      </MemoryRouter>,
    );
    const start = await screen.findByRole("button", { name: /start/i });
    expect(start).toBeDefined();
    expect(screen.getByRole("button", { name: /stop/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /clear/i })).toBeDefined();
    expect(screen.getByRole("slider", { name: /set pitch/i })).toBeDefined();
  });
});
