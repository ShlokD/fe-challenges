import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import MultiProgress from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <MultiProgress />
    </MemoryRouter>,
  );
});

describe("<MultiProgress />", () => {
  it("should render game grid", async () => {
    const addBtn = await screen.findByRole("button", { name: /add/i });
    expect(addBtn).toBeDefined();
    expect(screen.getByText("Bars in Queue: 0")).toBeDefined();
  });
});
