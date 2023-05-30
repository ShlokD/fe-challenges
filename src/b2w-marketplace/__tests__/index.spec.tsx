import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import UserProfile from "..";

global.fetch = vi.fn();

const data = {
  results: [
    {
      gender: "male",
      name: { title: "Mr", first: "Đura", last: "Mladenović" },
      location: {
        street: { number: 9945, name: "Blagoja Kazandžije" },
        city: "Crna Trava",
        state: "Nišava",
        country: "Serbia",
        postcode: 29883,
        coordinates: { latitude: "63.7744", longitude: "-170.7857" },
        timezone: { offset: "+4:30", description: "Kabul" },
      },
      email: "dura.mladenovic@example.com",
      login: {
        uuid: "46af1353-9389-4b9d-90c9-6b86c0a94c6c",
        username: "smallmeercat468",
        password: "789456",
        salt: "KmIMULY2",
        md5: "6f82cc5fc4c88128b9e76db1ccfa4256",
        sha1: "b50e1836cdcea655f887e0733cfc8ac54a30f0c9",
        sha256:
          "5b153e91c2028715cadb92c98acd627acc47e893b7c018209e92b7c04a77f6d4",
      },
      dob: { date: "1985-11-22T15:08:13.363Z", age: 37 },
      registered: { date: "2013-07-24T04:07:47.771Z", age: 9 },
      phone: "030-6627-478",
      cell: "061-7155-190",
      id: { name: "SID", value: "819195914" },
      picture: {
        large: "https://randomuser.me/api/portraits/men/39.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/39.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/39.jpg",
      },
      nat: "RS",
    },
  ],
  info: { seed: "a1d37b7de618d6ac", results: 1, page: 1, version: "1.4" },
};

function createFetchResponse() {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    headers: {
      get: () => "1",
    },
  };
}

describe("<ApikiBlog />", () => {
  it("should render user profile", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/Tiago Aubert/i)).toBeDefined();
    expect(screen.getByText(/Vielleurbanne, France/i)).toBeDefined();
    expect(screen.getByText(/age: 27/i)).toBeDefined();
    expect(screen.getByText(/03-33-47-80-50/i)).toBeDefined();
    expect(screen.getByText(/tiago.aubert@example.com/i)).toBeDefined();
    expect(screen.getByText(/8\/12\/1995/i)).toBeDefined();
    expect(
      screen.getByRole("button", { name: /try the next one/i }),
    ).toBeDefined();
  });

  it("should render user profile", async () => {
    fetch.mockResolvedValue(createFetchResponse());
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/Tiago Aubert/i)).toBeDefined();
    const tryBtn = screen.getByRole("button", { name: /try the next one/i });
    expect(tryBtn).toBeDefined();

    fireEvent.click(tryBtn);
    expect(await screen.findByText(/Đura Mladenović/i)).toBeDefined();
    const follow = screen.getByRole("button", { name: /follow/i });
    expect(follow).toBeDefined();
    fireEvent.click(follow);
    expect(screen.getByText(/following 1/i)).toBeDefined();
    expect(screen.getAllByRole("button", { name: /unfollow/i })).toHaveLength(
      2,
    );
  });
});
