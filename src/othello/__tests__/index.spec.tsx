import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import Othello from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Othello />
    </MemoryRouter>,
  );
});

describe("<Othello />", () => {
  it("should render game grid", async () => {
    const text = await screen.findByText(/white 0 black 0/i);
    expect(text).toBeDefined();
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(64);
    expect(screen.getByText("Now Playing Black")).toBeDefined();
    fireEvent.click(buttons[40]);
    expect(screen.getByText("Now Playing White")).toBeDefined();
  });
});
