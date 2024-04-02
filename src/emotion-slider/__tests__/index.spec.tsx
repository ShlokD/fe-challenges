import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import EmotionSlider from "..";

describe("<EmotionSlider />", () => {
  it("should render image and slider", async () => {
    render(
      <MemoryRouter>
        <EmotionSlider />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("slider", { name: /change value/i }),
    ).toBeDefined();
    expect(screen.getByAltText(/selected emotion/i)).toBeDefined();
  });
});
