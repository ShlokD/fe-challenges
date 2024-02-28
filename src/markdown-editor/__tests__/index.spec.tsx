import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import MarkdownEditor from "..";

describe("<MarkdownEditor />", () => {
  it("should render editor", async () => {
    render(
      <MemoryRouter>
        <MarkdownEditor />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("textbox", { name: /enter markdown/i }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: /copy html/i })).toBeDefined();
  });
});
