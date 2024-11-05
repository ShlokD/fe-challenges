import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import ExportImage from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <ExportImage />
    </MemoryRouter>,
  );
});

describe("<ExportImage />", () => {
  it("should render image elements ", async () => {
    expect(
      await screen.findByRole("textbox", {
        name: /enter image url/i,
      }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /load/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /export/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /jpeg/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /png/i })).toBeDefined();
    expect(screen.getByRole("radio", { name: /bmp/i })).toBeDefined();
  });
});
