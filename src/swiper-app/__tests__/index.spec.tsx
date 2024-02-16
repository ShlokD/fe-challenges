import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import SwiperApp from "..";

describe("<SwiperApp />", () => {
  it("should render cards and buttons", async () => {
    render(
      <MemoryRouter>
        <SwiperApp />
      </MemoryRouter>,
    );
    const card = await screen.findByAltText("Card 1");
    expect(card).toBeDefined();
    expect(screen.getByRole("button", { name: "Like" })).toBeDefined();
    expect(screen.getByRole("button", { name: /dislike/i })).toBeDefined();
  });
});
