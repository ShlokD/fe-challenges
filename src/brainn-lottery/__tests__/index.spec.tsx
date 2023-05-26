import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Lottery from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Lottery />
    </MemoryRouter>,
  );
});

describe("<Lottery />", () => {
  it("should render select and results", async () => {
    expect(
      screen.getByRole("combobox", { name: /select a lotto/i }),
    ).toBeDefined();
    expect(screen.getAllByRole("option")).toHaveLength(6);
    expect(screen.getByTestId("lottery-numbers").children).toHaveLength(6);
  });
});
