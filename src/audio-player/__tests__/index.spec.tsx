import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import AudioPlayer from "..";

describe("<AudioPlayer />", () => {
  it("should render audio player widgets", async () => {
    render(
      <MemoryRouter>
        <AudioPlayer />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/add an audio file/i)).toBeDefined();

    expect(screen.getByRole("button", { name: /prev/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /next/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /repeat/i })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: /shuffle/i })).toBeDefined();
  });
});
