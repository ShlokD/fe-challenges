import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import SortableList from "..";

describe("<SortableList />", () => {
  it("should render list of stolen bikes", async () => {
    render(
      <MemoryRouter>
        <SortableList />
      </MemoryRouter>,
    );
    expect(await screen.findAllByRole("button")).toHaveLength(20);
    expect(screen.getAllByRole("combobox")).toHaveLength(5);
  });
});
