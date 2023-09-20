import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import LiftSimulator from "..";

describe("<LiftSimulator />", () => {
  it("should render buttons and floors", async () => {
    render(
      <MemoryRouter>
        <LiftSimulator />
      </MemoryRouter>,
    );
    const add = await screen.findByRole("button", { name: /add floor/i });
    expect(add).toBeDefined();
    const remove = screen.getByRole("button", { name: /remove floor/i });
    expect(remove).toBeDefined();
    expect(screen.getByText(/floor 6/i)).toBeDefined();
    expect(screen.getAllByRole("button", { name: /up/i })).toHaveLength(6);
    expect(screen.getAllByRole("button", { name: /down/i })).toHaveLength(6);
    fireEvent.click(add);
    expect(await screen.findByText(/floor 7/i)).toBeDefined();
    fireEvent.click(remove);
    expect(screen.queryByText(/floor 7/i)).toBeNull();
  });
});
