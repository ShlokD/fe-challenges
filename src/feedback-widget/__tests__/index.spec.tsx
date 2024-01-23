import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import FeedbackWidget from "..";

beforeEach(() => {
  render(
    <MemoryRouter>
      <FeedbackWidget />
    </MemoryRouter>,
  );
});

describe("<FeedbackWidget />", () => {
  it("should render feedback elements ", async () => {
    const heading = await screen.findByText(/please share your feedback/i);
    expect(heading).toBeDefined();
    expect(screen.getByRole("button", { name: /problems/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /ideas/i })).toBeDefined();
    const questions = screen.getByRole("button", { name: /questions/i });
    expect(questions).toBeDefined();
    fireEvent.click(questions);
    const form = await screen.findByRole("textbox", { name: /share/i });
    expect(form).toBeDefined();
    const submit = screen.getByRole("button", { name: /submit/i });
    expect(submit).toBeDefined();
    fireEvent.change(form, { target: { value: "Hello" } });
    fireEvent.click(submit);
    expect(
      await screen.findByText(/Your feedback has been received/i),
    ).toBeDefined();
    const share = screen.getByRole("button", { name: /share another/i });
    expect(share).toBeDefined();
  });
});
