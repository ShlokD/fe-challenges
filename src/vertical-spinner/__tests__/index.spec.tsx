import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import VerticalSpinner from "..";

describe("<VerticalSpinner />", () => {
  it("should render input and spinner", async () => {
    render(
      <MemoryRouter>
        <VerticalSpinner />
      </MemoryRouter>,
    );
    const addItem = await screen.findByRole("textbox", { name: /item title/i });
    expect(addItem).toBeDefined();
    const addBtn = screen.getByRole("button", { name: /add/i });
    expect(screen.getByRole("button", { name: /1/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /2/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /3/i })).toBeDefined();

    fireEvent.change(addItem, { target: { value: "4" } });
    fireEvent.click(addBtn);
    expect(screen.getByRole("button", { name: /4/i })).toBeDefined();
  });
});
