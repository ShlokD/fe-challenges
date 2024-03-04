import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import MultiSearchSelect from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <MultiSearchSelect />
    </MemoryRouter>,
  );
});

describe("<MultiSearchSelect />", () => {
  it("should render search bar and suggestions", async () => {
    expect(
      await screen.findByRole("searchbox", { name: /search fruits/i }),
    ).toBeDefined();
    expect(screen.getAllByRole("button")).toHaveLength(20);
    const mango = screen.getByRole("button", { name: /mango/i });
    fireEvent.click(mango);
    expect(
      await screen.getByRole("button", { name: /mango x/i }),
    ).toBeDefined();
  });
});
