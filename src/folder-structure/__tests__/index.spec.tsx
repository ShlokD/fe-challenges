import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import FolderStructure from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <FolderStructure />
    </MemoryRouter>,
  );
});

describe("<FolderStructure />", () => {
  it("should render folders ", async () => {
    const a = await screen.findByRole("button", { name: "📁 a" });
    expect(a).toBeDefined();
    expect(screen.getByRole("button", { name: "📁 b" })).toBeDefined();
    expect(screen.getByRole("button", { name: "📁 c" })).toBeDefined();
    fireEvent.click(a);
    const aa = await screen.findByRole("button", { name: "📁 aa" });
    expect(aa).toBeDefined();
    expect(screen.getByRole("button", { name: "📃 a.js" })).toBeDefined();
    expect(screen.getByRole("button", { name: "📃 a.html" })).toBeDefined();
    expect(screen.getByRole("button", { name: "📃 a.css" })).toBeDefined();
  });
});
