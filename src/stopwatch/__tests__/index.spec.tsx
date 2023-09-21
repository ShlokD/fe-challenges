import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Stopwatch from "..";

describe("<Stopwatch />", () => {
  it("should render time and buttons", async () => {
    render(
      <MemoryRouter>
        <Stopwatch />
      </MemoryRouter>,
    );
    const start = await screen.findByRole("button", { name: /start/i });
    expect(start).toBeDefined();
    expect(screen.getByRole("button", { name: /reset/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /split/i })).toBeDefined();
    expect(screen.getByText(/00:00:00/i)).toBeDefined();
    fireEvent.click(start);
    expect(screen.getByRole("button", { name: /stop/i })).toBeDefined();
  });
});
