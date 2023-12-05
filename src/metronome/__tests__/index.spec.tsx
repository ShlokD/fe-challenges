import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Metronome from "..";

describe("<Metronome />", () => {
  it("should render list of potions", async () => {
    render(
      <MemoryRouter>
        <Metronome />
      </MemoryRouter>,
    );
    const play = await screen.findByRole("button", {
      name: /play/i,
    });
    expect(play).toBeDefined();
    expect(screen.getByRole("slider", { name: /60 bpm/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /decrease bpm/i })).toBeDefined();
    const increase = screen.getByRole("button", { name: /increase bpm/i });
    expect(increase).toBeDefined();
    fireEvent.click(increase);
    expect(screen.getByRole("slider", { name: /61 bpm/i })).toBeDefined();
  });
});
