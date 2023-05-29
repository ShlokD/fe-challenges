import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import ApikiBlog from "..";

global.fetch = vi.fn();

const data = [
  {
    title: {
      rendered: "One title",
    },
    excerpt: {
      rendered: "One excerpt",
    },
    content: {
      rendered: "One content",
    },
    slug: "one",
    _embedded: {
      "wp:featuredmedia": [
        {
          media_details: {
            sizes: {
              full: {
                source_url: "some-image-src.com",
              },
            },
          },
        },
      ],
    },
  },
  {
    title: {
      rendered: "Two title",
    },
    excerpt: {
      rendered: "Two excerpt",
    },
    content: {
      rendered: "Two content",
    },
    slug: "two",
    _embedded: {
      "wp:featuredmedia": [
        {
          media_details: {
            sizes: {
              full: {
                source_url: "some-image-src.com",
              },
            },
          },
        },
      ],
    },
  },
];

function createFetchResponse() {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    headers: {
      get: () => "1",
    },
  };
}

describe("<ApikiBlog />", () => {
  it("should render list of blogs", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <ApikiBlog />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/one title/i)).toBeDefined();
    expect(screen.getByText(/two title/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /load more/i })).toBeDefined();
  });

  it("should render content", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <ApikiBlog />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/one title/i)).toBeDefined();
    expect(screen.getByText(/two title/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /load more/i })).toBeDefined();
    fireEvent.click(screen.getByRole("link", { name: /one title/i }));
    expect(await screen.findByText(/one content/i)).toBeDefined();
  });
});
