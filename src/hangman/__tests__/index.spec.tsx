import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import Hangman from "..";

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
    text: () => new Promise((resolve) => resolve("abc\r\n")),
  };
}
describe("<Hangman />", () => {
  it("should render game elements", async () => {
    fetch.mockResolvedValue(createFetchResponse());

    render(
      <MemoryRouter>
        <Hangman />
      </MemoryRouter>,
    );
    const image = await screen.findByAltText(/hangman status/i);
    expect(image).toBeDefined();
    expect(screen.getAllByText(/_/i)).toHaveLength(3);
    expect(screen.getByText(/something/i)).toBeDefined();
    expect(screen.getAllByRole("button")).toHaveLength(26);
    const button = screen.getByRole("button", { name: /a/i });
    fireEvent.click(button);
    expect(await screen.findAllByText(/_/i)).toHaveLength(2);
  });
});
