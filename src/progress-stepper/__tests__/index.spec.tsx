import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import ProgressStepper from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <ProgressStepper />
    </MemoryRouter>,
  );
});

describe("<ProgressStepper />", () => {
  it("should render steps and next button", async () => {
    expect(screen.getAllByRole("checkbox")).toHaveLength(4);
    const next = screen.getByRole("button", { name: /next/i });
    expect(next).toBeDefined();
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);

    expect(screen.getByRole("button", { name: /done/i })).toBeDefined();
  });
});
