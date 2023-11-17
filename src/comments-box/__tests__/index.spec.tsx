import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import CommentsBox from "..";

describe("<CommentsBox />", () => {
  it("should render comments", async () => {
    render(
      <MemoryRouter>
        <CommentsBox />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/cosmicwanderer/i)).toBeDefined();
    expect(screen.getAllByRole("button", { name: /downvote/i })).toHaveLength(
      5,
    );
    expect(screen.getAllByRole("button", { name: /upvote/i })).toHaveLength(5);
    expect(screen.getAllByRole("button", { name: /reply/i })).toHaveLength(5);
    expect(screen.getAllByRole("button", { name: /report/i })).toHaveLength(5);
  });
});
