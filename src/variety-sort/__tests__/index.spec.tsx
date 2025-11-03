import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, it } from "vitest";

import VarietySort, { SortTypes } from "..";

describe("<VarietySort />", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <VarietySort />
      </MemoryRouter>,
    );
  });
  it("should render elements and sort options", async () => {
    const sortBy = await screen.findByRole("combobox", { name: /sort by/i });
    expect(sortBy).toBeDefined();
    const firstButton = screen.getByRole("button", { name: /Huilongshan/i });
    expect(firstButton).toBeDefined();
    const secondButton = screen.getByRole("button", { name: /Kangping/i });
    expect(secondButton).toBeDefined();
    expect(secondButton.compareDocumentPosition(firstButton)).toBe(2);
  });

  it("should render sort by visit", async () => {
    const sortBy = await screen.findByRole("combobox", {
      name: /sort by/i,
    });
    expect(sortBy).toBeDefined();
    let hButton = screen.getByRole("button", {
      name: /Huilongshan/i,
    });
    expect(hButton).toBeDefined();
    let oButton = screen.getByRole("button", { name: /Oakland/i });
    expect(oButton).toBeDefined();
    expect(oButton.compareDocumentPosition(hButton)).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    );

    fireEvent.change(sortBy, { target: { value: SortTypes.MOST_VISIT } });

    hButton = screen.getByRole("button", {
      name: /Huilongshan/i,
    });
    oButton = screen.getByRole("button", { name: /Oakland/i });
    expect(oButton.compareDocumentPosition(hButton)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("should sort by recent", async () => {
    const sortBy = await screen.findByRole("combobox", {
      name: /sort by/i,
    });
    expect(sortBy).toBeDefined();
    let hButton = screen.getByRole("button", {
      name: /Huilongshan/i,
    });
    expect(hButton).toBeDefined();
    let mButton = screen.getByRole("button", { name: /Makoko/i });
    expect(mButton).toBeDefined();
    expect(mButton.compareDocumentPosition(hButton)).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    );

    fireEvent.change(sortBy, { target: { value: SortTypes.RECENT_VISIT } });

    hButton = screen.getByRole("button", {
      name: /Huilongshan/i,
    });
    mButton = screen.getByRole("button", { name: /Makoko/i });
    expect(mButton.compareDocumentPosition(hButton)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
