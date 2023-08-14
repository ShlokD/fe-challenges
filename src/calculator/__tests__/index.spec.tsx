import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import Calculator from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Calculator />
    </MemoryRouter>,
  );
});

describe("<GroceryBingo />", () => {
  it("should render calculator", async () => {
    const ac = await screen.findByRole("button", {
      name: /AC/i,
    });
    expect(ac).toBeDefined();
  });
});
