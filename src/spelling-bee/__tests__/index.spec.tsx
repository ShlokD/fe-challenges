import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import SpellingBee from "..";

global.fetch = vi.fn();
global.window.SpeechSynthesisUtterance = vi.fn();
global.window.speechSynthesis = {
  getVoices: vi.fn(),
  speak: vi.fn(),
};
function createFetchResponse() {
  return {
    text: () => new Promise((resolve) => resolve("abcdefghi\r\n")),
  };
}

describe("<SpellingBee />", () => {
  it("should renderselng elements", async () => {
    fetch.mockResolvedValue(createFetchResponse());

    render(
      <MemoryRouter>
        <SpellingBee />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("button", { name: /play word/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("textbox", { name: /enter spelling/i }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /give up/i })).toBeDefined();
    expect(screen.getByText(/score 0/i)).toBeDefined();
  });
});
