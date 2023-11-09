import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import WordScramble from "..";

global.fetch = vi.fn();
global.window.scrollTo = vi.fn();

const data = [
  {
    meanings: [
      {
        definitions: [
          {
            definition: "something",
          },
        ],
      },
    ],
  },
];

function createFetchResponse() {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    text: () => new Promise((resolve) => resolve("abcde\r\n")),
  };
}
describe("<WordScramble />", () => {
  it("should render game elements", async () => {
    fetch.mockResolvedValue(createFetchResponse());

    render(
      <MemoryRouter>
        <WordScramble />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/1 out of 4/i)).toBeDefined();
    expect(screen.getAllByRole("textbox")).toHaveLength(5);
    expect(screen.getByRole("button", { name: /guess/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /reset/i })).toBeDefined();
  });
});
