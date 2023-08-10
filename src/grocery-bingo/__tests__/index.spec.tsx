import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import GroceryBingo from "..";

global.window.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

beforeEach(() => {
  render(
    <MemoryRouter>
      <GroceryBingo />
    </MemoryRouter>,
  );
});

describe("<GroceryBingo />", () => {
  it("should render form and grid", async () => {
    const input = await screen.findByRole("textbox", {
      name: /enter grocery item/i,
    });
    expect(input).toBeDefined();
    const add = screen.getByRole("button", { name: /add item/i });
    expect(add).toBeDefined();
    expect(screen.getByRole("button", { name: /clear list/i })).toBeDefined();
    expect(screen.getAllByRole("checkbox", { name: /free/i })).toHaveLength(25);

    fireEvent.change(input, { target: { value: "eggs" } });
    fireEvent.click(add);
    expect(screen.getAllByRole("checkbox", { name: /free/i })).toHaveLength(24);
    expect(screen.getByRole("checkbox", { name: /eggs/i })).toBeDefined();
  });
});
