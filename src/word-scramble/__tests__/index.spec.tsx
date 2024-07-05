import { configure, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import WordScramble from "..";

configure({ asyncUtilTimeout: 5000 });

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
    expect(await screen.findAllByRole("textbox")).toHaveLength(5);
    expect(screen.getByRole("button", { name: /guess/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /reset/i })).toBeDefined();
  });
});
