import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import ImageUpload from "..";

describe("<ImageUpload />", () => {
  it("should render messages", async () => {
    render(
      <MemoryRouter>
        <ImageUpload />
      </MemoryRouter>,
    );

    expect(screen.getByText(/drag a file to upload/i)).toBeDefined();
    expect(screen.getByText(/JPG,PNG or GIF. Max size 2MB/i)).toBeDefined();
  });
});
