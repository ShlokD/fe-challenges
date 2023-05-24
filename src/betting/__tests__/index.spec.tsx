import { it } from "vitest";
import { render, screen } from "@testing-library/react";
import Betting from "..";
it("should render betting screen", () => {
  render(<Betting />);
  expect(screen.getByText("Bettings")).toBeDefined();
});
