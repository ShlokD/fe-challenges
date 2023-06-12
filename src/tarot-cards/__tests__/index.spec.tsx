import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import TarotCards from "..";

describe("<TarotCards />", () => {
  it("should render tarot cards", async () => {
    render(
      <MemoryRouter>
        <TarotCards />
      </MemoryRouter>,
    );
    const shuffle = await screen.findByRole("button", { name: /shuffle/i });
    expect(shuffle).toBeDefined();
    await waitFor(() => {
      expect(screen.getAllByRole("button")).toHaveLength(79);
    });
  });
});
