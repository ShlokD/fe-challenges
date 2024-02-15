import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import SurveyApp from "..";

describe("<SurveyApp />", () => {
  it("should render survey buttons and survey items", async () => {
    render(
      <MemoryRouter>
        <SurveyApp />
      </MemoryRouter>,
    );
    const movie = await screen.findByRole("button", {
      name: /best movie 2023/i,
    });
    expect(movie).toBeDefined();
    fireEvent.click(movie);

    const opp = await screen.findByRole("button", { name: /Oppenheimer/i });
    expect(opp).toBeDefined();
    fireEvent.click(opp);

    const text = await screen.findByText(/19/i);
    expect(text).toBeDefined();
  });
});
