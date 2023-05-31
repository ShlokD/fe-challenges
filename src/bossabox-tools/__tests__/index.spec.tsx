import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import Tools from "..";

global.fetch = vi.fn();

describe("<Tools />", () => {
  it("should render list of tools", async () => {
    render(
      <MemoryRouter>
        <Tools />
      </MemoryRouter>,
    );
    expect(await screen.findByText("test-tool")).toBeDefined();
    expect(screen.getByText("test-tool description wow")).toBeDefined();
    expect(screen.getByText("test")).toBeDefined();
    expect(screen.getByText("tool")).toBeDefined();
    expect(screen.getByText("wow")).toBeDefined();
    const search = screen.getByRole("textbox", { name: /search for tools/i });
    const checkbox = screen.getByRole("checkbox", {
      name: /search tags only/i,
    });
    expect(search).toBeDefined();
    expect(checkbox).toBeDefined();
    fireEvent.change(search, { target: { value: "notion" } });
    expect(await screen.queryByText("test-tool")).toBeNull();
    expect(screen.getByText("Notion")).toBeDefined();

    fireEvent.change(search, { target: { value: "" } });
    fireEvent.click(checkbox);
    fireEvent.change(search, { target: { value: "json" } });
    expect(await screen.queryByText("Notion")).toBeNull();
    expect(screen.getByText("json-server")).toBeDefined();
  });

  it("should render form", async () => {
    render(
      <MemoryRouter>
        <Tools />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("textbox", { name: /search for tools/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("checkbox", { name: /search tags only/i }),
    ).toBeDefined();
    const addBtn = screen.getByRole("button", { name: "Add" });
    expect(addBtn).toBeDefined();
    fireEvent.click(addBtn);
    const title = screen.getByRole("textbox", { name: /tool title/i });
    expect(title).toBeDefined();
    const description = screen.getByRole("textbox", {
      name: /tool description/i,
    });
    expect(description).toBeDefined();
    const link = screen.getByRole("textbox", { name: /tool link/i });
    expect(link).toBeDefined();
    const tags = screen.getByRole("textbox", { name: /tool tags/i });
    expect(tags).toBeDefined();
  });
});
