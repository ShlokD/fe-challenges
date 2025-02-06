import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import PhotoStories from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <PhotoStories />
    </MemoryRouter>,
  );
});

describe("<PhotoStories />", () => {
  it("should render add story button and ", async () => {
    const addStory = screen.getByRole("button", { name: /add story/i });
    expect(addStory).toBeDefined();
    const story1 = screen.getByRole("button", { name: /story-1/i });
    expect(story1).toBeDefined();
    expect(screen.getByRole("button", { name: /story-2/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /story-3/i })).toBeDefined();
    fireEvent.click(story1);
    const close = screen.getByRole("button", { name: /close/i });
    expect(close).toBeDefined();
    expect(
      screen.getByRole("progressbar", { name: /progress-1/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("progressbar", { name: /progress-2/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("progressbar", { name: /progress-3/i }),
    ).toBeDefined();
    fireEvent.click(close);

    fireEvent.click(addStory);
    expect(screen.getByRole("button", { name: /story-4/i })).toBeDefined();
  });
});
